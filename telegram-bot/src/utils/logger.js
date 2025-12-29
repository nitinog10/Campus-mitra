// Simple logger utility for the Telegram bot
const LOG_LEVELS = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
};

class Logger {
  constructor() {
    this.level = process.env.LOG_LEVEL || "info";
    this.levelNum = LOG_LEVELS[this.level] || LOG_LEVELS.info;
  }

  formatMessage(level, message, meta = {}) {
    const timestamp = new Date().toISOString();
    const metaStr = Object.keys(meta).length ? JSON.stringify(meta) : "";
    return `${timestamp} [${level.toUpperCase()}]: ${message} ${metaStr}`;
  }

  log(level, message, meta = {}) {
    if (LOG_LEVELS[level] <= this.levelNum) {
      console.log(this.formatMessage(level, message, meta));
    }
  }

  error(message, meta = {}) {
    this.log("error", message, meta);
  }

  warn(message, meta = {}) {
    this.log("warn", message, meta);
  }

  info(message, meta = {}) {
    this.log("info", message, meta);
  }

  debug(message, meta = {}) {
    this.log("debug", message, meta);
  }
}

export const logger = new Logger();
