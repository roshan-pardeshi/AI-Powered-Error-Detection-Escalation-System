/**
 * Report Issue Page Component
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { issueAPI } from '../services/api';
import { validateIssueTitle, validateIssueDescription } from '../utils/validators';
import './ReportIssue.css';

const ReportIssue = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Bug'
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const categories = [
    'Bug',
    'Feature Request',
    'Performance',
    'UI/UX',
    'Database',
    'Security',
    'Documentation',
    'Other'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (!validateIssueTitle(formData.title)) {
      setError('Title must be between 5 and 200 characters');
      return;
    }

    if (!validateIssueDescription(formData.description)) {
      setError('Description must be between 10 and 2000 characters');
      return;
    }

    try {
      setLoading(true);
      const response = await issueAPI.createIssue(
        formData.title,
        formData.description,
        formData.category
      );

      if (response.data.success) {
        setSuccess('Issue reported successfully!');
        setFormData({
          title: '',
          description: '',
          category: 'Bug'
        });

        // Redirect to dashboard after 2 seconds
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      } else {
        setError(response.data.message || 'Failed to report issue');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error reporting issue');
      console.error('Report issue error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="report-container">
      <div className="report-card">
        <h2>Report an Issue</h2>
        <p className="report-subtitle">Help us improve by reporting issues you encounter</p>

        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Issue Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Brief summary of the issue"
              disabled={loading}
              maxLength="200"
            />
            <p className="char-count">{formData.title.length}/200 characters</p>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Detailed description of the issue. Include steps to reproduce if applicable."
              disabled={loading}
              maxLength="2000"
            />
            <p className="char-count">{formData.description.length}/2000 characters</p>
          </div>

          <div className="form-group">
            <label htmlFor="category">Category *</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              disabled={loading}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="info-box">
            <h4>📊 AI-Powered Classification</h4>
            <p>Your issue will be automatically analyzed and classified by priority (Low, Medium, High) based on its content.</p>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Submitting...' : 'Report Issue'}
            </button>
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => navigate('/dashboard')}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportIssue;
