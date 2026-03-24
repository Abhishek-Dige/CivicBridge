import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CitizenLayout from '../components/citizen/CitizenLayout';
import ComplaintForm from '../components/citizen/ComplaintForm';
import { useComplaints } from '../context/ComplaintsContext';
import { CheckCircle2 } from 'lucide-react';

const generateTrackingId = () => `CB-${Math.floor(100000 + Math.random() * 900000)}`;

const ReportIssuePage = () => {
  const { addComplaint } = useComplaints();
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (formData) => {
    addComplaint({
      id: Date.now(),
      trackingId: generateTrackingId(),
      ...formData,
      status: 'Pending',
      createdAt: new Date().toISOString(),
    });
    setSubmitted(true);
    setTimeout(() => navigate('/citizen/complaints'), 1800);
  };

  return (
    <CitizenLayout>
      {submitted ? (
        <div className="success-message-container">
          <div
            style={{
              width: 72, height: 72, borderRadius: '50%',
              background: '#d1fae5', display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: 20, animation: 'bounce 1s infinite',
              boxShadow: '0 8px 20px rgba(16,185,129,0.2)',
            }}
          >
            <CheckCircle2 size={34} style={{ color: '#10b981' }} />
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginBottom: 8, letterSpacing: '-0.02em' }}>
            Complaint Submitted!
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Redirecting you to your complaints list…</p>
        </div>
      ) : (
        <div style={{ maxWidth: 620, margin: '0 auto', width: '100%' }}>
          <div style={{ marginBottom: 20 }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 6 }}>
              Report a New Issue
            </h2>
            <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
              Fill in the details and we'll forward your complaint to the relevant department.
            </p>
          </div>
          <div
            style={{
              background: '#fff',
              borderRadius: 24,
              boxShadow: '0 24px 50px rgba(0,0,0,0.06)',
              border: '1px solid rgba(226,232,240,0.6)',
              padding: '32px',
            }}
          >
            <ComplaintForm onSubmit={handleSubmit} />
          </div>
        </div>
      )}
    </CitizenLayout>
  );
};

export default ReportIssuePage;
