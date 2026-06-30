/**
 * Authentication Utility Functions
 * Handles token and user management
 */

/**
 * Save token to localStorage
 */
export const saveToken = (token) => {
  localStorage.setItem('token', token);
};

/**
 * Get token from localStorage
 */
export const getToken = () => {
  return localStorage.getItem('token');
};

/**
 * Remove token from localStorage
 */
export const removeToken = () => {
  localStorage.removeItem('token');
};

/**
 * Save user info to localStorage
 */
export const saveUser = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

/**
 * Get user info from localStorage
 */
export const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

/**
 * Remove user info from localStorage
 */
export const removeUser = () => {
  localStorage.removeItem('user');
};

/**
 * Logout - clear all auth data
 */
export const logout = () => {
  removeToken();
  removeUser();
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = () => {
  return !!getToken();
};

/**
 * Check if user has manager role
 */
export const isManager = () => {
  const user = getUser();
  return user && user.role === 'Manager';
};

/**
 * Decode JWT token to get payload (basic decoding)
 */
export const decodeToken = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

const authUtils = {
  saveToken,
  getToken,
  removeToken,
  saveUser,
  getUser,
  removeUser,
  logout,
  isAuthenticated,
  isManager,
  decodeToken
};

export default authUtils;
