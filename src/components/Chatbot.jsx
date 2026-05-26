import React, { useState, useEffect, useRef } from 'react';
import './Chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(() => {
    return [
      createBotMessage(
        'welcome',
        "Hello! Welcome to TechLenz. I am **TechLenz AI**, your digital guide. Ask me anything about our tech event coverage, formats, or booking slots!",
        ['What is TechLenz?', 'Our Services', 'Pricing & Enquiries']
      )
    ];
  });
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);

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
    setIsOpen(false); // Close chatbot when form opens to avoid overlay clutter
  };

  // Conversational response logic
  const getBotResponse = (userInput) => {
    const cleanInput = userInput.toLowerCase().trim();
    
    // 1. Greeting Match
    if (/\b(hi|hello|hey|greetings|hola|wasup|yo)\b/.test(cleanInput)) {
      return {
        text: "Hi there! I am **TechLenz AI**, ready to assist you. How can I help you cover your next big tech milestone today?",
        quickReplies: ['Our Services', 'What is TechLenz?', 'Pricing & Enquiries']
      };
    }

    // 2. Who is TechLenz / What is TechLenz
    if (/\b(techlenz|who are you|what is this|about)\b/.test(cleanInput)) {
      return {
        text: "TechLenz is a specialized tech event coverage and media unit. We provide cinema-quality video, recaps, and social-ready highlights for founders, conferences, hackathons, and investor pitch sessions.",
        quickReplies: ['Our Services', 'Pricing & Enquiries']
      };
    }

    // 3. Services / Capabilities
    if (/\b(service|services|offer|what do you do|cover|coverage|video|shoot|media)\b/.test(cleanInput)) {
      return {
        text: "We offer professional end-to-end event and launch coverage:\n\n• **Investor Room Coverage** (product showcases for founders)\n• **Tech Event / Conference Video** (keynotes, summaries, highlights)\n• **Live Event Recording** (hackathons, product launches)\n• **EOD Delivery** (cinematic reels delivered by End-of-Day)\n\nWe customize the formats if customers want to! Would you like to book a slot for your event coverage?",
        quickReplies: ['Enquire Now', 'Pricing & Enquiries']
      };
    }

    // 4. Contact / Enquiry / Pricing / Form
    if (/\b(enquire|enquiry|contact|form|quote|pricing|price|cost|hire|work|book|slot)\b/.test(cleanInput)) {
      return {
        text: "To book a coverage slot or request a pricing estimate, please fill out our **Enquiry Form** by clicking the button below. We customize formats dynamically to match your requirements!",
        hasEnquiryAction: true,
        quickReplies: ['Our Services', 'Who is TechLenz?']
      };
    }

    // 5. Events / Meetups
    if (/\b(event|events|meetup|workshop|webinar|conference)\b/.test(cleanInput)) {
      return {
        text: "We provide high-end, rapid-turnaround media coverage for tech events, meetups, and conferences. If you want us to capture your upcoming tech launch and deliver recap reels by EOD, let us know!",
        quickReplies: ['Who is TechLenz?', 'Enquire Now']
      };
    }

    // 6. Technology / Video Quality Questions
    if (/\b(react|vite|web dev|javascript|js|css|html)\b/.test(cleanInput)) {
      return {
        text: "We specialize in covering technology events, using advanced cinematic gear to document the latest in web development, coding, and hardware launches.",
        quickReplies: ['Our Services', 'Enquire Now']
      };
    }
    
    if (/\b(ai|artificial intelligence|bot|chatbot|gemini|gpt|llm)\b/.test(cleanInput)) {
      return {
        text: "I am **TechLenz AI**, designed to answer questions about our premium event filming, recaps, and video delivery timelines.",
        quickReplies: ['Our Services', 'Enquire Now']
      };
    }

    // Fallback response
    return {
      text: "I'd love to help you with that! Would you like to explore our event coverage services, find out more about what we capture, or open our Enquiry Form to book a slot?",
      quickReplies: ['Our Services', 'Who is TechLenz?', 'Enquire Now']
    };
  };

  // Handle Send Message
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

    // Simulate typing delay
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
      if (!isOpen) {
        setUnreadCount((prev) => prev + 1);
      }
    }, 1000);
  };

  // Handle Quick Reply Click
  const handleQuickReplyClick = (replyText) => {
    // Treat the quick reply as a user send
    const userMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: replyText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    setTimeout(() => {
      // If it's a specific trigger like "Enquire Now"
      let responseData;
      if (replyText === 'Enquire Now' || replyText === 'Pricing & Enquiries') {
        responseData = {
          text: "Let's get started on your enquiry! Click the **Open Enquiry Form** button below to tell us about your project requirements.",
          hasEnquiryAction: true,
          quickReplies: ['Services Offered', 'Who is TechLenz?']
        };
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
      if (!isOpen) {
        setUnreadCount((prev) => prev + 1);
      }
    }, 1000);
  };

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
                Online Support
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
                  {/* Format simple bolding markdown */}
                  {msg.text.split('**').map((part, i) => i % 2 === 1 ? <strong key={i}>{part}</strong> : part)}
                  
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
