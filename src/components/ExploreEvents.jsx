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
  const [searchQuery, setSearchQuery] = useState('');
  
  const cities = ['ALL CITIES', 'INDIA', 'SAN FRANCISCO', 'NEW YORK', 'LONDON', 'DUBAI', 'SINGAPORE', 'TORONTO', 'BERLIN', 'TOKYO'];

  // Real upcoming tech events (June–July 2026)
  const EVENTS = [
    {
      id: 1,
      name: 'ACM SIGMOD / PODS Conference',
      description: 'Premier international forum for database researchers and practitioners. Covers cutting-edge data management, scalable infrastructure, and AI-powered databases.',
      date: new Date('2026-06-01'),
      dateLabel: 'Jun 1–5, 2026',
      city: 'INDIA',
      location: 'Bengaluru, India',
      type: 'CONFERENCE',
      industry: 'AI / ML',
      website: 'https://sigmod.org',
      tags: ['AI / ML', 'DATABASE'],
    },
    {
      id: 2,
      name: 'Tech Week New York',
      description: 'Week-long series of events featuring startups, investors, and operators across NYC. Covers AI, Fintech, Deep Tech and more.',
      date: new Date('2026-06-01'),
      dateLabel: 'Jun 1–7, 2026',
      city: 'NEW YORK',
      location: 'New York, USA',
      type: 'CONFERENCE',
      industry: 'FINTECH',
      website: 'https://tech-week.com',
      tags: ['AI / ML', 'FINTECH'],
    },
    {
      id: 3,
      name: 'Manufacturing IT Summit India 2026',
      description: 'Invite-only event for IT leaders in manufacturing. Focus on robotics, big data, additive manufacturing, and digital supply chains.',
      date: new Date('2026-06-11'),
      dateLabel: 'Jun 11, 2026',
      city: 'INDIA',
      location: 'Mumbai, India',
      type: 'CONFERENCE',
      industry: 'HARDWARE',
      website: 'https://manufacturingitsummit.com',
      tags: ['HARDWARE', 'AI / ML'],
    },
    {
      id: 4,
      name: 'AI Summit London',
      description: 'Part of London Tech Week. Tailored for AI users, business leaders, and technical experts with lectures, workshops, and live simulations.',
      date: new Date('2026-06-10'),
      dateLabel: 'Jun 10–11, 2026',
      city: 'LONDON',
      location: 'London, UK',
      type: 'CONFERENCE',
      industry: 'AI / ML',
      website: 'https://theaisummit.com',
      tags: ['AI / ML'],
    },
    {
      id: 5,
      name: 'ETCISO Decrypt: AI & Cyber Reality',
      description: "Cybersecurity strategies and the impact of AI on the modern threat landscape. Featuring India's top CISOs and security leaders.",
      date: new Date('2026-06-25'),
      dateLabel: 'Jun 25, 2026',
      city: 'INDIA',
      location: 'Mumbai, India',
      type: 'CONFERENCE',
      industry: 'AI / ML',
      website: 'https://etciso.in',
      tags: ['AI / ML', 'SAAS'],
    },
    {
      id: 6,
      name: 'GITEX AI Europe',
      description: 'Connects startups, enterprises, and governments across AI, cybersecurity, quantum, and climate tech. The biggest AI event in Europe.',
      date: new Date('2026-06-30'),
      dateLabel: 'Jun 30 – Jul 1, 2026',
      city: 'BERLIN',
      location: 'Berlin, Germany',
      type: 'CONFERENCE',
      industry: 'AI / ML',
      website: 'https://gitexeurope.com',
      tags: ['AI / ML', 'WEB3'],
    },
    {
      id: 7,
      name: 'Odoo × KSV Hackathon 2026',
      description: '24-hour coding marathon focused on solving surprise problem statements. Open to students and freshers with recruitment opportunities.',
      date: new Date('2026-07-18'),
      dateLabel: 'Jul 18–19, 2026',
      city: 'INDIA',
      location: 'India (In-person Final)',
      type: 'HACKATHON',
      industry: 'SAAS',
      website: 'https://odoo.com',
      tags: ['SAAS', 'AI / ML'],
    },
    {
      id: 8,
      name: 'TechChicago Week 2026',
      description: 'Citywide event applying emerging technologies like AI and quantum computing to Grand Challenges in climate, healthcare, and finance.',
      date: new Date('2026-07-18'),
      dateLabel: 'Jul 18–25, 2026',
      city: 'NEW YORK',
      location: 'Chicago, USA',
      type: 'CONFERENCE',
      industry: 'AI / ML',
      website: 'https://gotechchicago.com',
      tags: ['AI / ML', 'HEALTH / BIO'],
    },
    {
      id: 9,
      name: 'India Tech Summit 2026',
      description: "Brings together investors, policymakers, and tech leaders to discuss the future of India's startup and innovation ecosystem.",
      date: new Date('2026-07-22'),
      dateLabel: 'Jul 22, 2026',
      city: 'INDIA',
      location: 'New Delhi, India',
      type: 'CONFERENCE',
      industry: 'CONSUMER',
      website: 'https://indiatechsummit.in',
      tags: ['AI / ML', 'FINTECH', 'SAAS'],
    },
    {
      id: 10,
      name: 'India SaaS & Marketing Tech Summit',
      description: 'Leading SaaS founders, product managers and growth leaders converge in Bengaluru to shape the future of Indian SaaS.',
      date: new Date('2026-07-30'),
      dateLabel: 'Jul 30–31, 2026',
      city: 'INDIA',
      location: 'Bengaluru, India',
      type: 'CONFERENCE',
      industry: 'SAAS',
      website: 'https://whysummits.com',
      tags: ['SAAS'],
    },
  ];

  const now = new Date();

  const filteredEvents = EVENTS.filter(event => {
    // City filter
    if (selectedCity !== 'ALL CITIES' && event.city !== selectedCity) return false;

    // Type filter
    if (activeType && activeType !== 'OTHER' && event.type !== activeType) return false;

    // Industry filter
    if (activeIndustry && activeIndustry !== 'OTHER' && !event.tags.includes(activeIndustry)) return false;

    // Time filter
    const diffDays = (event.date - now) / (1000 * 60 * 60 * 24);
    if (activeTime === 'THIS WEEK' && diffDays > 7) return false;
    if (activeTime === '30 DAYS' && diffDays > 30) return false;
    if (activeTime === '90 DAYS' && diffDays > 90) return false;

    // Search filter
    if (searchQuery && !event.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !event.location.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !event.description.toLowerCase().includes(searchQuery.toLowerCase())) return false;

    return true;
  });

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
            <input 
              type="text" 
              placeholder="SEARCH EVENTS..." 
              className="events-search-input" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
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
            <div className="custom-search-message-box event-card-animate">
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

        {/* Events Grid */}
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
                  Request Coverage
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
              <p>Try adjusting your filters or search query.</p>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

export default ExploreEvents;
