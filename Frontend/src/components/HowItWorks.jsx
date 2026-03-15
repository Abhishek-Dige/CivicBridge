import React from 'react';
import '../styles/howitworks.css';

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="how-it-works-section section-padding">
      <div className="container">
        
        <div className="section-header">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">
            A simple, transparent process connecting communities with solutions.
          </p>
        </div>
        
        <div className="timeline-container">
          <div className="timeline-line"></div>
          
          <div className="step-card">
            <div className="step-number">1</div>
            <h3 className="step-title">Explore & Report</h3>
            <p className="step-desc">
              Citizens explore available schemes to benefit from, or easily report civic issues in their local area with photos and location data.
            </p>
          </div>
          
          <div className="step-card">
            <div className="step-number">2</div>
            <h3 className="step-title">Authorities Receive</h3>
            <p className="step-desc">
              Relevant government bodies receive structured, verified information to prioritize and allocate resources effectively.
            </p>
          </div>
          
          <div className="step-card">
            <div className="step-number">3</div>
            <h3 className="step-title">Resolve & Benefit</h3>
            <p className="step-desc">
              Issues are tracked until resolved, and citizens seamlessly connect with the welfare schemes they are eligible for.
            </p>
          </div>
          
        </div>
        
      </div>
    </section>
  );
};

export default HowItWorks;
