import { AdminUser } from "../models/index.js";
import { generateToken, verifyToken } from "../utils/jwtUtils.js";

// Create default admin user if it doesn't exist
export const createDefaultAdmin = async () => {
  try {
    const existingAdmin = await AdminUser.findOne({ username: "admin" });

    if (!existingAdmin) {
      const defaultAdmin = new AdminUser({
        username: "admin",
        password: "password", // This will be hashed automatically by the pre-save hook
      });

      await defaultAdmin.save();
    }
  } catch (error) {
    console.error("Error creating default admin:", error);
  }
};

// Authenticate admin user
export const authenticateAdmin = async (username, password) => {
  try {
    // Find user by username
    const user = await AdminUser.findOne({ username }).select("+password");

    if (!user) {
      return {
        success: false,
        message: "Invalid credentials",
      };
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return {
        success: false,
        message: "Invalid credentials",
      };
    }

    // Generate JWT token
    const token = generateToken({
      userId: user._id,
      username: user.username,
      role: "administrator",
    });

    // Return success response without password
    return {
      success: true,
      user: {
        id: user._id,
        username: user.username,
        role: "administrator",
        createdAt: user.createdAt,
        loginAt: new Date().toISOString(),
      },
      token,
    };
  } catch (error) {
    console.error("Authentication error:", error);
    return {
      success: false,
      message: "Authentication failed",
    };
  }
};

// Validate JWT token
export const validateToken = async (token) => {
  try {
    const decoded = verifyToken(token);

    // Verify user still exists
    const user = await AdminUser.findById(decoded.userId);

    if (!user) {
      return {
        success: false,
        message: "User not found",
      };
    }

    return {
      success: true,
      user: {
        id: user._id,
        username: user.username,
        role: "administrator",
      },
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || "Invalid token",
    };
  }
};

// Get user by ID
export const getUserById = async (userId) => {
  try {
    const user = await AdminUser.findById(userId);
    return user;
  } catch (error) {
    throw new Error("User not found");
  }
};
