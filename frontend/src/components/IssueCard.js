/**
 * Issue Card Component
 * Displays a single issue in a card format
 */

import React, { useState, useEffect } from 'react';
import { formatDate, getTimeSince, getPriorityColor, getStatusColor } from '../utils/validators';
import './IssueCard.css';

const IssueCard = ({ issue, onStatusChange, onPriorityChange, onDelete, onFeedbackChange, isManager }) => {
  const [feedbackText, setFeedbackText] = useState(issue.manager_feedback || '');

  // Synchronize local state with props updates
  useEffect(() => {
    setFeedbackText(issue.manager_feedback || '');
  }, [issue.manager_feedback]);

  return (
    <div className="issue-card">
      <div className="card-header-row">
        <div>
          <h3 className="issue-title">{issue.title}</h3>
          <p className="issue-reporter">
            By: <strong>{issue.username}</strong> ({issue.email})
          </p>
        </div>
        <div className="issue-badges">
          <span className="badge" style={{ backgroundColor: getPriorityColor(issue.priority), color: 'white' }}>
            {issue.priority} Priority
          </span>
          <span className="badge" style={{ backgroundColor: getStatusColor(issue.status), color: 'white' }}>
            {issue.status}
          </span>
        </div>
      </div>

      <p className="issue-description">{issue.description}</p>

      <div className="issue-meta">
        <span className="meta-item">
          <strong>Category:</strong> {issue.category}
        </span>
        <span className="meta-item">
          <strong>Created:</strong> {getTimeSince(issue.created_at)}
        </span>
        <span className="meta-item">
          <strong>Last Updated:</strong> {formatDate(issue.updated_at)}
        </span>
      </div>

      {/* Employee View of Manager Feedback */}
      {!isManager && issue.manager_feedback && (
        <div className="employee-feedback-display">
          <h4 className="feedback-display-title">💬 Manager Feedback</h4>
          <p className="feedback-display-content">{issue.manager_feedback}</p>
        </div>
      )}

      {/* Manager Actions and Feedback Input */}
      {isManager && (
        <div className="manager-section">
          <div className="issue-actions">
            <select
              value={issue.status}
              onChange={(e) => onStatusChange(issue.id, e.target.value)}
              className="action-select"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>

            <select
              value={issue.priority}
              onChange={(e) => onPriorityChange(issue.id, e.target.value)}
              className="action-select"
            >
              <option value="Low">Low Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="High">High Priority</option>
            </select>

            <button onClick={() => onDelete(issue.id)} className="btn btn-danger btn-small">
              Delete
            </button>
          </div>

          <div className="manager-feedback-input-section">
            <textarea
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              placeholder="Add manager feedback or resolution notes..."
              className="feedback-textarea"
            />
            <button
              onClick={() => onFeedbackChange(issue.id, feedbackText)}
              className="btn btn-primary btn-small save-feedback-btn"
              disabled={feedbackText === (issue.manager_feedback || '')}
            >
              Save Feedback
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default IssueCard;
