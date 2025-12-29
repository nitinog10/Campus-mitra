import { logger } from "../utils/logger.js";
import { apiClient } from "../services/ApiClient.js";

export class MessageHandler {
  constructor() {
    this.userConversations = new Map(); // userId -> conversationId
  }

  async handleTextMessage(bot, msg) {
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const messageText = msg.text;

    logger.info("Received message:", {
      userId,
      chatId,
      messageText: messageText.substring(0, 100),
    });

    try {
      // Send typing indicator
      await bot.sendChatAction(chatId, "typing");

      // Get or create conversation for this user
      const conversationId = this.userConversations.get(userId);

      // Call the backend API
      const response = await apiClient.askQuestion(
        messageText,
        conversationId,
        userId,
        chatId
      );

      // Update conversation ID
      if (response.conversationId) {
        this.userConversations.set(userId, response.conversationId);
      }

      // Format and send response
      await this.sendFormattedResponse(bot, chatId, response);
    } catch (error) {
      logger.error("Error handling message:", error);

      await bot.sendMessage(
        chatId,
        "❌ Sorry, I encountered an error while processing your request. Please try again later.",
        { parse_mode: "Markdown" }
      );
    }
  }

  async sendFormattedResponse(bot, chatId, response) {
    const { response: botResponse, sources, topSourceSuggestions } = response;

    // Clean and format the response for Telegram
    const cleanedResponse = this.formatResponseForTelegram(botResponse);

    // Send main response
    await bot.sendMessage(chatId, cleanedResponse, {
      parse_mode: "Markdown",
      disable_web_page_preview: true,
    });

    // Send source suggestions if available
    if (topSourceSuggestions && topSourceSuggestions.length > 0) {
      await this.sendSourceSuggestions(bot, chatId, topSourceSuggestions);
    }
  }

  formatResponseForTelegram(text) {
    // Remove template markers and clean up the response
    let cleaned = text
      .replace(/### YOUR RESPONSE ###/g, "")
      .replace(/### SUGGESTED QUESTIONS ###/g, "")
      .replace(/\[Title: SUGGESTED QUESTIONS:\]/g, "")
      .replace(
        /\[Provide your response here, following the formatting guidelines above\]/g,
        ""
      )
      .replace(/\(Source: PDF CONTENT, Page: -\)/g, "")
      .replace(/###/g, "")
      .trim();

    // Fix Telegram markdown formatting
    cleaned = cleaned
      .replace(/\*\*(.*?)\*\*/g, "*$1*") // Convert **bold** to *bold* for Telegram
      .replace(/__(.*?)__/g, "_$1_") // Convert __italic__ to _italic_ for Telegram
      .replace(/`([^`]+)`/g, "`$1`"); // Keep code formatting

    return cleaned;
  }

  async sendSourceSuggestions(bot, chatId, suggestions) {
    try {
      if (!suggestions || suggestions.length === 0) {
        return;
      }

      const validSuggestions = suggestions
        .filter((s) => s && s.trim())
        .slice(0, 3);

      if (validSuggestions.length === 0) {
        return;
      }

      const timestamp = Date.now();
      const keyboard = {
        inline_keyboard: validSuggestions.map((suggestion, index) => [
          {
            text: `💡 ${suggestion.substring(0, 60)}${
              suggestion.length > 60 ? "..." : ""
            }`,
            callback_data: `suggest_${index}_${timestamp}`,
          },
        ]),
      };

      // Store suggestions for callback handling with timestamp
      this.storeSuggestions(chatId, validSuggestions, timestamp);

      await bot.sendMessage(
        chatId,
        "🔍 *Related topics you might want to explore:*",
        {
          parse_mode: "Markdown",
          reply_markup: keyboard,
        }
      );
    } catch (error) {
      logger.error("Error sending source suggestions:", error);
    }
  }

  async sendSourcesInfo(bot, chatId, sources) {
    try {
      if (!sources || sources.length === 0) {
        return;
      }

      const sourceText = sources
        .slice(0, 5)
        .map((source, index) => {
          const filename =
            source.filename || source.title || "Unknown Document";
          const page = source.page || "?";
          const relevance = source.relevance_score
            ? ` (${Math.round(source.relevance_score * 100)}% relevant)`
            : "";
          return `📄 ${filename} (Page ${page})${relevance}`;
        })
        .join("\n");

      await bot.sendMessage(chatId, `📚 *Sources used:*\n${sourceText}`, {
        parse_mode: "Markdown",
      });
    } catch (error) {
      logger.error("Error sending sources info:", error);
    }
  }

  storeSuggestions(chatId, suggestions, timestamp) {
    // Store suggestions temporarily for callback handling
    // In production, you might want to use Redis or a database
    if (!global.tempSuggestions) {
      global.tempSuggestions = new Map();
    }

    const key = `${chatId}_${timestamp}`;
    global.tempSuggestions.set(key, suggestions);

    // Clean up after 2 minutes to prevent timeout issues
    setTimeout(() => {
      global.tempSuggestions.delete(key);
    }, 2 * 60 * 1000);
  }

  async handleCallbackQuery(bot, callbackQuery) {
    const chatId = callbackQuery.message.chat.id;
    const data = callbackQuery.data;

    try {
      // Answer the callback query immediately to prevent timeout
      await bot.answerCallbackQuery(callbackQuery.id);

      if (data.startsWith("suggest_")) {
        const parts = data.split("_");
        const index = parseInt(parts[1]);
        const timestamp = parts[2];

        const key = `${chatId}_${timestamp}`;
        const suggestions = global.tempSuggestions?.get(key);

        if (suggestions && suggestions[index]) {
          const suggestionText = suggestions[index];

          // Create a fake message object as if the user sent this question
          const fakeMessage = {
            chat: { id: chatId, type: "private" },
            from: callbackQuery.from,
            text: suggestionText,
            message_id: Date.now(),
          };

          // Process this as if it's a new user message
          await this.handleTextMessage(bot, fakeMessage);

          // Clean up this suggestion set after use
          global.tempSuggestions.delete(key);
        } else {
          // Suggestion expired or not found
          await bot.sendMessage(
            chatId,
            "⏰ This suggestion has expired. Please ask your question directly."
          );
        }
      }
    } catch (error) {
      logger.error("Error handling callback query:", error);
      // Try to answer callback query even on error to prevent timeout
      try {
        await bot.answerCallbackQuery(callbackQuery.id, {
          text: "Sorry, something went wrong.",
          show_alert: false,
        });
      } catch (answerError) {
        logger.error("Failed to answer callback query:", answerError);
      }
    }
  }

  clearUserConversation(userId) {
    this.userConversations.delete(userId);
    logger.info(`Cleared conversation for user ${userId}`);
  }
}
