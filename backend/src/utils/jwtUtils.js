import jwt from "jsonwebtoken";

// Use a secure secret - in production, this should be a long, random string
const JWT_SECRET =
  process.env.JWT_SECRET ||
  "campusmitra_jwt_secret_key_2024_very_secure_random_string";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

export const generateToken = (payload) => {
  try {
    return jwt.sign(payload, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
      issuer: "campusmitra-api",
      audience: "campusmitra-frontend",
    });
  } catch (error) {
    throw new Error("Token generation failed");
  }
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET, {
      issuer: "campusmitra-api",
      audience: "campusmitra-frontend",
    });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new Error("Token has expired");
    } else if (error.name === "JsonWebTokenError") {
      throw new Error("Invalid token");
    } else {
      throw new Error("Token verification failed");
    }
  }
};

export const decodeToken = (token) => {
  try {
    return jwt.decode(token);
  } catch (error) {
    throw new Error("Token decode failed");
  }
};
