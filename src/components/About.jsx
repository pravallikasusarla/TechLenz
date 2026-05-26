import React from 'react';

const About = () => {
  return (
    <section className="about-section" id="about">

      
      <div className="container about-grid">
        <div className="about-visual animate-slide-right">
          <div className="filming-illustration-container">
            {/* The filming character */}
            <div className="illustration-wrapper">
              <img src="/filming_person.png" alt="Filming with Smartphone" className="filming-person-img" />
              <div className="recording-status">
                <span className="rec-status-dot"></span> RECORDING LIVE
              </div>
            </div>

            {/* Instagram Posting Flow Card */}
            <div className="instagram-upload-card">
              <div className="ig-header">
                <div className="ig-avatar">TL</div>
                <div className="ig-user-info">
                  <span className="ig-username">techlenz</span>
                  <span className="ig-location">Live Event Coverage</span>
                </div>
                <span className="ig-more">•••</span>
              </div>
              
              <div className="ig-media-preview">
                <div className="ig-video-sim">
                  <svg className="sim-rocket-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="23 7 16 12 23 17 23 7"></polygon>
                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                  </svg>
                  <div className="sim-tag">HACKATHON LIVE</div>
                  <div className="sim-progress-bar">
                    <div className="sim-progress-fill"></div>
                  </div>
                </div>
              </div>
              
              <div className="ig-actions">
                <div className="ig-action-icons">
                  <svg className="ig-icon ig-heart-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                  </svg>
                  <svg className="ig-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                  </svg>
                  <svg className="ig-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                </div>
                <svg className="ig-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path>
                </svg>
              </div>
              
              <div className="ig-caption-status">
                <p><strong>techlenz</strong> Capturing another incredible milestone! Delivering coverage by the End of Day.</p>
                <div className="ig-upload-state-text">Uploading to feed...</div>
              </div>
            </div>
          </div>
        </div>

        <div className="about-text animate-slide-left">
          <div className="badge">About TechLenz</div>
          <h2>Capturing Innovation at <span className="text-accent">Scale</span>.</h2>
          <p>TechLenz was born from a simple observation by our founders: incredible technical milestones were happening every day, but rarely were they documented with the quality they deserved.</p>
          <p>We are a specialized media unit dedicated entirely to the tech ecosystem. Whether it's a 24-hour hackathon, a startup pitch, or a major product launch, we bring cinema-quality production to the world of software engineering and entrepreneurship.</p>
          
          <div className="stats-grid">
            <div className="stat-item">
              <h3 className="stat-number">50+</h3>
              <p>Events Covered</p>
            </div>
            <div className="stat-item">
              <h3 className="stat-number">24h</h3>
              <p>Turnaround Time</p>
            </div>
            <div className="stat-item">
              <h3 className="stat-number">4K</h3>
              <p>Cinematic Quality</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
