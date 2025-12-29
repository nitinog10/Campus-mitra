import api from "./client.js";

// Authentication API functions
export const authAPI = {
  // Login admin
  login: async (credentials) => {
    try {
      const response = await api.post("/auth/login", credentials);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Login failed" };
    }
  },
};

// Document API functions
export const documentAPI = {
  // Get all announcements/documents
  getAnnouncements: async () => {
    try {
      const response = await api.get("/documents/announcements");
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to fetch documents" };
    }
  },

  // Upload new document
  uploadDocument: async (formData) => {
    try {
      const response = await api.post("/documents/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Upload failed" };
    }
  },

  // View document
  viewDocument: async (id) => {
    try {
      const response = await api.get(`/documents/${id}/view`, {
        responseType: "blob",
      });
      return response;
    } catch (error) {
      throw error.response?.data || { message: "Failed to view document" };
    }
  },

  // Delete document
  deleteDocument: async (id) => {
    try {
      const response = await api.delete(`/documents/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to delete document" };
    }
  },

  // Get document status
  getDocumentStatus: async (id) => {
    try {
      const response = await api.get(`/documents/${id}/status`);
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || { message: "Failed to get document status" }
      );
    }
  },
};

// Chat API functions
export const chatAPI = {
  // Ask a question with conversation tracking
  askQuestion: async (question, conversationId = null) => {
    try {
      const sessionId =
        sessionStorage.getItem("sessionId") ||
        `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem("sessionId", sessionId);

      const response = await api.post(
        "/chat/ask",
        {
          question,
          conversationId,
        },
        {
          headers: {
            "X-Session-ID": sessionId,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Chat API Error details:", {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message,
        config: error.config?.url,
      });
      throw (
        error.response?.data || {
          message: "Failed to get response",
          status: error.response?.status,
          details: error.message,
        }
      );
    }
  },

  // Ask a question about a specific document
  askAboutDocument: async (question, documentId, conversationId = null) => {
    try {
      const sessionId =
        sessionStorage.getItem("sessionId") ||
        `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem("sessionId", sessionId);

      const response = await api.post(
        "/chat/ask-document",
        {
          question,
          documentId,
          conversationId,
        },
        {
          headers: {
            "X-Session-ID": sessionId,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to get response" };
    }
  },

  // Get all conversations (admin only)
  getConversations: async (page = 1, limit = 20) => {
    try {
      const response = await api.get(
        `/chat/conversations?page=${page}&limit=${limit}`
      );
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || { message: "Failed to fetch conversations" }
      );
    }
  },

  // Get specific conversation (admin only)
  getConversation: async (id) => {
    try {
      const response = await api.get(`/chat/conversations/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to fetch conversation" };
    }
  },

  // Delete conversation (admin only)
  deleteConversation: async (id) => {
    try {
      const response = await api.delete(`/chat/conversations/${id}`);
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || { message: "Failed to delete conversation" }
      );
    }
  },
};
