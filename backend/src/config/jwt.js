/**
 * JWT Configuration Module
 * Handles token generation and verification
 */

const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_keysk-proj-MD0za2fNS0YlKYFScSb0e_E_0sMwp2X3JlzNyplQ10NeEY20BSUgRi2Hb_aAa7rtzZReYdR14jT3BlbkFJmVFeM4XquTATueHi3T-_baY4PGvOmNKF4RVVNfjGijpMVjKcyHbp71Csu2M_Su7Yovg_i_zpEA';
const JWT_EXPIRE = process.env.JWT_EXPIRE || '7d';

/**
 * Generate JWT token
 * @param {number} userId - User ID to encode in token
 * @param {string} role - User role (Employee or Manager)
 * @returns {string} JWT token
 */
const generateToken = (userId, role) => {
  try {
    const token = jwt.sign(
      { userId, role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRE }
    );
    return token;
  } catch (error) {
    console.error('Token generation error:', error);
    throw new Error('Failed to generate token');
  }
};

/**
 * Verify JWT token
 * @param {string} token - JWT token to verify
 * @returns {object} Decoded token payload
 */
const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    console.error('Token verification error:', error);
    throw new Error('Invalid or expired token');
  }
};

module.exports = {
  generateToken,
  verifyToken,
  JWT_SECRET,
  JWT_EXPIRE
};
