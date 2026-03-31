import React, { useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowRight, LogIn, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import '../styles/navbar.css';
import logo from '../assets/cilogo.png';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const isSpecialPage =
    location.pathname === '/schemes' ||
    location.pathname === '/eligibility' ||
    location.pathname.startsWith('/scheme/') ||
    location.pathname === '/about';

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  // ── Determine active link ────────────────────────────────────────────
  const isActive = (path) => {
    if (path.startsWith('#')) return false;
    return location.pathname === path;
  };

  // ── Desktop nav links ────────────────────────────────────────────────
  const desktopLinks = isSpecialPage
    ? [
        { to: '/', label: 'Home' },
        { to: '/schemes', label: 'Schemes' },
        { to: '/eligibility', label: 'Eligibility' },
        { to: '/about', label: 'About' },
      ]
    : [
        { to: '#home', label: 'Home', isAnchor: true },
        { to: '#modules', label: 'Modules', isAnchor: true },
        { to: '#features', label: 'Features', isAnchor: true },
        { to: '#how-it-works', label: 'How It Works', isAnchor: true },
        { to: '/about', label: 'About' },
      ];

  return (
    <header className="navbar-header navbar-glass">
      <div className="container navbar-container">

        {/* ── Logo ── */}
        <Link to="/" className="navbar-logo">
          <img src={logo} alt="CivicBridge Logo" className="logo-img" />
          <span>CivicBridge</span>
        </Link>

        {/* ── Desktop Links (pill container) ── */}
        <nav className="navbar-links">
          {desktopLinks.map(({ to, label, isAnchor }) =>
            isAnchor ? (
              <a key={to} href={to} className="nav-link">
                {label}
              </a>
            ) : (
              <Link
                key={to}
                to={to}
                className={`nav-link ${isActive(to) ? 'active' : ''}`}
              >
                {label}
              </Link>
            ),
          )}
        </nav>

        {/* ── Desktop Actions ── */}
        <div className="navbar-actions">
          {user ? (
            <>
              {/* User pill */}
              <div className="navbar-user-pill">
                <div className="navbar-user-avatar">{user.initials}</div>
                <span className="navbar-user-name">{user.name}</span>
              </div>
              {/* Logout */}
              <button
                onClick={handleLogout}
                className="navbar-logout-btn"
                aria-label="Logout"
                title="Sign out"
              >
                <LogOut size={16} />
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-secondary">
                <LogIn size={15} /> Login
              </Link>
              <Link to="/citizen/report" className="btn btn-primary">
                Report an Issue <ArrowRight size={16} />
              </Link>
            </>
          )}
        </div>

        {/* ── Mobile Menu Toggle ── */}
        <button
          className="mobile-menu-btn"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* ── Mobile Dropdown ── */}
        <div className={`mobile-menu ${isMobileMenuOpen ? 'is-open' : ''}`}>
          {desktopLinks.map(({ to, label, isAnchor }) =>
            isAnchor ? (
              <a
                key={to}
                href={to}
                className="mobile-link"
                onClick={toggleMobileMenu}
              >
                {label}
              </a>
            ) : (
              <Link
                key={to}
                to={to}
                className="mobile-link"
                onClick={toggleMobileMenu}
              >
                {label}
              </Link>
            ),
          )}

          {/* Mobile user / auth area */}
          <div className="mobile-menu-actions">
            {user ? (
              <>
                <div className="mobile-user-info">
                  <div className="navbar-user-avatar">{user.initials}</div>
                  <div className="mobile-user-details">
                    <span className="name">{user.name}</span>
                    <span className="email">{user.email}</span>
                  </div>
                </div>
                <Link
                  to="/citizen/dashboard"
                  className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center' }}
                  onClick={toggleMobileMenu}
                >
                  Dashboard <ArrowRight size={16} />
                </Link>
                <button
                  onClick={() => { handleLogout(); toggleMobileMenu(); }}
                  className="btn btn-secondary"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <LogOut size={15} /> Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="btn btn-secondary"
                  style={{ width: '100%', justifyContent: 'center' }}
                  onClick={toggleMobileMenu}
                >
                  <LogIn size={15} /> Login
                </Link>
                <Link
                  to="/citizen/report"
                  className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center' }}
                  onClick={toggleMobileMenu}
                >
                  Report an Issue <ArrowRight size={16} />
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
