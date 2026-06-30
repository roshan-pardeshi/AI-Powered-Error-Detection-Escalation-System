/**
 * API Service
 * Centralized API calls with authentication
 */

import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

/**
 * Authentication APIs
 */
export const authAPI = {
  signup: (username, email, password, role = 'Employee') =>
    api.post('/auth/signup', { username, email, password, role }),
  
  login: (email, password) =>
    api.post('/auth/login', { email, password }),
  
  getProfile: () =>
    api.get('/auth/profile'),
  
  verifyToken: (token) =>
    api.post('/auth/verify', { token })
};

/**
 * Issue APIs
 */
export const issueAPI = {
  createIssue: (title, description, category) =>
    api.post('/issues', { title, description, category }),
  
  getIssues: (filters = {}, page = 1, limit = 10) => {
    const params = new URLSearchParams();
    if (filters.status) params.append('status', filters.status);
    if (filters.priority) params.append('priority', filters.priority);
    if (filters.category) params.append('category', filters.category);
    if (filters.sortBy) params.append('sortBy', filters.sortBy);
    params.append('page', page);
    params.append('limit', limit);
    return api.get(`/issues?${params.toString()}`);
  },
  
  getIssueById: (issueId) =>
    api.get(`/issues/${issueId}`),
  
  updateIssueStatus: (issueId, status) =>
    api.patch(`/issues/${issueId}/status`, { status }),
  
  updateIssuePriority: (issueId, priority) =>
    api.patch(`/issues/${issueId}/priority`, { priority }),
  
  updateIssueFeedback: (issueId, feedback) =>
    api.patch(`/issues/${issueId}/feedback`, { feedback }),
  
  getEscalationReport: () =>
    api.get('/issues/escalation/report'),
  
  deleteIssue: (issueId) =>
    api.delete(`/issues/${issueId}`)
};

export default api;
