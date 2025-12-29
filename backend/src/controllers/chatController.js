import {
  askQuestion,
  addMessageToConversation,
  askQuestionWithDocument,
  askQuestionWithMultipleDocuments,
} from "../services/aiProxyService.js";
import { Conversation } from "../models/index.js";
import { body, validationResult } from "express-validator";

// Validation rules for chat question
export const validateQuestion = [
  body("question")
    .trim()
    .notEmpty()
    .withMessage("Question is required")
    .isLength({ min: 2, max: 1000 })
    .withMessage("Question must be between 2 and 1000 characters"),
];

// Ask question controller with conversation tracking
export const ask = async (req, res) => {
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

    const { question, conversationId } = req.body;
    const sessionId =
      req.sessionID || req.headers["x-session-id"] || `session_${Date.now()}`;
    const userIp = req.ip || req.connection.remoteAddress;
    const userAgent = req.get("User-Agent");

    let result;

    // First, try to find ALL available indexed documents to use for context
    try {
      const { Document } = await import("../models/index.js");
      const availableDocuments = await Document.find({
        status: "indexed",
      }).sort({ uploadDate: -1 }); // Get all indexed documents

      if (availableDocuments.length > 0) {
        try {
          // Use multi-document search if we have indexed documents
          result = await askQuestionWithMultipleDocuments(
            question,
            availableDocuments.map((doc) => doc._id),
            sessionId,
            userIp,
            userAgent
          );

          return res.status(200).json({
            success: true,
            response: result.response,
            content_type: result.content_type || "markdown", // Forward content_type
            sources: result.sources,
            topSourceSuggestions: result.top_source_suggestions || [],
            conversationId: result.conversationId,
            sessionId,
            documentsUsed: result.documentsUsed,
            timestamp: new Date().toISOString(),
          });
        } catch (multiDocError) {
          console.error(
            "Multi-document search failed, falling back to general chat:",
            multiDocError
          );
          // Continue to general chat fallback below
        }
      }
    } catch (docError) {
      // No indexed documents available, continue with general chat
    }

    if (conversationId) {
      // Try to continue existing conversation, fallback to new conversation if not found
      try {
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

    res.status(200).json({
      success: true,
      response: result.response,
      content_type: result.content_type || "markdown", // Forward content_type
      sources: result.sources,
      topSourceSuggestions: result.top_source_suggestions || [],
      conversationId: result.conversationId,
      sessionId,
      documentUsed: result.documentUsed || null,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Chat error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Server error while processing question",
    });
  }
};

// Ask question about specific document
export const askAboutDocument = async (req, res) => {
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

    const { question, documentId } = req.body;
    const sessionId =
      req.sessionID || req.headers["x-session-id"] || `session_${Date.now()}`;
    const userIp = req.ip || req.connection.remoteAddress;
    const userAgent = req.get("User-Agent");

    if (!documentId) {
      return res.status(400).json({
        success: false,
        message: "Document ID is required for document-specific queries",
      });
    }

    const result = await askQuestionWithDocument(
      question,
      documentId,
      sessionId,
      userIp,
      userAgent
    );

    res.status(200).json({
      success: true,
      response: result.response,
      content_type: result.content_type || "markdown", // Forward content_type
      sources: result.sources,
      topSourceSuggestions: result.top_source_suggestions || [],
      conversationId: result.conversationId,
      sessionId,
      documentUsed: result.documentUsed,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Document chat error:", error);
    res.status(500).json({
      success: false,
      message:
        error.message || "Server error while processing document question",
    });
  }
};

// Get all conversations (admin only)
export const getConversations = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const conversations = await Conversation.find({ isActive: true })
      .select("sessionId startTime lastActivity messages userIp")
      .sort({ lastActivity: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Conversation.countDocuments({ isActive: true });

    const conversationList = conversations.map((conv) => ({
      id: conv._id,
      sessionId: conv.sessionId,
      startTime: conv.startTime,
      lastActivity: conv.lastActivity,
      messageCount: conv.messages.length,
      lastMessage:
        conv.messages.length > 0
          ? conv.messages[conv.messages.length - 1].text.substring(0, 100)
          : "",
      userIp: conv.userIp,
    }));

    res.json({
      success: true,
      conversations: conversationList,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalConversations: total,
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    console.error("Get conversations error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch conversations",
    });
  }
};

// Get specific conversation (admin only)
export const getConversation = async (req, res) => {
  try {
    const { id } = req.params;

    const conversation = await Conversation.findById(id);
    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: "Conversation not found",
      });
    }

    res.json({
      success: true,
      conversation: {
        id: conversation._id,
        sessionId: conversation.sessionId,
        startTime: conversation.startTime,
        lastActivity: conversation.lastActivity,
        userIp: conversation.userIp,
        userAgent: conversation.userAgent,
        messages: conversation.messages,
      },
    });
  } catch (error) {
    console.error("Get conversation error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch conversation",
    });
  }
};

// Delete conversation (admin only)
export const deleteConversation = async (req, res) => {
  try {
    const { id } = req.params;

    const conversation = await Conversation.findByIdAndDelete(id);
    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: "Conversation not found",
      });
    }

    res.json({
      success: true,
      message: "Conversation deleted successfully",
    });
  } catch (error) {
    console.error("Delete conversation error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to delete conversation",
    });
  }
};
