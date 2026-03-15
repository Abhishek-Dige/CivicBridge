import React from 'react';
import { ArrowRight, ChevronRight, UserCircle, Shield, Building } from 'lucide-react';
import '../styles/hero.css';

const Hero = () => {
  return (
    <section id="home" className="hero-section">
      <div className="hero-bg-blob"></div>
      
      <div className="container hero-container">
        {/* Left Content */}
        <div className="hero-content">
          <div className="hero-badge">
            <span className="hero-badge-icon">
              <Shield size={16} />
            </span>
            Civic-Tech Platform
          </div>
          
          <h1 className="hero-title">
            <span className="text-gradient">Connecting Citizens and Government</span>
            <span>to Build Better Cities</span>
          </h1>
          
          <p className="hero-subtitle">
            CivicBridge enables communities to report civic issues and helps authorities manage and resolve them efficiently through a transparent collaborative platform.
          </p>
          
          <div className="hero-actions">
            <a href="#modules" className="btn btn-primary">
              Explore Platform <ArrowRight size={20} />
            </a>
            <a href="#how-it-works" className="btn btn-secondary">
              How It Works <ChevronRight size={20} />
            </a>
          </div>
        </div>
        
        {/* Right Illustration */}
        <div className="hero-illustration">
          <div className="abstract-graphic">
            <div className="connection-line"></div>
            
            <div className="float-card citizen-card">
              <div className="icon-wrapper">
                <UserCircle size={32} />
              </div>
              Citizens
            </div>
            
            {/* <div className="bridge-platform">
              <div className="bridge-inner">
                <Shield size={40} />
              </div>
            </div> */}
            
            <div className="float-card authority-card">
              <div className="icon-wrapper">
                <Building size={32} />
              </div>
              Authorities
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
