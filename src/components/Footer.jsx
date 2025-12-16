import React from "react";
import "./Footer.css";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaWhatsapp,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      {/* Column 1: Physical Address */}
      <div className="footer-column">
        <h3>Head Office</h3>
        <p>
          <FaMapMarkerAlt className="footer-icon" />
          Plot #45, New Grain Market,
          <br />
          Lahore-Jaranwala Road,
          <br />
          Punjab, Pakistan.
        </p>
      </div>

      {/* Column 2: Contact Info */}
      <div className="footer-column">
        <h3>Contact Us</h3>
        <p>
          <FaPhone className="footer-icon" />
          +92 42 3123 4567 (Landline)
        </p>
        <p>
          <FaWhatsapp className="footer-icon" />
          +92 300 987 6543 (WhatsApp)
        </p>
        <p>
          <FaEnvelope className="footer-icon" />
          info@grainbridge.pk
        </p>
        <p>
          <FaEnvelope className="footer-icon" />
          sales@grainbridge.pk
        </p>
      </div>

      {/* Column 3: Social Media */}
      <div className="footer-column">
        <h3>Follow Us</h3>
        <p style={{ marginBottom: "15px", fontSize: "14px", color: "#ccc" }}>
          Stay updated with our latest harvest news and rates.
        </p>
        <div className="social-icons">
          <FaFacebook className="social-icon" />
          <FaInstagram className="social-icon" />
          <FaTwitter className="social-icon" />
          <FaYoutube className="social-icon" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
