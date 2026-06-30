/**
 * Input Validation Utilities
 * Centralized validation functions for all inputs
 */

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid
 */
const validateEmail = (email) => {
  return emailRegex.test(email);
};

/**
 * Validate password strength (min 8 chars, uppercase, lowercase, number, special char)
 * @param {string} password - Password to validate
 * @returns {boolean} True if valid
 */
const validatePassword = (password) => {
  return passwordRegex.test(password);
};

/**
 * Validate username
 * @param {string} username - Username to validate
 * @returns {boolean} True if valid (3-20 chars, alphanumeric and underscore)
 */
const validateUsername = (username) => {
  return /^[a-zA-Z0-9_]{3,20}$/.test(username);
};

/**
 * Validate issue title
 * @param {string} title - Title to validate
 * @returns {boolean} True if valid (5-200 chars)
 */
const validateIssueTitle = (title) => {
  return title && title.trim().length >= 5 && title.trim().length <= 200;
};

/**
 * Validate issue description
 * @param {string} description - Description to validate
 * @returns {boolean} True if valid (10-2000 chars)
 */
const validateIssueDescription = (description) => {
  return description && description.trim().length >= 10 && description.trim().length <= 2000;
};

/**
 * Validate category
 * @param {string} category - Category to validate
 * @returns {boolean} True if valid
 */
const validateCategory = (category) => {
  const validCategories = ['Bug', 'Feature Request', 'Performance', 'UI/UX', 'Database', 'Security', 'Documentation', 'Other'];
  return validCategories.includes(category);
};

/**
 * Validate role
 * @param {string} role - Role to validate
 * @returns {boolean} True if valid
 */
const validateRole = (role) => {
  return ['Employee', 'Manager'].includes(role);
};

/**
 * Sanitize string input to prevent injection
 * @param {string} input - Input to sanitize
 * @returns {string} Sanitized input
 */
const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  return input
    .replace(/[<>]/g, '') // Remove angle brackets
    .trim();
};

module.exports = {
  validateEmail,
  validatePassword,
  validateUsername,
  validateIssueTitle,
  validateIssueDescription,
  validateCategory,
  validateRole,
  sanitizeInput
};
