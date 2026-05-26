import React from 'react';

const Process = () => {
  return (
    <section className="how-it-works bg-light" id="coverage">

      
      <div className="container">
        <div className="section-header text-center">
          <h2>Our <span className="text-accent">Process</span></h2>
          <p>End-to-End tech launch coverage for your startup.</p>
        </div>

        <div className="steps-grid">
          <div className="step-card capture">
            <div className="step-number">01</div>
            <div className="step-icon-wrapper">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="22" y1="12" x2="18" y2="12"></line>
                <line x1="6" y1="12" x2="2" y2="12"></line>
                <line x1="12" y1="6" x2="12" y2="2"></line>
                <line x1="12" y1="22" x2="12" y2="18"></line>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            </div>
            <h3>Capture</h3>
            <p>We provide full coverage of your startup pitch, product launch, or technical event with high-end equipment.</p>
          </div>
          
          <div className="step-card build">
            <div className="step-number">02</div>
            <div className="step-icon-wrapper">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 10h16"></path>
                <path d="M4 14h16"></path>
                <rect x="8" y="7" width="2" height="10" rx="1"></rect>
                <rect x="14" y="7" width="2" height="10" rx="1"></rect>
                <circle cx="5" cy="5" r="1"></circle>
                <circle cx="19" cy="5" r="1"></circle>
                <circle cx="5" cy="19" r="1"></circle>
                <circle cx="19" cy="19" r="1"></circle>
              </svg>
            </div>
            <h3>Build</h3>
            <p>Our team rapidly edits and structures the footage to highlight your entrepreneurial vision and technical milestones.</p>
          </div>
          
          <div className="step-card deliver">
            <div className="step-number">03</div>
            <div className="step-icon-wrapper">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>
              </svg>
            </div>
            <h3>Deliver</h3>
            <p>Experience our signature EOD (End of Day) delivery. Get polished, launch-ready content precisely when you need it.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
