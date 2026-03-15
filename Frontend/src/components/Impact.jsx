import React from 'react';
import { Users, ShieldCheck, TrendingUp, ArrowRight } from 'lucide-react';
import '../styles/impact.css';

const Impact = () => {
  return (
    <>
      <section className="impact-section">
        <div className="container impact-container">
          <h2 className="impact-headline">Building stronger, more connected communities.</h2>
          
          <div className="impact-values">
            <div className="impact-value-item">
              <div className="impact-icon">
                <Users size={32} />
              </div>
              <h3 className="impact-value-title">Empowering Citizens</h3>
            </div>
            
            <div className="impact-value-item">
              <div className="impact-icon">
                <ShieldCheck size={32} />
              </div>
              <h3 className="impact-value-title">Transparent Governance</h3>
            </div>
            
            <div className="impact-value-item">
              <div className="impact-icon">
                <TrendingUp size={32} />
              </div>
              <h3 className="impact-value-title">Stronger Communities</h3>
            </div>
          </div>
        </div>
      </section>
      
      <section className="cta-section">
        <div className="cta-bg-shape"></div>
        <div className="container cta-content">
          <h2 className="cta-title">Join the Movement for Better Cities</h2>
          <p style={{fontSize: '1.25rem', marginBottom: '2rem', opacity: 0.9}}>
            Whether you're a citizen looking to make a difference or an authority aiming to streamline civic requests.
          </p>
          <div className="cta-actions">
            <a href="#modules" className="btn btn-white">
              Explore Platform
            </a>
            <a href="#report" className="btn btn-outline-white">
              Report an Issue <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Impact;
