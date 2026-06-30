/**
 * Issue Model
 * Database operations for issues
 */

const pool = require('../config/database');

/**
 * Create a new issue
 * @param {number} userId - ID of user reporting issue
 * @param {string} title - Issue title
 * @param {string} description - Issue description
 * @param {string} category - Issue category
 * @param {string} priority - Priority level (Low, Medium, High)
 * @returns {object} Created issue data
 */
const createIssue = async (userId, title, description, category, priority) => {
  const connection = await pool.getConnection();
  try {
    const query = `
      INSERT INTO issues (user_id, title, description, category, priority, status, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, 'Pending', NOW(), NOW())
    `;

    const [result] = await connection.execute(query, [userId, title, description, category, priority]);

    return {
      issueId: result.insertId,
      userId,
      title,
      description,
      category,
      priority,
      status: 'Pending'
    };
  } catch (error) {
    console.error('Error creating issue:', error);
    throw error;
  } finally {
    connection.release();
  }
};

/**
 * Get issue by ID
 * @param {number} issueId - Issue ID
 * @returns {object|null} Issue object or null if not found
 */
const getIssueById = async (issueId) => {
  const connection = await pool.getConnection();
  try {
    const query = `
      SELECT i.*, u.username, u.email
      FROM issues i
      JOIN users u ON i.user_id = u.id
      WHERE i.id = ?
    `;
    const [rows] = await connection.execute(query, [issueId]);
    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    console.error('Error getting issue:', error);
    throw error;
  } finally {
    connection.release();
  }
};

/**
 * Get all issues with optional filters
 * @param {object} filters - Filter options { status, priority, userId, category, sortBy }
 * @param {number} page - Page number (default 1)
 * @param {number} limit - Items per page (default 10)
 * @returns {object} { issues, total, pages }
 */
const getAllIssues = async (filters = {}, page = 1, limit = 10) => {
  const connection = await pool.getConnection();
  try {
    let query = `
      SELECT i.*, u.username, u.email
      FROM issues i
      JOIN users u ON i.user_id = u.id
      WHERE 1=1
    `;

    const params = [];

    // Apply filters
    if (filters.status) {
      query += ' AND i.status = ?';
      params.push(filters.status);
    }
    if (filters.priority) {
      query += ' AND i.priority = ?';
      params.push(filters.priority);
    }
    if (filters.userId) {
      query += ' AND i.user_id = ?';
      params.push(filters.userId);
    }
    if (filters.category) {
      query += ' AND i.category = ?';
      params.push(filters.category);
    }

    // Sorting
    const sortBy = filters.sortBy || 'created_at';
    const validSortFields = ['created_at', 'priority', 'status', 'updated_at'];
    if (validSortFields.includes(sortBy)) {
      query += ` ORDER BY i.${sortBy} DESC`;
    }

    // Get total count
    const countQuery = query.replace(/SELECT[\s\S]*?FROM/i, 'SELECT COUNT(*) as count FROM');
    const [countRows] = await connection.execute(countQuery, params);
    const count = countRows && countRows.length > 0 ? countRows[0].count : 0;

    // Add pagination
    const offset = (page - 1) * limit;
    query += ` LIMIT ${limit} OFFSET ${offset}`;

    const [issues] = await connection.execute(query, params);

    return {
      issues,
      total: count,
      pages: Math.ceil(count / limit),
      currentPage: page
    };
  } catch (error) {
    console.error('Error getting issues:', error);
    throw error;
  } finally {
    connection.release();
  }
};

/**
 * Update issue status
 * @param {number} issueId - Issue ID
 * @param {string} status - New status (Pending, In Progress, Resolved)
 * @returns {object} Updated issue
 */
const updateIssueStatus = async (issueId, status) => {
  const connection = await pool.getConnection();
  try {
    const query = `
      UPDATE issues
      SET status = ?, updated_at = NOW()
      WHERE id = ?
    `;

    await connection.execute(query, [status, issueId]);

    return getIssueById(issueId);
  } catch (error) {
    console.error('Error updating issue status:', error);
    throw error;
  } finally {
    connection.release();
  }
};

/**
 * Update issue priority
 * @param {number} issueId - Issue ID
 * @param {string} priority - New priority (Low, Medium, High)
 * @returns {object} Updated issue
 */
const updateIssuePriority = async (issueId, priority) => {
  const connection = await pool.getConnection();
  try {
    const query = `
      UPDATE issues
      SET priority = ?, updated_at = NOW()
      WHERE id = ?
    `;

    await connection.execute(query, [priority, issueId]);

    return getIssueById(issueId);
  } catch (error) {
    console.error('Error updating issue priority:', error);
    throw error;
  } finally {
    connection.release();
  }
};

/**
 * Get issues that need escalation (pending for > X hours)
 * @param {number} hoursThreshold - Hours before escalation
 * @returns {array} Issues needing escalation
 */
const getEscalationIssues = async (hoursThreshold = 24) => {
  const connection = await pool.getConnection();
  try {
    const query = `
      SELECT i.*, u.username, u.email
      FROM issues i
      JOIN users u ON i.user_id = u.id
      WHERE i.status = 'Pending'
      AND TIMESTAMPDIFF(HOUR, i.created_at, NOW()) >= ?
      ORDER BY i.created_at ASC
    `;

    const [issues] = await connection.execute(query, [hoursThreshold]);
    return issues;
  } catch (error) {
    console.error('Error getting escalation issues:', error);
    throw error;
  } finally {
    connection.release();
  }
};

/**
 * Delete issue
 * @param {number} issueId - Issue ID
 * @returns {boolean} True if deleted successfully
 */
const deleteIssue = async (issueId) => {
  const connection = await pool.getConnection();
  try {
    const query = 'DELETE FROM issues WHERE id = ?';
    const [result] = await connection.execute(query, [issueId]);
    return result.affectedRows > 0;
  } catch (error) {
    console.error('Error deleting issue:', error);
    throw error;
  } finally {
    connection.release();
  }
};

/**
 * Update issue manager feedback
 * @param {number} issueId - Issue ID
 * @param {string} feedback - Manager feedback text
 * @returns {object} Updated issue
 */
const updateIssueFeedback = async (issueId, feedback) => {
  const connection = await pool.getConnection();
  try {
    const query = `
      UPDATE issues
      SET manager_feedback = ?, updated_at = NOW()
      WHERE id = ?
    `;

    await connection.execute(query, [feedback, issueId]);

    return getIssueById(issueId);
  } catch (error) {
    console.error('Error updating issue feedback:', error);
    throw error;
  } finally {
    connection.release();
  }
};

module.exports = {
  createIssue,
  getIssueById,
  getAllIssues,
  updateIssueStatus,
  updateIssuePriority,
  updateIssueFeedback,
  getEscalationIssues,
  deleteIssue
};
