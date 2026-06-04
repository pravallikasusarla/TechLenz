import React, { useState, useEffect } from 'react';
import './BookingCalendar.css';

const timezones = [
  { label: 'GMT-10:00 Pacific/Honolulu (GMT-10)', offset: -10 },
  { label: 'GMT-09:00 America/Anchorage (GMT-9)', offset: -9 },
  { label: 'GMT-08:00 America/Los_Angeles (GMT-8)', offset: -8 },
  { label: 'GMT-07:00 America/Denver (GMT-7)', offset: -7 },
  { label: 'GMT-06:00 America/Chicago (GMT-6)', offset: -6 },
  { label: 'GMT-05:00 America/New_York (GMT-5)', offset: -5 },
  { label: 'GMT-03:00 America/Sao_Paulo (GMT-3)', offset: -3 },
  { label: 'GMT+00:00 Europe/London (GMT+0)', offset: 0 },
  { label: 'GMT+01:00 Europe/Paris (GMT+1)', offset: 1 },
  { label: 'GMT+02:00 Africa/Cairo (GMT+2)', offset: 2 },
  { label: 'GMT+03:00 Europe/Moscow (GMT+3)', offset: 3 },
  { label: 'GMT+04:00 Asia/Dubai (GMT+4)', offset: 4 },
  { label: 'GMT+05:00 Asia/Karachi (GMT+5)', offset: 5 },
  { label: 'GMT+05:30 Asia/Kolkata (GMT+5:30)', offset: 5.5 },
  { label: 'GMT+05:45 Asia/Kathmandu (GMT+5:45)', offset: 5.75 },
  { label: 'GMT+06:00 Asia/Dhaka (GMT+6)', offset: 6 },
  { label: 'GMT+06:30 Asia/Rangoon (GMT+6:30)', offset: 6.5 },
  { label: 'GMT+07:00 Asia/Bangkok (GMT+7)', offset: 7 },
  { label: 'GMT+08:00 Asia/Singapore (GMT+8)', offset: 8 },
  { label: 'GMT+09:00 Asia/Tokyo (GMT+9)', offset: 9 },
  { label: 'GMT+10:00 Australia/Sydney (GMT+10)', offset: 10 },
  { label: 'GMT+11:00 Pacific/Noumea (GMT+11)', offset: 11 },
  { label: 'GMT+12:00 Pacific/Auckland (GMT+12)', offset: 12 },
];

const availableSessions = [
  'Morning Session (9 AM - 12 PM)',
  'Afternoon Session (1 PM - 4 PM)',
  'Evening Session (6 PM - 9 PM)'
];

const getTodayStr = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

const CTA = () => {
  const [bookingStep, setBookingStep] = useState('booking'); // 'booking', 'success'
  const [selectedDate, setSelectedDate] = useState(getTodayStr());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [founderName, setFounderName] = useState('');
  const [startupName, setStartupName] = useState('');
  const [contactHandle, setContactHandle] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [bookingType, setBookingType] = useState('event'); // 'event' or 'volunteer'

  // Calendar States
  const [currentMonth, setCurrentMonth] = useState(new Date(new Date().getFullYear(), new Date().getMonth(), 1));
  const [selectedTimezone, setSelectedTimezone] = useState(timezones[13]); // Default Kolkata (index 13)
  const [isTimezoneOpen, setIsTimezoneOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Keep current time ticking for the timezone dropdown
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000); // update every minute
    return () => clearInterval(timer);
  }, []);

  // Pre-seed some booked slot combinations to show validation immediately
  const todayStr = getTodayStr();
  const [bookedSlots, setBookedSlots] = useState([
    { date: '2026-05-23', session: '08:00 PM' },
    { date: todayStr, session: '06:00 PM' }
  ]);

  // Real-time check if the current slot combination is already booked
  const isSlotBooked = bookedSlots.some(
    (slot) => slot.date === selectedDate && slot.session === selectedTimeSlot
  );

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (isSlotBooked) return; // Prevent double booking

    if (founderName.trim() && startupName.trim() && contactHandle.trim() && selectedDate.trim() && selectedTimeSlot.trim() && selectedTimezone) {
      setBookedSlots([...bookedSlots, { date: selectedDate, session: selectedTimeSlot }]);
      setBookingStep('success');
    }
  };

  const resetBooking = () => {
    setBookingStep('booking');
    setSelectedDate(getTodayStr());
    setSelectedTimeSlot('');
    setSelectedTimezone(timezones[13]);
    setFounderName('');
    setStartupName('');
    setContactHandle('');
    setAdditionalInfo('');
    setBookingType('event');
  };

  // Calendar Helpers
  const nextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  const prevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));

  const formatTimeForOffset = (offsetHours) => {
    const utc = currentTime.getTime() + (currentTime.getTimezoneOffset() * 60000);
    const tzDate = new Date(utc + (3600000 * offsetHours));
    return tzDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getDaysArray = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    const startOffset = firstDay === 0 ? 6 : firstDay - 1; // Mon=0, Sun=6

    const days = Array(startOffset).fill(null);
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const handleDateClick = (day) => {
    if (!day) return;
    const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

    // Optional: Prevent past dates
    const selectedDateObj = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDateObj < today) return;

    setSelectedDate(dateStr);
  };

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <section className="final-cta" id="book-slot">
      <div className="container">
        <div className="cta-box animate-scale-in">
          {bookingStep === 'booking' && (
            <div className="booking-console">

              <div className="booking-console-header" style={{ textAlign: 'left' }}>
                <h2>Showcase your <span className="text-accent">Event or Volunteer</span> with us.</h2>
                <p style={{ margin: '0 0 40px 0', maxWidth: '580px' }}>Register for your exclusive EOD launch coverage slot, or sign up to volunteer and join our production crew.</p>
              </div>

              <form onSubmit={handleBookingSubmit} className="booking-grid-form">
                <div className="booking-grid">

                  {/* Date & Time Selectors */}
                  <div className="booking-selectors">
                    <div className="booking-header-inline mb-4">
                      <h3>1. Select Date & Time <span className="required-star">*</span></h3>
                    </div>

                    <input type="hidden" name="selectedTimeSlot" value={selectedTimeSlot} required />
                    <input type="hidden" name="selectedDate" value={selectedDate} required />
                    <div className="booking-calendar-container">
                      <div className="calendar-left-col">
                        <div className="calendar-header">
                          <button type="button" className="calendar-nav-btn" onClick={prevMonth}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                          </button>
                          <span className="calendar-month-year">
                            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                          </span>
                          <button type="button" className="calendar-nav-btn" onClick={nextMonth}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                          </button>
                        </div>

                        <div className="calendar-grid">
                          {dayNames.map(d => (
                            <div key={d} className="calendar-day-name">{d}</div>
                          ))}

                          {getDaysArray().map((day, index) => {
                            const dateStr = day ? `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}` : '';
                            const isSelected = day && dateStr === selectedDate;

                            let isPast = false;
                            if (day) {
                              const dayDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
                              const today = new Date();
                              today.setHours(0, 0, 0, 0);
                              if (dayDate < today) isPast = true;
                            }

                            return (
                              <div
                                key={index}
                                className={`calendar-day ${!day ? 'empty' : ''} ${isSelected ? 'selected' : ''} ${isPast ? 'past' : ''}`}
                                onClick={() => handleDateClick(day)}
                              >
                                {day || ''}
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <div className="calendar-right-col">
                        {availableSessions.map(session => (
                          <button
                            key={session}
                            type="button"
                            className={`time-slot-btn ${selectedTimeSlot === session ? 'selected' : ''}`}
                            onClick={() => setSelectedTimeSlot(session)}
                          >
                            {session}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="timezone-wrapper mt-6">
                      <span className="timezone-label">Time zone</span>
                      <div className="timezone-dropdown">
                        <div className={`timezone-trigger ${selectedTimezone ? 'has-value' : ''}`} onClick={() => setIsTimezoneOpen(!isTimezoneOpen)}>
                          <div className="timezone-info">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <circle cx="12" cy="12" r="10"></circle>
                              <line x1="2" y1="12" x2="22" y2="12"></line>
                              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                            </svg>
                            <span>{selectedTimezone ? selectedTimezone.label : "Select a time zone"}</span>
                          </div>
                          <svg style={{ transform: isTimezoneOpen ? 'rotate(180deg)' : 'none', transition: '0.2s', width: '16px' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                        </div>

                        {isTimezoneOpen && (
                          <div className="timezone-options">
                            {timezones.map((tz, i) => (
                              <div
                                key={i}
                                className={`timezone-option ${selectedTimezone && selectedTimezone.label === tz.label ? 'selected' : ''}`}
                                onClick={() => { setSelectedTimezone(tz); setIsTimezoneOpen(false); }}
                              >
                                <span>{tz.label}</span>
                                <span className="timezone-time">{formatTimeForOffset(tz.offset)}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {isSlotBooked && (
                      <div className="slot-warning-badge mt-4">
                        <svg className="warning-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="12" y1="8" x2="12" y2="12"></line>
                          <line x1="12" y1="16" x2="12.01" y2="16"></line>
                        </svg>
                        Slot is not available
                      </div>
                    )}
                  </div>

                  {/* Form Details */}
                  <div className="booking-details-form">
                    <h3>2. Booking & Coverage Details</h3>

                    <div className="form-field-group">
                      <label>Coverage Type</label>
                      <div className="toggle-pill-group">
                        <button
                          type="button"
                          className={`toggle-pill ${bookingType === 'event' ? 'active' : ''}`}
                          onClick={() => setBookingType('event')}
                        >
                          Tech Event / Conference
                        </button>
                        <button
                          type="button"
                          className={`toggle-pill ${bookingType === 'volunteer' ? 'active' : ''}`}
                          onClick={() => setBookingType('volunteer')}
                        >
                          Volunteer
                        </button>
                      </div>
                    </div>

                    <div className="form-field-group">
                      <label htmlFor="founder-name">
                        {bookingType === 'event' ? 'Organizer / Host Name' : 'Your Full Name'} <span className="required-star">*</span>
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
                        {bookingType === 'event' ? 'Event / Conference Name' : 'Areas of Interest (Editing, Shooting, etc.)'} <span className="required-star">*</span>
                      </label>
                      <input
                        id="startup-name"
                        type="text"
                        placeholder={bookingType === 'event' ? 'Enter event name' : 'How would you like to help?'}
                        value={startupName}
                        onChange={(e) => setStartupName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-field-group">
                      <label htmlFor="ig-handle">Instagram Handle (For Confirmation) <span className="required-star">*</span></label>
                      <input
                        id="ig-handle"
                        type="text"
                        placeholder="Enter your Instagram handle"
                        value={contactHandle}
                        onChange={(e) => setContactHandle(e.target.value)}
                        required
                      />
                    </div>

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

              <h2>{bookingType === 'volunteer' ? 'Volunteer Spot' : 'Launch Slot'} <span className="text-accent">Reserved!</span></h2>
              <p className="success-sub">
                {bookingType === 'volunteer'
                  ? 'Your interest to join the TechLenz crew has been locked on.'
                  : 'Your tech launch viewfinder target has been successfully locked on.'}
              </p>

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
                    <span className="lbl">TIME ZONE</span>
                    <span className="val">{selectedTimezone.label}</span>
                  </div>
                  <div className="receipt-row">
                    <span className="lbl">{bookingType === 'event' ? 'EVENT' : 'ROLE'}</span>
                    <span className="val">{startupName}</span>
                  </div>
                  <div className="receipt-row">
                    <span className="lbl">{bookingType === 'event' ? 'ORGANIZER' : 'VOLUNTEER'}</span>
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

