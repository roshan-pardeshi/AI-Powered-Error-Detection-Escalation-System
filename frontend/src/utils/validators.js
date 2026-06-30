/**
 * Validation Utility Functions
 */

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const validateEmail = (email) => {
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  return passwordRegex.test(password);
};

export const validateUsername = (username) => {
  return /^[a-zA-Z0-9_]{3,20}$/.test(username);
};

export const validateIssueTitle = (title) => {
  return title && title.trim().length >= 5 && title.trim().length <= 200;
};

export const validateIssueDescription = (description) => {
  return description && description.trim().length >= 10 && description.trim().length <= 2000;
};

/**
 * Get password strength message
 */
export const getPasswordStrengthMessage = (password) => {
  if (!password) return 'Password is required';
  if (password.length < 8) return 'At least 8 characters required';
  if (!/[A-Z]/.test(password)) return 'Must contain uppercase letter';
  if (!/[a-z]/.test(password)) return 'Must contain lowercase letter';
  if (!/\d/.test(password)) return 'Must contain a number';
  if (!/[@$!%*?&]/.test(password)) return 'Must contain special character (@$!%*?&)';
  return 'Strong password';
};

/**
 * Format date for display
 */
export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

/**
 * Get time since creation
 */
export const getTimeSince = (dateString) => {
  if (!dateString) return 'N/A';
  
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);
  
  if (seconds < 60) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
  
  return formatDate(dateString);
};

/**
 * Get priority color
 */
export const getPriorityColor = (priority) => {
  switch (priority) {
    case 'High':
      return '#d32f2f'; // Red
    case 'Medium':
      return '#f57c00'; // Orange
    case 'Low':
      return '#388e3c'; // Green
    default:
      return '#757575'; // Gray
  }
};

/**
 * Get status color
 */
export const getStatusColor = (status) => {
  switch (status) {
    case 'Resolved':
      return '#388e3c'; // Green
    case 'In Progress':
      return '#1976d2'; // Blue
    case 'Pending':
      return '#f57c00'; // Orange
    default:
      return '#757575'; // Gray
  }
};

const validators = {
  validateEmail,
  validatePassword,
  validateUsername,
  validateIssueTitle,
  validateIssueDescription,
  getPasswordStrengthMessage,
  formatDate,
  getTimeSince,
  getPriorityColor,
  getStatusColor
};

export default validators;
