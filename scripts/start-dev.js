#!/usr/bin/env node

/**
 * Cross-platform staggered startup script for CampusMitra
 * Works on Windows, macOS, and Linux
 */
const { spawn } = require("child_process");
const path = require("path");

// Configuration
const STARTUP_DELAY = 4000; // 2 seconds between each service
const services = [
  {
    name: "Backend",
    command: "yarn",
    args: ["workspace", "backend", "run", "dev"],
    color: "\x1b[32m", // Green
  },
  {
    name: "AI Pipeline",
    command: "yarn",
    args: ["workspace", "ai_pipeline", "run", "dev"],
    color: "\x1b[34m", // Blue
  },
  {
    name: "Frontend",
    command: "yarn",
    args: ["workspace", "frontend", "run", "dev"],
    color: "\x1b[35m", // Magenta
  },
  {
    name: "Telegram Bot",
    command: "yarn",
    args: ["workspace", "telegram-bot", "run", "dev"],
    color: "\x1b[36m", // Cyan
  },
];

// ANSI color codes
const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  cyan: "\x1b[36m",
};

class StaggeredStartup {
  constructor() {
    this.processes = [];
    this.isShuttingDown = false;
    this.setupSignalHandlers();
  }

  log(message, color = colors.reset) {
    const timestamp = new Date().toLocaleTimeString();
    console.log(`${color}[${timestamp}] ${message}${colors.reset}`);
  }

  setupSignalHandlers() {
    // Handle Ctrl+C and other termination signals
    ["SIGINT", "SIGTERM", "SIGQUIT"].forEach((signal) => {
      process.on(signal, () => {
        if (!this.isShuttingDown) {
          this.log(
            `\nReceived ${signal}, shutting down gracefully...`,
            colors.yellow
          );
          this.shutdown();
        }
      });
    });

    // Handle uncaught exceptions
    process.on("uncaughtException", (error) => {
      this.log(`Uncaught Exception: ${error.message}`, colors.red);
      this.shutdown();
    });

    process.on("unhandledRejection", (reason) => {
      this.log(`Unhandled Rejection: ${reason}`, colors.red);
      this.shutdown();
    });
  }

  async sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async startService(service, index) {
    return new Promise((resolve) => {
      this.log(`Starting ${service.name}...`, service.color);

      const child = spawn(service.command, service.args, {
        stdio: ["inherit", "pipe", "pipe"],
        shell: true,
        cwd: process.cwd(),
      });

      // Store process reference
      this.processes.push({
        name: service.name,
        process: child,
        color: service.color,
      });

      // Handle stdout
      child.stdout.on("data", (data) => {
        const output = data.toString().trim();
        if (output) {
          this.log(`[${service.name}] ${output}`, service.color);
        }
      });

      // Handle stderr - but treat uvicorn INFO messages differently
      child.stderr.on("data", (data) => {
        const message = data.toString().trim();
        if (message) {
          // Check if it's a uvicorn INFO message (not actually an error)
          if (
            message.includes("INFO:") ||
            message.includes("Uvicorn running") ||
            message.includes("Will watch for changes")
          ) {
            this.log(`[${service.name}] ${message}`, service.color);
          } else {
            this.log(`[${service.name}] ERROR: ${message}`, colors.red);
          }
        }
      });

      // Handle process exit
      child.on("exit", (code, signal) => {
        if (!this.isShuttingDown) {
          if (code !== 0) {
            this.log(`${service.name} exited with code ${code}`, colors.red);
          } else {
            this.log(`${service.name} stopped`, colors.yellow);
          }
        }
      });

      child.on("error", (error) => {
        this.log(
          `Failed to start ${service.name}: ${error.message}`,
          colors.red
        );
      });

      // Resolve immediately to continue with next service
      resolve();
    });
  }

  async start() {
    this.log("🚀 Starting CampusMitra services...", colors.bright);
    this.log(
      `Delay between services: ${STARTUP_DELAY / 1000} seconds`,
      colors.cyan
    );

    for (let i = 0; i < services.length; i++) {
      const service = services[i];

      // Start the service
      await this.startService(service, i);

      // Wait before starting next service (except for the last one)
      if (i < services.length - 1) {
        this.log(
          `Waiting ${
            STARTUP_DELAY / 1000
          } seconds before starting next service...`,
          colors.cyan
        );
        await this.sleep(STARTUP_DELAY);
      }
    }

    this.log("✅ All services started!", colors.bright);
    this.log("Press Ctrl+C to stop all services", colors.yellow);
  }

  shutdown() {
    if (this.isShuttingDown) return;
    this.isShuttingDown = true;

    this.log("Stopping all services...", colors.yellow);

    // Kill all child processes
    this.processes.forEach(({ name, process, color }) => {
      if (process && !process.killed) {
        this.log(`Stopping ${name}...`, color);

        // Try graceful shutdown first
        process.kill("SIGTERM");

        // Force kill after 5 seconds if still running
        setTimeout(() => {
          if (!process.killed) {
            this.log(`Force killing ${name}...`, colors.red);
            process.kill("SIGKILL");
          }
        }, 5000);
      }
    });

    // Exit after a short delay
    setTimeout(() => {
      this.log("Goodbye! 👋", colors.bright);
      process.exit(0);
    }, 2000);
  }
}

// Start the application
const startup = new StaggeredStartup();
startup.start().catch((error) => {
  console.error("Failed to start services:", error);
  process.exit(1);
});
