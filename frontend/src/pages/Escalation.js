/**
 * Escalation Report Page Component
 */

import React, { useState, useEffect, useCallback } from 'react';
import { issueAPI } from '../services/api';
import { formatDate, getTimeSince, getPriorityColor } from '../utils/validators';
import './Escalation.css';

const Escalation = () => {
  const [escalationIssues, setEscalationIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchEscalationReport = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const response = await issueAPI.getEscalationReport();

      if (response.data.success) {
        setEscalationIssues(response.data.data.issues);
      } else {
        setError(response.data.message || 'Failed to fetch escalation report');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching escalation report');
      console.error('Escalation report error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEscalationReport();
  }, [fetchEscalationReport]);

  return (
    <div className="escalation-container">
      <div className="escalation-header">
        <h1>⚠️ Escalation Report</h1>
        <p>Issues pending for more than 24 hours</p>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {loading ? (
        <div className="loading-center">
          <div className="spinner"></div>
          <p>Loading escalation report...</p>
        </div>
      ) : escalationIssues.length === 0 ? (
        <div className="success-message">
          <h3>✓ All Clear!</h3>
          <p>No escalated issues at the moment. All issues are being addressed promptly.</p>
        </div>
      ) : (
        <>
          <div className="escalation-stats">
            <div className="stat-card">
              <div className="stat-number">{escalationIssues.length}</div>
              <div className="stat-label">Escalated Issues</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">
                {escalationIssues.filter(i => i.priority === 'High').length}
              </div>
              <div className="stat-label">High Priority</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">
                {escalationIssues.filter(i => i.priority === 'Medium').length}
              </div>
              <div className="stat-label">Medium Priority</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">
                {escalationIssues.filter(i => i.priority === 'Low').length}
              </div>
              <div className="stat-label">Low Priority</div>
            </div>
          </div>

          <div className="escalation-list">
            {escalationIssues.map(issue => (
              <div key={issue.id} className="escalation-item">
                <div className="escalation-header-row">
                  <div>
                    <h3>{issue.title}</h3>
                    <p className="reporter">
                      By: <strong>{issue.username}</strong> • Pending since {formatDate(issue.created_at)}
                    </p>
                  </div>
                  <div className="badges">
                    <span className="badge" style={{ backgroundColor: getPriorityColor(issue.priority), color: 'white' }}>
                      {issue.priority}
                    </span>
                    <span className="badge escalation-badge">
                      ⏰ {getTimeSince(issue.created_at)}
                    </span>
                  </div>
                </div>

                <p className="description">{issue.description}</p>

                <div className="meta">
                  <span><strong>Category:</strong> {issue.category}</span>
                  <span><strong>Status:</strong> {issue.status}</span>
                  <span><strong>Last Updated:</strong> {getTimeSince(issue.updated_at)}</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <button onClick={fetchEscalationReport} className="btn btn-primary" style={{ marginTop: '2rem' }}>
        🔄 Refresh Report
      </button>
    </div>
  );
};

export default Escalation;
