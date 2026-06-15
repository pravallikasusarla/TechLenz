import React, { useState } from 'react';

const BecomePartner = () => {
  const [step, setStep] = useState('form');
  const [companyName, setCompanyName] = useState('');
  const [ceoName, setCeoName] = useState('');
  const [contactNumber, setContactNumber] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!companyName.trim() || !ceoName.trim() || !contactNumber.trim()) return;
    setStep('success');
  };

  return (
    <section className="join-section" id="partner-form">
      <div className="container">
        <div className="join-card animate-slide-up">
          {step === 'form' ? (
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
                <p className="section-label">PARTNERSHIPS</p>
                <h2><span className="text-accent">Become a Partner</span> with TechLenz</h2>
                <p>We partner with top companies to deliver exceptional tech storytelling. Fill out the details below to get started.</p>
              </div>

              <div className="join-grid" style={{ display: 'block', maxWidth: '600px', margin: '0 auto' }}>
                <form className="join-form" onSubmit={handleSubmit}>
                  <div className="form-field-group">
                    <label htmlFor="company-name">Company Name <span className="required-star">*</span></label>
                    <input
                      id="company-name"
                      type="text"
                      placeholder="Enter your company name"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-field-group">
                    <label htmlFor="ceo-name">CEO Name <span className="required-star">*</span></label>
                    <input
                      id="ceo-name"
                      type="text"
                      placeholder="Enter the CEO's name"
                      value={ceoName}
                      onChange={(e) => setCeoName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-field-group">
                    <label htmlFor="contact-number">Contact Number / Email <span className="required-star">*</span></label>
                    <input
                      id="contact-number"
                      type="text"
                      placeholder="Enter a contact number or email"
                      value={contactNumber}
                      onChange={(e) => setContactNumber(e.target.value)}
                      required
                    />
                  </div>

                  <button type="submit" className="btn btn-primary btn-full mt-4" style={{ width: '100%', padding: '15px' }}>
                    Submit Partnership Request
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="join-success-screen">
              <h2>Thank you!</h2>
              <p>We received your partnership request for {companyName}. We will reach out to you using the provided contact details soon.</p>
              <button type="button" className="btn btn-outline btn-small mt-4" onClick={() => setStep('form')} style={{ padding: '10px 20px' }}>
                Submit another request
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BecomePartner;
