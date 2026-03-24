import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

/**
 * CitizenLayout — shared portal shell.
 *
 * Content is constrained to max-w-4xl and centered (matching the Report Issue
 * page's comfortable, contained feel). The bg matches SchemeNavigator.
 *
 * NOTE: color is NOT set here to avoid cascading into the Sidebar
 *       (sidebar uses explicit inline styles for its own text colours).
 */
const CitizenLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div
      className="citizen-layout-container"
      style={{
        background: 'linear-gradient(135deg, #eff6ff 0%, #e6fffa 100%)',
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      }}
    >
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      {/* Mobile backdrop overlay */}
      {isSidebarOpen && (
        <div 
          className="mobile-backdrop"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className="citizen-main-wrapper">
        <Topbar onMenuClick={() => setIsSidebarOpen(true)} />
        <main
          style={{
            flex: 1,
            width: '100%',
            maxWidth: 900,          /* same comfortable width across all pages */
            margin: '0 auto',
            padding: '36px 28px',
            boxSizing: 'border-box',
            color: '#1e293b',       /* scoped here, not at top level that reaches sidebar */
          }}
          className="citizen-content"
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default CitizenLayout;
