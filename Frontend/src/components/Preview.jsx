import React from 'react';
import { LayoutDashboard, CheckCircle2, Search, MapPin, Grid, AlertCircle } from 'lucide-react';
import '../styles/preview.css';

const Preview = () => {
  return (
    <section className="preview-section">
      <div className="preview-bg"></div>
      
      <div className="container preview-container">
        
        <div className="section-header" style={{marginTop: '4rem'}}>
          <h2 className="section-title">Platform Experience</h2>
          <p className="section-subtitle">
            A unified dashboard bringing government schemes and civic issue tracking into a single, seamless interface.
          </p>
        </div>
        
        <div className="mock-dashboard">
          
          {/* Citizens Portal Side */}
          <div className="dashboard-half citizens-preview">
            <div className="preview-header">
              <h3 className="preview-title" style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                <MapPin size={20} className="citizens-accent-text" /> My Reports
              </h3>
              <div style={{background: 'rgba(37,99,235,0.1)', padding: '4px 12px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 600}}>
                3 Active
              </div>
            </div>
            
            <div className="mock-card-list">
              <div className="mock-card">
                <div className="mock-avatar" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563eb'}}>
                  <AlertCircle size={20} />
                </div>
                <div className="mock-lines">
                  <div className="mock-line-primary"></div>
                  <div className="mock-line-secondary"></div>
                </div>
                <div style={{width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(16,185,129,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                 <CheckCircle2 size={14} color="#10b981"/>
                </div>
              </div>
              
              <div className="mock-card">
                <div className="mock-avatar" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563eb'}}>
                  <AlertCircle size={20} />
                </div>
                <div className="mock-lines">
                  <div className="mock-line-primary" style={{width: '60%'}}></div>
                  <div className="mock-line-secondary" style={{width: '80%'}}></div>
                </div>
              </div>
              
              <div className="mock-card" style={{opacity: 0.6}}>
                <div className="mock-avatar"></div>
                <div className="mock-lines">
                  <div className="mock-line-primary" style={{width: '80%'}}></div>
                  <div className="mock-line-secondary" style={{width: '50%'}}></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Scheme Navigator Side */}
          <div className="dashboard-half scheme-preview">
            <div className="preview-header">
              <h3 className="preview-title" style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                <Search size={20} className="scheme-accent-text" /> Gov Schemes
              </h3>
              <div style={{display: 'flex', gap: '8px'}}>
                <div style={{background: 'rgba(16,185,129,0.1)', width: '28px', height: '28px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <LayoutDashboard size={14} className="scheme-accent-text" />
                </div>
                <div style={{background: 'rgba(0,0,0,0.05)', width: '28px', height: '28px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <Grid size={14} color="#64748b" />
                </div>
              </div>
            </div>
            
            <div className="mock-grid">
              <div className="mock-scheme-card">
                <div className="mock-scheme-icon" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981'}}>
                  <CheckCircle2 size={16} />
                </div>
                <div>
                  <div className="mock-scheme-line" style={{marginBottom: '6px'}}></div>
                  <div className="mock-scheme-line" style={{width: '60%', background: 'rgba(0,0,0,0.05)'}}></div>
                </div>
              </div>
              
              <div className="mock-scheme-card">
                <div className="mock-scheme-icon"></div>
                <div>
                  <div className="mock-scheme-line" style={{marginBottom: '6px'}}></div>
                  <div className="mock-scheme-line" style={{width: '80%', background: 'rgba(0,0,0,0.05)'}}></div>
                </div>
              </div>
              
              <div className="mock-scheme-card">
                <div className="mock-scheme-icon"></div>
                <div>
                  <div className="mock-scheme-line" style={{marginBottom: '6px'}}></div>
                  <div className="mock-scheme-line" style={{width: '40%', background: 'rgba(0,0,0,0.05)'}}></div>
                </div>
              </div>
              
              <div className="mock-scheme-card" style={{opacity: 0.5}}>
                <div className="mock-scheme-icon"></div>
                <div>
                  <div className="mock-scheme-line" style={{marginBottom: '6px'}}></div>
                  <div className="mock-scheme-line" style={{width: '70%', background: 'rgba(0,0,0,0.05)'}}></div>
                </div>
              </div>
            </div>
            
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Preview;
