import React from 'react';
import './About.css';

const About = () => {
  return (
    <section className="about-section" id="about">
      {/* Camera Viewfinder Background Animation */}
      <div className="about-bg-viewfinder" aria-hidden="true">
        <div className="vf-corner vf-tl"></div>
        <div className="vf-corner vf-tr"></div>
        <div className="vf-corner vf-bl"></div>
        <div className="vf-corner vf-br"></div>

        <div className="vf-rec">
          <span className="rec-dot"></span> REC
        </div>
        <div className="vf-focus-center">+</div>

        <div className="vf-data-left">
          <div className="vf-bar"></div>
          <div className="vf-bar"></div>
          <div className="vf-bar"></div>
        </div>

        <div className="vf-data-right">
          <div className="vf-bar"></div>
          <div className="vf-bar"></div>
          <div className="vf-bar"></div>
        </div>

        <div className="bg-lens-rings">
          <div className="lens-ring ring-1"></div>
          <div className="lens-ring ring-2"></div>
          <div className="lens-ring ring-3">
            <div className="lens-core"></div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="section-header text-center animate-slide-up">
          <p className="section-label">Capturing Innovation at Scale</p>
          <h2>About <span className="text-accent">TechLenz</span></h2>
        </div>

        <div className="about-content-centered">
          <div className="about-text-content animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <p>TechLenz was born from a simple observation by our founders. Incredible technical milestones were happening every day, but rarely were they documented with the quality they deserved.</p>
            <p>We are a specialized media unit dedicated entirely to the tech ecosystem. Whether it's a 24-hour hackathon, a startup pitch, or a major product launch, we bring high-quality production to the world of software engineering and entrepreneurship with our <span className="text-accent" style={{ whiteSpace: 'nowrap' }}>EOD Delivery System</span>.</p>
          </div>

          <div className="stats-grid animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="stat-item">
              <h3 className="stat-number">18+</h3>
              <p>Events Covered</p>
            </div>
            <div className="stat-item">
              <h3 className="stat-number">24h</h3>
              <p>Turnaround Time</p>
            </div>
            <div className="stat-item">
              <h3 className="stat-number">4K</h3>
              <p>High Quality</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
