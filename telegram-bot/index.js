import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
import { BotService } from "./src/services/BotService.js";
import { logger } from "./src/utils/logger.js";

// Load environment variables
dotenv.config();

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

if (!BOT_TOKEN) {
  logger.error("TELEGRAM_BOT_TOKEN is required");
  process.exit(1);
}

// Create bot instance
const bot = new TelegramBot(BOT_TOKEN, { polling: true });

// Initialize bot service
const botService = new BotService(bot);

// Handle bot startup
bot.on("polling_error", (error) => {
  logger.error("Polling error:", error);
});

bot.on("error", (error) => {
  logger.error("Bot error:", error);
});

// Start the bot
async function startBot() {
  try {
    const botInfo = await bot.getMe();
    logger.info(`🤖 Bot started: @${botInfo.username}`);
    logger.info("Bot is running and ready to receive messages...");

    // Set bot commands
    await bot.setMyCommands([
      {
        command: "start",
        description: "Start the bot and see welcome message",
      },
      { command: "help", description: "Show help information" },
      { command: "clear", description: "Clear conversation history" },
      { command: "about", description: "About CampusMitra" },
    ]);
  } catch (error) {
    logger.error("Failed to start bot:", error);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on("SIGTERM", () => {
  logger.info("Received SIGTERM, shutting down gracefully");
  bot.stopPolling();
  process.exit(0);
});

process.on("SIGINT", () => {
  logger.info("Received SIGINT, shutting down gracefully");
  bot.stopPolling();
  process.exit(0);
});

// Start the bot
startBot();
