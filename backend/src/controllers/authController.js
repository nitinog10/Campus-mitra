import { authenticateAdmin } from '../services/authService.js';
import { body, validationResult } from 'express-validator';

// Validation rules for login
export const validateLogin = [
  body('username')
    .trim()
    .notEmpty()
    .withMessage('Username is required')
    .isLength({ min: 3, max: 50 })
    .withMessage('Username must be between 3 and 50 characters'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
];

// Login controller
export const login = async (req, res) => {
  try {
    // Check validation results
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { username, password } = req.body;
    
    const authResult = await authenticateAdmin(username, password);
    
    if (authResult.success) {
      res.status(200).json({
        success: true,
        message: 'Login successful',
        user: authResult.user,
        token: authResult.token
      });
    } else {
      res.status(401).json({
        success: false,
        message: authResult.message
      });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login'
    });
  }
};
