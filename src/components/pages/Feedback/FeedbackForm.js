import React, { useState } from "react";
import FeedbackService from "../../services/FeedbackService";
import "./FeedbackForm.css";  // Importing the CSS file

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedback({ ...feedback, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await FeedbackService.submitFeedback(feedback);
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  if (submitted) {
    return <p className="feedback-message">Thank you for your feedback!</p>;
  }

  return (
    <div className="feedback-body">
      <form className="feedback-form" onSubmit={handleSubmit}>
        <div className="feedback-form-group">
          <label htmlFor="name" className="feedback-label">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={feedback.name}
            onChange={handleChange}
            required
            className="feedback-input"
          />
        </div>

        <div className="feedback-form-group">
          <label htmlFor="email" className="feedback-label">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={feedback.email}
            onChange={handleChange}
            required
            className="feedback-input"
          />
        </div>

        <div className="feedback-form-group">
          <label htmlFor="message" className="feedback-label">Message</label>
          <textarea
            id="message"
            name="message"
            value={feedback.message}
            onChange={handleChange}
            required
            className="feedback-textarea"
          ></textarea>
        </div>

        <button type="submit" className="feedback-button">Submit</button>
      </form>
    </div>
  );
};

export default FeedbackForm;
