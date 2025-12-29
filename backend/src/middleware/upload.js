import multer from "multer";
import path from "path";

// Configuration from environment variables
const MAX_FILE_SIZE_MB = parseInt(process.env.MAX_FILE_SIZE_MB) || 20;
const ALLOWED_FILE_TYPES = process.env.ALLOWED_FILE_TYPES?.split(",") || [
  "pdf",
];

// Configure multer for file uploads
const storage = multer.memoryStorage(); // Store files in memory for processing

// File filter to allow only specific file types
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = {
    pdf: "application/pdf",
  };

  const allowedTypes = ALLOWED_FILE_TYPES.map(
    (type) => allowedMimeTypes[type]
  ).filter(Boolean);

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    const allowedExtensions = ALLOWED_FILE_TYPES.join(", ").toUpperCase();
    cb(
      new Error(
        `Invalid file type. Only ${allowedExtensions} files are allowed.`
      ),
      false
    );
  }
};

// Configure multer upload
export const upload = multer({
  storage: storage,
  limits: {
    fileSize: MAX_FILE_SIZE_MB * 1024 * 1024, // Convert MB to bytes
  },
  fileFilter: fileFilter,
});

// Error handling middleware for multer
export const handleUploadError = (error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        success: false,
        message: "File too large. Maximum size is 10MB.",
      });
    }
    return res.status(400).json({
      success: false,
      message: `Upload error: ${error.message}`,
    });
  } else if (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
  next();
};
