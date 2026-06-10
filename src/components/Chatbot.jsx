import React, { useState, useEffect, useRef } from 'react';
import './Chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(() => {
    return [
      createBotMessage(
        'welcome',
        "Hello! Welcome to TechLenz 👋 I am **TechLenz AI**, your digital guide. Ask me anything about our tech event coverage, formats, booking, pricing, team, or anything else!",
        ['What is TechLenz?', 'Our Services', 'Pricing & Enquiries']
      )
    ];
  });
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  function createBotMessage(id, text, quickReplies = [], hasEnquiryAction = false) {
    return {
      id,
      sender: 'bot',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      quickReplies,
      hasEnquiryAction
    };
  }

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Focus input when chat window opens
  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isOpen]);

  // Toggle Chatbot
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  // Dispatch custom event to open the Enquiry Modal
  const triggerEnquiryModal = () => {
    const event = new CustomEvent('open-enquiry-modal');
    window.dispatchEvent(event);
    setIsOpen(false);
  };

  // ─────────────────────────────────────────────────────────────────────────────
  //  Comprehensive conversational response logic
  // ─────────────────────────────────────────────────────────────────────────────
  const getBotResponse = (userInput) => {
    const raw = userInput.toLowerCase().trim();

    // ── Greetings ──────────────────────────────────────────────────────────────
    if (/\b(hi|hello|hey|greetings|hola|howdy|wasup|what'?s up|yo|sup)\b/.test(raw)) {
      return {
        text: "Hi there! 👋 I am **TechLenz AI**, ready to assist you. How can I help you cover your next big tech milestone today?",
        quickReplies: ['Our Services', 'What is TechLenz?', 'Pricing & Enquiries']
      };
    }

    // ── Goodbye / Thank you ────────────────────────────────────────────────────
    if (/\b(bye|goodbye|see you|cya|thanks|thank you|thankyou|thx|cheers|done)\b/.test(raw)) {
      return {
        text: "Thank you for reaching out to TechLenz! 🙌 Feel free to come back anytime. Have a wonderful day!",
        quickReplies: ['What is TechLenz?', 'Enquire Now']
      };
    }

    // ── Who / What is TechLenz ─────────────────────────────────────────────────
    if (/\b(techlenz|who are you|what is this|about|tell me more|what do you|explain)\b/.test(raw)) {
      return {
        text: "**TechLenz** is a specialized tech event coverage and media unit 🎬\n\nWe provide cinema-quality video production, event recaps, social-ready highlights, and rapid-turnaround media for:\n• Founders & Startups\n• Tech Conferences & Summits\n• Hackathons & Workshops\n• Investor Pitch Sessions\n\nWe are based in Hyderabad, India, and work with clients across India and globally!",
        quickReplies: ['Our Services', 'Pricing & Enquiries', 'Meet the Founder']
      };
    }

    // ── Services / Capabilities ────────────────────────────────────────────────
    if (/\b(service|services|offer|what do you do|cover|coverage|video|shoot|media|package|packages|production)\b/.test(raw)) {
      return {
        text: "We offer professional end-to-end event and launch coverage 🎥\n\n• **Investor Room Coverage** — product showcases for founders\n• **Tech Event / Conference Video** — keynotes, summaries, highlights\n• **Live Event Recording** — hackathons, product launches, panels\n• **Social Media Reels** — short-form, platform-optimized clips\n• **EOD Delivery** — cinematic reels delivered by End-of-Day\n• **Custom Formats** — we tailor every package to your needs!\n\nWould you like to book a slot for your event?",
        quickReplies: ['Enquire Now', 'Pricing & Enquiries', 'Turnaround Time']
      };
    }

    // ── Contact / Enquiry / Pricing / Form ────────────────────────────────────
    if (/\b(enquire|enquiry|contact|form|quote|pricing|price|cost|hire|work with|book|slot|budget|rates|charges|fee|fees)\b/.test(raw)) {
      return {
        text: "To book a coverage slot or request a custom pricing estimate, fill out our **Enquiry Form** below 📋\n\nWe customize packages dynamically based on:\n• Event type & duration\n• Number of deliverables\n• Turnaround requirements\n• Location & travel needs\n\nClick the button to get started!",
        hasEnquiryAction: true,
        quickReplies: ['Our Services', 'Who is TechLenz?']
      };
    }

    // ── Turnaround / Delivery time ─────────────────────────────────────────────
    if (/\b(turnaround|delivery|deliver|how long|timeline|deadline|eod|end of day|when|time frame|timeframe)\b/.test(raw)) {
      return {
        text: "⚡ We pride ourselves on **rapid-turnaround delivery**!\n\n• **EOD Delivery** — highlight reels delivered same day\n• **24–48 Hours** — fully edited event recap videos\n• **3–5 Days** — cinematic long-form productions\n• **Custom timelines** available on request\n\nFor tight deadlines, just mention it in your enquiry and we will prioritize accordingly.",
        quickReplies: ['Enquire Now', 'Our Services', 'Pricing & Enquiries']
      };
    }

    // ── Location / Where ──────────────────────────────────────────────────────
    if (/\b(location|where|city|hyderabad|india|travel|based|area|region|place|state|country)\b/.test(raw)) {
      return {
        text: "📍 TechLenz is headquartered in **Hyderabad, India**.\n\nWe cover events across:\n• Hyderabad & Telangana\n• Bengaluru, Mumbai, Delhi, Chennai, Pune\n• Pan-India with travel arrangements\n• International projects on request\n\nTravel and logistics can be discussed in your enquiry!",
        quickReplies: ['Enquire Now', 'Our Services']
      };
    }

    // ── Events / Meetups ──────────────────────────────────────────────────────
    if (/\b(event|events|meetup|meet-up|workshop|webinar|conference|summit|panel|seminar|symposium)\b/.test(raw)) {
      return {
        text: "We specialize in high-end, rapid-turnaround media coverage for all kinds of tech events! 🎪\n\n• **Conferences & Summits** — multi-track, multi-camera coverage\n• **Hackathons** — team journey documentation & award highlights\n• **Workshops** — educational content capture\n• **Webinars** — hybrid event production\n• **Product Launches** — cinematic reveal coverage\n\nHave an upcoming event? Let's cover it!",
        quickReplies: ['Enquire Now', 'Turnaround Time', 'Pricing & Enquiries']
      };
    }

    // ── Startup / Founders ────────────────────────────────────────────────────
    if (/\b(startup|startups|founder|founders|pitch|investor|venture|vc|demo day|product showcase|funding)\b/.test(raw)) {
      return {
        text: "TechLenz is a founder's best media partner! 🚀\n\n**For Startups & Founders we offer:**\n• Investor pitch room coverage\n• Demo Day documentation\n• Product showcase highlight reels\n• Founder story video production\n• Social-ready clips for fundraising announcements\n\nWe understand the fast-paced world of startups and deliver media that matches your pace!",
        quickReplies: ['Enquire Now', 'Pricing & Enquiries', 'Our Services']
      };
    }

    // ── Hackathon ─────────────────────────────────────────────────────────────
    if (/\b(hackathon|hackfest|coding competition|code jam|build-a-thon)\b/.test(raw)) {
      return {
        text: "We love hackathons! 💻🏆\n\nOur **Hackathon Coverage Package** includes:\n• Opening ceremony & keynote capture\n• Team journey documentation\n• Mid-event highlight reels\n• Awards ceremony & winner interviews\n• Full event recap delivered EOD or next day\n\nWe keep your community energized with real-time social clips!",
        quickReplies: ['Enquire Now', 'Our Services', 'Pricing & Enquiries']
      };
    }

    // ── Meet the Founder ──────────────────────────────────────────────────────
    if (/\b(founder|team|who runs|who built|who made|leadership|ceo|head|owner|behind techlenz)\b/.test(raw)) {
      return {
        text: "TechLenz was founded with a passion for storytelling and technology 🎯\n\nOur founder and team are experienced media professionals who understand the tech ecosystem inside out. We are not just filmmakers — we are tech enthusiasts who capture every milestone with precision and creativity.\n\nLearn more about our story on the **Founder** section of our website!",
        quickReplies: ['What is TechLenz?', 'Our Services', 'Enquire Now']
      };
    }

    // ── Quality / Equipment ───────────────────────────────────────────────────
    if (/\b(quality|equipment|camera|gear|4k|cinematic|professional|drone|audio|sound|mic|lighting)\b/.test(raw)) {
      return {
        text: "We use **professional-grade cinematic equipment** for every shoot 🎬\n\n• Cinema-quality camera systems (4K+)\n• Professional audio capture & lavalier mics\n• Controlled lighting setups\n• Drone footage (where permitted)\n• Multi-camera setups for large events\n• Professional post-production & color grading\n\nEvery video we produce looks and sounds premium!",
        quickReplies: ['Our Services', 'Enquire Now', 'Pricing & Enquiries']
      };
    }

    // ── Social Media / Reels / Content ────────────────────────────────────────
    if (/\b(social media|instagram|linkedin|youtube|reel|reels|shorts|tiktok|clip|clips|content|post)\b/.test(raw)) {
      return {
        text: "We create **social-ready content** optimized for every platform! 📱\n\n• **Instagram Reels** — 15–60 second vertical highlights\n• **LinkedIn Videos** — professional event summaries\n• **YouTube Recaps** — long-form event documentation\n• **Twitter/X Clips** — punchy, shareable moments\n• **Custom aspect ratios** — 9:16, 16:9, 1:1 formats\n\nAll delivered with captions, music, and branding!",
        quickReplies: ['Our Services', 'Enquire Now', 'Pricing & Enquiries']
      };
    }

    // ── AI / Chatbot questions ────────────────────────────────────────────────
    if (/\b(ai|artificial intelligence|bot|chatbot|machine learning|gpt|llm|gemini|claude|model)\b/.test(raw)) {
      return {
        text: "I am **TechLenz AI** 🤖 — a smart assistant designed to help you learn everything about TechLenz's event coverage services.\n\nWhile I am not a general-purpose AI, I know everything about our services, pricing approach, turnaround times, team, and how to book a slot!\n\nWhat would you like to know?",
        quickReplies: ['Our Services', 'Pricing & Enquiries', 'What is TechLenz?']
      };
    }

    // ── Tech / Development Questions ──────────────────────────────────────────
    if (/\b(react|vite|web dev|javascript|js|css|html|python|node|coding|programming|developer|software)\b/.test(raw)) {
      return {
        text: "We specialize in covering the technology ecosystem 💻\n\nWhether it's a web development conference, a coding bootcamp, a software launch, or an AI summit — TechLenz captures it all with cinematic precision.\n\nWe cover events across all tech verticals: Web, AI/ML, Blockchain, Cloud, DevOps, IoT, and more!",
        quickReplies: ['Our Services', 'Enquire Now']
      };
    }

    // ── Portfolio / Past work / Examples ─────────────────────────────────────
    if (/\b(portfolio|past work|examples|previous|showcase|sample|demo|gallery|clients|clientele)\b/.test(raw)) {
      return {
        text: "We have worked with a diverse range of clients across the tech ecosystem! 🌟\n\n• Technology conferences & summits\n• Funded startups & scaleups\n• University tech fests\n• Corporate innovation programs\n• Government tech initiatives\n\nYou can explore our **Clients** section on the website to see some of our featured collaborations. Want to add your project to our portfolio?",
        quickReplies: ['Enquire Now', 'Our Services', 'Pricing & Enquiries']
      };
    }

    // ── Contract / Agreement ──────────────────────────────────────────────────
    if (/\b(contract|agreement|nda|terms|conditions|legal|copyright|rights|ownership)\b/.test(raw)) {
      return {
        text: "We operate with full professional agreements for every project 📄\n\n• Clear project scope and deliverables\n• Intellectual property terms outlined upfront\n• Client receives full usage rights for produced content\n• NDAs available upon request\n\nAll details are discussed during the enquiry and confirmed before the project begins!",
        quickReplies: ['Enquire Now', 'Our Services']
      };
    }

    // ── Payment / Process ─────────────────────────────────────────────────────
    if (/\b(payment|pay|deposit|invoice|advance|installment|refund|cancellation|process)\b/.test(raw)) {
      return {
        text: "Our process is straightforward and transparent 💼\n\n**Booking Process:**\n1. Fill out the Enquiry Form\n2. Receive a custom quote within 24 hours\n3. Confirm scope & sign agreement\n4. Pay booking deposit to secure the date\n5. We cover your event and deliver the magic!\n\nPayment options and schedules are discussed during onboarding.",
        hasEnquiryAction: true,
        quickReplies: ['Our Services', 'What is TechLenz?']
      };
    }

    // ── Help / Confused ──────────────────────────────────────────────────────
    if (/\b(help|confused|lost|don't understand|what can you|what can i|options|menu|guide)\b/.test(raw)) {
      return {
        text: "I am here to help! 😊 Here is what I can assist you with:\n\n• **Services** — what we cover and how\n• **Pricing** — how our packages work\n• **Turnaround** — delivery timelines\n• **Location** — where we operate\n• **Booking** — how to get started\n• **Team** — about TechLenz & our founders\n• **Portfolio** — our past work & clients\n\nJust ask me anything!",
        quickReplies: ['Our Services', 'Pricing & Enquiries', 'What is TechLenz?']
      };
    }

    // ── Comparison / Why TechLenz ─────────────────────────────────────────────
    if (/\b(why techlenz|why choose|compare|better|best|different|unique|special|advantage|benefit)\b/.test(raw)) {
      return {
        text: "Why TechLenz? Here is what sets us apart 🏆\n\n• **Tech-Focused** — we understand the industry, not just cameras\n• **Same-Day Delivery** — EOD reels so your buzz stays fresh\n• **Cinematic Quality** — premium production at every budget\n• **Full Flexibility** — custom formats for every platform\n• **Trusted by Founders** — built for the startup & tech community\n• **Rapid Response** — quick turnaround, no compromises\n\nWe do not just film events — we tell your story!",
        quickReplies: ['Enquire Now', 'Our Services', 'Portfolio']
      };
    }

    // ── Feedback / Review ─────────────────────────────────────────────────────
    if (/\b(feedback|review|rating|testimonial|experience|satisfied|happy|complain|issue|problem)\b/.test(raw)) {
      return {
        text: "Your feedback means everything to us! 💬\n\nWe strive for 100% client satisfaction on every project. If you have had an experience with TechLenz — great or otherwise — we would love to hear from you!\n\nYou can:\n• Share feedback through our website's Feedback section\n• Reach out via our Enquiry Form\n• Connect with us on social media\n\nEvery piece of feedback helps us improve!",
        quickReplies: ['Enquire Now', 'What is TechLenz?', 'Our Services']
      };
    }

    // ── Website / Tech stack ─────────────────────────────────────────────────
    if (/\b(website|web app|site|built with|made with|tech stack|technology used)\b/.test(raw)) {
      return {
        text: "The TechLenz website is built with modern web technologies 🛠️\n\n• **React** + **Vite** for a blazing-fast experience\n• Fully responsive for mobile, tablet & desktop\n• Smooth animations & micro-interactions\n• Deployed on Vercel for global availability\n\nWe practice what we preach — we love great tech!",
        quickReplies: ['What is TechLenz?', 'Our Services']
      };
    }

    // ── Positive affirmations ─────────────────────────────────────────────────
    if (/\b(great|awesome|amazing|cool|nice|good|excellent|wonderful|fantastic|love it)\b/.test(raw)) {
      return {
        text: "That means a lot! 🙌 We put our heart into everything we do at TechLenz. Is there anything else I can help you with today?",
        quickReplies: ['Enquire Now', 'Our Services', 'Pricing & Enquiries']
      };
    }

    // ── Yes / Sure / Okay ─────────────────────────────────────────────────────
    if (/^(yes|yeah|yep|sure|ok|okay|alright|definitely|absolutely|of course|go ahead|proceed)$/.test(raw)) {
      return {
        text: "Excellent! Let's get things moving 🚀 Here is how you can get started with TechLenz — fill out our Enquiry Form and our team will reach out within 24 hours!",
        hasEnquiryAction: true,
        quickReplies: ['Our Services', 'What is TechLenz?']
      };
    }

    // ── No / Not interested ───────────────────────────────────────────────────
    if (/^(no|nope|nah|not really|not now|maybe later|not interested)$/.test(raw)) {
      return {
        text: "No problem at all! 😊 Feel free to come back whenever you are ready. In the meantime, is there any information about TechLenz I can share with you?",
        quickReplies: ['What is TechLenz?', 'Our Services', 'Pricing & Enquiries']
      };
    }

    // ── Numbers / How many ────────────────────────────────────────────────────
    if (/\b(how many|number of|count|team size|employees|people|staff)\b/.test(raw)) {
      return {
        text: "TechLenz operates with a lean, highly skilled core team — including videographers, editors, sound engineers, and project coordinators.\n\nDepending on your event size, we scale our crew accordingly to ensure top-quality coverage for everything from intimate workshops to large-scale conferences!",
        quickReplies: ['Our Services', 'Enquire Now']
      };
    }

    // ── Catch-all / Fallback ──────────────────────────────────────────────────
    return {
      text: "That's a great question! 🤔 I might not have the exact answer, but our team definitely does.\n\nHere are some popular topics I can help with:\n• Our event coverage services\n• Pricing & packages\n• Delivery timelines\n• How to book a slot\n• About our team & portfolio\n\nOr click **Open Enquiry Form** to connect directly with the TechLenz team!",
      hasEnquiryAction: true,
      quickReplies: ['Our Services', 'What is TechLenz?', 'Pricing & Enquiries']
    };
  };

  // ─── Handle Send Message ────────────────────────────────────────────────────
  const handleSend = (e) => {
    e?.preventDefault();
    if (!inputText.trim()) return;

    const userMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    const originalInputText = inputText;
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const responseData = getBotResponse(originalInputText);
      const botMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: responseData.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickReplies: responseData.quickReplies,
        hasEnquiryAction: responseData.hasEnquiryAction
      };
      setIsTyping(false);
      setMessages((prev) => [...prev, botMessage]);
      if (!isOpen) setUnreadCount((prev) => prev + 1);
    }, 900 + Math.random() * 400); // slight variance for realism
  };

  // ─── Handle Quick Reply Click ───────────────────────────────────────────────
  const handleQuickReplyClick = (replyText) => {
    const userMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: replyText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    setTimeout(() => {
      let responseData;
      if (replyText === 'Enquire Now' || replyText === 'Pricing & Enquiries') {
        responseData = {
          text: "Let's get started on your enquiry! 📋 Click the **Open Enquiry Form** button below to tell us about your project requirements. Our team will respond within 24 hours!",
          hasEnquiryAction: true,
          quickReplies: ['Our Services', 'What is TechLenz?']
        };
      } else if (replyText === 'Portfolio') {
        responseData = getBotResponse('portfolio');
      } else if (replyText === 'Meet the Founder') {
        responseData = getBotResponse('founder');
      } else if (replyText === 'Turnaround Time') {
        responseData = getBotResponse('turnaround');
      } else {
        responseData = getBotResponse(replyText);
      }

      const botMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: responseData.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickReplies: responseData.quickReplies,
        hasEnquiryAction: responseData.hasEnquiryAction
      };
      setIsTyping(false);
      setMessages((prev) => [...prev, botMessage]);
      if (!isOpen) setUnreadCount((prev) => prev + 1);
    }, 800 + Math.random() * 300);
  };

  // ─── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="techlenz-chatbot-wrapper">

      {/* Floating Toggle Button */}
      <button
        className="chatbot-toggle-btn"
        onClick={toggleChat}
        title="Chat with TechLenz AI"
        id="chatbot-trigger"
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            <span className="chatbot-glow-dot"></span>
            {unreadCount > 0 && (
              <span className="chatbot-unread-badge">{unreadCount}</span>
            )}
          </>
        )}
      </button>

      {/* Chat Window */}
      <div className={`chatbot-window ${isOpen ? 'open' : ''}`}>
        {/* Header */}
        <div className="chatbot-header">
          <div className="chatbot-info">
            <div className="chatbot-avatar">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="chatbot-avatar-svg">
                <rect x="3" y="11" width="18" height="10" rx="2"></rect>
                <circle cx="12" cy="5" r="2"></circle>
                <path d="M12 7v4"></path>
                <line x1="8" y1="16" x2="8" y2="16.01"></line>
                <line x1="16" y1="16" x2="16" y2="16.01"></line>
              </svg>
            </div>
            <div className="chatbot-meta">
              <span className="chatbot-name">TechLenz AI</span>
              <span className="chatbot-status">
                <span className="chatbot-status-dot"></span>
                Online · Ready to help
              </span>
            </div>
          </div>
          <button className="chatbot-close-btn" onClick={toggleChat} title="Close Chat">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Message History */}
        <div className="chatbot-messages">
          {messages.map((msg) => (
            <div key={msg.id} className={`chatbot-msg-row ${msg.sender}`}>
              <div className="chatbot-msg-container">
                <div className="chatbot-msg-bubble">
                  {/* Format bold (**text**) and newlines */}
                  {msg.text.split('\n').map((line, lineIdx) => (
                    <span key={lineIdx}>
                      {line.split('**').map((part, i) =>
                        i % 2 === 1 ? <strong key={i}>{part}</strong> : part
                      )}
                      {lineIdx < msg.text.split('\n').length - 1 && <br />}
                    </span>
                  ))}

                  {/* Action triggers */}
                  {msg.hasEnquiryAction && (
                    <div>
                      <button
                        className="chatbot-action-btn"
                        onClick={triggerEnquiryModal}
                      >
                        Open Enquiry Form
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
                <span className="chatbot-msg-time">{msg.timestamp}</span>

                {/* Inline Quick replies */}
                {msg.quickReplies && msg.quickReplies.length > 0 && (
                  <div className="chatbot-quick-replies">
                    {msg.quickReplies.map((reply, idx) => (
                      <button
                        key={idx}
                        className="chatbot-pill"
                        onClick={() => handleQuickReplyClick(reply)}
                      >
                        {reply}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="chatbot-msg-row bot">
              <div className="chatbot-msg-bubble">
                <div className="chatbot-typing-indicator">
                  <span className="chatbot-typing-dot"></span>
                  <span className="chatbot-typing-dot"></span>
                  <span className="chatbot-typing-dot"></span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <form className="chatbot-input-form" onSubmit={handleSend}>
          <input
            type="text"
            ref={inputRef}
            className="chatbot-input-field"
            placeholder="Ask me anything..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={isTyping}
          />
          <button
            type="submit"
            className="chatbot-send-btn"
            disabled={!inputText.trim() || isTyping}
            title="Send Message"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;
