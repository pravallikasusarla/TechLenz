import React, { useState, useEffect } from 'react';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      if (menuOpen) setMenuOpen(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [menuOpen]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="container header-container">

          {/* Logo — always visible */}
          <div className="header-logo-wrapper">
            <a href="/" className="brand-logo zoom-logo">
              <img src="/logo1.png?v=1" alt="TechLenz Logo" className="logo-image" />
            </a>
          </div>

          {/* Desktop nav */}
          <nav className="nav-links">
            <a href="#about" className="nav-link">About</a>
            <a href="#services" className="nav-link">Our Coverage</a>
            <a href="#explore" className="nav-link">Events</a>
            <a href="#pitch" className="nav-link">Pitch Your Startup</a>
          </nav>

          {/* Desktop Contact Us */}
          <div className="header-actions">
            <a href="#join" className="btn btn-primary">Contact Us</a>
          </div>

          {/* Hamburger — mobile only */}
          <button
            className={`hamburger-btn ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(prev => !prev)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span className="ham-line" />
            <span className="ham-line" />
            <span className="ham-line" />
          </button>

        </div>
      </header>

      {/* Dark overlay */}
      <div
        className={`mobile-overlay ${menuOpen ? 'visible' : ''}`}
        onClick={closeMenu}
      />

      {/* Slide-in drawer */}
      <nav className={`mobile-drawer ${menuOpen ? 'open' : ''}`} aria-hidden={!menuOpen}>
        <div className="mobile-drawer-header">
          <img src="/logo1.png?v=1" alt="TechLenz" className="mobile-drawer-logo" />
          <button className="mobile-drawer-close" onClick={closeMenu} aria-label="Close menu">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="mobile-drawer-links">
          <a href="#about" className="mobile-drawer-link" onClick={closeMenu}>About</a>
          <a href="#services" className="mobile-drawer-link" onClick={closeMenu}>Our Coverage</a>
          <a href="#explore" className="mobile-drawer-link" onClick={closeMenu}>Events</a>
          <a href="#pitch" className="mobile-drawer-link" onClick={closeMenu}>Pitch Your Startup</a>
        </div>

        <a href="#join" className="btn btn-primary mobile-drawer-cta" onClick={closeMenu}>
          Contact Us
        </a>
      </nav>
    </>
  );
};

export default Header;
