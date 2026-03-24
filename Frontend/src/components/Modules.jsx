import React from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, ArrowRight, ShieldCheck, FileText } from 'lucide-react';
import '../styles/modules.css';

const Modules = () => {
  return (
    <section id="modules" className="modules-section section-padding">
      <div className="container">
        
        <div className="section-header">
          <h2 className="section-title">Core Platform Modules</h2>
          <p className="section-subtitle">
            CivicBridge operates as a unified ecosystem empowering both citizens and government authorities with specialized tools.
          </p>
        </div>
        
        <div className="modules-container">
          
          {/* Module 1: Scheme Navigator (Green focus) */}
          <div className="module-card scheme-module">
            <div className="module-header">
              <div className="module-icon-wrap scheme-icon-bg">
                <Search size={32} />
              </div>
              <h3 className="module-title">Scheme Navigator</h3>
            </div>
            
            <p className="module-desc">
              Discover and understand government schemes easily. Check eligibility and navigate public programs designed for community welfare.
            </p>
            
            <ul className="module-features">
              <li className="module-feature-item">
                <Search size={20} className="scheme-accent-text" /> 
                Browse active government schemes
              </li>
              <li className="module-feature-item">
                <ShieldCheck size={20} className="scheme-accent-text" /> 
                Check eligibility requirements instantly
              </li>
              <li className="module-feature-item">
                <FileText size={20} className="scheme-accent-text" /> 
                Simplified explanations & guidelines
              </li>
            </ul>
            
            <Link to="/schemes" className="btn btn-secondary" style={{marginTop: '2rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center'}}>
              Explore Schemes <ArrowRight size={18} style={{marginLeft: '0.5rem'}} />
            </Link>
          </div>
          
          {/* Visual Connector ensuring they look like one platform */}
          <div className="connector-wrapper">
            <div className="connector-line-horizontal"></div>
            <div className="connector-badge">
              CivicBridge Platform
            </div>
          </div>
          
          {/* Module 2: Citizens Portal (Blue focus) */}
          <div className="module-card citizens-module">
            <div className="module-header">
              <div className="module-icon-wrap citizens-icon-bg">
                <MapPin size={32} />
              </div>
              <h3 className="module-title">Citizens Portal</h3>
            </div>
            
            <p className="module-desc">
              Report civic issues in your neighborhood directly to proper authorities. Upload photos, track resolution status, and stay informed.
            </p>
            
            <ul className="module-features">
              <li className="module-feature-item">
                <MapPin size={20} className="citizens-accent-text" /> 
                Pinpoint issue locations on the map
              </li>
              <li className="module-feature-item">
                <FileText size={20} className="citizens-accent-text" /> 
                Upload photos & describe problems
              </li>
              <li className="module-feature-item">
                <ShieldCheck size={20} className="citizens-accent-text" /> 
                Track live resolution status
              </li>
            </ul>
            
            <Link to="/citizen/report" className="btn btn-primary" style={{marginTop: '2rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center'}}>
              Report an Issue <ArrowRight size={18} style={{marginLeft: '0.5rem'}} />
            </Link>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Modules;
