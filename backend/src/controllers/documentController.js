import {
  uploadDocumentToAI,
  getIndexedDocuments,
  updateDocumentStatus,
  checkDocumentStatus,
  deleteDocument as deleteDocumentFromAI,
} from "../services/aiProxyService.js";
import { Document } from "../models/index.js";
import { body, validationResult } from "express-validator";
import fs from "fs";
import path from "path";

// Validation rules for document upload
export const validateUpload = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Document title is required")
    .isLength({ min: 3, max: 200 })
    .withMessage("Title must be between 3 and 200 characters"),
];

// Upload document controller
export const uploadDocument = async (req, res) => {
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

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const { title } = req.body;
    const file = req.file;

    // Process the upload through AI service
    const result = await uploadDocumentToAI(file, title, req.user?.id);

    res.status(201).json({
      success: true,
      message: result.message,
      document: result.document,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Server error during document upload",
    });
  }
};

// Get all announcements/documents controller
export const getAnnouncements = async (req, res) => {
  try {
    const result = await getIndexedDocuments();

    if (result.success) {
      res.status(200).json({
        success: true,
        documents: result.documents,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Failed to fetch documents",
      });
    }
  } catch (error) {
    console.error("Get announcements error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching documents",
    });
  }
};

// Webhook for AI pipeline to update document status
export const updateDocumentStatusWebhook = async (req, res) => {
  try {
    const { documentId, status, aiPipelineId, errorMessage } = req.body;

    if (!documentId || !status) {
      return res.status(400).json({
        success: false,
        message: "Document ID and status are required",
      });
    }

    const result = await updateDocumentStatus(
      documentId,
      status,
      aiPipelineId,
      errorMessage
    );

    res.json({
      success: true,
      message: "Document status updated successfully",
    });
  } catch (error) {
    console.error("Webhook error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to update document status",
    });
  }
};

// View document content
export const viewDocument = async (req, res) => {
  try {
    const { id } = req.params;

    const document = await Document.findById(id);
    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }

    if (!fs.existsSync(document.filePath)) {
      return res.status(404).json({
        success: false,
        message: "Document file not found on disk",
      });
    }

    // Set appropriate headers
    res.setHeader("Content-Type", document.mimeType);
    res.setHeader(
      "Content-Disposition",
      `inline; filename="${document.originalName}"`
    );

    // Stream the file
    const fileStream = fs.createReadStream(document.filePath);
    fileStream.pipe(res);
  } catch (error) {
    console.error("View document error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to view document",
    });
  }
};

// Get document status
export const getDocumentStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await checkDocumentStatus(id);

    res.json(result);
  } catch (error) {
    console.error("Get document status error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to get document status",
    });
  }
};

// Delete document
export const deleteDocument = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await deleteDocumentFromAI(id);

    res.json(result);
  } catch (error) {
    console.error("Delete document error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to delete document",
    });
  }
};
