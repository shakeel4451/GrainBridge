import React from "react";
import "./Contact.css";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaClock,
} from "react-icons/fa";

const Contact = () => {
  return (
    <div className="contact-page">
      <header className="contact-hero">
        <h1>Connect with GrainBridge</h1>
        <p>We are ready to support your retail or wholesale needs.</p>
      </header>

      <div className="contact-container">
        <div className="contact-details-grid">
          <div className="info-card">
            <FaPhoneAlt className="i-icon" />
            <h4>Call Us</h4>
            <p>+92 300 1234567</p>
          </div>
          <div className="info-card">
            <FaEnvelope className="i-icon" />
            <h4>Email Us</h4>
            <p>support@grainbridge.com</p>
          </div>
          <div className="info-card">
            <FaMapMarkerAlt className="i-icon" />
            <h4>Visit Us</h4>
            <p>Industrial Area, Gujranwala, Pakistan</p>
          </div>
          <div className="info-card">
            <FaClock className="i-icon" />
            <h4>Hours</h4>
            <p>Mon - Sat: 9:00 AM - 6:00 PM</p>
          </div>
        </div>

        <div className="contact-form-wrapper card">
          <h3>Send a Message</h3>
          <form className="contact-main-form">
            <div className="input-row">
              <input type="text" placeholder="Your Name" required />
              <input type="email" placeholder="Email Address" required />
            </div>
            <input type="text" placeholder="Subject" required />
            <textarea
              rows="6"
              placeholder="Tell us about your requirements..."
              required
            ></textarea>
            <button type="submit" className="submit-btn">
              <FaPaperPlane /> Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
