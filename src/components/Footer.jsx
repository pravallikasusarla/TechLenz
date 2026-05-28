import React, { useRef, useEffect } from 'react';
import Feedback from './Feedback';

const ParticleCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let particles = [];

    const PARTICLE_COUNT = 55;
    const CONNECTION_DIST = 130;
    const ACCENT = { r: 231, g: 81, b: 36 };

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const rand = (min, max) => Math.random() * (max - min) + min;

    const init = () => {
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: rand(0, canvas.width),
          y: rand(0, canvas.height),
          vx: rand(-0.3, 0.3),
          vy: rand(-0.3, 0.3),
          radius: rand(1.5, 3.5),
          alpha: rand(0.25, 0.65),
          pulseSpeed: rand(0.01, 0.025),
          pulseOffset: rand(0, Math.PI * 2),
        });
      }
    };

    const draw = (time) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update & draw particles
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap edges
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Pulsing alpha
        const pulse = Math.sin(time * p.pulseSpeed + p.pulseOffset);
        const a = p.alpha + pulse * 0.15;

        // Draw dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${ACCENT.r},${ACCENT.g},${ACCENT.b},${a})`;
        ctx.fill();

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DIST) {
            const lineAlpha = (1 - dist / CONNECTION_DIST) * 0.18;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(${ACCENT.r},${ACCENT.g},${ACCENT.b},${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      });

      animId = requestAnimationFrame(draw);
    };

    const observer = new ResizeObserver(() => {
      resize();
      init();
    });
    observer.observe(canvas);

    resize();
    init();
    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="footer-particle-canvas"
      aria-hidden="true"
    />
  );
};

const Footer = () => {
  return (
    <footer className="footer">
      {/* Live Particle Network Canvas */}
      <ParticleCanvas />

      {/* Floating Camera Focus Indicators */}
      <div className="footer-focus-element footer-focus-1">
        <span className="footer-corner tl"></span>
        <span className="footer-corner tr"></span>
        <span className="footer-corner bl"></span>
        <span className="footer-corner br"></span>
      </div>
      <div className="footer-focus-element footer-focus-2">
        <span className="footer-corner tl"></span>
        <span className="footer-corner tr"></span>
        <span className="footer-corner bl"></span>
        <span className="footer-corner br"></span>
      </div>

      {/* Floating Sparkles */}
      <div className="footer-bg-sparkle sp-1">✦</div>
      <div className="footer-bg-sparkle sp-2">✦</div>
      <div className="footer-bg-sparkle sp-3">✦</div>

      <div className="footer-inner">
        <div className="footer-columns">
          {/* Column 1: Explore */}
          <div className="footer-column animate-slide-up">
            <h4>Explore</h4>
            <a href="#">Home</a>
            <a href="#about">About Us</a>
            <a href="#services">Services</a>
            <a href="#process">Our Process</a>
          </div>

          {/* Column 2: Participate */}
          <div className="footer-column animate-slide-up">
            <h4>Participate</h4>
            <a href="#pitch">Pitch Your Startup</a>
            <a href="#join">Join TechLenz</a>
            <a href="#pitch">Collaborate</a>
          </div>

          {/* Column 3: Contact */}
          <div className="footer-column animate-slide-up">
            <h4>Contact</h4>
            <a
              href="https://www.instagram.com/_techlenz/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-instagram-link"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="instagram-icon">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
              <span>_techlenz</span>
            </a>
          </div>

          {/* Column 4: Address */}
          <div className="footer-column address-column animate-slide-up">
            <h4>Address</h4>
            <span>TechLenz Media Unit</span>
            <span>Rangoli Sarees building, 3rd floor, CBI Colony</span>
            <span>Hyderabad, Telangana, India</span>
          </div>

          {/* Column 5: Feedback & Rating */}
          <Feedback />
        </div>
      </div>

      {/* Brand logo banner */}
      <div className="footer-brand-banner animate-slide-up">
        <div className="footer-brand-container">
          <img src="/logo1.png?v=1" alt="TechLenz Logo" className="footer-brand-logo" />
          <p className="footer-copy">© 2026 TechLenz. All rights reserved.</p>
          <div className="footer-sparkle">✦</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
