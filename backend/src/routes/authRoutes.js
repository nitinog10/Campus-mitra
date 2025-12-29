import express from 'express';
import { login, validateLogin } from '../controllers/authController.js';
import { authLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

// POST /api/auth/login - Admin login
router.post('/login', authLimiter, validateLogin, login);

export default router;
