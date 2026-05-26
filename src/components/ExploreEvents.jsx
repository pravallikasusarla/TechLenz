import React, { useState } from 'react';
import './ExploreEvents.css';

const EVENT_TYPES = ['MEETUP', 'CONFERENCE', 'DEMO DAY', 'HACKATHON', 'PITCH', 'WORKSHOP', 'DINNER', 'OTHER'];
const EVENT_INDUSTRIES = ['AI / ML', 'WEB3', 'HEALTH / BIO', 'FOOD / AG', 'FINTECH', 'HARDWARE', 'SAAS', 'CONSUMER', 'OTHER'];
const TIME_FILTERS = ['ALL', 'THIS WEEK', '30 DAYS', '90 DAYS'];

const ExploreEvents = () => {
  const [activeTime, setActiveTime] = useState('ALL');
  const [activeIndustry, setActiveIndustry] = useState('');
  const [activeType, setActiveType] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState('ALL CITIES');
  const [customSearchQuery, setCustomSearchQuery] = useState('');
  
  const cities = ['ALL CITIES', 'INDIA', 'SAN FRANCISCO', 'NEW YORK', 'LONDON', 'DUBAI', 'SINGAPORE', 'TORONTO', 'BERLIN', 'TOKYO'];

  return (
    <section className="explore-events-section" id="explore">
      <div className="container">
        
        <div className="section-header text-center mb-12">
          <p className="section-label">UPCOMING COVERAGE</p>
          <h2>Explore <span className="text-accent">Events</span></h2>
          <p className="section-sub">Find and track technical milestones happening near you.</p>
        </div>

        <div className="events-filter-container">
          
          <div className="filter-row search-row">
            <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input type="text" placeholder="SEARCH EVENTS..." className="events-search-input" />
          </div>

          <div className="filter-row">
            <span className="filter-label">CITY</span>
            <div className="custom-dropdown-container">
              <div 
                className={`custom-dropdown-header ${isDropdownOpen ? 'open' : ''}`} 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span>{selectedCity}</span>
                <span className="dropdown-arrow">▼</span>
              </div>
              {isDropdownOpen && (
                <div className="custom-dropdown-list">
                  {cities.map(city => (
                    <div 
                      key={city} 
                      className={`custom-dropdown-item ${selectedCity === city ? 'active' : ''}`}
                      onClick={() => {
                        setSelectedCity(city);
                        setIsDropdownOpen(false);
                      }}
                    >
                      {city}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="filter-row">
            <span className="filter-label">WHEN</span>
            <div className="filter-pills">
              {TIME_FILTERS.map(time => (
                <button 
                  key={time} 
                  className={`filter-pill ${activeTime === time ? 'active' : ''}`}
                  onClick={() => setActiveTime(time)}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-row">
            <span className="filter-label">FOR</span>
            <div className="filter-pills">
              {EVENT_INDUSTRIES.map(ind => (
                <button 
                  key={ind} 
                  className={`filter-pill ${activeIndustry === ind ? 'active' : ''}`}
                  onClick={() => setActiveIndustry(activeIndustry === ind ? '' : ind)}
                >
                  {ind}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-row">
            <span className="filter-label">TYPE</span>
            <div className="filter-pills">
              {EVENT_TYPES.map(type => (
                <button 
                  key={type} 
                  className={`filter-pill ${activeType === type ? 'active' : ''}`}
                  onClick={() => setActiveType(activeType === type ? '' : type)}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          { (activeIndustry === 'OTHER' || activeType === 'OTHER') && (
            <div className="custom-search-message-box animate-slide-up">
              <div className="message-box-header">
                <span className="message-icon"></span>
                <h4>Specify your search criteria:</h4>
              </div>
              <p className="message-box-description">
                Enter your custom industry or format details below to filter events accordingly.
              </p>
              <div className="message-box-input-group">
                <input 
                  type="text" 
                  className="message-box-input" 
                  placeholder={
                    activeIndustry === 'OTHER' && activeType === 'OTHER'
                      ? "e.g., Creator Economy Summit, Web Development Panel..."
                      : activeIndustry === 'OTHER'
                        ? "e.g., EdTech, gaming, creator economy..."
                        : "e.g., Fireside Chat, Panel Discussion, Round Table..."
                  }
                  value={customSearchQuery}
                  onChange={(e) => setCustomSearchQuery(e.target.value)}
                  autoFocus
                />
                <button className="message-box-btn" onClick={() => {
                  alert(`Searching custom events for: "${customSearchQuery}"`);
                }}>
                  Search
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};

export default ExploreEvents;
