import express from "express";
import {
  uploadDocument,
  getAnnouncements,
  validateUpload,
  updateDocumentStatusWebhook,
  viewDocument,
  deleteDocument,
  getDocumentStatus,
} from "../controllers/documentController.js";
import { authenticateAdmin } from "../middleware/auth.js";
import { upload, handleUploadError } from "../middleware/upload.js";
import { apiLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();

// GET /api/documents/announcements - Get all uploaded documents
router.get("/announcements", apiLimiter, getAnnouncements);

// POST /api/documents/upload - Upload new document (admin only)
router.post(
  "/upload",
  apiLimiter,
  authenticateAdmin,
  upload.single("document"),
  handleUploadError,
  validateUpload,
  uploadDocument
);

// GET /api/documents/:id/view - View document content (admin only)
router.get("/:id/view", authenticateAdmin, viewDocument);

// GET /api/documents/:id/status - Get document processing status (admin only)
router.get("/:id/status", authenticateAdmin, getDocumentStatus);

// DELETE /api/documents/:id - Delete document (admin only)
router.delete("/:id", authenticateAdmin, deleteDocument);

// POST /api/documents/webhook - Webhook for AI pipeline status updates
router.post("/webhook", updateDocumentStatusWebhook);

export default router;
