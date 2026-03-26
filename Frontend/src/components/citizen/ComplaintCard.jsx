import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, MessageCircle, ArrowUp, Route, Droplets, Zap, Trash2 } from 'lucide-react';
import StatusBadge from './StatusBadge';
import { useComplaints } from '../../context/ComplaintsContext';
import { useAuth } from '../../context/AuthContext';

const CATEGORY_STYLES = {
  Roads:       { icon: Route,    bg: 'linear-gradient(135deg, #e0f2fe 0%, #38bdf8 100%)',  color: '#0284c7' },
  Water:       { icon: Droplets, bg: 'linear-gradient(135deg, #dbeafe 0%, #3b82f6 100%)',  color: '#1d4ed8' },
  Electricity: { icon: Zap,      bg: 'linear-gradient(135deg, #fef9c3 0%, #facc15 100%)', color: '#a16207' },
  Sanitation:  { icon: Trash2,   bg: 'linear-gradient(135deg, #dcfce7 0%, #22c55e 100%)',  color: '#15803d' },
};

const formatTimeAgo = (iso) => {
  const diff = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days === 0) return 'TODAY';
  if (days === 1) return 'YESTERDAY';
  return `${days} DAYS AGO`;
};

const ComplaintCard = ({ complaint }) => {
  const { toggleUpvote } = useComplaints();
  const { user } = useAuth();

  const cat = CATEGORY_STYLES[complaint.category] || CATEGORY_STYLES.Roads;
  const Icon = cat.icon;
  const upvoteCount = complaint.upvotedBy?.length || 0;
  const hasUpvoted = user ? complaint.upvotedBy?.includes(user.id) : false;

  return (
    <div
      style={{
        background: '#ffffff',
        border: '1px solid rgba(226,232,240,0.8)',
        borderRadius: 16,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
      className="ig-post-card"
    >
      {/* ── 1. Post Header (Author & Status) ── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {/* Avatar */}
          <div style={{
            width: 36, height: 36, borderRadius: '50%',
            background: 'var(--gradient-dark)', color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 13, fontWeight: 700, flexShrink: 0
          }}>
            {complaint.author?.initials || 'C'}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#0f172a', lineHeight: 1.2 }}>
              {complaint.author?.name || 'Citizen'}
            </span>
            <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: 4 }}>
              <MapPin size={10} /> {complaint.location}
            </span>
          </div>
        </div>
        <StatusBadge status={complaint.status} />
      </div>

      {/* ── 2. Post Media (Image or Category gradient cover) ── */}
      <Link to={`/citizen/complaints/${complaint.id}`} style={{ display: 'block', textDecoration: 'none' }}>
        <div style={{
          width: '100%',
          aspectRatio: '4/3', /* Standard IG photo ratio */
          background: complaint.imageUrl ? `url(${complaint.imageUrl}) center/cover no-repeat` : cat.bg,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 32,
          position: 'relative',
        }}>
          {!complaint.imageUrl && (
            <>
              <div style={{
                background: '#fff', padding: 24, borderRadius: '50%',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)', marginBottom: 20, color: cat.color
              }}>
                <Icon size={48} strokeWidth={1.5} />
              </div>
              <h3 style={{
                fontSize: '1.25rem', fontWeight: 800, color: '#fff', textAlign: 'center',
                textShadow: '0 2px 10px rgba(0,0,0,0.2)', margin: 0,
                display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden'
              }}>
                {complaint.title}
              </h3>
            </>
          )}
        </div>
      </Link>

      {/* ── 3. Post Action Bar ── */}
      <div style={{ padding: '12px 16px 8px', display: 'flex', alignItems: 'center', gap: 16 }}>
        <button
          onClick={() => toggleUpvote(complaint.id)}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: 'none', border: 'none', cursor: 'pointer', padding: 0,
            color: hasUpvoted ? '#10b981' : '#0f172a',
            transition: 'color 0.2s',
          }}
          title={hasUpvoted ? "Remove Upvote" : "Upvote"}
        >
          <ArrowUp
            size={26}
            strokeWidth={hasUpvoted ? 3 : 2}
            style={{ filter: hasUpvoted ? 'drop-shadow(0 2px 4px rgba(16,185,129,0.3))' : 'none' }}
          />
        </button>

        <Link to={`/citizen/complaints/${complaint.id}`} style={{ color: '#0f172a', display: 'flex', alignItems: 'center' }}>
          <MessageCircle size={24} strokeWidth={2} style={{ transition: 'transform 0.2s' }} className="action-icon" />
        </Link>
      </div>

      {/* ── 4. Likes & Caption ── */}
      <div style={{ padding: '0 16px 16px', display: 'flex', flexDirection: 'column', gap: 6 }}>
        {/* Upvote count */}
        <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#0f172a' }}>
          {upvoteCount} {upvoteCount === 1 ? 'upvote' : 'upvotes'}
        </div>

        {/* Caption */}
        <div style={{ fontSize: '0.875rem', color: '#1e293b', lineHeight: 1.5 }}>
          <span style={{ fontWeight: 700, marginRight: 8 }}>{complaint.author?.name || 'Citizen'}</span>
          <span style={{
            display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}>
            {complaint.description}
          </span>
        </div>

        {/* Time ago */}
        <div style={{ fontSize: 10, fontWeight: 600, color: '#94a3b8', marginTop: 4 }}>
          {formatTimeAgo(complaint.createdAt)}
        </div>
      </div>
    </div>
  );
};

export default ComplaintCard;
