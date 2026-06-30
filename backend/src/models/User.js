/**
 * User Model
 * Database operations for users
 */

const pool = require('../config/database');
const bcrypt = require('bcryptjs');

/**
 * Create a new user
 * @param {string} username - Username
 * @param {string} email - Email address
 * @param {string} password - Plain text password
 * @param {string} role - User role (Employee or Manager)
 * @returns {object} Created user data
 */
const createUser = async (username, email, password, role = 'Employee') => {
  const connection = await pool.getConnection();
  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `
      INSERT INTO users (username, email, password, role, created_at, updated_at)
      VALUES (?, ?, ?, ?, NOW(), NOW())
    `;

    const [result] = await connection.execute(query, [username, email, hashedPassword, role]);

    return {
      userId: result.insertId,
      username,
      email,
      role
    };
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  } finally {
    connection.release();
  }
};

/**
 * Find user by email
 * @param {string} email - Email to search for
 * @returns {object|null} User object or null if not found
 */
const findUserByEmail = async (email) => {
  const connection = await pool.getConnection();
  try {
    const query = 'SELECT * FROM users WHERE email = ?';
    const [rows] = await connection.execute(query, [email]);
    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    console.error('Error finding user by email:', error);
    throw error;
  } finally {
    connection.release();
  }
};

/**
 * Find user by username
 * @param {string} username - Username to search for
 * @returns {object|null} User object or null if not found
 */
const findUserByUsername = async (username) => {
  const connection = await pool.getConnection();
  try {
    const query = 'SELECT * FROM users WHERE username = ?';
    const [rows] = await connection.execute(query, [username]);
    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    console.error('Error finding user by username:', error);
    throw error;
  } finally {
    connection.release();
  }
};

/**
 * Find user by ID
 * @param {number} userId - User ID
 * @returns {object|null} User object or null if not found
 */
const findUserById = async (userId) => {
  const connection = await pool.getConnection();
  try {
    const query = 'SELECT id, username, email, role, created_at FROM users WHERE id = ?';
    const [rows] = await connection.execute(query, [userId]);
    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    console.error('Error finding user by ID:', error);
    throw error;
  } finally {
    connection.release();
  }
};

/**
 * Verify password
 * @param {string} plainPassword - Plain text password
 * @param {string} hashedPassword - Hashed password from database
 * @returns {boolean} True if password matches
 */
const verifyPassword = async (plainPassword, hashedPassword) => {
  try {
    return await bcrypt.compare(plainPassword, hashedPassword);
  } catch (error) {
    console.error('Error verifying password:', error);
    throw error;
  }
};

/**
 * Get all users (for admin)
 * @returns {array} List of users
 */
const getAllUsers = async () => {
  const connection = await pool.getConnection();
  try {
    const query = 'SELECT id, username, email, role, created_at FROM users ORDER BY created_at DESC';
    const [rows] = await connection.execute(query);
    return rows;
  } catch (error) {
    console.error('Error getting all users:', error);
    throw error;
  } finally {
    connection.release();
  }
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserByUsername,
  findUserById,
  verifyPassword,
  getAllUsers
};
