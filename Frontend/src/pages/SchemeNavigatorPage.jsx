import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SchemeCard from '../components/SchemeCard';
import { 
  BookOpen, Stethoscope, Tractor, Briefcase, 
  Baby, User, Home, IndianRupee, ChevronRight, ChevronLeft
} from 'lucide-react';
import schemeCategories from '../data/schemeData';

// Map icon name strings to Lucide components
const iconMap = {
  BookOpen, Stethoscope, Tractor, Briefcase,
  Baby, User, Home, IndianRupee,
};

const SchemeRow = ({ category }) => {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  // Map iconName strings to actual icon components for SchemeCard
  const schemesWithIcons = category.schemes.map(scheme => ({
    ...scheme,
    icon: iconMap[scheme.iconName] || BookOpen,
  }));

  return (
    <div className="scheme-section">
      <div className="scheme-section-header">
        <h2 className="scheme-section-title">{category.title}</h2>
        <div className="scroll-buttons">
          <button className="scroll-btn" onClick={scrollLeft}><ChevronLeft size={20} /></button>
          <button className="scroll-btn" onClick={scrollRight}><ChevronRight size={20} /></button>
        </div>
      </div>
      
      <div className="scheme-row-container" ref={scrollRef}>
        {schemesWithIcons.map((scheme, idx) => (
          <SchemeCard key={idx} scheme={scheme} />
        ))}
      </div>
    </div>
  );
};

const SchemeNavigatorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="scheme-navigator-layout">
      <Navbar />
      <div className="scheme-navigator-page">
        <div className="scheme-hero">
          <h1 className="scheme-hero-title">Scheme Navigator</h1>
          <p className="scheme-hero-subtitle">
            Discover, explore, and access hundreds of government schemes all in one unified platform.
          </p>
        </div>

        <div className="scheme-content">
          {schemeCategories.map((category) => (
            <SchemeRow key={category.id} category={category} />
          ))}
        </div>

        <div className="scheme-cta-section">
          <div className="cta-box">
            <h3>Not sure which schemes you qualify for?</h3>
            <p>Let our intelligent matching engine find the perfect schemes for you based on your unique profile.</p>
            <button 
              className="btn btn-primary btn-cta-large"
              onClick={() => navigate('/eligibility')}
            >
              Check My Eligibility
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SchemeNavigatorPage;
