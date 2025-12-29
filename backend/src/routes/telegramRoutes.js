import express from "express";
import { body, validationResult } from "express-validator";
import {
  askQuestion,
  askQuestionWithDocument,
} from "../services/aiProxyService.js";
import rateLimit from "express-rate-limit";

const router = express.Router();

// Rate limiting for Telegram bot (more restrictive)
const telegramRateLimit = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10, // 10 requests per minute per IP
  message: {
    success: false,
    message: "Too many requests from Telegram bot. Please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Validation rules for Telegram bot requests
export const validateTelegramRequest = [
  body("question")
    .trim()
    .notEmpty()
    .withMessage("Question is required")
    .isLength({ min: 2, max: 1000 })
    .withMessage("Question must be between 2 and 1000 characters"),
  body("telegramUserId")
    .notEmpty()
    .withMessage("Telegram user ID is required")
    .isNumeric()
    .withMessage("Telegram user ID must be numeric"),
  body("telegramChatId").notEmpty().withMessage("Telegram chat ID is required"),
];

// Ask question via Telegram bot
export const telegramAsk = async (req, res) => {
  try {
    // Check validation results
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      });
    }

    const { question, conversationId, telegramUserId, telegramChatId } =
      req.body;

    // Create a unique session ID for Telegram users
    const sessionId = `telegram_${telegramUserId}`;
    const userIp = req.ip || req.connection.remoteAddress;
    const userAgent = `TelegramBot/${telegramUserId}`;

    let result;

    if (conversationId) {
      // Try to continue existing conversation
      try {
        const { addMessageToConversation } = await import(
          "../services/aiProxyService.js"
        );
        result = await addMessageToConversation(
          conversationId,
          question,
          sessionId
        );
      } catch (error) {
        if (error.message.includes("Conversation not found")) {
          // Fallback: start new conversation
          result = await askQuestion(question, sessionId, userIp, userAgent);
        } else {
          throw error;
        }
      }
    } else {
      // Start new conversation
      result = await askQuestion(question, sessionId, userIp, userAgent);
    }

    // Format response for Telegram
    const response = {
      success: true,
      response: result.response,
      sources: result.sources || [],
      topSourceSuggestions: result.top_source_suggestions || [],
      conversationId: result.conversationId,
      sessionId,
      platform: "telegram",
      telegramUserId,
      telegramChatId,
      timestamp: new Date().toISOString(),
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("Telegram chat error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Server error while processing question",
      platform: "telegram",
    });
  }
};

// Ask question about specific document via Telegram
export const telegramAskDocument = async (req, res) => {
  try {
    // Check validation results
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      });
    }

    const {
      question,
      documentId,
      conversationId,
      telegramUserId,
      telegramChatId,
    } = req.body;

    if (!documentId) {
      return res.status(400).json({
        success: false,
        message: "Document ID is required for document-specific queries",
      });
    }

    const sessionId = `telegram_${telegramUserId}`;
    const userIp = req.ip || req.connection.remoteAddress;
    const userAgent = `TelegramBot/${telegramUserId}`;
    const result = await askQuestionWithDocument(
      question,
      documentId,
      sessionId,
      userIp,
      userAgent
    );

    const response = {
      success: true,
      response: result.response,
      sources: result.sources || [],
      topSourceSuggestions: result.top_source_suggestions || [],
      conversationId: result.conversationId,
      sessionId,
      documentUsed: result.documentUsed,
      platform: "telegram",
      telegramUserId,
      telegramChatId,
      timestamp: new Date().toISOString(),
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("Telegram document chat error:", error);
    res.status(500).json({
      success: false,
      message:
        error.message || "Server error while processing document question",
      platform: "telegram",
    });
  }
};

// Health check endpoint for Telegram bot
export const telegramHealthCheck = async (req, res) => {
  try {
    // Basic health check
    const healthStatus = {
      success: true,
      status: "healthy",
      platform: "telegram",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: process.memoryUsage(),
    };

    res.status(200).json(healthStatus);
  } catch (error) {
    console.error("Telegram health check error:", error);
    res.status(500).json({
      success: false,
      status: "unhealthy",
      platform: "telegram",
      error: error.message,
    });
  }
};

// Apply rate limiting to all Telegram routes
router.use(telegramRateLimit);

// Telegram bot routes
router.post("/ask", validateTelegramRequest, telegramAsk);
router.post(
  "/ask-document",
  [
    ...validateTelegramRequest,
    body("documentId").notEmpty().withMessage("Document ID is required"),
  ],
  telegramAskDocument
);
router.get("/health", telegramHealthCheck);

export default router;
