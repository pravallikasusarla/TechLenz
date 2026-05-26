import React, { useState, useEffect, useRef } from 'react';

const JoinTechLenz = () => {
  const [joinStep, setJoinStep] = useState('form');
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [interest, setInterest] = useState('');
  const [isInterestDropdownOpen, setIsInterestDropdownOpen] = useState(false);
  const [experience, setExperience] = useState('No');
  const [portfolio, setPortfolio] = useState('');
  const [whyJoin, setWhyJoin] = useState('');
  const interestRef = useRef(null);

  const interestOptions = [
    'Content Creator',
    'Event Producer',
    'Community Partner',
    'Director',
    'Mentor',
    'Other'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !contact.trim() || !interest.trim() || !whyJoin.trim()) return;
    if (experience === 'Yes' && !portfolio.trim()) return;
    setJoinStep('success');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (interestRef.current && !interestRef.current.contains(event.target)) {
        setIsInterestDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <section className="join-section" id="join">
      <div className="container">
        <div className="join-card animate-slide-up">
          {joinStep === 'form' ? (
            <>
              <div className="join-back-nav" style={{ marginBottom: '30px', textAlign: 'left' }}>
                <a
                  href="#"
                  className="join-back-link"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.hash = '';
                  }}
                  style={{
                    color: '#666',
                    textDecoration: 'none',
                    fontSize: '0.95rem',
                    fontWeight: '700',
                    display: 'inline-flex',
                    alignItems: 'center',
                    transition: 'color 0.2s'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#e05326'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = '#666'; }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginRight: '8px' }}>
                    <line x1="19" y1="12" x2="5" y2="12"></line>
                    <polyline points="12 19 5 12 12 5"></polyline>
                  </svg>
                  Back to Homepage
                </a>
              </div>
              <div className="section-header text-center">
                <p className="section-label">JOIN TECHLENZ</p>
                <h2><span className="text-accent">Want to become part</span> of our tech storytelling crew?</h2>
                <p>Whether you're a creator, mentor, or event specialist, we want people who are excited to join TechLenz and grow with us.</p>
              </div>

              <div className="join-grid">
                <div className="join-features">
                  <div className="feature-item">
                    <h3>What we look for</h3>
                    <p>Passion for tech, strong storytelling, and a desire to help early-stage founders stand out.</p>
                  </div>
                  <div className="feature-item">
                    <h3>Who can join</h3>
                    <p>Content creators, community builders, event photographers, videographers, and startup supporters.</p>
                  </div>
                  <div className="feature-item">
                    <h3>Why TechLenz</h3>
                    <p>Join a fast-moving media collective that champions founders, events, product launches, and deep tech culture.</p>
                  </div>
                </div>

                <form className="join-form" onSubmit={handleSubmit}>
                  <div className="form-field-group">
                    <label htmlFor="join-name">Your Name <span className="required-star">*</span></label>
                    <input
                      id="join-name"
                      type="text"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-field-group">
                    <label htmlFor="join-contact">Email or Instagram <span className="required-star">*</span></label>
                    <input
                      id="join-contact"
                      type="text"
                      placeholder="@handle or email address"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-field-group" ref={interestRef}>
                    <label>Your Interest <span className="required-star">*</span></label>
                    <div className={`custom-dropdown-container ${isInterestDropdownOpen ? 'active' : ''}`}>
                      <div
                        className={`custom-dropdown-trigger ${interest ? 'has-value' : ''} ${isInterestDropdownOpen ? 'active' : ''}`}
                        onClick={() => setIsInterestDropdownOpen(!isInterestDropdownOpen)}
                      >
                        <span>{interest || 'Select your interest'}</span>
                        <svg className={`chevron-icon ${isInterestDropdownOpen ? 'open' : ''}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </div>
                      {isInterestDropdownOpen && (
                        <div className="custom-dropdown-options">
                          {interestOptions.map((option) => (
                            <div
                              key={option}
                              className={`custom-dropdown-option ${interest === option ? 'selected' : ''}`}
                              onClick={() => {
                                setInterest(option);
                                setIsInterestDropdownOpen(false);
                              }}
                            >
                              {option}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="form-field-group">
                    <label>Do you have relevant experience? <span className="required-star">*</span></label>
                    <div className="radio-toggle-group">
                      <label className={`radio-toggle ${experience === 'Yes' ? 'active' : ''}`}>
                        <input
                          type="radio"
                          name="experience"
                          value="Yes"
                          checked={experience === 'Yes'}
                          onChange={(e) => setExperience(e.target.value)}
                        />
                        <span className="radio-circle"></span>
                        Yes
                      </label>
                      <label className={`radio-toggle ${experience === 'No' ? 'active' : ''}`}>
                        <input
                          type="radio"
                          name="experience"
                          value="No"
                          checked={experience === 'No'}
                          onChange={(e) => setExperience(e.target.value)}
                        />
                        <span className="radio-circle"></span>
                        No
                      </label>
                    </div>
                  </div>

                  {experience === 'Yes' && (
                    <div className="form-field-group">
                      <label htmlFor="join-portfolio">Portfolio of your work <span className="required-star">*</span></label>
                      <textarea
                        id="join-portfolio"
                        rows="4"
                        placeholder="Share links or a short summary of your portfolio"
                        value={portfolio}
                        onChange={(e) => setPortfolio(e.target.value)}
                        required
                      />
                    </div>
                  )}

                  <div className="form-field-group">
                    <label htmlFor="join-why">Why do you want to join TechLenz? <span className="required-star">*</span></label>
                    <textarea
                      id="join-why"
                      rows="4"
                      placeholder="Tell us what excites you about joining the crew"
                      value={whyJoin}
                      onChange={(e) => setWhyJoin(e.target.value)}
                      required
                    />
                  </div>

                  <button type="submit" className="btn btn-primary btn-full mt-4">
                    Send join request
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="join-success-screen">
              <h2>Thank you, {name}!</h2>
              <p>We received your join request and will reach out using {contact} soon. Get ready to explore new tech stories with TechLenz.</p>
              <button type="button" className="btn btn-outline btn-small mt-4" onClick={() => setJoinStep('form')}>
                Submit another request
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default JoinTechLenz;
