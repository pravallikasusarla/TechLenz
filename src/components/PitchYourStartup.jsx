import React, { useState, useRef, useEffect } from 'react';
import './PitchYourStartup.css';

const PitchYourStartup = () => {
  const [activeTab, setActiveTab] = useState('elevator'); // 'elevator' or 'normal'
  const [founderName, setFounderName] = useState('');
  const [startupName, setStartupName] = useState('');
  const [email, setEmail] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [pitchDesc, setPitchDesc] = useState('');

  // Elevator Pitch States
  const [videoFile, setVideoFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [elevatorSuccess, setElevatorSuccess] = useState(false);
  const fileInputRef = useRef(null);

  // Normal Pitch States
  const [selectedTier, setSelectedTier] = useState('growth'); // 'growth', 'scale', 'launch'
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredSession, setPreferredSession] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [premiumSuccess, setPremiumSuccess] = useState(false);
  
  const todayStr = new Date().toLocaleDateString('sv-SE');

  const pricingTiers = {
    growth: { name: 'Growth Tier', price: 999, desc: 'Newsletter written pitch + social highlight.' },
    scale: { name: 'Scale Tier', price: 1999, desc: '5-minute video pitch editorial review + custom article.' },
    launch: { name: 'Launch Tier', price: 3999, desc: 'Full video interview slot + primary homepage feature.' }
  };

  // Drag and drop handlers
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file) => {
    if (!file.type.startsWith('video/')) {
      alert('Please upload a valid video file.');
      return;
    }
    
    setVideoFile(file);
    setIsUploading(true);
    setUploadProgress(0);
  };

  // Simulate file upload progress
  useEffect(() => {
    let interval;
    if (isUploading && uploadProgress < 100) {
      interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsUploading(false);
            return 100;
          }
          return prev + 10;
        });
      }, 150);
    }
    return () => clearInterval(interval);
  }, [isUploading, uploadProgress]);

  const removeFile = (e) => {
    e.stopPropagation();
    setVideoFile(null);
    setUploadProgress(0);
    setIsUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleElevatorSubmit = (e) => {
    e.preventDefault();
    if (!videoFile || uploadProgress < 100) return;
    setElevatorSuccess(true);
  };

  const handlePremiumSubmit = (e) => {
    e.preventDefault();
    if (founderName && startupName && email && preferredDate && preferredSession) {
      setPremiumSuccess(true);
    }
  };

  const resetAll = () => {
    setFounderName('');
    setStartupName('');
    setEmail('');
    setLinkedin('');
    setPitchDesc('');
    setVideoFile(null);
    setUploadProgress(0);
    setIsUploading(false);
    setElevatorSuccess(false);
    setPremiumSuccess(false);
    setSelectedTier('growth');
    setPreferredDate('');
    setPreferredSession('');
  };

  return (
    <section className="pitch-section" id="pitch">
      <div className="container">
        
        {/* Back Link */}
        <div className="pitch-back-nav" style={{ marginBottom: '30px', textAlign: 'left' }}>
          <a 
            href="#" 
            className="pitch-back-link" 
            onClick={(e) => { e.preventDefault(); window.location.hash = ''; }}
            style={{ 
              color: '#666', 
              textDecoration: 'none', 
              fontSize: '0.95rem', 
              fontWeight: '700',
              display: 'inline-flex',
              alignItems: 'center',
              transition: 'color 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.color = '#e05326'}
            onMouseLeave={(e) => e.target.style.color = '#666'}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginRight: '8px' }}>
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Back to Homepage
          </a>
        </div>

        {/* Section Header */}
        <div className="section-header text-center mb-12">
          <p className="section-label">STARTUP RADAR</p>
          <h2>Pitch Your <span className="text-accent">Startup</span></h2>
          <p className="section-sub">Get your product covered, featured, or interviewed by the TechLenz production crew.</p>
        </div>

        {/* Outer Form Card */}
        <div className="pitch-card">
          
          {/* Main Success Screen: Elevator */}
          {elevatorSuccess && (
            <div className="pitch-receipt-screen">
              <div className="receipt-icon-wrapper">
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <h2>Pitch Uploaded Successfully!</h2>
              <p>Your 30-60 second elevator video pitch has been queued for editor review.</p>
              
              <div className="receipt-receipt-box">
                <div className="receipt-header-txt">Pitch Receipt</div>
                <div className="receipt-line-item">
                  <span className="receipt-lbl">Startup Name</span>
                  <span className="receipt-val">{startupName}</span>
                </div>
                <div className="receipt-line-item">
                  <span className="receipt-lbl">Founder Name</span>
                  <span className="receipt-val">{founderName}</span>
                </div>
                <div className="receipt-line-item">
                  <span className="receipt-lbl">Format Type</span>
                  <span className="receipt-val">Elevator Pitch (Video)</span>
                </div>
                <div className="receipt-line-item">
                  <span className="receipt-lbl">File Name</span>
                  <span className="receipt-val">{videoFile?.name}</span>
                </div>
                <div className="receipt-line-item">
                  <span className="receipt-lbl">Verification Status</span>
                  <span className="receipt-val highlight">30-60s Enforced</span>
                </div>
                <div className="receipt-line-item">
                  <span className="receipt-lbl">Submission Fee</span>
                  <span className="receipt-val price">FREE</span>
                </div>
                <div className="receipt-footer-txt">
                  We will contact you via {email} if your pitch is selected for highlight.
                </div>
              </div>

              <button className="pitch-receipt-back-btn" onClick={resetAll}>Submit Another Pitch</button>
            </div>
          )}

          {/* Main Success Screen: Premium */}
          {premiumSuccess && (
            <div className="pitch-receipt-screen">
              <div className="receipt-icon-wrapper" style={{ borderColor: '#27c93f', color: '#27c93f', background: '#f2fbf5' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
              </div>
              <h2>Premium Slot Booked!</h2>
              <p>Your customized pitch review and editorial production slot has been scheduled.</p>
              
              <div className="receipt-receipt-box">
                <div className="receipt-header-txt">Payment Receipt</div>
                <div className="receipt-line-item">
                  <span className="receipt-lbl">Startup Name</span>
                  <span className="receipt-val">{startupName}</span>
                </div>
                <div className="receipt-line-item">
                  <span className="receipt-lbl">Booking Tier</span>
                  <span className="receipt-val">{pricingTiers[selectedTier].name}</span>
                </div>
                <div className="receipt-line-item">
                  <span className="receipt-lbl">Preferred Date</span>
                  <span className="receipt-val">{preferredDate}</span>
                </div>
                <div className="receipt-line-item">
                  <span className="receipt-lbl">Session Slot</span>
                  <span className="receipt-val">{preferredSession}</span>
                </div>
                <div className="receipt-line-item">
                  <span className="receipt-lbl">Payment Status</span>
                  <span className="receipt-val highlight">Demo Paid / Confirmed</span>
                </div>
                <div className="receipt-line-item">
                  <span className="receipt-lbl">Amount Charged</span>
                  <span className="receipt-val price">₹{pricingTiers[selectedTier].price.toLocaleString('en-IN')}</span>
                </div>
                <div className="receipt-footer-txt">
                  Invoice sent to {email}. Prepare your media deck for our production meeting!
                </div>
              </div>

              <button className="pitch-receipt-back-btn" onClick={resetAll}>Return to Console</button>
            </div>
          )}

          {/* Normal Forms Render */}
          {!elevatorSuccess && !premiumSuccess && (
            <>
              {/* Tabs */}
              <div className="pitch-tabs-container">
                <div className="pitch-tabs">
                  <button 
                    className={`pitch-tab-btn ${activeTab === 'elevator' ? 'active' : ''}`}
                    onClick={() => setActiveTab('elevator')}
                  >
                    Elevator Pitch
                  </button>
                  <button 
                    className={`pitch-tab-btn ${activeTab === 'normal' ? 'active' : ''}`}
                    onClick={() => setActiveTab('normal')}
                  >
                    Normal/Premium Pitch
                  </button>
                </div>
              </div>

              {/* Tab 1: Elevator Pitch */}
              {activeTab === 'elevator' && (
                <div className="elevator-pitch-container">
                  <form onSubmit={handleElevatorSubmit}>
                    
                    {/* Notice Banner */}
                    <div className="pitch-notice-banner">
                      <svg className="pitch-notice-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                      </svg>
                      <div>
                        <strong>Elevator Pitch Guidelines:</strong> Elevator pitches are free submissions. Videos must be strictly between <strong>30 to 60 seconds</strong> in length. Introduce yourself, detail the problem you are solving, and show your product!
                      </div>
                    </div>

                    {/* Form Fields */}
                    <div className="pitch-form-grid">
                      <div className="pitch-form-group">
                        <label htmlFor="ep-founder">Founder Name *</label>
                        <input 
                          type="text" 
                          id="ep-founder"
                          className="pitch-input"
                          value={founderName} 
                          onChange={(e) => setFounderName(e.target.value)} 
                          placeholder="Your Name"
                          required 
                        />
                      </div>
                      
                      <div className="pitch-form-group">
                        <label htmlFor="ep-startup">Startup Name *</label>
                        <input 
                          type="text" 
                          id="ep-startup"
                          className="pitch-input"
                          value={startupName} 
                          onChange={(e) => setStartupName(e.target.value)} 
                          placeholder="Startup/Product Name"
                          required 
                        />
                      </div>

                      <div className="pitch-form-group">
                        <label htmlFor="ep-email">Email Address *</label>
                        <input 
                          type="email" 
                          id="ep-email"
                          className="pitch-input"
                          value={email} 
                          onChange={(e) => setEmail(e.target.value)} 
                          placeholder="hello@startup.com"
                          required 
                        />
                      </div>

                      <div className="pitch-form-group">
                        <label htmlFor="ep-linkedin">LinkedIn Profile</label>
                        <input 
                          type="url" 
                          id="ep-linkedin"
                          className="pitch-input"
                          value={linkedin} 
                          onChange={(e) => setLinkedin(e.target.value)} 
                          placeholder="https://linkedin.com/in/username"
                        />
                      </div>

                      <div className="pitch-form-group full-width">
                        <label htmlFor="ep-desc">One-sentence Pitch *</label>
                        <textarea 
                          id="ep-desc"
                          className="pitch-input pitch-textarea"
                          value={pitchDesc} 
                          onChange={(e) => setPitchDesc(e.target.value)} 
                          placeholder="Briefly describe what your startup does..."
                          required
                        />
                      </div>

                      {/* Drag & Drop Zone */}
                      <div className="pitch-form-group full-width">
                        <label>Video Pitch File (30-60s) *</label>
                        
                        <div 
                          className={`pitch-upload-zone ${dragActive ? 'drag-active' : ''}`}
                          onDragEnter={handleDrag}
                          onDragOver={handleDrag}
                          onDragLeave={handleDrag}
                          onDrop={handleDrop}
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <input 
                            type="file" 
                            ref={fileInputRef}
                            style={{ display: 'none' }} 
                            accept="video/*"
                            onChange={handleFileChange}
                          />
                          
                          <svg className="pitch-upload-icon" xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="17 8 12 3 7 8"></polyline>
                            <line x1="12" y1="3" x2="12" y2="15"></line>
                          </svg>

                          <p className="pitch-upload-text">
                            Drag & drop your video here, or <strong>browse files</strong>
                          </p>
                          <p className="pitch-upload-subtext">
                            Supports MP4, MOV, or WebM (Max 50MB, length: 30-60s)
                          </p>
                        </div>

                        {/* File detail status card */}
                        {videoFile && (
                          <div className="upload-status-card">
                            <div className="upload-file-info">
                              <div className="upload-file-meta">
                                <svg className="video-icon-mini" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                  <polygon points="23 7 16 12 23 17 23 7"></polygon>
                                  <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                                </svg>
                                <span className="upload-file-name">{videoFile.name}</span>
                                <span className="upload-file-size">({(videoFile.size / (1024 * 1024)).toFixed(2)} MB)</span>
                              </div>
                              <button type="button" className="upload-remove-btn" onClick={removeFile} title="Remove File">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                  <line x1="18" y1="6" x2="6" y2="18"></line>
                                  <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                              </button>
                            </div>
                            
                            <div className="upload-progress-bar-container">
                              <div 
                                className="upload-progress-bar-fill"
                                style={{ width: `${uploadProgress}%` }}
                              />
                            </div>
                            <span className="upload-progress-percent">
                              {uploadProgress < 100 ? `Uploading: ${uploadProgress}%` : 'Upload Complete!'}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <button 
                      type="submit" 
                      className="pitch-submit-btn"
                      disabled={!founderName || !startupName || !email || !videoFile || uploadProgress < 100}
                    >
                      Submit Elevator Pitch
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="22" y1="2" x2="11" y2="13"></line>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                      </svg>
                    </button>
                  </form>
                </div>
              )}

              {/* Tab 2: Normal/Premium Pitch (Paid Tier) */}
              {activeTab === 'normal' && (
                <div className="premium-pitch-layout">
                  {/* Left Side: Tier Selector */}
                  <div className="premium-tier-selection">
                    <div className="premium-headline">
                      <h3>1. Choose Pitch Package</h3>
                      <p>Select the editorial coverage level that fits your startup launch goal. We charge according to production scale.</p>
                    </div>

                    <div className="pricing-grid">
                      {Object.keys(pricingTiers).map((tierKey) => {
                        const tier = pricingTiers[tierKey];
                        return (
                          <div 
                            key={tierKey}
                            className={`pricing-card ${selectedTier === tierKey ? 'selected' : ''}`}
                            onClick={() => setSelectedTier(tierKey)}
                          >
                            <div className="pricing-card-details">
                              <span className="pricing-tier-name">{tier.name}</span>
                              <span className="pricing-tier-desc">{tier.desc}</span>
                            </div>
                            <div className="pricing-card-price">
                              <span className="price-value">₹{tier.price.toLocaleString('en-IN')}</span>
                              <span className="price-label">One-Time</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Right Side: Form Booking details */}
                  <div className="premium-booking-details">
                    <h3>2. Complete Booking</h3>
                    
                    <form onSubmit={handlePremiumSubmit}>
                      <div className="pitch-form-group mb-4">
                        <label htmlFor="np-founder">Founder Name *</label>
                        <input 
                          type="text" 
                          id="np-founder"
                          className="pitch-input"
                          value={founderName} 
                          onChange={(e) => setFounderName(e.target.value)} 
                          placeholder="Your Name"
                          required 
                        />
                      </div>

                      <div className="pitch-form-group mb-4">
                        <label htmlFor="np-startup">Startup Name *</label>
                        <input 
                          type="text" 
                          id="np-startup"
                          className="pitch-input"
                          value={startupName} 
                          onChange={(e) => setStartupName(e.target.value)} 
                          placeholder="Startup/Product Name"
                          required 
                        />
                      </div>

                      <div className="pitch-form-group mb-4">
                        <label htmlFor="np-email">Email Address *</label>
                        <input 
                          type="email" 
                          id="np-email"
                          className="pitch-input"
                          value={email} 
                          onChange={(e) => setEmail(e.target.value)} 
                          placeholder="hello@startup.com"
                          required 
                        />
                      </div>

                      <div className="pitch-form-group mb-4">
                        <label htmlFor="np-date">Preferred Date *</label>
                        <input 
                          type="date" 
                          id="np-date"
                          className="pitch-input"
                          value={preferredDate} 
                          onChange={(e) => setPreferredDate(e.target.value)} 
                          min={todayStr}
                          required 
                        />
                      </div>

                      <div className="pitch-form-group mb-6">
                        <label>Preferred Session *</label>
                        <div className="custom-dropdown-container">
                          <div 
                            className={`custom-dropdown-trigger ${preferredSession ? 'has-value' : ''} ${isDropdownOpen ? 'active' : ''}`}
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                          >
                            <span>{preferredSession || "Select a Session"}</span>
                            <svg className={`chevron-icon ${isDropdownOpen ? 'open' : ''}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                          </div>
                          
                          {isDropdownOpen && (
                            <div className="custom-dropdown-options" style={{ top: '100%', position: 'absolute', width: '100%', zIndex: 10 }}>
                              <div 
                                className="custom-dropdown-option"
                                onClick={() => {
                                  setPreferredSession('Morning Session (9 AM - 12 PM)');
                                  setIsDropdownOpen(false);
                                }}
                              >
                                Morning Session (9 AM - 12 PM)
                              </div>
                              <div 
                                className="custom-dropdown-option"
                                onClick={() => {
                                  setPreferredSession('Afternoon Session (1 PM - 4 PM)');
                                  setIsDropdownOpen(false);
                                }}
                              >
                                Afternoon Session (1 PM - 4 PM)
                              </div>
                              <div 
                                className="custom-dropdown-option"
                                onClick={() => {
                                  setPreferredSession('Evening Session (6 PM - 9 PM)');
                                  setIsDropdownOpen(false);
                                }}
                              >
                                Evening Session (6 PM - 9 PM)
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <button 
                        type="submit" 
                        className="pitch-submit-btn"
                        disabled={!founderName || !startupName || !email || !preferredDate || !preferredSession}
                      >
                        Proceed to Payment (₹{pricingTiers[selectedTier].price.toLocaleString('en-IN')})
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <line x1="12" y1="5" x2="12" y2="19"></line>
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </>
          )}

        </div>

      </div>
    </section>
  );
};

export default PitchYourStartup;
