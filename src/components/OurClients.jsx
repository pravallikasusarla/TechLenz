import React, { useState } from 'react';
import './OurClients.css';

const clients = [
  { name: 'TG10X', src: '/tg10.png' },
  { name: 'PyConf Hyderabad', src: '/pyconf.png' },
  { name: 'UnityCircle', src: '/unitycircle.png' },
  { name: 'Kodryx AI', src: '/kodryxai.png' },
  { name: 'SkillArion', src: '/skillarion.png' },
];

// Repeat the set enough times to keep the marquee filled across wide screens
const track = Array.from({ length: 6 }, (_, repeatIndex) =>
  clients.map((client, clientIndex) => ({
    ...client,
    key: `${client.name}-${repeatIndex}-${clientIndex}`,
  }))
).flat();

export default function OurClients() {
  const [selectedClient, setSelectedClient] = useState(null);

  return (
    <section className="our-clients-section" id="clients">
      {/* Horizontal flowing connection tracks */}
      <div className="collabs-bg-network" aria-hidden="true">
        <svg className="collabs-bg-svg" width="100%" height="100%">
          {/* Flowing lines */}
          <line x1="0" y1="25%" x2="100%" y2="25%" className="collabs-line collabs-line-1" />
          <line x1="0" y1="52%" x2="100%" y2="52%" className="collabs-line collabs-line-2" />
          <line x1="0" y1="78%" x2="100%" y2="78%" className="collabs-line collabs-line-3" />

          {/* Connection nodes */}
          <circle cx="15%" cy="25%" r="3" className="collabs-node node-1" />
          <circle cx="45%" cy="25%" r="3" className="collabs-node node-2" />
          <circle cx="30%" cy="52%" r="3" className="collabs-node node-3" />
          <circle cx="70%" cy="52%" r="3" className="collabs-node node-4" />
          <circle cx="85%" cy="78%" r="3" className="collabs-node node-5" />
        </svg>
      </div>

      <div className="clients-header">
        <h2 className="clients-title">
          Our <span className="clients-title-accent">Collabs</span>
        </h2>
        <p className="clients-subtitle">
          Proud to have collaborated with innovative organisations across tech, community &amp; AI.
        </p>
      </div>

      {/* Marquee strip */}
      <div className="clients-marquee-wrapper">
        {/* Fade-edge masks */}
        <div className="clients-fade clients-fade-left" aria-hidden="true" />
        <div className="clients-fade clients-fade-right" aria-hidden="true" />

        <div className="clients-marquee-track" aria-label="Client logos">
          {track.map((c) => {
            const isSelected = selectedClient === c.name;
            return (
              <div
                className={`clients-logo-card ${c.name.toLowerCase() === 'skillarion' ? 'skillarion-card' : ''} ${isSelected ? 'selected' : ''}`}
                key={c.key}
                onMouseDown={(e) => {
                  e.preventDefault();
                  setSelectedClient(isSelected ? null : c.name);
                }}
                onTouchStart={(e) => {
                  setSelectedClient(isSelected ? null : c.name);
                }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setSelectedClient(isSelected ? null : c.name);
                  }
                }}
              >
                <img
                  src={c.src}
                  alt={c.name}
                  className="clients-logo-img"
                  draggable="false"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
