import React from 'react';
import { Link } from 'react-router-dom';
import CitizenLayout from '../components/citizen/CitizenLayout';
import ComplaintCard from '../components/citizen/ComplaintCard';
import { useComplaints } from '../context/ComplaintsContext';
import { Route, Droplets, Zap, Trash2, PlusCircle, TrendingUp } from 'lucide-react';

const CATEGORIES = [
  { label: 'Roads', icon: Route, bg: '#f0f9ff', color: '#0ea5e9', text: '#0369a1' },
  { label: 'Water', icon: Droplets, bg: '#eff6ff', color: '#2563eb', text: '#1d4ed8' },
  { label: 'Electricity', icon: Zap, bg: '#fefce8', color: '#ca8a04', text: '#854d0e' },
  { label: 'Sanitation', icon: Trash2, bg: '#f0fdf4', color: '#16a34a', text: '#14532d' },
];

const STAT_CONFIG = [
  { label: 'Pending', key: 'Pending', bg: '#fef3c7', border: '#fde68a', valColor: '#92400e', labelColor: '#78350f' },
  { label: 'In Progress', key: 'In Progress', bg: '#e0f2fe', border: '#bae6fd', valColor: '#0369a1', labelColor: '#0c4a6e' },
  { label: 'Completed', key: 'Completed', bg: '#d1fae5', border: '#a7f3d0', valColor: '#065f46', labelColor: '#064e3b' },
];

const CitizenDashboard = () => {
  const { complaints } = useComplaints();

  const stats = {
    Pending: complaints.filter((c) => c.status === 'Pending').length,
    'In Progress': complaints.filter((c) => c.status === 'In Progress').length,
    Completed: complaints.filter((c) => c.status === 'Completed').length,
  };

  return (
    <CitizenLayout>

      {/* ── Welcome banner ── */}
      <div
        style={{
          background: 'linear-gradient(135deg, #2563eb, #10b981)',
          borderRadius: 20,
          boxShadow: '0 20px 40px rgba(37,99,235,0.18)',
          color: '#fff',
          padding: '28px 28px',
          position: 'relative',
          overflow: 'hidden',
          marginBottom: 16,
        }}
      >
        <div style={{ position: 'relative', zIndex: 1 }}>
          <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', margin: '0 0 6px' }}>
            Welcome back
          </p>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.01em', margin: '0 0 8px', color: '#fff', lineHeight: 1.3 }}>
            Citizen Dashboard 👋
          </h2>
          <p style={{
            fontSize: '0.8125rem', color: 'rgba(255,255,255,0.85)', lineHeight: 1.6,
            margin: '0 0 18px',
            display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
          }}>
            Track your complaints and report new civic issues directly to your local authorities.
          </p>
          <Link
            to="/citizen/report"
            className="inline-flex items-center gap-2 transition-all duration-200"
            style={{
              background: '#fff',
              color: '#2563eb',
              fontWeight: 700,
              fontSize: '0.8125rem',
              padding: '9px 18px',
              borderRadius: 100,
              boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
              textDecoration: 'none',
            }}
          >
            <PlusCircle size={16} /> Report New Issue
          </Link>
        </div>
        {/* Decorative circles */}
        <div style={{ position: 'absolute', top: -32, right: -32, width: 160, height: 160, borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }} />
        <div style={{ position: 'absolute', bottom: -48, right: -8, width: 220, height: 220, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
      </div>

      {/* ── Stats ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {STAT_CONFIG.map(({ label, key, bg, border, valColor, labelColor }) => (
          <div
            key={key}
            style={{
              background: bg,
              border: `1px solid ${border}`,
              borderRadius: 16,
              padding: '20px 24px',
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
            }}
          >
            <p style={{ fontSize: '2rem', fontWeight: 800, color: valColor, lineHeight: 1 }}>{stats[key]}</p>
            <p style={{ fontSize: '0.875rem', fontWeight: 600, color: labelColor }}>{label}</p>
          </div>
        ))}
      </div>

      {/* ── Category quick links ── */}
      <section>
        {/* Section header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <div style={{ width: 4, height: 22, borderRadius: 4, background: 'linear-gradient(180deg,#2563eb,#10b981)', flexShrink: 0 }} />
          <div>
            <p style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>Quick access</p>
            <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', margin: 0, lineHeight: 1.3 }}>Report by Category</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5">
          {CATEGORIES.map(({ label, icon: Icon, bg, color, text }) => (
            <Link
              key={label}
              to={`/citizen/report?category=${label}`}
              className="flex flex-col items-center gap-3 p-4 sm:p-5 transition-all duration-200 group"
              style={{
                background: '#fff',
                borderRadius: 16,
                border: '1px solid rgba(226,232,240,0.6)',
                boxShadow: '0 4px 10px rgba(0,0,0,0.03)',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.07)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 10px rgba(0,0,0,0.03)';
              }}
            >
              <div style={{ width: 48, height: 48, borderRadius: 12, background: bg, color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={22} />
              </div>
              <span style={{ fontSize: '0.875rem', fontWeight: 700, color: text }}>{label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Recent complaints ── */}
      <section>
        {/* Section header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 4, height: 22, borderRadius: 4, background: 'linear-gradient(180deg,#2563eb,#10b981)', flexShrink: 0 }} />
            <div>
              <p style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>Community Feed</p>
              <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', margin: 0, lineHeight: 1.3 }}>Recent Issues</h2>
            </div>
            {complaints.length > 0 && (
              <span style={{ fontSize: 11, fontWeight: 700, background: '#eff6ff', color: '#2563eb', border: '1px solid #bfdbfe', borderRadius: 100, padding: '2px 9px' }}>
                {complaints.length}
              </span>
            )}
          </div>
          <Link
            to="/citizen/complaints"
            style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#0ea5e9', textDecoration: 'none', background: '#f0f9ff', padding: '5px 12px', borderRadius: 100, border: '1px solid #bae6fd' }}
          >
            View All →
          </Link>
        </div>

        {complaints.length === 0 ? (
          <div
            style={{
              background: '#fff', borderRadius: 16, border: '1px solid rgba(226,232,240,0.6)',
              padding: '48px 24px', textAlign: 'center',
            }}
          >
            <p style={{ fontSize: '2.5rem', marginBottom: 12 }}>📋</p>
            <p style={{ color: '#64748b', fontSize: '0.875rem', fontWeight: 500 }}>No complaints yet.</p>
            <Link to="/citizen/report" style={{ color: '#0ea5e9', fontSize: '0.875rem', textDecoration: 'none', fontWeight: 600 }}>
              Report your first issue
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {complaints.slice(0, 6).map((c) => (
              <ComplaintCard key={c.id} complaint={c} />
            ))}
          </div>
        )}
      </section>
    </CitizenLayout>
  );
};

export default CitizenDashboard;
