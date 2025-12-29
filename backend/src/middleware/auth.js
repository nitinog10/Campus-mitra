import { validateToken } from "../services/authService.js";

// Middleware to authenticate admin requests
export const authenticateAdmin = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No valid authorization header provided.",
      });
    }

    const token = authHeader.replace("Bearer ", "");

    const validation = await validateToken(token);

    if (!validation.success) {
      return res.status(401).json({
        success: false,
        message: validation.message || "Access denied. Invalid token.",
      });
    }

    // Add user info to request object
    req.user = validation.user;
    next();
  } catch (error) {
    console.error("Authentication middleware error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during authentication",
    });
  }
};

// Optional middleware for public endpoints that might need user context
export const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.replace("Bearer ", "");
      const validation = await validateToken(token);

      if (validation.success) {
        req.user = validation.user;
      }
    }

    next();
  } catch (error) {
    // For optional auth, we don't fail the request
    next();
  }
};
