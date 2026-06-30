/**
 * Navigation Component
 */

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthenticated, getUser, logout } from '../utils/authUtils';
import './Navigation.css';

const Navigation = () => {
  const navigate = useNavigate();
  const user = getUser();
  const authenticated = isAuthenticated();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          🚨 Error Detection System
        </Link>

        <div className="navbar-menu">
          {authenticated ? (
            <>
              <div className="nav-user-info">
                <span className="user-name">{user?.username}</span>
                <span className="user-role">{user?.role}</span>
              </div>

              <Link to="/dashboard" className="nav-link">
                Dashboard
              </Link>

              <Link to="/report-issue" className="nav-link">
                Report Issue
              </Link>

              {user?.role === 'Manager' && (
                <Link to="/escalation" className="nav-link">
                  Escalation Report
                </Link>
              )}

              <button onClick={handleLogout} className="btn btn-danger btn-small">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/signup" className="btn btn-primary btn-small">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
