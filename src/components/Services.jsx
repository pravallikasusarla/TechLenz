import React from 'react';

const Services = () => {
  return (
    <section className="services" id="services">

      
      <div className="container">
        <div className="section-header animate-slide-up">
          <h2>What We <span className="text-accent">Cover</span></h2>
          <p>Professional content solutions tailored for founders and entrepreneurs.</p>
        </div>

        <div className="portfolio-grid">
          <a 
            href="https://www.instagram.com/reel/DVT2cTWkgRc/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="portfolio-item animate-scale-in"
          >
            <video 
              src="/startup_pitches.mp4" 
              autoPlay 
              loop 
              muted 
              playsInline 
              className="portfolio-image" 
              style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 12%' }}
            />
            <div className="portfolio-content">
              <h4>Investor Room</h4>
              <p>Showcase your product to the world.</p>
              <span className="see-full-video-link">See Full Video →</span>
            </div>
          </a>
          <a 
            href="https://www.instagram.com/reel/DV81VjBoM8U/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="portfolio-item animate-scale-in" 
            style={{ transitionDelay: '0.1s' }}
          >
            <video 
              src="/tech_events.mp4" 
              autoPlay 
              loop 
              muted 
              playsInline 
              className="portfolio-image" 
              style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 12%' }}
            />
            <div className="portfolio-content">
              <h4>Tech Events</h4>
              <p>End-to-End coverage for your release day.</p>
              <span className="see-full-video-link">See Full Video →</span>
            </div>
          </a>
          <a 
            href="https://www.instagram.com/reel/DTSnoIGEkOc/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="portfolio-item animate-scale-in" 
            style={{ transitionDelay: '0.2s' }}
          >
            <video 
              src="/event_coverage.mp4" 
              autoPlay 
              loop 
              muted 
              playsInline 
              className="portfolio-image" 
              style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 12%' }}
            />
            <div className="portfolio-content">
              <h4>Event Coverage</h4>
              <p>High-quality summaries of tech events.</p>
              <span className="see-full-video-link">See Full Video →</span>
            </div>
          </a>
        </div>
        
        <div className="services-cta text-center mt-12">
          <a href="https://www.instagram.com/_techlenz/" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-large">See More on Instagram</a>
        </div>
      </div>
    </section>
  );
};

export default Services;
