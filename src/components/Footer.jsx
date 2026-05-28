import React from 'react';
import Feedback from './Feedback';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        
        {/* Top Header Section: Logo & Tagline */}
        <div className="footer-top">
          <div className="footer-brand">
            <img src="/logo1.png?v=1" alt="TechLenz Logo" className="footer-logo-image zoom-logo" />
            <div className="footer-tagline-container">
              <span className="footer-desc-highlight">Capture. Build. Deliver.</span>
              <span className="footer-desc-sub">End-to-End tech launch coverage with EOD delivery.</span>
            </div>
          </div>
        </div>

        {/* Middle Section: 5-Column Grid */}
        <div className="footer-grid">
          {/* Column 1: Explore */}
          <div className="footer-links-col">
            <h4>Explore</h4>
            <a href="#">Home</a>
            <a href="#about">About Us</a>
            <a href="#services">Services</a>
            <a href="#coverage">Our Process</a>
          </div>

          {/* Column 2: Participate */}
          <div className="footer-links-col">
            <h4>Participate</h4>
            <a href="#pitch">Pitch Your Startup</a>
            <a href="#join">Join TechLenz</a>
            <a href="https://www.instagram.com/_techlenz/" target="_blank" rel="noopener noreferrer">Collaborate</a>
          </div>

          {/* Column 3: Contact */}
          <div className="footer-links-col">
            <h4>Contact</h4>
            <div className="footer-contact-group">
              <a href="https://www.instagram.com/_techlenz/" target="_blank" rel="noopener noreferrer" className="footer-contact-item">
                <svg className="footer-contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
                <span>_techlenz</span>
              </a>
            </div>
          </div>

          {/* Column 4: Address */}
          <div className="footer-links-col">
            <h4>Address</h4>
            <div className="footer-address">
              <p>TechLenz Media Unit</p>
              <p>Silicon Valley of India</p>
              <p>Bengaluru, Karnataka, India</p>
            </div>
          </div>

          {/* Column 5: Feedback Form (Interactive widget) */}
          <div className="footer-feedback-widget-col">
            <Feedback />
          </div>
        </div>

        {/* Bottom Section: Copyright & Socials */}
        <div className="footer-bottom">
          <p className="footer-copyright">&copy; 2026 TechLenz. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
