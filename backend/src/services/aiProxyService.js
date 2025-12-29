import { Document, Conversation } from "../models/index.js";
import axios from "axios";
import fs from "fs";
import path from "path";

const AI_PIPELINE_URL = process.env.AI_PIPELINE_URL || "http://localhost:8001";
const MOCK_MODE = process.env.MOCK_AI_PIPELINE === "true";

// Helper function to safely truncate messages
const truncateMessage = (text, maxLength = 4500) => {
  if (!text || text.length <= maxLength) return text;

  // Try to truncate at a sentence boundary
  const truncated = text.substring(0, maxLength);
  const lastPeriod = truncated.lastIndexOf(".");
  const lastNewline = truncated.lastIndexOf("\n");

  const cutPoint = Math.max(lastPeriod, lastNewline);

  if (cutPoint > maxLength * 0.8) {
    return (
      truncated.substring(0, cutPoint + 1) +
      "\n\n[Response truncated due to length limit]"
    );
  }

  return truncated + "...\n\n[Response truncated due to length limit]";
};


// Ensure uploads directory exists
const uploadsDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Upload document to AI pipeline and save to database
export const uploadDocumentToAI = async (file, title, uploadedBy) => {
  try {
    const filename = `${Date.now()}_${file.originalname}`;
    const filePath = path.join(uploadsDir, filename);

    // Save file to local storage
    fs.writeFileSync(filePath, file.buffer);

    // Create document record in database
    const document = new Document({
      title: title.trim(),
      filename: filename,
      originalName: file.originalname,
      mimeType: file.mimetype,
      size: file.size,
      filePath: filePath,
      uploadedBy,
      status: "processing",
    });

    await document.save();

    if (MOCK_MODE) {
      // Mock processing - simulate delay and success
      setTimeout(async () => {
        try {
          await Document.findByIdAndUpdate(document._id, {
            status: "indexed",
            aiPipelineId: `mock_${document._id}`,
          });
        } catch (error) {
          console.error("Mock processing error:", error);
        }
      }, 3000);

      return {
        success: true,
        message: "Document uploaded and queued for processing",
        document: {
          id: document._id,
          title: document.title,
          filename: document.filename,
          size: document.size,
          uploadedAt: document.uploadDate,
          status: document.status,
        },
      };
    }

    // Real AI pipeline integration
    try {
      const formData = new FormData();
      formData.append("file", new Blob([file.buffer]), file.originalname);

      const response = await axios.post(
        `${AI_PIPELINE_URL}/api/documents/process`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          timeout: 60000, // 60 second timeout for document processing
        }
      );

      if (response.data.success) {
        await Document.findByIdAndUpdate(document._id, {
          status: "indexed",
          aiPipelineId: response.data.document_id,
        });
      }

      return {
        success: true,
        message: "Document uploaded and processed successfully",
        document: {
          id: document._id,
          title: document.title,
          filename: document.filename,
          size: document.size,
          uploadedAt: document.uploadDate,
          status: "indexed",
          aiPipelineId: response.data.document_id,
        },
      };
    } catch (aiError) {
      console.error("AI Pipeline error:", aiError);

      let errorMessage = "Failed to process document with AI pipeline";
      let status = "failed";

      // Check if it's an OpenAI API key issue
      if (
        aiError.response?.data?.detail?.includes("Incorrect API key") ||
        aiError.response?.data?.detail?.includes(
          "OpenAI API key is not configured"
        )
      ) {
        errorMessage =
          "OpenAI API key is not configured or invalid. Please configure the API key.";
        status = "pending_api_key";
      }

      // Update document status
      await Document.findByIdAndUpdate(document._id, {
        status: status,
        errorMessage: errorMessage,
      });

      throw new Error(errorMessage);
    }
  } catch (error) {
    console.error("Document upload error:", error);
    throw error;
  }
};

// Get all indexed documents from database
export const getIndexedDocuments = async () => {
  try {
    const documents = await Document.find()
      .populate("uploadedBy", "username")
      .sort({ uploadDate: -1 });

    return {
      success: true,
      documents: documents.map((doc) => ({
        id: doc._id,
        title: doc.title,
        filename: doc.originalName,
        size: doc.size,
        uploadedAt: doc.uploadDate,
        status: doc.status,
        uploadedBy: doc.uploadedBy?.username || "Unknown",
      })),
    };
  } catch (error) {
    console.error("Get documents error:", error);
    throw new Error("Failed to fetch documents");
  }
};

// Ask question to AI and save conversation
export const askQuestion = async (question, sessionId, userIp, userAgent) => {
  try {
    // Find or create conversation
    let conversation = await Conversation.findOne({ sessionId });

    if (!conversation) {
      conversation = new Conversation({
        sessionId,
        userIp,
        userAgent,
        messages: [],
      });
    }

    // Add user message
    const userMessage = {
      sender: "user",
      text: question,
      timestamp: new Date(),
    };

    conversation.messages.push(userMessage);
    conversation.lastActivity = new Date();

    await conversation.save();

    if (MOCK_MODE) {
      // Mock AI response with more varied and helpful responses
      const mockResponses = [
        "Hello! I'm here to help you with your campus-related questions. I can assist with information about admissions, academics, events, facilities, and more. What would you like to know?",
        "I can help you find information about course requirements, schedules, faculty details, and academic procedures. What specific topic are you interested in?",
        "For campus services, I can provide details about the library, hostels, dining facilities, sports centers, and student activities. How can I assist you today?",
        "I have access to information about fee structures, scholarship programs, and financial aid options. What financial information do you need?",
        "I can help with admission procedures, entrance exam details, application deadlines, and eligibility criteria. What admission-related question do you have?",
        "For current students, I can provide information about exam schedules, assignment deadlines, course materials, and academic support services. How can I help?",
        "I can assist with campus facility bookings, event information, club activities, and student services. What would you like to know about?",
      ];

      // Use a smarter response based on the question content
      let selectedResponse;
      const questionLower = question.toLowerCase();

      if (
        questionLower.includes("admission") ||
        questionLower.includes("apply")
      ) {
        selectedResponse =
          "I can help with admission procedures, entrance exam details, application deadlines, and eligibility criteria. What admission-related question do you have?";
      } else if (
        questionLower.includes("fee") ||
        questionLower.includes("payment") ||
        questionLower.includes("scholarship")
      ) {
        selectedResponse =
          "I have access to information about fee structures, scholarship programs, and financial aid options. What financial information do you need?";
      } else if (
        questionLower.includes("course") ||
        questionLower.includes("academic") ||
        questionLower.includes("exam")
      ) {
        selectedResponse =
          "I can help you find information about course requirements, schedules, faculty details, and academic procedures. What specific topic are you interested in?";
      } else if (
        questionLower.includes("hostel") ||
        questionLower.includes("facility") ||
        questionLower.includes("library")
      ) {
        selectedResponse =
          "For campus services, I can provide details about the library, hostels, dining facilities, sports centers, and student activities. How can I assist you today?";
      } else {
        selectedResponse =
          mockResponses[Math.floor(Math.random() * mockResponses.length)];
      }

      const botMessage = {
        sender: "bot",
        text: selectedResponse,
        timestamp: new Date(),
        sources: [
          { title: "Student Handbook 2024", relevance: 0.95 },
          { title: "Campus Guidelines", relevance: 0.87 },
        ],
      };

      conversation.messages.push(botMessage);
      await conversation.save();

      return {
        success: true,
        response: selectedResponse,
        content_type: "markdown", // Add content_type for mock responses
        sources: botMessage.sources,
        conversationId: conversation._id,
      };
    }

    // Real AI pipeline integration
    try {
      // Get all indexed documents for semantic search
      const allDocuments = await Document.find({
        status: "indexed",
      }).sort({ uploadDate: -1 });

      // If no documents, return error
      if (!allDocuments || allDocuments.length === 0) {
        throw new Error("No indexed documents available");
      }

      // Search across all documents using the multiple document search endpoint
      const documentIds = allDocuments
        .map((doc) => doc.aiPipelineId)
        .filter((id) => id);

      const response = await axios.post(
        `${AI_PIPELINE_URL}/api/chat/search-multiple`,
        {
          query: question,
          document_ids: documentIds,
        },
        {
          timeout: 30000,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const botMessage = {
        sender: "bot",
        text: truncateMessage(response.data.response),
        timestamp: new Date(),
        sources: response.data.sources || [],
      };

      conversation.messages.push(botMessage);

      try {
        await conversation.save();
      } catch (saveError) {
        if (saveError.name === "ValidationError") {
          console.error(
            "Message validation error, attempting to truncate further:",
            saveError
          );
          // Try with a more aggressive truncation
          botMessage.text = truncateMessage(response.data.response, 5000);
          await conversation.save();
        } else {
          throw saveError;
        }
      }

      return {
        success: true,
        response: truncateMessage(response.data.response),
        content_type: response.data.content_type || "markdown", // Forward content_type
        sources: response.data.sources || [],
        top_source_suggestions: response.data.top_source_suggestions || [],
        conversationId: conversation._id,
        documentsSearched: allDocuments.length,
      };
    } catch (aiError) {
      console.error("AI Pipeline error:", aiError);

      const errorMessage = {
        sender: "bot",
        text: "I apologize, but I'm having trouble accessing my knowledge base right now. Please try again in a moment.",
        timestamp: new Date(),
      };

      conversation.messages.push(errorMessage);
      await conversation.save();

      return {
        success: true,
        response: errorMessage.text,
        content_type: "markdown", // Add content_type for error responses
        sources: [],
        conversationId: conversation._id,
      };
    }
  } catch (error) {
    console.error("Ask question error:", error);
    throw new Error("Failed to process question");
  }
};

// Add message to existing conversation
export const addMessageToConversation = async (
  conversationId,
  message,
  sessionId
) => {
  try {
    const conversation = await Conversation.findOne({
      $or: [{ _id: conversationId }, { sessionId }],
    });

    if (!conversation) {
      // If conversation not found, start a new one instead of throwing error
      console.warn(
        `Conversation ${conversationId} not found, starting new conversation for session ${sessionId}`
      );
      return await askQuestion(message, sessionId, null, null);
    }

    return await askQuestion(
      message,
      conversation.sessionId,
      conversation.userIp,
      conversation.userAgent
    );
  } catch (error) {
    console.error("Add message error:", error);
    throw error;
  }
};

// Ask question to AI with specific document context
export const askQuestionWithDocument = async (
  question,
  documentId,
  sessionId,
  userIp,
  userAgent
) => {
  try {
    // Find or create conversation
    let conversation = await Conversation.findOne({ sessionId });

    if (!conversation) {
      conversation = new Conversation({
        sessionId,
        userIp,
        userAgent,
        messages: [],
      });
    }

    // Add user message
    const userMessage = {
      sender: "user",
      text: question,
      timestamp: new Date(),
    };

    conversation.messages.push(userMessage);
    conversation.lastActivity = new Date();

    await conversation.save();

    // Find the document in our database
    const document = await Document.findById(documentId);
    if (!document) {
      throw new Error("Document not found");
    }

    if (document.status !== "indexed") {
      throw new Error("Document is not yet indexed and ready for queries");
    }

    // Check if document has a valid AI pipeline ID (not a mock ID)
    if (!document.aiPipelineId || document.aiPipelineId.startsWith("mock_")) {
      throw new Error(
        "Document was not properly processed by the AI pipeline. Please re-upload the document."
      );
    }

    try {
      const response = await axios.post(
        `${AI_PIPELINE_URL}/api/chat/query`,
        {
          query: question,
          document_id: document.aiPipelineId,
        },
        {
          timeout: 30000,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const botMessage = {
        sender: "bot",
        text: truncateMessage(response.data.response),
        timestamp: new Date(),
        sources: response.data.sources || [],
      };

      conversation.messages.push(botMessage);
      await conversation.save();

      return {
        success: true,
        response: truncateMessage(response.data.response),
        content_type: response.data.content_type || "markdown", // Forward content_type
        sources: response.data.sources || [],
        top_source_suggestions: response.data.top_source_suggestions || [],
        conversationId: conversation._id,
        documentUsed: document.title,
      };
    } catch (aiError) {
      console.error("AI Pipeline error:", aiError);

      const errorMessage = {
        sender: "bot",
        text: "I apologize, but I'm having trouble accessing the document right now. Please try again in a moment.",
        timestamp: new Date(),
      };

      conversation.messages.push(errorMessage);
      await conversation.save();

      return {
        success: true,
        response: errorMessage.text,
        content_type: "markdown", // Add content_type for error responses
        sources: [],
        conversationId: conversation._id,
      };
    }
  } catch (error) {
    console.error("Ask question with document error:", error);
    throw error;
  }
};

// Ask question with multiple documents context (searches across all)
export const askQuestionWithMultipleDocuments = async (
  question,
  documentIds,
  sessionId,
  userIp,
  userAgent
) => {
  try {
    // Find or create conversation
    let conversation = await Conversation.findOne({ sessionId });

    if (!conversation) {
      conversation = new Conversation({
        sessionId,
        userIp,
        userAgent,
        messages: [],
      });
    }

    // Add user message
    const userMessage = {
      sender: "user",
      text: question,
      timestamp: new Date(),
    };

    conversation.messages.push(userMessage);
    conversation.lastActivity = new Date();

    await conversation.save();

    // Find all documents in our database
    const documents = await Document.find({
      _id: { $in: documentIds },
      status: "indexed",
    });

    if (documents.length === 0) {
      throw new Error("No indexed documents found");
    }

    // Filter out documents with mock IDs
    const validDocuments = documents.filter(
      (doc) => doc.aiPipelineId && !doc.aiPipelineId.startsWith("mock_")
    );

    if (validDocuments.length === 0) {
      throw new Error(
        "No documents with valid AI pipeline IDs found. Please re-upload documents."
      );
    }

    try {
      // Call the new multi-document search endpoint
      const response = await axios.post(
        `${AI_PIPELINE_URL}/api/chat/search-multiple`,
        {
          query: question,
          document_ids: validDocuments.map((doc) => doc.aiPipelineId),
        },
        {
          timeout: 30000,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const botMessage = {
        sender: "bot",
        text: truncateMessage(response.data.response),
        timestamp: new Date(),
        sources: response.data.sources || [],
      };

      conversation.messages.push(botMessage);

      try {
        await conversation.save();
      } catch (saveError) {
        if (saveError.name === "ValidationError") {
          console.error(
            "Message validation error, attempting to truncate further:",
            saveError
          );
          // Try with a more aggressive truncation
          botMessage.text = truncateMessage(response.data.response, 5000);
          await conversation.save();
        } else {
          throw saveError;
        }
      }

      return {
        success: true,
        response: truncateMessage(response.data.response),
        content_type: response.data.content_type || "markdown", // Forward content_type
        sources: response.data.sources || [],
        top_source_suggestions: response.data.top_source_suggestions || [],
        conversationId: conversation._id,
        documentsUsed: validDocuments.map((doc) => doc.title),
      };
    } catch (aiError) {
      console.error("AI Pipeline error:", aiError);

      const errorMessage = {
        sender: "bot",
        text: "I apologize, but I'm having trouble searching across the documents right now. Please try again in a moment.",
        timestamp: new Date(),
      };

      conversation.messages.push(errorMessage);
      await conversation.save();

      return {
        success: true,
        response: errorMessage.text,
        content_type: "markdown", // Add content_type for error responses
        sources: [],
        conversationId: conversation._id,
        documentsUsed: [],
      };
    }
  } catch (error) {
    console.error("Ask question with multiple documents error:", error);
    throw error;
  }
};

// Check document processing status from AI pipeline
export const checkDocumentStatus = async (documentId) => {
  try {
    const document = await Document.findById(documentId);
    if (!document) {
      throw new Error("Document not found");
    }

    if (!document.aiPipelineId) {
      return {
        success: true,
        status: document.status,
        message: "Document not yet sent to AI pipeline",
      };
    }

    // Handle mock IDs - don't try to query the AI pipeline
    if (document.aiPipelineId.startsWith("mock_")) {
      return {
        success: true,
        status: document.status,
        message:
          "Document was processed in mock mode. Re-upload with proper API configuration.",
        document: {
          id: document._id,
          title: document.title,
          filename: document.originalName,
          status: document.status,
          uploadedAt: document.uploadDate,
        },
      };
    }

    try {
      const response = await axios.get(
        `${AI_PIPELINE_URL}/api/documents/status/${document.aiPipelineId}`,
        { timeout: 10000 }
      );

      return {
        success: true,
        status: document.status,
        aiPipelineStatus: response.data.message,
        document: {
          id: document._id,
          title: document.title,
          filename: document.originalName,
          status: document.status,
          uploadedAt: document.uploadDate,
        },
      };
    } catch (aiError) {
      console.error("AI Pipeline status check error:", aiError);
      return {
        success: true,
        status: document.status,
        aiPipelineStatus: "Unable to check AI pipeline status",
        document: {
          id: document._id,
          title: document.title,
          filename: document.originalName,
          status: document.status,
          uploadedAt: document.uploadDate,
        },
      };
    }
  } catch (error) {
    console.error("Check document status error:", error);
    throw error;
  }
};

// Delete document from both database and AI pipeline
export const deleteDocument = async (documentId) => {
  try {
    const document = await Document.findById(documentId);
    if (!document) {
      throw new Error("Document not found");
    }

    // Delete from AI pipeline if it has an aiPipelineId (but not if it's a mock ID)
    if (document.aiPipelineId && !document.aiPipelineId.startsWith("mock_")) {
      try {
        await axios.delete(
          `${AI_PIPELINE_URL}/api/documents/${document.aiPipelineId}`,
          { timeout: 10000 }
        );
      } catch (aiError) {
        console.error("AI Pipeline delete error:", aiError);
        // Continue with database deletion even if AI pipeline deletion fails
      }
    }

    // Delete local file if it exists
    if (document.filePath && fs.existsSync(document.filePath)) {
      fs.unlinkSync(document.filePath);
    }

    // Delete from database
    await Document.findByIdAndDelete(documentId);

    return {
      success: true,
      message: "Document deleted successfully",
    };
  } catch (error) {
    console.error("Delete document error:", error);
    throw error;
  }
};

// Webhook endpoint for AI pipeline to update document status
export const updateDocumentStatus = async (
  documentId,
  status,
  aiPipelineId,
  errorMessage = null
) => {
  try {
    const updateData = {
      status,
      lastUpdated: new Date(),
    };

    if (aiPipelineId) {
      updateData.aiPipelineId = aiPipelineId;
    }

    if (errorMessage) {
      updateData.errorMessage = errorMessage;
    }

    const document = await Document.findByIdAndUpdate(documentId, updateData, {
      new: true,
    });

    if (!document) {
      throw new Error("Document not found");
    }

    return { success: true, document };
  } catch (error) {
    console.error("Update document status error:", error);
    throw error;
  }
};

// Clean up documents with mock IDs or failed processing
export const cleanupMockDocuments = async () => {
  try {
    const mockDocuments = await Document.find({
      $or: [
        { aiPipelineId: { $regex: /^mock_/ } },
        { status: "pending_api_key" },
        { status: "failed" },
      ],
    });

    let deletedCount = 0;
    for (const doc of mockDocuments) {
      // Delete local file if it exists
      if (doc.filePath && fs.existsSync(doc.filePath)) {
        try {
          fs.unlinkSync(doc.filePath);
        } catch (fileError) {
          console.error(`Error deleting file ${doc.filePath}:`, fileError);
        }
      }

      // Delete from database
      await Document.findByIdAndDelete(doc._id);
      deletedCount++;
    }

    return {
      success: true,
      message: `Cleaned up ${deletedCount} documents`,
      deletedCount,
    };
  } catch (error) {
    console.error("Cleanup mock documents error:", error);
    throw error;
  }
};
