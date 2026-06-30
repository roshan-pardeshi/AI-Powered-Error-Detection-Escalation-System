/**
 * Issue Controller
 * Handles issue creation, retrieval, updates, and escalation
 */

const IssueModel = require('../models/Issue');
const { classifyPriority, suggestCategory } = require('../utils/aiClassifier');
const { validateIssueTitle, validateIssueDescription, validateCategory, sanitizeInput } = require('../utils/validators');

/**
 * Create New Issue
 * POST /api/issues
 */
const createIssue = async (req, res, next) => {
  try {
    const { title, description, category } = req.body;
    const userId = req.user.userId;

    // Input validation
    if (!validateIssueTitle(title)) {
      return res.status(400).json({
        success: false,
        message: 'Title must be between 5 and 200 characters'
      });
    }

    if (!validateIssueDescription(description)) {
      return res.status(400).json({
        success: false,
        message: 'Description must be between 10 and 2000 characters'
      });
    }

    if (!validateCategory(category)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid category selected'
      });
    }

    // Sanitize inputs
    const sanitizedTitle = sanitizeInput(title);
    const sanitizedDescription = sanitizeInput(description);

    // AI Classification - determine priority
    const priority = classifyPriority(sanitizedTitle, sanitizedDescription, category);

    // Create issue
    const issue = await IssueModel.createIssue(
      userId,
      sanitizedTitle,
      sanitizedDescription,
      category,
      priority
    );

    res.status(201).json({
      success: true,
      message: 'Issue reported successfully',
      data: {
        ...issue,
        aiClassification: {
          priority,
          suggestedCategory: category
        }
      }
    });
  } catch (error) {
    console.error('Create issue error:', error);
    next(error);
  }
};

/**
 * Get All Issues with Filters
 * GET /api/issues
 * Query params: status, priority, category, sortBy, page, limit
 */
const getIssues = async (req, res, next) => {
  try {
    const { status, priority, category, sortBy, page = 1, limit = 10 } = req.query;
    const userId = req.user.userId;
    const userRole = req.user.role;

    // Build filters
    const filters = {};
    if (status) filters.status = status;
    if (priority) filters.priority = priority;
    if (category) filters.category = category;
    if (sortBy) filters.sortBy = sortBy;

    // Employees can only see their own issues, managers can see all
    if (userRole === 'Employee') {
      filters.userId = userId;
    }

    const result = await IssueModel.getAllIssues(
      filters,
      parseInt(page),
      parseInt(limit)
    );

    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Get issues error:', error);
    next(error);
  }
};

/**
 * Get Single Issue by ID
 * GET /api/issues/:issueId
 */
const getIssueById = async (req, res, next) => {
  try {
    const { issueId } = req.params;
    const userId = req.user.userId;
    const userRole = req.user.role;

    const issue = await IssueModel.getIssueById(issueId);

    if (!issue) {
      return res.status(404).json({
        success: false,
        message: 'Issue not found'
      });
    }

    // Employees can only view their own issues
    if (userRole === 'Employee' && issue.user_id !== userId) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to view this issue'
      });
    }

    res.status(200).json({
      success: true,
      data: issue
    });
  } catch (error) {
    console.error('Get issue error:', error);
    next(error);
  }
};

/**
 * Update Issue Status
 * PATCH /api/issues/:issueId/status
 */
const updateIssueStatus = async (req, res, next) => {
  try {
    const { issueId } = req.params;
    const { status } = req.body;
    const userRole = req.user.role;

    // Validate status
    const validStatuses = ['Pending', 'In Progress', 'Resolved'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be Pending, In Progress, or Resolved'
      });
    }

    // Only managers can update status
    if (userRole !== 'Manager') {
      return res.status(403).json({
        success: false,
        message: 'Only managers can update issue status'
      });
    }

    const issue = await IssueModel.getIssueById(issueId);
    if (!issue) {
      return res.status(404).json({
        success: false,
        message: 'Issue not found'
      });
    }

    const updatedIssue = await IssueModel.updateIssueStatus(issueId, status);

    res.status(200).json({
      success: true,
      message: 'Issue status updated successfully',
      data: updatedIssue
    });
  } catch (error) {
    console.error('Update issue status error:', error);
    next(error);
  }
};

/**
 * Update Issue Priority
 * PATCH /api/issues/:issueId/priority
 */
const updateIssuePriority = async (req, res, next) => {
  try {
    const { issueId } = req.params;
    const { priority } = req.body;
    const userRole = req.user.role;

    // Validate priority
    const validPriorities = ['Low', 'Medium', 'High'];
    if (!validPriorities.includes(priority)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid priority. Must be Low, Medium, or High'
      });
    }

    // Only managers can update priority
    if (userRole !== 'Manager') {
      return res.status(403).json({
        success: false,
        message: 'Only managers can update issue priority'
      });
    }

    const issue = await IssueModel.getIssueById(issueId);
    if (!issue) {
      return res.status(404).json({
        success: false,
        message: 'Issue not found'
      });
    }

    const updatedIssue = await IssueModel.updateIssuePriority(issueId, priority);

    res.status(200).json({
      success: true,
      message: 'Issue priority updated successfully',
      data: updatedIssue
    });
  } catch (error) {
    console.error('Update issue priority error:', error);
    next(error);
  }
};

/**
 * Get Escalation Report
 * GET /api/issues/escalation/report
 * Returns issues pending for > X hours
 */
const getEscalationReport = async (req, res, next) => {
  try {
    const userRole = req.user.role;

    // Only managers can view escalation report
    if (userRole !== 'Manager') {
      return res.status(403).json({
        success: false,
        message: 'Only managers can view escalation reports'
      });
    }

    const escalationHours = parseInt(process.env.ESCALATION_TIME_HOURS) || 24;
    const escalationIssues = await IssueModel.getEscalationIssues(escalationHours);

    res.status(200).json({
      success: true,
      data: {
        escalationThreshold: `${escalationHours} hours`,
        count: escalationIssues.length,
        issues: escalationIssues
      }
    });
  } catch (error) {
    console.error('Get escalation report error:', error);
    next(error);
  }
};

/**
 * Delete Issue (soft or hard delete)
 * DELETE /api/issues/:issueId
 */
const deleteIssue = async (req, res, next) => {
  try {
    const { issueId } = req.params;
    const userId = req.user.userId;
    const userRole = req.user.role;

    const issue = await IssueModel.getIssueById(issueId);

    if (!issue) {
      return res.status(404).json({
        success: false,
        message: 'Issue not found'
      });
    }

    // Only the issue creator (employee) or managers can delete
    if (userRole === 'Employee' && issue.user_id !== userId) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to delete this issue'
      });
    }

    const deleted = await IssueModel.deleteIssue(issueId);

    if (!deleted) {
      return res.status(500).json({
        success: false,
        message: 'Failed to delete issue'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Issue deleted successfully'
    });
  } catch (error) {
    console.error('Delete issue error:', error);
    next(error);
  }
};

/**
 * Update Issue Feedback
 * PATCH /api/issues/:issueId/feedback
 */
const updateIssueFeedback = async (req, res, next) => {
  try {
    const { issueId } = req.params;
    const { feedback } = req.body;
    const userRole = req.user.role;

    // Only managers can update feedback
    if (userRole !== 'Manager') {
      return res.status(403).json({
        success: false,
        message: 'Only managers can update issue feedback'
      });
    }

    const issue = await IssueModel.getIssueById(issueId);
    if (!issue) {
      return res.status(404).json({
        success: false,
        message: 'Issue not found'
      });
    }

    const updatedIssue = await IssueModel.updateIssueFeedback(issueId, feedback);

    res.status(200).json({
      success: true,
      message: 'Manager feedback updated successfully',
      data: updatedIssue
    });
  } catch (error) {
    console.error('Update issue feedback error:', error);
    next(error);
  }
};

module.exports = {
  createIssue,
  getIssues,
  getIssueById,
  updateIssueStatus,
  updateIssuePriority,
  updateIssueFeedback,
  getEscalationReport,
  deleteIssue
};
