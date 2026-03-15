import React from 'react';
import { Eye, Users, Search, Target, CheckCircle } from 'lucide-react';
import '../styles/features.css';

const Features = () => {
  const featureList = [
    {
      icon: <Eye size={24} />,
      title: "Transparent Governance",
      desc: "Open civic issue reporting and tracking, keeping authorities accountable and citizens informed."
    },
    {
      icon: <Users size={24} />,
      title: "Citizen Engagement",
      desc: "Empowers communities to actively participate in city improvement and collaborate on local challenges."
    },
    {
      icon: <Search size={24} />,
      title: "Simplified Government Schemes",
      desc: "Easy discovery and understanding of relevant public schemes and welfare programs."
    },
    {
      icon: <Target size={24} />,
      title: "Efficient Issue Resolution",
      desc: "Authorities receive structured reports with geolocations, streamlining the resolution process."
    },
    {
      icon: <CheckCircle size={24} />,
      title: "Accessible Platform",
      desc: "Simple, highly accessible, and user-friendly interface designed for citizens of all tech-literacy levels."
    }
  ];

  return (
    <section id="features" className="features-section section-padding">
      <div className="container">
        
        <div className="section-header">
          <h2 className="section-title">Why CivicBridge?</h2>
          <p className="section-subtitle">
            A comprehensive solution transforming how citizens interact with public infrastructure and services.
          </p>
        </div>
        
        <div className="features-grid">
          {featureList.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon-wrapper">
                {feature.icon}
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-desc">{feature.desc}</p>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default Features;
