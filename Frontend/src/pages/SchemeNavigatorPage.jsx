import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SchemeCard from '../components/SchemeCard';
import supabase from '../context/supabase';
import { 
  BookOpen, Stethoscope, Tractor, Briefcase, 
  Baby, User, Home, IndianRupee, ChevronRight, ChevronLeft,
  FileText
} from 'lucide-react';

const iconMap = {
  education: BookOpen,
  healthcare: Stethoscope,
  agriculture: Tractor,
  employment: Briefcase,
  'women-child': Baby,
  'senior-citizens': User,
  housing: Home,
  finance: IndianRupee,
  default: FileText
};

const getIconForCategory = (categoryString) => {
  if (!categoryString) return iconMap.default;
  const lowerCat = categoryString.toLowerCase();
  
  // Basic keyword matching to assign the right icon
  if (lowerCat.includes('education') || lowerCat.includes('school') || lowerCat.includes('scholarship')) return iconMap.education;
  if (lowerCat.includes('health') || lowerCat.includes('medical') || lowerCat.includes('care')) return iconMap.healthcare;
  if (lowerCat.includes('agricultur') || lowerCat.includes('farmer') || lowerCat.includes('crop')) return iconMap.agriculture;
  if (lowerCat.includes('employ') || lowerCat.includes('job') || lowerCat.includes('skill')) return iconMap.employment;
  if (lowerCat.includes('women') || lowerCat.includes('child') || lowerCat.includes('girl')) return iconMap['women-child'];
  if (lowerCat.includes('senior') || lowerCat.includes('elder') || lowerCat.includes('pension')) return iconMap['senior-citizens'];
  if (lowerCat.includes('hous') || lowerCat.includes('awas') || lowerCat.includes('home')) return iconMap.housing;
  if (lowerCat.includes('financ') || lowerCat.includes('loan') || lowerCat.includes('money')) return iconMap.finance;
  
  return iconMap.default;
};

const formatCategoryId = (categoryStr) => {
  if (!categoryStr) return 'other';
  return categoryStr.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
};

const SchemeRow = ({ category }) => {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  if (!category.schemes || category.schemes.length === 0) return null;

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
        {category.schemes.map((scheme) => (
          <SchemeCard key={scheme.id} scheme={scheme} />
        ))}
      </div>
    </div>
  );
};

const SchemeNavigatorPage = () => {
  const navigate = useNavigate();
  const [groupedSchemes, setGroupedSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSchemes = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase.from('schemes').select('*');
        
        if (error) throw error;

        // Process and group the data
        const categoriesMap = {};

        data.forEach(scheme => {
          // Parse tags correctly, ensuring we map them if they are comma separated
          const tagsList = typeof scheme.tags === 'string' 
            ? scheme.tags.split(',').map(t => t.trim()).filter(Boolean)
            : (Array.isArray(scheme.tags) ? scheme.tags : []);

          const processedScheme = {
            ...scheme,
            tags: tagsList,
            icon: getIconForCategory(scheme.category)
          };

          const rawCategory = scheme.category || 'Other Schemes';
          const catId = formatCategoryId(rawCategory);

          if (!categoriesMap[catId]) {
            categoriesMap[catId] = {
              id: catId,
              title: rawCategory, // Preserve formatting logic, using the original capitalised string if valid
              schemes: []
            };
          }

          categoriesMap[catId].schemes.push(processedScheme);
        });

        // Convert map to array and sort by title alphabetically
        const groupedArray = Object.values(categoriesMap).sort((a, b) => a.title.localeCompare(b.title));
        setGroupedSchemes(groupedArray);
      } catch (err) {
        console.error("Error fetching schemes:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSchemes();
  }, []);

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
          {loading && (
            <div className="loader-container" style={{ padding: '60px 0', textAlign: 'center', fontSize: '1.25rem', color: '#64748b' }}>
              <div className="spinner" style={{ border: '4px solid #f3f3f3', borderTop: '4px solid var(--primary-color)', borderRadius: '50%', width: '40px', height: '40px', animation: 'spin 1s linear infinite', margin: '0 auto 16px auto' }}></div>
              Loading schemes...
              <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
            </div>
          )}
          
          {error && (
            <div className="error-container" style={{ padding: '60px 0', textAlign: 'center', color: '#ef4444', fontSize: '1.25rem' }}>
              <Stethoscope size={48} style={{ margin: '0 auto 16px auto', display: 'block' }} />
              Error loading schemes: {error}
            </div>
          )}

          {!loading && !error && groupedSchemes.length === 0 && (
            <div style={{ padding: '60px 0', textAlign: 'center', color: '#64748b', fontSize: '1.25rem' }}>
              No schemes available currently. Please check back later.
            </div>
          )}

          {!loading && !error && groupedSchemes.map((category) => (
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
