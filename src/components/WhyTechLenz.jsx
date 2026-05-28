import React from 'react';

const reasons = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    color: '#e05326',
    title: 'EOD Delivery — Always',
    description:
      'We commit to End of Day delivery on every project. No delays, no follow-ups needed. Your content is ready while the moment is still relevant.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
        <circle cx="12" cy="13" r="4" />
      </svg>
    ),
    color: '#0072ff',
    title: 'Built for Tech, Not Generic Events',
    description:
      'We understand code demos, pitch decks, and hackathon culture. Our crew speaks your language and knows what moments matter in a tech narrative.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    color: '#f6a623',
    title: 'Platform-Ready Content',
    description:
      'Every deliverable is optimised for Instagram Reels, LinkedIn, and YouTube which arecorrectly cropped, captioned, and branded so you can post immediately.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    color: '#27c93f',
    title: 'Founder-First Approach',
    description:
      'You focus on your launch. We handle the entire production pipeline from on-site capture to final edit  with zero creative overhead on your side.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <line x1="12" y1="19" x2="12" y2="22" />
      </svg>
    ),
    color: '#a770ef',
    title: 'End-to-End Coverage',
    description:
      'From the opening keynote to the final round of applause, we capture every milestone so nothing gets missed, and every reel tells the full story.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
    color: '#ff758c',
    title: 'Built for Virality',
    description:
      'We shoot and edit with social reach in mind. Hook-first storytelling, dynamic cuts, and trending formats ensure your content performs, not just looks good.',
  },
];

const WhyTechLenz = () => {
  return (
    <section className="why-section" id="why">
      <div className="container">
        <div className="section-header">
          <p className="why-label">WHY TECHLENZ?</p>
          <h2>
            Coverage Built for the <span className="text-accent">Tech World</span>
          </h2>
          <p className="why-sub">
            Generic videographers shoot events. We document breakthroughs.
          </p>
        </div>

        <div className="why-grid">
          {reasons.map((item, i) => (
            <div className="why-card" key={i} style={{ '--card-accent': item.color }}>
              <div className="why-icon" style={{ color: item.color, background: `${item.color}14` }}>
                {item.icon}
              </div>
              <h3 className="why-card-title">{item.title}</h3>
              <p className="why-card-desc">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyTechLenz;
