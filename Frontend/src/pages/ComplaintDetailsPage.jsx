import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CitizenLayout from '../components/citizen/CitizenLayout';
import StatusBadge from '../components/citizen/StatusBadge';
import Timeline from '../components/citizen/Timeline';
import { useComplaints } from '../context/ComplaintsContext';
import { MapPin, Calendar, Hash, ArrowLeft, Tag } from 'lucide-react';

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit',
  });

const MetaChip = ({ icon: Icon, children }) => (
  <div
    className="meta-chip"
    style={{ fontSize: '0.875rem', color: '#1e293b' }}
  >
    <Icon size={14} style={{ color: '#94a3b8', marginTop: 2, flexShrink: 0 }} />
    <span style={{ color: '#475569', lineHeight: 1.4 }}>{children}</span>
  </div>
);

const cardStyle = {
  background: '#fff',
  borderRadius: 16,
  border: '1px solid rgba(226,232,240,0.6)',
  boxShadow: '0 10px 25px rgba(0,0,0,0.04), 0 4px 10px rgba(0,0,0,0.02)',
};

const ComplaintDetailsPage = () => {
  const { id } = useParams();
  const { complaints, loading } = useComplaints();
  const navigate = useNavigate();
  const complaint = complaints.find((c) => String(c.id) === String(id));

  if (loading) {
    return (
      <CitizenLayout>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '80px 24px', gap: 10,
        }}>
          <div style={{
            width: 28, height: 28, border: '3px solid #e2e8f0',
            borderTopColor: '#2563eb', borderRadius: '50%',
            animation: 'spin 0.7s linear infinite',
          }} />
          <span style={{ color: '#64748b', fontSize: '0.9rem', fontWeight: 500 }}>Loading…</span>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </CitizenLayout>
    );
  }

  if (!complaint) {
    return (
      <CitizenLayout>
        <div className="success-message-container">
          <p style={{ fontSize: '3rem', marginBottom: 16 }}>🔍</p>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: 8 }}>
            Complaint Not Found
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: 20 }}>
            We couldn't find a complaint with that ID.
          </p>
          <button
            onClick={() => navigate('/citizen/complaints')}
            style={{
              background: 'linear-gradient(135deg, #2563eb, #10b981)',
              color: '#fff', fontWeight: 700, fontSize: '0.875rem',
              padding: '10px 24px', borderRadius: 100, border: 'none', cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(37,99,235,0.25)',
            }}
          >
            Back to Complaints
          </button>
        </div>
      </CitizenLayout>
    );
  }

  return (
    <CitizenLayout>
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="back-btn"
        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', fontSize: '0.875rem', fontWeight: 600, padding: 0 }}
        onMouseEnter={(e) => { e.currentTarget.style.color = '#0f172a'; }}
        onMouseLeave={(e) => { e.currentTarget.style.color = '#64748b'; }}
      >
        <ArrowLeft size={15} /> Back to Complaints
      </button>

      {/* Two-column grid */}
      <div className="details-layout">

        {/* ── Main details ── */}
        <div className="details-main-col">

          {/* Header card */}
          <div style={{ ...cardStyle, padding: '28px 28px' }}>
            {/* Title + status */}
            <div className="details-header-row" style={{ marginBottom: 20 }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.3, letterSpacing: '-0.02em' }}>
                {complaint.title}
              </h2>
              <div style={{ flexShrink: 0 }}>
                <StatusBadge status={complaint.status} />
              </div>
            </div>

            {/* Meta grid */}
            <div
              className="meta-chip-grid"
              style={{ background: '#f8fafc', borderRadius: 12, marginBottom: 20, border: '1px solid #f1f5f9' }}
            >
              <MetaChip icon={Hash}>
                <span style={{ fontFamily: 'monospace', fontWeight: 700 }}>{complaint.trackingId}</span>
              </MetaChip>
              <MetaChip icon={Tag}>{complaint.category}</MetaChip>
              <MetaChip icon={MapPin}>{complaint.location}</MetaChip>
              <MetaChip icon={Calendar}>{formatDate(complaint.createdAt)}</MetaChip>
            </div>

            {/* Description */}
            <p style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
              Description
            </p>
            <p style={{ fontSize: '0.875rem', color: '#475569', lineHeight: 1.7 }}>{complaint.description}</p>
          </div>

          {/* Image */}
          {complaint.imageUrl && (
            <div style={{ ...cardStyle, padding: '20px 24px' }}>
              <p style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>
                Attached Image
              </p>
              <img
                src={complaint.imageUrl}
                alt="Complaint"
                style={{ width: '100%', borderRadius: 12, objectFit: 'cover', maxHeight: 320 }}
              />
            </div>
          )}
        </div>

        {/* ── Timeline ── */}
        <div style={{ ...cardStyle, padding: '24px 24px', height: 'fit-content' }}>
          <p style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 24 }}>
            Status Timeline
          </p>
          <Timeline status={complaint.status} />
        </div>
      </div>
    </CitizenLayout>
  );
};

export default ComplaintDetailsPage;
