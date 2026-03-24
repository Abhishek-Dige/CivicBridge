import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Wrap any <Route> element with this to require a logged-in user.
 * Unauthenticated visitors are sent to /login and returned here after login.
 */
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Wait for session rehydration before deciding
  if (loading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'var(--color-background)',
      }}>
        <div className="auth-spinner" style={{
          width: 40,
          height: 40,
          border: '3px solid rgba(37,99,235,0.15)',
          borderTop: '3px solid var(--color-primary-blue)',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }} />
      </div>
    );
  }

  if (!user) {
    // Preserve destination so we can redirect back after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
