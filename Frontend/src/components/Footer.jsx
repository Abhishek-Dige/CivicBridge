import React from 'react';
import { Link } from 'react-router-dom';
import { Github } from 'lucide-react';
import '../styles/footer.css';
import logo from '../assets/cilogo.png';

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="container footer-container">

        {/* Brand Column */}
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <img src={logo} alt="CivicBridge Logo" className="footer-logo-img" />
            <span>CivicBridge</span>
          </Link>
          <p className="footer-desc">
            A modern, transparent civic-tech platform empowering communities and assisting authorities in building better, stronger cities.
          </p>
          <div className="footer-socials" style={{ alignItems: 'center' }}>
            <a href="https://github.com/Abhishek-Dige/CivicBridge" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub Repository">
              <Github size={20} />
            </a>
            <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)', maxWidth: '280px' }}>
              Help us grow by making meaningful contributions to our open-source project
            </span>
          </div>
        </div>

        {/* Links Column 1 */}
        <div>
          <h4 className="footer-col-title">Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/schemes">Scheme Navigator</Link></li>
            <li><Link to="/eligibility">Eligibility Form</Link></li>
          </ul>
        </div>

        {/* Links Column 2 */}
        <div>
          <h4 className="footer-col-title">Support & Info</h4>
          <ul className="footer-links">
            <li><Link to="/citizen/report">Report Issue</Link></li>
            <li><Link to="/about">About Us</Link></li>
          </ul>
        </div>

      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} CivicBridge. All rights reserved.</p>
        <p>Built for the community.</p>
      </div>
    </footer>
  );
};

export default Footer;
