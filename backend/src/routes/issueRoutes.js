/**
 * Issue Routes
 */

const express = require('express');
const router = express.Router();
const issueController = require('../controllers/issueController');
const { authenticateToken, authorizeManager } = require('../middleware/auth');

/**
 * All issue routes require authentication
 */

// POST /api/issues - Create new issue
router.post('/', authenticateToken, issueController.createIssue);

// GET /api/issues - Get all issues (with filters)
router.get('/', authenticateToken, issueController.getIssues);

// GET /api/issues/escalation/report - Get escalation report (manager only)
router.get('/escalation/report', authenticateToken, authorizeManager, issueController.getEscalationReport);

// GET /api/issues/:issueId - Get single issue
router.get('/:issueId', authenticateToken, issueController.getIssueById);

// PATCH /api/issues/:issueId/status - Update issue status (manager only)
router.patch('/:issueId/status', authenticateToken, authorizeManager, issueController.updateIssueStatus);

// PATCH /api/issues/:issueId/priority - Update issue priority (manager only)
router.patch('/:issueId/priority', authenticateToken, authorizeManager, issueController.updateIssuePriority);

// PATCH /api/issues/:issueId/feedback - Update issue feedback (manager only)
router.patch('/:issueId/feedback', authenticateToken, authorizeManager, issueController.updateIssueFeedback);

// DELETE /api/issues/:issueId - Delete issue
router.delete('/:issueId', authenticateToken, issueController.deleteIssue);

module.exports = router;
