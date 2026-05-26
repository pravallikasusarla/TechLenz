import React, { useEffect, useRef } from 'react';
import './AnimatedHero.css';

const Hero = () => {
  const feedRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.05 // Video starts playing as soon as it's 5% visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const video = entry.target;
        if (entry.isIntersecting) {
          video.play().catch(e => console.log("Autoplay prevented", e));
        } else {
          video.pause();
        }
      });
    }, observerOptions);

    if (feedRef.current) {
      const videos = feedRef.current.querySelectorAll('video');
      videos.forEach(video => observer.observe(video));
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="hero" id="home" style={{background: 'radial-gradient(circle at 15% 50%, rgba(224, 83, 38, 0.08) 0%, #fff 60%)', position: 'relative', overflow: 'hidden'}}>

      
      <div className="container hero-grid" style={{position: 'relative', zIndex: 1}}>
        <div className="hero-content">
          <h1 className="hero-title">
            End-to-End Tech Launch <span className="text-accent">Coverage</span>.
          </h1>
          <p className="hero-subtitle">
            Helping founders and entrepreneurs capture their vision. Pitch your startup or product and get high-quality technical coverage delivered by end of day.
          </p>
          <div className="hero-actions">
            <a href="#book-slot" className="btn btn-primary btn-large">Get Started</a>
            <div className="hero-trust">
              <span className="stars">★★★★★</span>
              <span className="trust-text">Trusted by Entrepreneurs</span>
            </div>
          </div>
        </div>
        
        <div className="hero-visual">
          <div className="css-3d-scene floating-element">
            
            {/* The Smartphone */}
            <div className="smartphone-frame">
              <div className="smartphone-screen">
                
                {/* Custom Animated Scenes State */}
                <div className="animated-scenes-feed ig-feed" style={{ pointerEvents: 'none' }} ref={feedRef}>
                  {[
                    "/reel2.mp4",
                    "/reel3.mp4",
                    "/reel2.mp4",
                    "/reel3.mp4", 
                    "/reel2.mp4" // Duplicate for seamless looping
                  ].map((videoSrc, index) => (
                    <div className="ig-embed-container" key={index} style={{ width: '100%', height: '100%', flexShrink: 0, position: 'relative', background: '#000' }}>
                      <video 
                        src={videoSrc}
                        loop
                        muted
                        playsInline
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                  ))}
                </div>
                
                <div className="scenes-ui-overlay">
                  <div className="overlay-brand">TECHLENZ</div>
                </div>

              </div>
            </div>
            
            {/* SVG Definitions for Vibrant Gradients */}
            <svg width="0" height="0">
              <defs>
                <linearGradient id="grad-orange" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ff9e79" />
                  <stop offset="100%" stopColor="#e05326" />
                </linearGradient>
                <linearGradient id="grad-purple" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#a770ef" />
                  <stop offset="100%" stopColor="#cf8bf3" />
                </linearGradient>
                <linearGradient id="grad-blue" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00c6ff" />
                  <stop offset="100%" stopColor="#0072ff" />
                </linearGradient>
                <linearGradient id="grad-green" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#11998e" />
                  <stop offset="100%" stopColor="#38ef7d" />
                </linearGradient>
                <linearGradient id="grad-pink" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ff758c" />
                  <stop offset="100%" stopColor="#ff7eb3" />
                </linearGradient>
                <linearGradient id="grad-yellow" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f6d365" />
                  <stop offset="100%" stopColor="#fda085" />
                </linearGradient>
              </defs>
            </svg>

            {/* Floating Cards with Wrappers (Glitch-free) */}
            <div className="pop-wrapper pop-card-1">
              <div className="floating-item">
                <div className="item-icon-wrapper">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="url(#grad-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="2" y1="20" x2="22" y2="20"></line>
                  </svg>
                </div>
                <span className="item-label">Hackathons</span>
              </div>
            </div>
            
            <div className="pop-wrapper pop-card-2">
              <div className="floating-item">
                <div className="item-icon-wrapper">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="url(#grad-purple)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="22"></line>
                  </svg>
                </div>
                <span className="item-label">Investor Room</span>
              </div>
            </div>
            
            <div className="pop-wrapper pop-card-3">
              <div className="floating-item">
                <div className="item-icon-wrapper">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="url(#grad-orange)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle>
                  </svg>
                </div>
                <span className="item-label">Event Coverage</span>
              </div>
            </div>
            
            <div className="pop-wrapper pop-card-4">
              <div className="floating-item">
                <div className="item-icon-wrapper">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="url(#grad-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
                    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
                    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>
                  </svg>
                </div>
                <span className="item-label">Product Launches</span>
              </div>
            </div>

            <div className="pop-wrapper pop-card-5">
              <div className="floating-item">
                <div className="item-icon-wrapper">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="url(#grad-pink)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <span className="item-label">Interviews</span>
              </div>
            </div>

            <div className="pop-wrapper pop-card-6">
              <div className="floating-item">
                <div className="item-icon-wrapper">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="url(#grad-yellow)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                </div>
                <span className="item-label">Tech Expos</span>
              </div>
            </div>
            
            {/* Glowing Orange Spheres (Removed) */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
