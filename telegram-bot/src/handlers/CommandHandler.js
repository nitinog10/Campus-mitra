import { logger } from "../utils/logger.js";
import { apiClient } from "../services/ApiClient.js";

export class CommandHandler {
  constructor(messageHandler) {
    this.messageHandler = messageHandler;
  }

  async handleStartCommand(bot, msg) {
    const chatId = msg.chat.id;
    const userFirstName = msg.from.first_name || "there";

    const welcomeMessage = `🎓 *Welcome to CampusMitra, ${userFirstName}!*

I'm your intelligent campus assistant, here to help you with:

• 📚 Academic information and course details
• 🏢 Campus facilities and services  
• 📝 Admission requirements and procedures
• 💰 Fee structures and scholarships
• 🏠 Hostel and accommodation info
• ⚡ Quick answers from uploaded documents

Just type your question and I'll help you find the answer!

*Example questions:*
• "What are the admission requirements?"
• "Tell me about hostel facilities"
• "What courses are available?"

Type /help for more commands.`;

    try {
      await bot.sendMessage(chatId, welcomeMessage, {
        parse_mode: "Markdown",
        disable_web_page_preview: true,
      });

      logger.info(`Sent welcome message to user ${msg.from.id}`);
    } catch (error) {
      logger.error("Error sending welcome message:", error);
    }
  }

  async handleHelpCommand(bot, msg) {
    const chatId = msg.chat.id;

    const helpMessage = `🆘 *CampusMitra Help*

*Available Commands:*
/start - Start the bot and see welcome message
/help - Show this help information  
/clear - Clear your conversation history
/about - Learn more about CampusMitra

*How to use:*
1️⃣ Just type your question in plain English
2️⃣ I'll search through campus documents and knowledge base
3️⃣ Click on suggested topics for follow-up questions

*Tips:*
• Be specific in your questions for better results
• Use keywords like "admission", "fees", "courses", etc.
• Ask follow-up questions to get more detailed information

*Examples:*
• "What are the engineering course fees?"
• "How do I apply for a scholarship?"
• "Tell me about campus hostels"

Need human help? Contact your campus administration directly.`;

    try {
      await bot.sendMessage(chatId, helpMessage, {
        parse_mode: "Markdown",
        disable_web_page_preview: true,
      });

      logger.info(`Sent help message to user ${msg.from.id}`);
    } catch (error) {
      logger.error("Error sending help message:", error);
    }
  }

  async handleClearCommand(bot, msg) {
    const chatId = msg.chat.id;
    const userId = msg.from.id;

    try {
      // Clear user's conversation
      this.messageHandler.clearUserConversation(userId);

      await bot.sendMessage(
        chatId,
        "🧹 *Conversation cleared!*\n\nYour chat history has been reset. You can start a fresh conversation now.",
        { parse_mode: "Markdown" }
      );

      logger.info(`Cleared conversation for user ${userId}`);
    } catch (error) {
      logger.error("Error clearing conversation:", error);
      await bot.sendMessage(
        chatId,
        "❌ Sorry, I couldn't clear your conversation. Please try again."
      );
    }
  }

  async handleAboutCommand(bot, msg) {
    const chatId = msg.chat.id;

    const aboutMessage = `🤖 *About CampusMitra*

CampusMitra is an AI-powered campus assistant designed to help students, faculty, and visitors get quick answers to their campus-related questions.

*Features:*
🔍 Smart document search across campus resources
💬 Natural language conversation interface  
📱 Available 24/7 via Telegram
🎯 Context-aware responses with source citations
⚡ Fast and accurate information retrieval

*Technology:*
• Powered by advanced AI and natural language processing
• RAG (Retrieval-Augmented Generation) for accurate responses
• Integration with campus document repositories
• Secure and privacy-focused design

*Privacy:*
• We don't store personal information
• Conversations are used only to provide better assistance
• No data is shared with third parties

*Version:* 1.0.0
*Support:* Contact your campus IT support for technical issues

Made with ❤️ for better campus experience.`;

    try {
      await bot.sendMessage(chatId, aboutMessage, {
        parse_mode: "Markdown",
        disable_web_page_preview: true,
      });

      logger.info(`Sent about message to user ${msg.from.id}`);
    } catch (error) {
      logger.error("Error sending about message:", error);
    }
  }

  async handleUnknownCommand(bot, msg) {
    const chatId = msg.chat.id;
    const command = msg.text;

    const errorMessage = `❓ Unknown command: \`${command}\`

Type /help to see available commands, or just ask me a question directly!`;

    try {
      await bot.sendMessage(chatId, errorMessage, {
        parse_mode: "Markdown",
      });

      logger.info(
        `Sent unknown command message to user ${msg.from.id} for command ${command}`
      );
    } catch (error) {
      logger.error("Error sending unknown command message:", error);
    }
  }
}
