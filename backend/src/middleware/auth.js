/**
 * Authentication Middleware
 * Verifies JWT tokens and protects routes
 */

const { verifyToken } = require('../config/jwt');

/**
 * Middleware to verify JWT token
 * Extracts and validates token from Authorization header
 */
const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access token is missing'
      });
    }

    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Authentication error:', error.message);
    return res.status(403).json({
      success: false,
      message: 'Invalid or expired token'
    });
  }
};

/**
 * Middleware to verify Manager role
 * Must be used after authenticateToken
 */
const authorizeManager = (req, res, next) => {
  try {
    if (!req.user || req.user.role !== 'Manager') {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to access this resource'
      });
    }
    next();
  } catch (error) {
    console.error('Authorization error:', error.message);
    return res.status(403).json({
      success: false,
      message: 'Authorization failed'
    });
  }
};

/**
 * Middleware to verify Employee role
 * Must be used after authenticateToken
 */
const authorizeEmployee = (req, res, next) => {
  try {
    if (!req.user || req.user.role !== 'Employee') {
      return res.status(403).json({
        success: false,
        message: 'Only employees can perform this action'
      });
    }
    next();
  } catch (error) {
    console.error('Authorization error:', error.message);
    return res.status(403).json({
      success: false,
      message: 'Authorization failed'
    });
  }
};

module.exports = {
  authenticateToken,
  authorizeManager,
  authorizeEmployee
};
