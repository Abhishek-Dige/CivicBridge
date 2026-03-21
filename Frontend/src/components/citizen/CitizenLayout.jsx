import React from 'react';
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
const CitizenLayout = ({ children }) => (
  <div
    className="min-h-screen flex"
    style={{
      background: 'linear-gradient(135deg, #eff6ff 0%, #e6fffa 100%)',
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
    }}
  >
    <Sidebar />
    <div className="flex-1 flex flex-col min-h-screen lg:ml-64">
      <Topbar />
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
        className="space-y-8"
      >
        {children}
      </main>
    </div>
  </div>
);

export default CitizenLayout;
