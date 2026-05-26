import React, { useState, useEffect } from 'react';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container header-container">
        <div className="header-logo-wrapper">
          <a href="/" className="brand-logo zoom-logo">
            <img src="/logo1.png?v=1" alt="TechLenz Logo" className="logo-image" />
          </a>
        </div>
        
        <nav className="nav-links">
          <a href="#about" className="nav-link">About</a>
          <a href="#services" className="nav-link">Our Coverage</a>
          <a href="#services" className="nav-link">Services</a>
          <a href="#join" className="nav-link">Join TechLenz</a>
          <a href="#pitch" className="nav-link">Pitch Your Startup</a>
        </nav>
        
        <div className="header-actions">
          <a href="https://www.instagram.com/_techlenz/" target="_blank" rel="noopener noreferrer" className="btn btn-primary">DM for Collab</a>
        </div>
      </div>
    </header>
  );
};

export default Header;
