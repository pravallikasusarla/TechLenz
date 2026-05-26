import React, { useState } from 'react';

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [userName, setUserName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) {
      alert("Please select a rating!");
      return;
    }
    
    setSubmitted(true);
    
    // Reset success state after a short delay
    setTimeout(() => {
      setSubmitted(false);
      setRating(0);
      setComment('');
      setUserName('');
    }, 3000);
  };

  return (
    <div className="footer-feedback-column">
      <h4>✨ Feedback & Rating</h4>
      
      {submitted ? (
        <div className="feedback-footer-success animate-fade-in">
          <div className="success-badge-glow-small">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <h5>Thank You!</h5>
          <p>Your rating & review are secured live.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="feedback-footer-form">
          {/* Star Rating Row */}
          <div className="stars-row-footer">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className={`star-btn-footer ${star <= (hoverRating || rating) ? 'active' : ''}`}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
              </button>
            ))}
          </div>

          <div className="footer-input-group">
            <input
              type="text"
              placeholder="Your Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>

          <div className="footer-input-group mt-2">
            <textarea
              rows="2"
              placeholder="Drop your feedback here..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-footer-submit mt-2">
            Submit Review
          </button>
        </form>
      )}
    </div>
  );
};

export default Feedback;
