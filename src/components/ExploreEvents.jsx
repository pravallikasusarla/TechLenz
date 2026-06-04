import React, { useState } from 'react';
import './ExploreEvents.css';

const ExploreEvents = () => {
  const [activeCity, setActiveCity] = useState('SELECT STATE');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const CITIES = ['HYDERABAD', 'BANGALORE', 'MUMBAI'];

  const EVENTS = [
    {
      id: 1,
      name: 'PyConf Hyderabad 2026',
      description: 'The premier Python conference in India bringing together developers, data scientists, and AI researchers.',
      dateLabel: 'Oct 15–16, 2026',
      city: 'HYDERABAD',
      location: 'HITEX Exhibition Center, Hyderabad',
      type: 'CONFERENCE',
      website: 'https://pyconf.hyd',
      tags: ['PYTHON', 'AI / ML']
    },
    {
      id: 2,
      name: 'T-Hub Startup Pitch Showcase',
      description: 'Top 50 early-stage startups pitch their ideas to leading VCs and angel investors.',
      dateLabel: 'Nov 5, 2026',
      city: 'HYDERABAD',
      location: 'T-Hub Phase 2, Hyderabad',
      type: 'PITCH',
      website: 'https://thub.com',
      tags: ['STARTUPS', 'FUNDING']
    },
    {
      id: 3,
      name: 'India SaaS & Marketing Tech Summit',
      description: 'Leading SaaS founders, product managers and growth leaders converge to shape the future of Indian SaaS.',
      dateLabel: 'Jul 30–31, 2026',
      city: 'BANGALORE',
      location: 'BIEC, Bangalore',
      type: 'CONFERENCE',
      website: 'https://saas-summit.com',
      tags: ['SAAS', 'MARKETING']
    },
    {
      id: 4,
      name: 'Web3 & Blockchain Hackathon',
      description: '48-hour hackathon to build decentralized applications and smart contracts.',
      dateLabel: 'Aug 12–14, 2026',
      city: 'BANGALORE',
      location: 'Koramanagala Indoor Stadium, Bangalore',
      type: 'HACKATHON',
      website: 'https://web3blr.com',
      tags: ['WEB3', 'CRYPTO']
    },
    {
      id: 5,
      name: 'Manufacturing IT Summit India 2026',
      description: 'Invite-only event for IT leaders in manufacturing. Focus on robotics, big data, additive manufacturing, and digital supply chains.',
      dateLabel: 'Jun 11, 2026',
      city: 'MUMBAI',
      location: 'Jio World Convention Centre, Mumbai',
      type: 'CONFERENCE',
      website: 'https://manufacturingitsummit.com',
      tags: ['HARDWARE', 'ROBOTICS']
    },
    {
      id: 6,
      name: 'Mumbai FinTech Conclave',
      description: 'The largest gathering of FinTech innovators, banks, and regulators in the financial capital of India.',
      dateLabel: 'Sep 22, 2026',
      city: 'MUMBAI',
      location: 'Bandra Kurla Complex, Mumbai',
      type: 'CONFERENCE',
      website: 'https://fintechmumbai.com',
      tags: ['FINTECH', 'FINANCE']
    }
  ];

  const filteredEvents = activeCity === 'SELECT STATE' ? [] : EVENTS.filter(event => event.city === activeCity);

  return (
    <section className="explore-events-section" id="explore">
      <div className="container">

        <div className="section-header text-center mb-12">
          <h2>Explore <span className="text-accent">Events</span></h2>
          <p className="section-sub">Find and track technical milestones happening near you.</p>
        </div>

        <div className="city-selector-container">
          <div className="custom-dropdown-container">
            <div
              className={`custom-dropdown-header ${isDropdownOpen ? 'open' : ''}`}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span>{activeCity}</span>
              <span className="dropdown-arrow">▼</span>
            </div>
            {isDropdownOpen && (
              <div className="custom-dropdown-list">
                {CITIES.map(city => (
                  <div
                    key={city}
                    className={`custom-dropdown-item ${activeCity === city ? 'active' : ''}`}
                    onClick={() => {
                      setActiveCity(city);
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

        {/* Events Grid */}
        {activeCity !== 'SELECT STATE' && (
          <div className="events-grid">
            {filteredEvents.length > 0 ? (
              filteredEvents.map(event => (
                <div key={event.id} className="event-card event-card-animate">
                  <div className="event-card-header">
                    <div className="event-type-badge">{event.type}</div>
                    <div className="event-date-badge">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                      {event.dateLabel}
                    </div>
                  </div>

                  <h3 className="event-card-title">{event.name}</h3>
                  <p className="event-card-desc">{event.description}</p>

                  <div className="event-card-location">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    {event.location}
                  </div>

                  <div className="event-card-tags">
                    {event.tags.map(tag => (
                      <span key={tag} className="event-tag">{tag}</span>
                    ))}
                  </div>

                  <a
                    href={event.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="event-coverage-btn"
                  >
                    Learn More
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </a>
                </div>
              ))
            ) : (
              <div className="events-empty-state">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <h4>No events found</h4>
                <p>Check back later for events in this city.</p>
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
};

export default ExploreEvents;
