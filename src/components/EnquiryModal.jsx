import React, { useState, useEffect, useRef } from 'react';
import './EnquiryModal.css';

const EnquiryModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formValues, setFormValues] = useState({
    fullName: '',
    countryCode: '+91',
    mobile: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const hasTriggeredRef = useRef(false);

  // Define country options
  const countries = [
    { code: '+91', label: 'IN - India (+91)' },
    { code: '+1', label: 'US - United States (+1)' },
    { code: '+44', label: 'UK - United Kingdom (+44)' },
    { code: '+971', label: 'AE - United Arab Emirates (+971)' },
    { code: '+65', label: 'SG - Singapore (+65)' },
    { code: '+61', label: 'AU - Australia (+61)' },
    { code: '+1-CA', label: 'CA - Canada (+1)' },
    { code: '+49', label: 'DE - Germany (+49)' },
    { code: '+27', label: 'ZA - South Africa (+27)' },
    { code: '+64', label: 'NZ - New Zealand (+64)' }
  ];

  // Helper to open the modal
  const openModal = () => {
    if (!hasTriggeredRef.current) {
      setIsOpen(true);
      hasTriggeredRef.current = true;
    }
  };

  // Helper to close the modal
  const closeModal = () => {
    setIsOpen(false);
    // Ensure we also lock the trigger ref so it doesn't fire again during this load
    hasTriggeredRef.current = true;
  };

  // Force open modal (e.g. from the floating badge)
  const forceOpenModal = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    // 1. Auto-popup after 1.5 seconds (to allow preloader to clear)
    const popupTimer = setTimeout(() => {
      if (!hasTriggeredRef.current) {
        openModal();
      }
    }, 1500);

    // 2. Click listener for "as soon as they click on the website"
    const handleFirstClick = (e) => {
      // Don't trigger if the click was inside a link, button, or the preloader itself
      if (
        e.target.closest('a') ||
        e.target.closest('button') ||
        e.target.closest('.preloader-overlay')
      ) {
        return;
      }

      if (!hasTriggeredRef.current) {
        openModal();
        // Remove listener once triggered
        document.removeEventListener('click', handleFirstClick);
      }
    };

    document.addEventListener('click', handleFirstClick);

    // 3. Escape key listener to close modal
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // 4. Custom event listener to open modal from other components (e.g. Chatbot)
    const handleOpenCustomEvent = () => {
      setIsOpen(true);
    };
    window.addEventListener('open-enquiry-modal', handleOpenCustomEvent);

    return () => {
      clearTimeout(popupTimer);
      document.removeEventListener('click', handleFirstClick);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-enquiry-modal', handleOpenCustomEvent);
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value
    }));

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formValues.fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
    }

    if (!formValues.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^\d{7,12}$/.test(formValues.mobile.replace(/\s+/g, ''))) {
      newErrors.mobile = 'Please enter a valid mobile number (7-12 digits)';
    }

    if (!formValues.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitted(true);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target.classList.contains('enquiry-modal-overlay')) {
      closeModal();
    }
  };

  const resetForm = () => {
    setFormValues({
      fullName: '',
      countryCode: '+91',
      mobile: '',
      email: '',
      message: ''
    });
    setErrors({});
    setIsSubmitted(false);
    closeModal();
  };

  return (
    <>
      {/* Floating Side Badge Trigger */}
      <div 
        className="enquiry-floating-badge" 
        onClick={forceOpenModal}
        title="Open Enquiry Form"
        id="enquiry-badge"
      >
        <span className="enquiry-badge-dot"></span>
        Enquire Now
      </div>

      {/* Modal Popup Overlay */}
      <div 
        className={`enquiry-modal-overlay ${isOpen ? 'active' : ''}`} 
        onClick={handleBackdropClick}
      >
        <div className="enquiry-modal-container">
          
          {/* Header Panel */}
          <div className="enquiry-modal-header">
            <h2 className="enquiry-modal-title">Enquire Now</h2>
            <button 
              className="enquiry-modal-close" 
              onClick={closeModal} 
              aria-label="Close modal"
              id="enquiry-close-btn"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          {/* Body Panel */}
          <div className="enquiry-modal-body">
            <div className="enquiry-modal-inner-frame">
              
              {!isSubmitted ? (
                <>
                  <p className="enquiry-modal-subtitle">
                    TechLenz - <span>Tech Coverage</span>
                  </p>

                  <form className="enquiry-form" onSubmit={handleSubmit}>
                    
                    {/* Full Name Field */}
                    <div className="enquiry-field-group">
                      <input
                        type="text"
                        name="fullName"
                        value={formValues.fullName}
                        onChange={handleInputChange}
                        placeholder="Full Name"
                        className="enquiry-input"
                        required
                        id="enquiry-fullName"
                      />
                      {errors.fullName && <span className="enquiry-error-msg">{errors.fullName}</span>}
                    </div>

                    {/* Country Code Selection */}
                    <div className="enquiry-field-group">
                      <select
                        name="countryCode"
                        value={formValues.countryCode}
                        onChange={handleInputChange}
                        className="enquiry-select"
                        id="enquiry-countryCode"
                      >
                        {countries.map((country) => (
                          <option key={country.code} value={country.code}>
                            {country.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Mobile Number Field */}
                    <div className="enquiry-field-group">
                      <input
                        type="tel"
                        name="mobile"
                        value={formValues.mobile}
                        onChange={handleInputChange}
                        placeholder="Mobile no without country code*"
                        className="enquiry-input"
                        required
                        id="enquiry-mobile"
                      />
                      {errors.mobile && <span className="enquiry-error-msg">{errors.mobile}</span>}
                    </div>

                    {/* Email Field */}
                    <div className="enquiry-field-group">
                      <input
                        type="email"
                        name="email"
                        value={formValues.email}
                        onChange={handleInputChange}
                        placeholder="Email"
                        className="enquiry-input"
                        required
                        id="enquiry-email"
                      />
                      {errors.email && <span className="enquiry-error-msg">{errors.email}</span>}
                    </div>

                    {/* Message Field */}
                    <div className="enquiry-field-group">
                      <input
                        type="text"
                        name="message"
                        value={formValues.message}
                        onChange={handleInputChange}
                        placeholder="Message"
                        className="enquiry-input"
                        id="enquiry-message"
                      />
                    </div>

                    {/* Submit Button */}
                    <button 
                      type="submit" 
                      className="enquiry-submit-btn"
                      id="enquiry-submit-btn"
                    >
                      Submit
                    </button>

                  </form>
                </>
              ) : (
                /* Success Screen */
                <div className="enquiry-success-view">
                  <div className="enquiry-success-icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  
                  <h3 className="enquiry-success-title">
                    Enquiry <span>Submitted!</span>
                  </h3>
                  <p className="enquiry-success-text">
                    Thank you for reaching out. We have logged your request and our sales team will contact you shortly.
                  </p>

                  <div className="enquiry-receipt">
                    <div className="enquiry-receipt-row">
                      <span className="enquiry-receipt-label">NAME</span>
                      <span className="enquiry-receipt-val">{formValues.fullName}</span>
                    </div>
                    <div className="enquiry-receipt-row">
                      <span className="enquiry-receipt-label">CONTACT</span>
                      <span className="enquiry-receipt-val">
                        {formValues.countryCode} {formValues.mobile}
                      </span>
                    </div>
                    <div className="enquiry-receipt-row">
                      <span className="enquiry-receipt-label">EMAIL</span>
                      <span className="enquiry-receipt-val">{formValues.email}</span>
                    </div>
                    {formValues.message.trim() && (
                      <div className="enquiry-receipt-row">
                        <span className="enquiry-receipt-label">MESSAGE</span>
                        <span className="enquiry-receipt-val">{formValues.message}</span>
                      </div>
                    )}
                    <div className="enquiry-receipt-row">
                      <span className="enquiry-receipt-label">STATUS</span>
                      <span className="enquiry-receipt-val accent">LOGGED // ACTIVE</span>
                    </div>
                  </div>

                  <button 
                    onClick={resetForm} 
                    className="enquiry-submit-btn"
                    style={{ marginTop: '0' }}
                    id="enquiry-success-close-btn"
                  >
                    Close Window
                  </button>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default EnquiryModal;
