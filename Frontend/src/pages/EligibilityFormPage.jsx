import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, Stethoscope, Tractor, Briefcase,
  Baby, User, Home, IndianRupee,
  Search, RotateCcw, CheckCircle, XCircle,
  ChevronDown, ChevronUp, Sparkles, TrendingUp, FileText
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const API_BASE = 'http://localhost:5001';

// Map icon name strings to Lucide components
const iconMap = {
  BookOpen, Stethoscope, Tractor, Briefcase,
  Baby, User, Home, IndianRupee,
};

const EligibilityFormPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    income: '',
    state: '',
    category: '',
  });

  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [expandedCard, setExpandedCard] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.age && !formData.gender && !formData.income && !formData.category) {
      setError('Please fill in at least one field to find matching schemes.');
      return;
    }

    setLoading(true);
    setResults(null);

    try {
      const response = await fetch(`${API_BASE}/api/eligibility/check`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Server error');

      const data = await response.json();
      setResults(data);
    } catch (err) {
      console.error('API call failed:', err);
      setError('Could not reach the server. Please ensure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({ name: '', age: '', gender: '', income: '', state: '', category: '' });
    setResults(null);
    setError('');
    setExpandedCard(null);
  };

  const getMatchColor = (percentage) => {
    if (percentage === 100) return '#10b981';
    if (percentage >= 75) return '#22c55e';
    if (percentage >= 50) return '#f59e0b';
    return '#ef4444';
  };

  const getMatchLabel = (percentage) => {
    if (percentage === 100) return 'Perfect Match';
    if (percentage >= 75) return 'Strong Match';
    if (percentage >= 50) return 'Partial Match';
    return 'Low Match';
  };

  return (
    <>
      <Navbar />
      <div className="eligibility-page">
        <div className="eligibility-main-container">
          {/* Form Section */}
          <motion.div
            className="eligibility-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="eligibility-header">
              <div className="eligibility-header-icon">
                <Sparkles size={28} />
              </div>
              <h2>Check Your Eligibility</h2>
              <p>Fill out this form to discover government schemes tailored to your profile.</p>
            </div>

            {error && (
              <motion.div
                className="eligibility-error"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
              >
                <XCircle size={18} />
                <span>{error}</span>
              </motion.div>
            )}

            <form className="eligibility-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="age">Age</label>
                  <input
                    type="number"
                    id="age"
                    placeholder="e.g. 28"
                    value={formData.age}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="gender">Gender</label>
                  <select id="gender" value={formData.gender} onChange={handleChange}>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="income">Annual Family Income (₹)</label>
                <select id="income" value={formData.income} onChange={handleChange}>
                  <option value="">Select Income Range</option>
                  <option value="below-1l">Below 1 Lakh</option>
                  <option value="1l-2.5l">1 Lakh - 2.5 Lakhs</option>
                  <option value="2.5l-5l">2.5 Lakhs - 5 Lakhs</option>
                  <option value="5l-8l">5 Lakhs - 8 Lakhs</option>
                  <option value="above-8l">Above 8 Lakhs</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="state">State</label>
                <input
                  type="text"
                  id="state"
                  placeholder="e.g. Maharashtra"
                  value={formData.state}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="category">Social Category</label>
                <select id="category" value={formData.category} onChange={handleChange}>
                  <option value="">Select Category</option>
                  <option value="general">General</option>
                  <option value="obc">OBC</option>
                  <option value="sc">SC</option>
                  <option value="st">ST</option>
                </select>
              </div>

              <div className="form-actions">
                <button
                  className="btn btn-primary btn-submit-form"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="btn-loading">
                      <span className="spinner"></span>
                      Analyzing...
                    </span>
                  ) : (
                    <span className="btn-content">
                      <Search size={20} />
                      Find Eligible Schemes
                    </span>
                  )}
                </button>

                {results && (
                  <button
                    type="button"
                    className="btn btn-reset"
                    onClick={handleReset}
                  >
                    <RotateCcw size={16} />
                    Reset & Try Again
                  </button>
                )}
              </div>
            </form>

            <div style={{ marginTop: '2rem', textAlign: 'center' }}>
              <Link to="/schemes" className="back-link">
                ← Back to Scheme Navigator
              </Link>
            </div>
          </motion.div>

          {/* Results Section */}
          <AnimatePresence>
            {results && (
              <motion.div
                className="results-section"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              >
                {/* Results Summary */}
                <div className="results-summary">
                  <div className="results-summary-icon">
                    <TrendingUp size={28} />
                  </div>
                  <h3 className="results-title">
                    Your Matching Schemes
                  </h3>
                  <p className="results-subtitle">
                    Based on your profile, we found{' '}
                    <strong>{results.results.length}</strong> matching scheme{results.results.length !== 1 ? 's' : ''} out of{' '}
                    <strong>{results.totalSchemes}</strong> available.
                  </p>

                  <div className="results-stats">
                    <div className="stat-chip stat-perfect">
                      <CheckCircle size={16} />
                      <span>{results.matchedCount} Perfect</span>
                    </div>
                    <div className="stat-chip stat-partial">
                      <TrendingUp size={16} />
                      <span>{results.partialCount} Partial</span>
                    </div>
                  </div>
                </div>

                {/* Results Grid */}
                {results.results.length > 0 ? (
                  <div className="results-grid">
                    {results.results.map((scheme, index) => {
                      const Icon = iconMap[scheme.iconName] || BookOpen;
                      const isExpanded = expandedCard === index;
                      const matchColor = getMatchColor(scheme.matchPercentage);

                      return (
                        <motion.div
                          key={index}
                          className="result-card"
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.4,
                            delay: index * 0.08,
                            ease: 'easeOut',
                          }}
                        >
                          <div className="result-card-top">
                            {/* Match Badge */}
                            <div
                              className="match-badge"
                              style={{
                                '--match-color': matchColor,
                                '--match-pct': `${scheme.matchPercentage}%`,
                              }}
                            >
                              <svg className="match-ring" viewBox="0 0 36 36">
                                <path
                                  className="match-ring-bg"
                                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                />
                                <path
                                  className="match-ring-fill"
                                  strokeDasharray={`${scheme.matchPercentage}, 100`}
                                  style={{ stroke: matchColor }}
                                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                />
                              </svg>
                              <span className="match-pct-text">{scheme.matchPercentage}%</span>
                            </div>

                            <div className="result-card-info">
                              <div className="result-icon-row">
                                <div className="result-icon" style={{ color: matchColor }}>
                                  <Icon size={22} />
                                </div>
                                <span className="result-category-tag">{scheme.categoryTitle}</span>
                              </div>
                              <h4 className="result-name">{scheme.name}</h4>
                              <p className="result-desc">{scheme.description}</p>
                            </div>
                          </div>

                          <div className="result-tags-row">
                            {scheme.tags.map((tag, i) => (
                              <span key={i} className="result-tag">{tag}</span>
                            ))}
                            <span
                              className="match-label"
                              style={{ background: matchColor + '18', color: matchColor }}
                            >
                              {getMatchLabel(scheme.matchPercentage)}
                            </span>
                          </div>

                          {/* Expandable criteria detail */}
                          <button
                            className="criteria-toggle"
                            onClick={() => setExpandedCard(isExpanded ? null : index)}
                          >
                            <span>View Match Details</span>
                            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                          </button>

                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                className="criteria-details"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                              >
                                {scheme.matchedCriteria.map((c, i) => (
                                  <div key={i} className="criteria-item criteria-matched">
                                    <CheckCircle size={14} />
                                    <span>{c.detail}</span>
                                  </div>
                                ))}
                                {scheme.unmatchedCriteria.map((c, i) => (
                                  <div key={i} className="criteria-item criteria-unmatched">
                                    <XCircle size={14} />
                                    <span>{c.detail}</span>
                                  </div>
                                ))}

                                {scheme.documentsRequired && (
                                  <div className="documents-section">
                                    <div className="documents-header">
                                      <FileText size={15} />
                                      <span>Documents Required</span>
                                    </div>
                                    <ul className="documents-list">
                                      {scheme.documentsRequired.split('|').map((doc, i) => (
                                        <li key={i}>{doc.trim()}</li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      );
                    })}
                  </div>
                ) : (
                  <motion.div
                    className="no-results"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Search size={48} />
                    <h4>No matching schemes found</h4>
                    <p>Try adjusting your filters or filling more fields for better results.</p>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EligibilityFormPage;
