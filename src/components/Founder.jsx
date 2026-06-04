import React from 'react';
import './Founder.css';

const Founder = () => {
  return (
    <section className="founder-section" id="founder">
      {/* Scrolling Background Marquee */}
      <div className="founder-marquee-bg" aria-hidden="true">
        <div className="founder-marquee-track">
          {[...Array(6)].map((_, i) => (
            <span key={i} className="founder-marquee-word">BEYOND THE LENS</span>
          ))}
          {[...Array(6)].map((_, i) => (
            <span key={i + 6} className="founder-marquee-word">BEYOND THE LENS</span>
          ))}
        </div>
      </div>
      <div className="founder-bg-grid"></div>

      <div className="founder-floating-shape shape-1"></div>
      <div className="founder-floating-shape shape-2"></div>

      <div className="container">
        <div className="section-header text-center mb-12">
          <h2>Meet the <span className="text-accent">Team</span> of TechLenz</h2>
        </div>

        <div className="founder-grid">
          {/* Crew Card 1: Karthika Reddy */}
          <div className="founder-card placeholder-card animate-slide-up">
            <div className="founder-image-wrapper">
              <div className="tech-lens-container founder-lens-container placeholder-lens">
                <img src="/karthika1tl.png" alt="Karthika Reddy" className="founder-image" />
              </div>
            </div>

            <div className="founder-card-info">
              <h3 className="founder-name">Karthika Reddy</h3>
              <p className="founder-role">Co-Founder</p>
              <p className="founder-description">
                The operational heart and creative strategist of TechLenz, dedicated to bringing production excellence and seamless execution to every tech event. With a sharp eye for visual narratives and a passion for ecosystem growth, she ensures that every brand's milestone is captured with impact.
              </p>
            </div>
          </div>

          {/* Crew Card 2: Naga Reddy */}
          <div className="founder-card placeholder-card animate-slide-up">
            <div className="founder-image-wrapper">
              <div className="tech-lens-container founder-lens-container placeholder-lens">
                <img src="/naga1tl.png" alt="Naga Reddy" className="founder-image" />
              </div>
            </div>

            <div className="founder-card-info">
              <h3 className="founder-name">Naga Reddy</h3>
              <p className="founder-role">Co-Founder & Business Executive</p>
              <p className="founder-description">
                Leading business strategy, brand partnerships, and operational scaling at TechLenz. Driving growth and expanding our creative footprint across the startup and tech ecosystem.
              </p>
            </div>
          </div>

          {/* Crew Card 3: Saikrishna */}
          <div className="founder-card placeholder-card animate-slide-up">
            <div className="founder-image-wrapper">
              <div className="tech-lens-container founder-lens-container placeholder-lens">
                <img src="/saikrishnatl.png" alt="Saikrishna" className="founder-image" />
              </div>
            </div>

            <div className="founder-card-info">
              <h3 className="founder-name">Sai Krishna</h3>
              <p className="founder-role">Regional Head - Bangalore</p>
              <p className="founder-description">
                Directing regional growth and executing premier media productions in Bangalore. Dedicated to scaling TechLenz's presence and delivering exceptional event coverage and brand storytelling for the local startup ecosystem.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Founder;
