import React, { useState } from 'react';

const CTA = () => {
  const [bookingStep, setBookingStep] = useState('booking'); // 'booking', 'success'
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [founderName, setFounderName] = useState('');
  const [startupName, setStartupName] = useState('');
  const [contactHandle, setContactHandle] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [bookingType, setBookingType] = useState('event'); // 'event' or 'other'

  // Pre-seed some booked slot combinations to show validation immediately (e.g. today's Evening Session)
  const todayStr = new Date().toLocaleDateString('sv-SE');
  const [bookedSlots, setBookedSlots] = useState([
    { date: '2026-05-23', session: 'Evening Session (6 PM - 9 PM)' },
    { date: todayStr, session: 'Evening Session (6 PM - 9 PM)' }
  ]);

  // Real-time check if the current slot combination is already booked
  const isSlotBooked = bookedSlots.some(
    (slot) => slot.date === selectedDate && slot.session === selectedTimeSlot
  );

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (isSlotBooked) return; // Prevent double booking

    if (founderName.trim() && startupName.trim() && contactHandle.trim() && selectedDate.trim() && selectedTimeSlot.trim()) {
      // Lock in the new slot client-side
      setBookedSlots([...bookedSlots, { date: selectedDate, session: selectedTimeSlot }]);
      setBookingStep('success');
    }
  };

  const resetBooking = () => {
    setBookingStep('booking');
    setSelectedDate('');
    setSelectedTimeSlot('');
    setFounderName('');
    setStartupName('');
    setContactHandle('');
    setAdditionalInfo('');
    setIsDropdownOpen(false);
    setBookingType('event');
  };

  return (
    <section className="final-cta" id="book-slot">

      
      <div className="container">
        <div className="cta-box animate-scale-in">
          {bookingStep === 'booking' && (
            <div className="booking-console">

              <div className="booking-console-header" style={{ textAlign: 'left' }}>
                <h2>Ready to Showcase your <span className="text-accent">Tech Event</span>?</h2>
                <p style={{ margin: '0 0 40px 0', maxWidth: '580px' }}>Register for your exclusive EOD launch coverage slot or any other tech event directly to our production crew.</p>
              </div>

              <form onSubmit={handleBookingSubmit} className="booking-grid-form">
                <div className="booking-grid">
                  {/* Date & Time Selectors */}
                  <div className="booking-selectors">
                    <div className="booking-header-inline">
                      <h3>1. Select Slot</h3>
                    </div>
                    
                    <div className="form-field-group mt-4">
                      <label htmlFor="launch-date"></label>
                      <input
                        id="launch-date"
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        min={todayStr}
                        required
                      />
                    </div>

                    <div className="form-field-group mt-6">
                      <label htmlFor="launch-time">Preferred Session</label>
                      <input type="hidden" value={selectedTimeSlot} required />
                      <div className="custom-dropdown-container">
                        <div 
                          className={`custom-dropdown-trigger ${selectedTimeSlot ? 'has-value' : ''} ${isDropdownOpen ? 'active' : ''}`}
                          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        >
                          <span>{selectedTimeSlot || "Select a session"}</span>
                          <svg className={`chevron-icon ${isDropdownOpen ? 'open' : ''}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="6 9 12 15 18 9"></polyline>
                          </svg>
                        </div>
                        
                        {isDropdownOpen && (
                          <div className="custom-dropdown-options">
                            <div 
                              className={`custom-dropdown-option ${selectedTimeSlot === 'Morning Session (9 AM - 12 PM)' ? 'selected' : ''}`}
                              onClick={() => {
                                setSelectedTimeSlot('Morning Session (9 AM - 12 PM)');
                                setIsDropdownOpen(false);
                              }}
                            >
                              Morning Session (9 AM - 12 PM)
                            </div>
                            <div 
                              className={`custom-dropdown-option ${selectedTimeSlot === 'Afternoon Session (1 PM - 4 PM)' ? 'selected' : ''}`}
                              onClick={() => {
                                setSelectedTimeSlot('Afternoon Session (1 PM - 4 PM)');
                                setIsDropdownOpen(false);
                              }}
                            >
                              Afternoon Session (1 PM - 4 PM)
                            </div>
                            <div 
                              className={`custom-dropdown-option ${selectedTimeSlot === 'Evening Session (6 PM - 9 PM)' ? 'selected' : ''}`}
                              onClick={() => {
                                setSelectedTimeSlot('Evening Session (6 PM - 9 PM)');
                                setIsDropdownOpen(false);
                              }}
                            >
                              Evening Session (6 PM - 9 PM)
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {isSlotBooked && (
                      <div className="slot-warning-badge">
                        <svg className="warning-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="12" y1="8" x2="12" y2="12"></line>
                          <line x1="12" y1="16" x2="12.01" y2="16"></line>
                        </svg>
                        Slot is not available
                      </div>
                    )}

                    <div className="form-field-group mt-6">
                      <label htmlFor="additional-info">Additional information to be taken care of</label>
                      <textarea
                        id="additional-info"
                        rows="3"
                        placeholder="Any special requests, launch milestones, or production notes..."
                        value={additionalInfo}
                        onChange={(e) => setAdditionalInfo(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Form Details */}
                  <div className="booking-details-form">
                    <h3>2. Booking & Coverage Details</h3>
                    
                    <div className="form-field-group">
                      <label>Coverage Type</label>
                      <div className="coverage-type-toggles">
                        <button
                          type="button"
                          className={`toggle-pill ${bookingType === 'event' ? 'active' : ''}`}
                          onClick={() => setBookingType('event')}
                        >
                          Tech Event / Conference
                        </button>
                        <button
                          type="button"
                          className={`toggle-pill ${bookingType === 'other' ? 'active' : ''}`}
                          onClick={() => setBookingType('other')}
                        >
                          Others
                        </button>
                      </div>
                    </div>
                    
                    <div className="form-field-group">
                      <label htmlFor="founder-name">
                        {bookingType === 'event' ? 'Organizer / Host Name' : 'Contact Person Name'}
                      </label>
                      <input
                        id="founder-name"
                        type="text"
                        placeholder={bookingType === 'event' ? 'Enter organizer name' : 'Enter your name'}
                        value={founderName}
                        onChange={(e) => setFounderName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-field-group">
                      <label htmlFor="startup-name">
                        {bookingType === 'event' ? 'Event / Conference Name' : 'Project / Event / Topic Name'}
                      </label>
                      <input
                        id="startup-name"
                        type="text"
                        placeholder={bookingType === 'event' ? 'Enter event name' : 'Enter project or event name'}
                        value={startupName}
                        onChange={(e) => setStartupName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-field-group">
                      <label htmlFor="ig-handle">Instagram Handle (For Confirmation)</label>
                      <input
                        id="ig-handle"
                        type="text"
                        placeholder="Enter your Instagram handle"
                        value={contactHandle}
                        onChange={(e) => setContactHandle(e.target.value)}
                        required
                      />
                    </div>

                    <button 
                      type="submit" 
                      className={`btn btn-cta-glow w-full mt-4 ${isSlotBooked ? 'disabled' : ''}`}
                      disabled={isSlotBooked}
                    >
                      {isSlotBooked ? 'Slot Unavailable' : 'Secure This Slot'}
                      {!isSlotBooked && (
                        <svg className="btn-arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}

          {bookingStep === 'success' && (
            <div className="booking-success-screen">
              <div className="success-icon-wrapper">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="url(#success-glow)" strokeWidth="3">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <svg width="0" height="0">
                  <defs>
                    <linearGradient id="success-glow" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#fff" />
                      <stop offset="100%" stopColor="var(--color-accent)" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              <h2>Launch Slot <span className="text-accent">Reserved!</span></h2>
              <p className="success-sub">Your tech launch viewfinder target has been successfully lock-on.</p>

              <div className="booking-receipt">
                <div className="receipt-border-top"></div>
                <div className="receipt-content">
                  <div className="receipt-row">
                    <span className="lbl">RECEIPT TARGET</span>
                    <span className="val highlight">SECURED // LIVE</span>
                  </div>
                  <div className="receipt-row">
                    <span className="lbl">LAUNCH DATE</span>
                    <span className="val">{selectedDate}</span>
                  </div>
                  <div className="receipt-row">
                    <span className="lbl">TIME SLOT</span>
                    <span className="val">{selectedTimeSlot}</span>
                  </div>
                  <div className="receipt-row">
                    <span className="lbl">{bookingType === 'event' ? 'EVENT' : 'PROJECT/TOPIC'}</span>
                    <span className="val">{startupName}</span>
                  </div>
                  <div className="receipt-row">
                    <span className="lbl">{bookingType === 'event' ? 'ORGANIZER' : 'CONTACT'}</span>
                    <span className="val">{founderName}</span>
                  </div>
                  {additionalInfo.trim() && (
                    <div className="receipt-row">
                      <span className="lbl">NOTES</span>
                      <span className="val">{additionalInfo}</span>
                    </div>
                  )}
                </div>
                <div className="receipt-border-bottom"></div>
              </div>

              <p className="success-footer-note">
                Our production team is locking this in. We will reach out to you at <strong className="text-accent">{contactHandle}</strong> on Instagram to coordinate setup EOD delivery details!
              </p>

              <button onClick={resetBooking} className="btn btn-outline btn-small mt-6">
                Book Another Slot
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CTA;
