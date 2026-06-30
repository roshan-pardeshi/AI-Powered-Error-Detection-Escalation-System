/**
 * Dashboard Page Component
 */

import React, { useState, useEffect, useCallback } from 'react';
import { issueAPI } from '../services/api';
import { getUser } from '../utils/authUtils';
import IssueCard from '../components/IssueCard';
import './Dashboard.css';

const Dashboard = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    category: '',
    sortBy: 'created_at'
  });
  const [pagination, setPagination] = useState({ page: 1, limit: 10 });
  const [totalPages, setTotalPages] = useState(1);

  const user = getUser();
  const isManager = user?.role === 'Manager';

  // Fetch issues
  const fetchIssues = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const response = await issueAPI.getIssues(filters, pagination.page, pagination.limit);

      if (response.data.success) {
        setIssues(response.data.data.issues);
        setTotalPages(response.data.data.pages);
      } else {
        setError(response.data.message || 'Failed to fetch issues');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching issues');
      console.error('Fetch issues error:', err);
    } finally {
      setLoading(false);
    }
  }, [filters, pagination.page, pagination.limit]);

  useEffect(() => {
    fetchIssues();
  }, [fetchIssues]);

  // Handle status change
  const handleStatusChange = async (issueId, newStatus) => {
    try {
      const response = await issueAPI.updateIssueStatus(issueId, newStatus);
      if (response.data.success) {
        setIssues(issues.map(issue =>
          issue.id === issueId ? response.data.data : issue
        ));
      }
    } catch (err) {
      alert('Failed to update status: ' + (err.response?.data?.message || 'Unknown error'));
    }
  };

  // Handle priority change
  const handlePriorityChange = async (issueId, newPriority) => {
    try {
      const response = await issueAPI.updateIssuePriority(issueId, newPriority);
      if (response.data.success) {
        setIssues(issues.map(issue =>
          issue.id === issueId ? response.data.data : issue
        ));
      }
    } catch (err) {
      alert('Failed to update priority: ' + (err.response?.data?.message || 'Unknown error'));
    }
  };

  // Handle feedback change
  const handleFeedbackChange = async (issueId, newFeedback) => {
    try {
      const response = await issueAPI.updateIssueFeedback(issueId, newFeedback);
      if (response.data.success) {
        setIssues(issues.map(issue =>
          issue.id === issueId ? response.data.data : issue
        ));
      }
    } catch (err) {
      alert('Failed to update feedback: ' + (err.response?.data?.message || 'Unknown error'));
    }
  };

  // Handle delete
  const handleDelete = async (issueId) => {
    if (window.confirm('Are you sure you want to delete this issue?')) {
      try {
        const response = await issueAPI.deleteIssue(issueId);
        if (response.data.success) {
          setIssues(issues.filter(issue => issue.id !== issueId));
        }
      } catch (err) {
        alert('Failed to delete issue: ' + (err.response?.data?.message || 'Unknown error'));
      }
    }
  };

  // Handle filter change
  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
    setPagination({ page: 1, limit: 10 }); // Reset to page 1
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Issue Dashboard</h1>
        <p>View and manage all reported issues</p>
      </div>

      {/* Filters */}
      <div className="filters-section">
        <div className="filter-group">
          <label>Status:</label>
          <select value={filters.status} onChange={(e) => handleFilterChange('status', e.target.value)}>
            <option value="">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Priority:</label>
          <select value={filters.priority} onChange={(e) => handleFilterChange('priority', e.target.value)}>
            <option value="">All Priorities</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Category:</label>
          <select value={filters.category} onChange={(e) => handleFilterChange('category', e.target.value)}>
            <option value="">All Categories</option>
            <option value="Bug">Bug</option>
            <option value="Feature Request">Feature Request</option>
            <option value="Performance">Performance</option>
            <option value="UI/UX">UI/UX</option>
            <option value="Database">Database</option>
            <option value="Security">Security</option>
            <option value="Documentation">Documentation</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Sort By:</label>
          <select value={filters.sortBy} onChange={(e) => handleFilterChange('sortBy', e.target.value)}>
            <option value="created_at">Date Created</option>
            <option value="priority">Priority</option>
            <option value="status">Status</option>
            <option value="updated_at">Last Updated</option>
          </select>
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {loading ? (
        <div className="loading-center">
          <div className="spinner"></div>
          <p>Loading issues...</p>
        </div>
      ) : issues.length === 0 ? (
        <div className="no-data">
          <p>No issues found. {!isManager && 'Create one to get started!'}</p>
        </div>
      ) : (
        <>
          <div className="issues-list">
            {issues.map(issue => (
              <IssueCard
                key={issue.id}
                issue={issue}
                onStatusChange={handleStatusChange}
                onPriorityChange={handlePriorityChange}
                onDelete={handleDelete}
                onFeedbackChange={handleFeedbackChange}
                isManager={isManager}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              <button
                onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                disabled={pagination.page === 1}
                className="btn btn-outline btn-small"
              >
                Previous
              </button>

              <span className="pagination-info">
                Page {pagination.page} of {totalPages}
              </span>

              <button
                onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                disabled={pagination.page === totalPages}
                className="btn btn-outline btn-small"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;
