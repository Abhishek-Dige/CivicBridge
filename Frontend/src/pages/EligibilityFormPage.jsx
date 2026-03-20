import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const EligibilityFormPage = () => {
  return (
    <>
      <Navbar />
      <div className="eligibility-page">
        <div className="eligibility-container">
          <div className="eligibility-header">
            <h2>Check Your Eligibility</h2>
            <p>Fill out this form to discover government schemes tailored to your profile.</p>
          </div>
          
          <form className="eligibility-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input type="text" id="name" placeholder="John Doe" />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="age">Age</label>
                <input type="number" id="age" placeholder="e.g. 28" />
              </div>
              <div className="form-group">
                <label htmlFor="gender">Gender</label>
                <select id="gender">
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="income">Annual Family Income (₹)</label>
              <select id="income">
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
              <input type="text" id="state" placeholder="e.g. Maharashtra" />
            </div>

            <div className="form-group">
              <label htmlFor="category">Social Category</label>
              <select id="category">
                <option value="">Select Category</option>
                <option value="general">General</option>
                <option value="obc">OBC</option>
                <option value="sc">SC</option>
                <option value="st">ST</option>
              </select>
            </div>

            <div className="form-actions">
              <button className="btn btn-primary btn-submit-form" type="submit">
                Find Eligible Schemes
              </button>
            </div>
          </form>

          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <Link to="/schemes" className="back-link">
              ← Back to Scheme Navigator
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EligibilityFormPage;
