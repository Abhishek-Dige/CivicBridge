import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Twitter, Github, Linkedin, Mail } from 'lucide-react';
import '../styles/footer.css';

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="container footer-container">
        
        {/* Brand Column */}
        <div className="footer-brand">
          <a href="/" className="footer-logo">
            <div className="logo-icon">
              <ShieldCheck size={28} color="white" />
            </div>
            CivicBridge
          </a>
          <p className="footer-desc">
            A modern, transparent civic-tech platform empowering communities and assisting authorities in building better, stronger cities.
          </p>
          <div className="footer-socials">
            <a href="#" className="social-link" aria-label="Twitter">
              <Twitter size={18} />
            </a>
            <a href="#" className="social-link" aria-label="GitHub">
              <Github size={18} />
            </a>
            <a href="#" className="social-link" aria-label="LinkedIn">
              <Linkedin size={18} />
            </a>
            <a href="#" className="social-link" aria-label="Email">
              <Mail size={18} />
            </a>
          </div>
        </div>
        
        {/* Links Column 1 */}
        <div>
          <h4 className="footer-col-title">Platform</h4>
          <ul className="footer-links">
            <li><a href="#modules">Scheme Navigator</a></li>
            <li><a href="#modules">Citizens Portal</a></li>
            <li><a href="#how-it-works">How It Works</a></li>
            <li><a href="#features">Features</a></li>
          </ul>
        </div>
        
        {/* Links Column 2 */}
        <div>
          <h4 className="footer-col-title">Company</h4>
          <ul className="footer-links">
            <li><Link to="/about">About Us</Link></li>
            <li><a href="#impact">Our Impact</a></li>
            <li><a href="#contact">Contact Support</a></li>
            <li><a href="#privacy">Privacy Policy</a></li>
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
