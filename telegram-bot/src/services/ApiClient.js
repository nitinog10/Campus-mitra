import axios from "axios";
import { logger } from "../utils/logger.js";

class ApiClient {
  constructor() {
    this.baseURL = process.env.BACKEND_API_URL || "http://localhost:3001";
    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "CampusMitra-TelegramBot/1.0",
      },
    });

    // Add request interceptor for logging
    this.client.interceptors.request.use(
      (config) => {
        logger.debug("API Request:", {
          method: config.method,
          url: config.url,
          data: config.data,
        });
        return config;
      },
      (error) => {
        logger.error("API Request Error:", error);
        return Promise.reject(error);
      }
    );

    // Add response interceptor for logging
    this.client.interceptors.response.use(
      (response) => {
        logger.debug("API Response:", {
          status: response.status,
          url: response.config.url,
        });
        return response;
      },
      (error) => {
        logger.error("API Response Error:", {
          status: error.response?.status,
          message: error.message,
          url: error.config?.url,
        });
        return Promise.reject(error);
      }
    );
  }

  async askQuestion(
    question,
    conversationId = null,
    userId = null,
    chatId = null
  ) {
    try {
      const payload = {
        question: question.trim(),
        conversationId,
        telegramUserId: userId,
        telegramChatId: chatId,
      };

      const response = await this.client.post("/api/telegram/ask", payload);
      return response.data;
    } catch (error) {
      logger.error("Error asking question:", error);
      throw this.handleApiError(error);
    }
  }

  async askAboutDocument(
    question,
    documentId,
    conversationId = null,
    userId = null,
    chatId = null
  ) {
    try {
      const payload = {
        question: question.trim(),
        documentId,
        conversationId,
        telegramUserId: userId,
        telegramChatId: chatId,
      };

      const response = await this.client.post(
        "/api/telegram/ask-document",
        payload
      );
      return response.data;
    } catch (error) {
      logger.error("Error asking about document:", error);
      throw this.handleApiError(error);
    }
  }

  async getDocuments() {
    try {
      const response = await this.client.get("/api/documents");
      return response.data;
    } catch (error) {
      logger.error("Error getting documents:", error);
      throw this.handleApiError(error);
    }
  }

  async healthCheck() {
    try {
      const response = await this.client.get("/api/telegram/health");
      return response.data;
    } catch (error) {
      logger.error("Health check failed:", error);
      throw this.handleApiError(error);
    }
  }

  handleApiError(error) {
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      return new Error(
        `API Error (${status}): ${data.message || "Unknown error"}`
      );
    } else if (error.request) {
      // Request was made but no response received
      return new Error(
        "Backend server is not responding. Please try again later."
      );
    } else {
      // Something else happened
      return new Error(`Request failed: ${error.message}`);
    }
  }
}

export const apiClient = new ApiClient();
