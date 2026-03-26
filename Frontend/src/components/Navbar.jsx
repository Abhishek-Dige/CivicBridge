import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Menu, X, ArrowRight, ShieldCheck, LogIn, LogOut } from 'lucide-react';
import supabase from '../context/supabase';
import '../styles/navbar.css';
import logo from "../assets/cilogo.png";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };

    getUser();
  }, []);
  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };
  

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const isSpecialPage = location.pathname === '/schemes' || location.pathname === '/eligibility';
  
  const initials = user?.user_metadata?.name
  ? user.user_metadata.name.slice(0, 2).toUpperCase()
  : "";

  return (
    <header className="navbar-header navbar-glass">
      
      <div className="container navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <img
            src={logo}
            alt="CivicBridge Logo"
            className="logo-img"
          />
          <span>CivicBridge</span>
        </Link>
        
        {/* Desktop Links */}
        <nav className="navbar-links">
          {isSpecialPage ? (
            <>
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/schemes" className="nav-link">Schemes</Link>
              <Link to="/eligibility" className="nav-link">Eligibility</Link>
            </>
          ) : (
            <>
              <a href="#home" className="nav-link">Home</a>
              <a href="#modules" className="nav-link">Modules</a>
              <a href="#features" className="nav-link">Features</a>
              <a href="#how-it-works" className="nav-link">How It Works</a>
              <a href="#contact" className="nav-link">Contact</a>
            </>
          )}
        </nav>

        {/* Desktop CTA */}
        <div className="navbar-actions" style={{ gap: '0.75rem' }}>
          {user ? (
            <>
              {/* User Avatar */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-dark)'
              }}>
                <div style={{
                  width: 34, height: 34, borderRadius: '50%',
                  background: 'var(--gradient-accent)', color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.75rem', fontWeight: 700, flexShrink: 0,
                }}>{initials}</div>
                <span style={{ maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {user.name}
                </span>
              </div>
              <button
                onClick={logout}
                className="btn btn-secondary"
                style={{ padding: '8px 16px', fontSize: '0.875rem', gap: '0.4rem' }}
              >
                <LogOut size={15} /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-secondary" style={{ padding: '8px 20px', fontSize: '0.875rem' }}>
                <LogIn size={15} /> Login
              </Link>
              <Link to="/citizen/report" className="btn btn-primary">
                Report an Issue <ArrowRight size={18} />
              </Link>
            </>
          )}
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
          {isSpecialPage ? (
            <>
              <Link to="/" className="mobile-link" onClick={toggleMobileMenu}>Home</Link>
              <Link to="/schemes" className="mobile-link" onClick={toggleMobileMenu}>Schemes</Link>
              <Link to="/eligibility" className="mobile-link" onClick={toggleMobileMenu}>Eligibility</Link>
            </>
          ) : (
            <>
              <a href="#home" className="mobile-link" onClick={toggleMobileMenu}>Home</a>
              <a href="#modules" className="mobile-link" onClick={toggleMobileMenu}>Modules</a>
              <a href="#features" className="mobile-link" onClick={toggleMobileMenu}>Features</a>
              <a href="#how-it-works" className="mobile-link" onClick={toggleMobileMenu}>How It Works</a>
              <a href="#contact" className="mobile-link" onClick={toggleMobileMenu}>Contact</a>
            </>
          )}
          <div style={{ padding: '1rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {user ? (
              <>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-dark)', marginBottom: '0.25rem' }}>
                  👋 {user?.user_metadata?.name}
                </div>
                <button
                  onClick={() => { logout(); toggleMobileMenu(); }}
                  className="btn btn-secondary"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <LogOut size={15} /> Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center' }} onClick={toggleMobileMenu}>
                  <LogIn size={15} /> Login
                </Link>
                <Link to="/citizen/report" className="btn btn-primary" style={{ width: '100%' }} onClick={toggleMobileMenu}>
                  Report an Issue <ArrowRight size={18} />
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
