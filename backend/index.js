// Entry point for Express backend
import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import connectDB from "./src/config/database.js";
import apiRoutes from "./src/routes/index.js";
import { apiLimiter } from "./src/middleware/rateLimiter.js";

// Load environment variables
dotenv.config({ quiet: true });

const app = express();
const PORT = process.env.PORT || 3001;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

// Initialize database connection
connectDB();

// Security middleware
app.use(helmet());

// CORS configuration - only allow requests from frontend
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Session-ID"],
  })
);

// Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Apply rate limiting to all API routes
app.use("/api", apiLimiter);

// API routes
app.use("/api", apiRoutes);

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    message: "CampusMitra Express Backend is running!",
    version: "1.0.0",
    endpoints: {
      health: "/api/health",
      login: "/api/auth/login",
      announcements: "/api/documents/announcements",
      upload: "/api/documents/upload",
      ask: "/api/chat/ask",
    },
  });
});

// 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Endpoint ${req.method} ${req.url} not found`,
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error("Unhandled error:", error);
  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

app.listen(PORT, () => {
  console.log(`CampusMitra server ready on port ${PORT}`);
});
