import React, { useState } from 'react';

const faqs = [
  {
    question: 'What exactly does TechLenz cover?',
    answer:
      'TechLenz provides end-to-end technical media coverage for startups, product launches, hackathons, demo days, and founder interviews. We handle everything from on-site filming and photography to post-production editing and delivery, so you can focus on building.',
  },
  {
    question: 'How quickly do I receive my content after the event?',
    answer:
      'Our signature EOD (End of Day) delivery means your edited reels, clips, and highlights are in your hands the same day as the event. For longer-form content such as full interviews or recap videos, delivery is within 24 hours.',
  },
  {
    question: 'Do you cover events outside my city?',
    answer:
      'Yes. TechLenz operates across multiple cities and is available for travel-based coverage. Reach out with your event details and location, we will confirm availability and travel logistics promptly.',
  },
  {
    question: 'What formats do you deliver content in?',
    answer:
      'We deliver content based on customer request and customise the format accordingly. This includes Instagram Reels (9:16 vertical), LinkedIn (1:1 square and 16:9 landscape), and YouTube (16:9 HD). Every export is branded, captioned, and platform-ready so you can post immediately.',
  },
  {
    question: 'Can I request a custom content package?',
    answer:
      'Absolutely. We offer fully customisable packages depending on your event size, deliverable count, and turnaround requirements. Fill out our pitch form or DM us on Instagram and we will put together a tailored proposal within a few hours.',
  },
  {
    question: 'Do you cover virtual or hybrid events?',
    answer:
      'Yes. For virtual and hybrid events we provide screen-capture production, multi-speaker interview setups, and remote editing to produce polished content that looks as premium as an in-person shoot.',
  },
  {
    question: 'What is the booking process?',
    answer:
      'Simply send your event details via our form or Instagram DM. We review the brief, confirm the date and scope, and lock in your slot. A confirmation is sent within a few hours with no lengthy back-and-forth required.',
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="faq-section" id="faq">
      <div className="container">
        <div className="section-header">
          <p className="section-label">HAVE QUESTIONS?</p>
          <h2>
            Frequently Asked <span className="text-accent">Questions</span>
          </h2>
          <p className="section-sub">
            Everything you need to know about TechLenz coverage, answered.
          </p>
        </div>

        <div className="faq-list">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`faq-item ${openIndex === i ? 'faq-open' : ''}`}
              onClick={() => toggle(i)}
            >
              <div className="faq-question">
                <span>{faq.question}</span>
                <div className="faq-icon">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
              </div>
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="faq-cta-row">
          <p className="faq-cta-text">Still have questions?</p>
          <a
            href="https://www.instagram.com/_techlenz/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            DM us on Instagram
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
