import express from "express";
import {
  ask,
  validateQuestion,
  getConversations,
  getConversation,
  deleteConversation,
  askAboutDocument,
} from "../controllers/chatController.js";
import { authenticateAdmin } from "../middleware/auth.js";
import { chatLimiter, apiLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();

// POST /api/chat/ask - Ask a question to the AI
router.post("/ask", chatLimiter, validateQuestion, ask);

// POST /api/chat/ask-document - Ask a question about a specific document
router.post("/ask-document", chatLimiter, validateQuestion, askAboutDocument);

// GET /api/chat/conversations - Get all conversations (admin only)
router.get("/conversations", apiLimiter, authenticateAdmin, getConversations);

// GET /api/chat/conversations/:id - Get specific conversation (admin only)
router.get(
  "/conversations/:id",
  apiLimiter,
  authenticateAdmin,
  getConversation
);

// DELETE /api/chat/conversations/:id - Delete conversation (admin only)
router.delete(
  "/conversations/:id",
  apiLimiter,
  authenticateAdmin,
  deleteConversation
);

export default router;
