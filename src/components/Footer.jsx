import React from 'react';
import Feedback from './Feedback';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <img src="/logo1.png?v=1" alt="TechLenz Logo" className="footer-logo-image zoom-logo" />
          <p className="footer-desc mt-4">
            <span className="footer-desc-highlight">Capture. Build. Deliver.</span>
            <br/>End-to-End tech launch coverage with EOD delivery.
          </p>
        </div>
        <div className="footer-links">
          <h4>Explore</h4>
          <a href="#coverage">Our Process</a>
          <a href="#services">Services</a>
          <a href="#pitch">Pitch Your Startup</a>
        </div>
        <div className="footer-links">
          <h4>Connect</h4>
          <a href="https://www.instagram.com/_techlenz/" target="_blank" rel="noopener noreferrer" className="footer-instagram-link">
            <svg className="footer-ig-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
            <span>_techlenz</span>
          </a>
        </div>
        <Feedback />
      </div>
      <div className="container footer-bottom">
        <p>&copy; 2026 TechLenz. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
