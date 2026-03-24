import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import CitizenLayout from '../components/citizen/CitizenLayout';
import ComplaintCard from '../components/citizen/ComplaintCard';
import { useComplaints } from '../context/ComplaintsContext';
import { Search, SlidersHorizontal } from 'lucide-react';

const CATEGORIES = ['All', 'Roads', 'Water', 'Electricity', 'Sanitation'];
const STATUSES   = ['All', 'Pending', 'In Progress', 'Completed'];

const ComplaintsPage = () => {
  const { complaints } = useComplaints();
  const [search, setSearch]           = useState('');
  const [activeCategory, setCategory] = useState('All');
  const [activeStatus, setStatus]     = useState('All');

  const filtered = useMemo(() =>
    complaints.filter((c) => {
      const matchCat    = activeCategory === 'All' || c.category === activeCategory;
      const matchStatus = activeStatus   === 'All' || c.status === activeStatus;
      const q = search.toLowerCase();
      const matchSearch = !q ||
        c.title.toLowerCase().includes(q) ||
        c.location.toLowerCase().includes(q) ||
        c.trackingId.toLowerCase().includes(q);
      return matchCat && matchStatus && matchSearch;
    }),
  [complaints, search, activeCategory, activeStatus]);

  const chipStyle = (active, variant) => ({
    padding: '6px 14px',
    borderRadius: 100,
    fontSize: '12px',
    fontWeight: 700,
    cursor: 'pointer',
    border: 'none',
    transition: 'all 0.15s',
    background: active
      ? variant === 'category' ? '#2563eb' : '#0f172a'
      : '#f1f5f9',
    color: active ? '#fff' : '#475569',
    fontFamily: "'Inter', system-ui, sans-serif",
  });

  return (
    <CitizenLayout>
      {/* ── Filter panel (matches .cta-box / .eligibility-container style) ── */}
      <div
        style={{
          background: '#fff',
          borderRadius: 20,
          border: '1px solid #e0f2fe',
          boxShadow: '0 10px 25px rgba(0,0,0,0.04)',
          padding: '24px',
        }}
        className="complaints-filter-panel"
      >
        {/* Search */}
        <div className="search-input-wrap">
          <Search
            size={15}
            style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', pointerEvents: 'none' }}
          />
          <input
            type="text"
            placeholder="Search by title, location or tracking ID…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              paddingLeft: 40,
              paddingRight: 16,
              paddingTop: 11,
              paddingBottom: 11,
              borderRadius: 12,
              border: '1px solid #cbd5e1',
              background: '#f8fafc',
              fontSize: '0.875rem',
              color: '#1e293b',
              outline: 'none',
              fontFamily: "'Inter', system-ui, sans-serif",
              boxSizing: 'border-box',
            }}
            onFocus={(e) => { e.target.style.borderColor = '#0ea5e9'; e.target.style.boxShadow = '0 0 0 3px rgba(14,165,233,0.15)'; }}
            onBlur={(e)  => { e.target.style.borderColor = '#cbd5e1'; e.target.style.boxShadow = 'none'; }}
          />
        </div>

        {/* Category chips */}
        <div>
          <p style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
            Category
          </p>
          <div className="filter-chips-wrap">
            {CATEGORIES.map((cat) => (
              <button key={cat} onClick={() => setCategory(cat)} style={chipStyle(activeCategory === cat, 'category')}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Status chips */}
        <div className="filter-chips-wrap">
          <SlidersHorizontal size={14} style={{ color: '#94a3b8', flexShrink: 0 }} />
          {STATUSES.map((s) => (
            <button key={s} onClick={() => setStatus(s)} style={chipStyle(activeStatus === s, 'status')}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Result count section header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 4, height: 22, borderRadius: 4, background: 'linear-gradient(180deg,#2563eb,#10b981)', flexShrink: 0 }} />
        <div>
          <p style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>Community Feed</p>
          <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', margin: 0, lineHeight: 1.3 }}>
            {filtered.length} Result{filtered.length !== 1 ? 's' : ''} Found
          </h2>
        </div>
        <span style={{ fontSize: 11, fontWeight: 700, background: '#eff6ff', color: '#2563eb', border: '1px solid #bfdbfe', borderRadius: 100, padding: '2px 10px', marginLeft: 2 }}>
          {filtered.length}
        </span>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div
          style={{
            background: '#fff', borderRadius: 16,
            border: '1px solid rgba(226,232,240,0.6)',
            padding: '64px 24px', textAlign: 'center',
          }}
        >
          <p style={{ fontSize: '2.5rem', marginBottom: 12 }}>🔍</p>
          <p style={{ color: '#64748b', fontSize: '0.875rem', fontWeight: 500 }}>No complaints match your filters.</p>
          <Link to="/citizen/report" style={{ color: '#0ea5e9', fontSize: '0.875rem', fontWeight: 600, textDecoration: 'none' }}>
            Report an issue
          </Link>
        </div>
      ) : (
        <div className="complaints-grid">
          {filtered.map((c) => <ComplaintCard key={c.id} complaint={c} />)}
        </div>
      )}
    </CitizenLayout>
  );
};

export default ComplaintsPage;
