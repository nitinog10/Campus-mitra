import express from "express";
import authRoutes from "./authRoutes.js";
import documentRoutes from "./documentRoutes.js";
import chatRoutes from "./chatRoutes.js";
import telegramRoutes from "./telegramRoutes.js";

const router = express.Router();

// Mount route modules
router.use("/auth", authRoutes);
router.use("/documents", documentRoutes);
router.use("/chat", chatRoutes);
router.use("/telegram", telegramRoutes);

// Health check endpoint
router.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "CampusMitra API is running",
    timestamp: new Date().toISOString(),
  });
});

export default router;
