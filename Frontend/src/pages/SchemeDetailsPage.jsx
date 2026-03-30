import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import supabase from '../context/supabase';
import { ArrowLeft, Clock, Users, IndianRupee, FileText, CheckCircle } from 'lucide-react';

const SchemeDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [scheme, setScheme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchScheme = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('schemes')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setScheme(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchScheme();
  }, [id]);

  if (loading) {
    return (
      <div className="scheme-navigator-layout">
        <Navbar />
        <div className="scheme-navigator-page flex items-center justify-center" style={{ minHeight: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="text-xl" style={{ fontSize: '1.5rem', color: '#666' }}>Loading scheme details...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !scheme) {
    return (
      <div className="scheme-navigator-layout">
        <Navbar />
        <div className="scheme-navigator-page" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
          <div className="text-xl text-red-500" style={{ fontSize: '1.5rem', color: '#ef4444' }}>Error loading scheme: {error || 'Not found'}</div>
          <button onClick={() => navigate('/schemes')} className="btn btn-primary" style={{ padding: '10px 24px', borderRadius: '8px' }}>Back to Schemes</button>
        </div>
        <Footer />
      </div>
    );
  }

  // Parse tags string into array
  const tagsList = typeof scheme.tags === 'string' 
    ? scheme.tags.split(',').map(tag => tag.trim()).filter(Boolean)
    : (Array.isArray(scheme.tags) ? scheme.tags : []);

  // Parse documents string into array
  const docsList = typeof scheme.documents_required === 'string'
    ? scheme.documents_required.split(/\n|,/).map(doc => doc.trim()).filter(Boolean)
    : (Array.isArray(scheme.documents_required) && scheme.documents_required.length > 0 
        ? scheme.documents_required 
        : ['Proof of Identity', 'Income Certificate', 'Address Proof']);

  return (
    <div className="scheme-navigator-layout">
      <Navbar />
      <div className="scheme-details-page" style={{ padding: '40px 10%', minHeight: '80vh', backgroundColor: '#f8fafc' }}>
        <button 
          onClick={() => navigate('/schemes')} 
          style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', color: 'var(--primary-color)', cursor: 'pointer', marginBottom: '30px', fontWeight: '600', fontSize: '1rem' }}
        >
          <ArrowLeft size={20} /> Back to Schemes
        </button>

        <div className="scheme-details-container" style={{ background: 'white', borderRadius: '16px', padding: '40px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
          <div className="scheme-details-header" style={{ borderBottom: '1px solid #eee', paddingBottom: '24px', marginBottom: '32px' }}>
            <div className="scheme-tags" style={{ marginBottom: '16px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <span className="tag" style={{ background: 'var(--primary-color)', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '500' }}>{scheme.category || 'General'}</span>
              {tagsList.map((tag, idx) => (
                <span key={idx} className="tag" style={{ background: '#f1f5f9', color: '#475569', padding: '4px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '500' }}>{tag}</span>
              ))}
            </div>
            <h1 style={{ fontSize: '2.5rem', color: '#1a1a1a', marginBottom: '16px', fontWeight: '700' }}>{scheme.name}</h1>
            <p style={{ fontSize: '1.1rem', color: '#64748b', lineHeight: '1.6' }}>{scheme.description}</p>
          </div>

          <div className="scheme-details-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
            
            <div className="eligibility-card" style={{ background: '#f8fafc', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.25rem', marginBottom: '24px', color: '#334155', fontWeight: '600' }}>
                <Users size={24} color="#3b82f6" /> Eligibility Criteria
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {scheme.income_limit > 0 && (
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '20px' }}>
                    <div style={{ background: '#e0f2fe', padding: '8px', borderRadius: '8px' }}>
                      <IndianRupee size={20} color="#0284c7" />
                    </div>
                    <div>
                      <strong style={{ color: '#334155', display: 'block', marginBottom: '4px' }}>Income Limit:</strong>
                      <p style={{ margin: 0, color: '#64748b' }}>Up to ₹{scheme.income_limit.toLocaleString()} per annum</p>
                    </div>
                  </li>
                )}
                {scheme.age_limit && (
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '20px' }}>
                    <div style={{ background: '#e0f2fe', padding: '8px', borderRadius: '8px' }}>
                      <Clock size={20} color="#0284c7" />
                    </div>
                    <div>
                      <strong style={{ color: '#334155', display: 'block', marginBottom: '4px' }}>Age Limit:</strong>
                      <p style={{ margin: 0, color: '#64748b' }}>{scheme.age_limit}</p>
                    </div>
                  </li>
                )}
              </ul>
            </div>

            <div className="documents-card" style={{ background: '#f8fafc', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.25rem', marginBottom: '24px', color: '#334155', fontWeight: '600' }}>
                <FileText size={24} color="#3b82f6" /> Documents Required
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {docsList.map((doc, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '16px', color: '#475569', lineHeight: '1.5' }}>
                    <CheckCircle size={20} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} /> 
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div style={{ marginTop: '48px', textAlign: 'center' }}>
            <button 
              className="btn btn-primary btn-cta-large" 
              onClick={() => navigate('/eligibility')}
              style={{ padding: '16px 48px', fontSize: '1.1rem', fontWeight: '600', borderRadius: '12px', boxShadow: '0 4px 14px rgba(59, 130, 246, 0.4)' }}
            >
              Apply for this Scheme
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SchemeDetailsPage;
