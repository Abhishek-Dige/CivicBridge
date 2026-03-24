import React from 'react';
import { useLocation } from 'react-router-dom';
import { Bell, User, Menu } from 'lucide-react';

const PAGE_TITLES = {
  '/citizen/dashboard':  { title: 'Dashboard',       sub: 'Overview of your civic activity' },
  '/citizen/report':     { title: 'Report an Issue',  sub: 'Submit a new civic complaint'    },
  '/citizen/complaints': { title: 'My Complaints',    sub: 'Track and manage your submissions' },
};

const Topbar = ({ onMenuClick }) => {
  const location = useLocation();
  const isDetail =
    location.pathname.startsWith('/citizen/complaints/') &&
    location.pathname !== '/citizen/complaints';
  const info = isDetail
    ? { title: 'Complaint Details', sub: 'Full view of your submission' }
    : PAGE_TITLES[location.pathname] || { title: 'Portal', sub: '' };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 30,
        background: 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(226,232,240,0.8)',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          height: 64,
          gap: 12,
        }}
      >
        {/* Left — title & mobile menu toggle */}
        <div style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', gap: 12 }}>
          <button
            onClick={onMenuClick}
            className="lg:hidden flex items-center justify-center text-slate-600 hover:bg-slate-100 rounded-lg p-2 -ml-2 transition-colors cursor-pointer"
            aria-label="Open menu"
            style={{ border: 'none', background: 'transparent' }}
          >
            <Menu size={22} />
          </button>
          
          <div style={{ minWidth: 0 }}>
            <h1
            style={{
              fontSize: '1.0625rem',
              fontWeight: 700,
              color: '#0f172a',
              letterSpacing: '-0.01em',
              margin: 0,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {info.title}
          </h1>
          {info.sub && (
            <p style={{ fontSize: 12, color: '#64748b', margin: 0 }} className="hidden-mobile">
              {info.sub}
            </p>
            )}
          </div>
        </div>

        {/* Right — compact, no overflow-prone text */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
          {/* Bell */}
          <button
            style={{
              position: 'relative', padding: 8, borderRadius: 10,
              background: 'none', border: 'none', cursor: 'pointer',
              color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
            aria-label="Notifications"
          >
            <Bell size={19} />
            <span
              style={{
                position: 'absolute', top: 8, right: 8,
                width: 7, height: 7, borderRadius: '50%',
                background: '#2563eb', border: '2px solid #fff',
              }}
            />
          </button>

          {/* Avatar only — no text label so it never overflows */}
          <div
            title="Citizen Portal User"
            style={{
              width: 36, height: 36, borderRadius: 10,
              background: 'linear-gradient(135deg,#2563eb,#10b981)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(37,99,235,0.2)',
              flexShrink: 0,
            }}
          >
            <User size={17} style={{ color: '#fff' }} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
