/**
 * Authentication Routes
 */

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticateToken } = require('../middleware/auth');

/**
 * Public Routes
 */

// POST /api/auth/signup
router.post('/signup', authController.signup);

// POST /api/auth/login
router.post('/login', authController.login);

// POST /api/auth/verify
router.post('/verify', authController.verifyTokenRoute);

/**
 * Protected Routes
 */

// GET /api/auth/profile
router.get('/profile', authenticateToken, authController.getProfile);

module.exports = router;
