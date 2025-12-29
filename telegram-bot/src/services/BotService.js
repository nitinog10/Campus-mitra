import { logger } from "../utils/logger.js";
import { rateLimiter } from "../utils/rateLimiter.js";
import { MessageHandler } from "../handlers/MessageHandler.js";
import { CommandHandler } from "../handlers/CommandHandler.js";

export class BotService {
  constructor(bot) {
    this.bot = bot;
    this.messageHandler = new MessageHandler();
    this.commandHandler = new CommandHandler(this.messageHandler);

    this.setupEventHandlers();
    logger.info("BotService initialized");
  }

  setupEventHandlers() {
    // Handle text messages
    this.bot.on("message", async (msg) => {
      try {
        await this.handleMessage(msg);
      } catch (error) {
        logger.error("Error handling message:", error);
      }
    });

    // Handle callback queries (inline button clicks)
    this.bot.on("callback_query", async (callbackQuery) => {
      try {
        await this.messageHandler.handleCallbackQuery(this.bot, callbackQuery);
      } catch (error) {
        logger.error("Error handling callback query:", error);
      }
    });

    // Handle new chat members (when bot is added to groups)
    this.bot.on("new_chat_members", async (msg) => {
      const newMembers = msg.new_chat_members;
      const botInfo = await this.bot.getMe();

      // Check if the bot was added
      if (newMembers.some((member) => member.id === botInfo.id)) {
        await this.handleBotAddedToGroup(msg);
      }
    });

    logger.info("Event handlers set up");
  }

  async handleMessage(msg) {
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const messageText = msg.text;

    // Log message info
    logger.info("Message received:", {
      userId,
      chatId,
      messageType: msg.chat.type,
      hasText: !!messageText,
    });

    // Skip if no text (photos, stickers, etc.)
    if (!messageText) {
      await this.bot.sendMessage(
        chatId,
        "📝 Please send me a text message with your question. I can't process images, stickers, or other media yet."
      );
      return;
    }

    // Handle group messages (only respond when mentioned)
    if (msg.chat.type === "group" || msg.chat.type === "supergroup") {
      if (!this.isBotMentioned(msg)) {
        return; // Don't respond to group messages unless mentioned
      }
    }

    // Check rate limiting
    const rateLimitResult = rateLimiter.isAllowed(userId);
    if (!rateLimitResult.allowed) {
      await this.bot.sendMessage(
        chatId,
        `⏱️ You've reached the rate limit. Please wait ${rateLimitResult.resetInSeconds} seconds before sending another message.`
      );
      return;
    }

    // Handle commands
    if (messageText.startsWith("/")) {
      await this.handleCommand(msg);
      return;
    }

    // Handle regular text messages
    await this.messageHandler.handleTextMessage(this.bot, msg);
  }

  async handleCommand(msg) {
    const command = msg.text.split(" ")[0].toLowerCase();

    switch (command) {
      case "/start":
        await this.commandHandler.handleStartCommand(this.bot, msg);
        break;

      case "/help":
        await this.commandHandler.handleHelpCommand(this.bot, msg);
        break;

      case "/clear":
        await this.commandHandler.handleClearCommand(this.bot, msg);
        break;

      case "/about":
        await this.commandHandler.handleAboutCommand(this.bot, msg);
        break;

      default:
        await this.commandHandler.handleUnknownCommand(this.bot, msg);
        break;
    }
  }

  async handleBotAddedToGroup(msg) {
    const chatId = msg.chat.id;
    const groupName = msg.chat.title || "this group";

    const groupWelcomeMessage = `🎓 *Hello ${groupName}!*

I'm CampusMitra, your campus assistant! I'm here to help answer questions about your campus.

*In groups, mention me (@campusmitra_bot) to ask questions:*
• @campusmitra_bot What are the admission requirements?
• @campusmitra_bot Tell me about hostel facilities

*Or use commands:*
• /help - Show available commands
• /about - Learn more about me

Let's make campus life easier together! 🚀`;

    try {
      await this.bot.sendMessage(chatId, groupWelcomeMessage, {
        parse_mode: "Markdown",
      });

      logger.info(`Bot added to group: ${groupName} (${chatId})`);
    } catch (error) {
      logger.error("Error sending group welcome message:", error);
    }
  }

  isBotMentioned(msg) {
    const messageText = msg.text;
    const entities = msg.entities || [];

    // Check for @mention in entities
    const mentions = entities.filter((entity) => entity.type === "mention");
    if (mentions.length > 0) {
      return true;
    }

    // Check for bot mention in text (as fallback)
    return (
      messageText.includes("@campusmitra") ||
      messageText.includes("CampusMitra") ||
      msg.reply_to_message?.from?.is_bot
    ); // If replying to bot message
  }

  // Utility method to broadcast message to all users (admin only)
  async broadcastMessage(message, adminUserId) {
    // This would require storing user IDs in a database
    // For now, just log the attempt
    logger.info(`Broadcast message requested by ${adminUserId}: ${message}`);

    // In production, implement with database:
    // const users = await getUserIds();
    // for (const userId of users) {
    //   try {
    //     await this.bot.sendMessage(userId, message);
    //   } catch (error) {
    //     // Handle blocked users, etc.
    //   }
    // }
  }

  // Get bot statistics
  getStats() {
    return {
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      rateLimitedUsers: rateLimiter.requests.size,
      activeConversations: this.messageHandler.userConversations.size,
    };
  }
}
