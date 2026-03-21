import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, ArrowRight, Route, Droplets, Zap, Trash2 } from 'lucide-react';
import StatusBadge from './StatusBadge';

const CATEGORY_ICONS = {
  Roads:       { icon: Route,    bg: '#f0f9ff', color: '#0ea5e9' },
  Water:       { icon: Droplets, bg: '#eff6ff', color: '#2563eb' },
  Electricity: { icon: Zap,      bg: '#fefce8', color: '#ca8a04' },
  Sanitation:  { icon: Trash2,   bg: '#f0fdf4', color: '#16a34a' },
};

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

const ComplaintCard = ({ complaint }) => {
  const cat  = CATEGORY_ICONS[complaint.category] || { icon: Route, bg: '#f8fafc', color: '#64748b' };
  const Icon = cat.icon;

  return (
    <div
      style={{
        background: '#ffffff',
        borderRadius: 16,
        border: '1px solid rgba(226,232,240,0.6)',
        boxShadow: '0 10px 25px rgba(0,0,0,0.04), 0 4px 10px rgba(0,0,0,0.02)',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
        cursor: 'default',
        fontFamily: "'Inter', system-ui, sans-serif",
        minWidth: 0,      /* critical: prevents flex children from overflowing */
        overflow: 'hidden',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 20px 30px rgba(0,0,0,0.08), 0 8px 15px rgba(0,0,0,0.03)';
        e.currentTarget.style.borderColor = 'rgba(14,165,233,0.25)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.04), 0 4px 10px rgba(0,0,0,0.02)';
        e.currentTarget.style.borderColor = 'rgba(226,232,240,0.6)';
      }}
    >
      {/* ── Header: icon + category + title ── */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0, flex: 1 }}>
          {/* Category icon */}
          <div style={{
            width: 44, height: 44, borderRadius: 12, flexShrink: 0,
            background: cat.bg, color: cat.color,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icon size={20} />
          </div>
          {/* Title block */}
          <div style={{ minWidth: 0, flex: 1 }}>
            <p style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 3 }}>
              {complaint.category}
            </p>
            {/* overflow:hidden + text wrapping control */}
            <h3 style={{
              fontSize: '0.875rem', fontWeight: 700, color: '#0f172a', margin: 0,
              display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
              overflow: 'hidden', lineHeight: 1.4,
            }}>
              {complaint.title}
            </h3>
          </div>
        </div>
        {/* Badge — shrinks in place */}
        <div style={{ flexShrink: 0, paddingTop: 2 }}>
          <StatusBadge status={complaint.status} />
        </div>
      </div>

      {/* ── Meta row ── */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 16px', fontSize: 12, color: '#64748b' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 5, minWidth: 0 }}>
          <MapPin size={12} style={{ color: '#94a3b8', flexShrink: 0 }} />
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 140 }}>
            {complaint.location}
          </span>
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 5, flexShrink: 0 }}>
          <Calendar size={12} style={{ color: '#94a3b8' }} />
          {formatDate(complaint.createdAt)}
        </span>
      </div>

      {/* ── Description — 3 lines max like SchemeCard ── */}
      <p style={{
        fontSize: '0.8125rem', color: '#64748b', lineHeight: 1.5, margin: 0,
        display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical',
        overflow: 'hidden', flex: 1,
      }}>
        {complaint.description}
      </p>

      {/* ── Footer — always at bottom ── */}
      <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
        <span style={{ fontSize: 11, fontFamily: 'monospace', color: '#94a3b8', background: '#f8fafc', padding: '3px 10px', borderRadius: 100, flexShrink: 0 }}>
          {complaint.trackingId}
        </span>
        <Link
          to={`/citizen/complaints/${complaint.id}`}
          style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 600, color: '#0ea5e9', textDecoration: 'none', flexShrink: 0 }}
        >
          View Details <ArrowRight size={12} />
        </Link>
      </div>
    </div>
  );
};

export default ComplaintCard;
