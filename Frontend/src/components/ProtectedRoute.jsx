import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // ⏳ wait for auth session check
  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          gap: 12,
          fontFamily: "'Inter', system-ui, sans-serif",
          color: '#64748b',
        }}
      >
        <div
          style={{
            width: 28,
            height: 28,
            border: '3px solid #e2e8f0',
            borderTopColor: '#2563eb',
            borderRadius: '50%',
            animation: 'spin 0.7s linear infinite',
          }}
        />
        <span style={{ fontWeight: 600, fontSize: '0.9375rem' }}>Loading…</span>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  // ❌ not logged in → go to login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // ✅ logged in → allow access
  return children;
};

export default ProtectedRoute;