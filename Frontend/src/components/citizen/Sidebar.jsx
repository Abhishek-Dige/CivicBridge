import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, PlusCircle, ClipboardList, ArrowLeft,
} from 'lucide-react';
import logo from '../../assets/cilogo.png';

const navItems = [
  { to: '/citizen/dashboard',  icon: LayoutDashboard, label: 'Dashboard'    },
  { to: '/citizen/report',     icon: PlusCircle,      label: 'Report Issue'  },
  { to: '/citizen/complaints', icon: ClipboardList,   label: 'My Complaints' },
];

const sidebarBg = 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)';
const GREY = '#94a3b8';
const GREEN = '#10b981';

const NavLinks = ({ location, onLinkClick }) =>
  navItems.map(({ to, icon: Icon, label }) => {
    const active = location.pathname === to;
    return (
      <Link
        key={to}
        to={to}
        onClick={onLinkClick}
        style={{
          display: 'flex', alignItems: 'center', gap: 12,
          padding: '12px 16px', borderRadius: 12,
          fontSize: '0.9375rem', fontWeight: 600,
          textDecoration: 'none',
          color: active ? '#fff' : GREY,
          background: active ? 'linear-gradient(135deg,#2563eb,#10b981)' : 'transparent',
          boxShadow: active ? '0 4px 12px rgba(37,99,235,0.28)' : 'none',
          transition: 'background 0.2s, color 0.2s',
        }}
        onMouseEnter={(e) => { if (!active) { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = '#e2e8f0'; } }}
        onMouseLeave={(e) => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = GREY; } }}
      >
        <Icon size={19} />
        {label}
      </Link>
    );
  });

const SidebarContent = ({ location, onLinkClick }) => (
  <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
    {/* Brand */}
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
      <img src={logo} alt="CivicBridge" style={{ width: 38, height: 38, objectFit: 'contain', borderRadius: 10 }} />
      <div>
        <p style={{ color: '#fff', fontWeight: 700, fontSize: '1rem', lineHeight: 1.2, margin: 0 }}>CivicBridge</p>
        <p style={{ color: GREEN, fontWeight: 600, fontSize: '0.75rem', letterSpacing: '0.05em', margin: 0 }}>Citizen Portal</p>
      </div>
    </div>
    {/* Nav */}
    <nav style={{ flex: 1, padding: '20px 12px', overflowY: 'auto' }}>
      <p style={{ padding: '0 16px', fontSize: 10, fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>
        Menu
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <NavLinks location={location} onLinkClick={onLinkClick} />
      </div>
    </nav>
    {/* Back */}
    <div style={{ padding: '0 12px 24px' }}>
      <Link
        to="/" onClick={onLinkClick}
        style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderRadius: 12, textDecoration: 'none', color: GREY, fontSize: '0.9375rem', fontWeight: 600, transition: 'all 0.2s' }}
        onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = '#e2e8f0'; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = GREY; }}
      >
        <ArrowLeft size={19} /> Back to Home
      </Link>
    </div>
  </div>
);

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  return (
    <aside
      className={`citizen-sidebar ${isOpen ? 'open' : ''}`}
      style={{
        boxShadow: '4px 0 20px rgba(0,0,0,0.18)',
        background: sidebarBg,
      }}
    >
      <SidebarContent location={location} onLinkClick={onClose} />
    </aside>
  );
};

export default Sidebar;
