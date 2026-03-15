import React, { useState } from 'react';
import { Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';
import '../styles/navbar.css';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <header className="navbar-header navbar-glass">
      <div className="container navbar-container">
        {/* Logo */}
        <a href="/" className="navbar-logo">
          <div className="logo-icon">
            <ShieldCheck size={24} />
          </div>
          CivicBridge
        </a>

        {/* Desktop Links */}
        <nav className="navbar-links">
          <a href="#home" className="nav-link">Home</a>
          <a href="#modules" className="nav-link">Modules</a>
          <a href="#features" className="nav-link">Features</a>
          <a href="#how-it-works" className="nav-link">How It Works</a>
          <a href="#contact" className="nav-link">Contact</a>
        </nav>

        {/* Desktop CTA */}
        <div className="navbar-actions">
          <a href="#report" className="btn btn-primary">
            Report an Issue <ArrowRight size={18} />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-btn"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu Dropdown */}
        <div className={`mobile-menu ${isMobileMenuOpen ? 'is-open' : ''}`}>
          <a href="#home" className="mobile-link" onClick={toggleMobileMenu}>Home</a>
          <a href="#modules" className="mobile-link" onClick={toggleMobileMenu}>Modules</a>
          <a href="#features" className="mobile-link" onClick={toggleMobileMenu}>Features</a>
          <a href="#how-it-works" className="mobile-link" onClick={toggleMobileMenu}>How It Works</a>
          <a href="#contact" className="mobile-link" onClick={toggleMobileMenu}>Contact</a>
          <div style={{ padding: '1rem 1.5rem' }}>
            <a href="#report" className="btn btn-primary" style={{ width: '100%' }} onClick={toggleMobileMenu}>
              Report an Issue <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
