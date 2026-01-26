import React, { useState, useEffect } from "react";
import "./Home.css";
import {
  FaMapMarkerAlt,
  FaPlayCircle,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";

// Import Hero Images
import hero1 from "../assets/hero1.png";
import hero2 from "../assets/hero2.png";
import hero3 from "../assets/hero3.png";

// Import Product Images
import prodBasmati from "../assets/basmati.png";
import prodJasmine from "../assets/jasmine.png";
import prodBrown from "../assets/brown.png";

const Home = () => {
  const heroImages = [hero1, hero2, hero3];
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(slideInterval);
  }, [heroImages.length]);

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section
        className="hero-section"
        style={{ backgroundImage: `url(${heroImages[currentImage]})` }}
      >
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>GrainBridge - Premium Rice, Traced from Farm to Table</h1>
            <p>Bridging quality from our mill to your home</p>
            <div className="slider-dots">
              {heroImages.map((_, index) => (
                <span
                  key={index}
                  className={`dot ${index === currentImage ? "active" : ""}`}
                  onClick={() => setCurrentImage(index)}
                ></span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="content-container">
        <div className="left-column">
          {/* 1. OUR PROCESS SECTION */}
          <section className="section-block" id="process">
            <h2 className="section-title">Our Process & Virtual Tour</h2>
            <p className="section-desc">
              From harvesting in the fertile fields to high-tech milling,
              discover how GrainBridge ensures every grain meets international
              standards.
            </p>
            <div className="video-wrapper">
              <div className="video-placeholder">
                <FaPlayCircle className="play-icon" />
                <p>Watch Virtual Mill Tour</p>
              </div>
            </div>
          </section>

          {/* Featured Products */}
          <section className="section-block">
            <h2 className="section-title">Featured Products</h2>
            <div className="product-grid">
              {/* Product 1 */}
              <div className="product-card">
                <img
                  src={prodBasmati}
                  alt="Premium Basmati"
                  className="product-img-real"
                />
                <h3>Premium Basmati</h3>
                <p className="price">
                  Rs. 450<span className="unit">/kg</span>
                </p>
                <p className="trace-tag">
                  <FaMapMarkerAlt /> Traceable
                </p>
              </div>

              {/* Product 2 */}
              <div className="product-card">
                <img
                  src={prodJasmine}
                  alt="Jasmine Rice"
                  className="product-img-real"
                />
                <h3>Super Kernel / Jasmine</h3>
                <p className="price">
                  Rs. 380<span className="unit">/kg</span>
                </p>
                <p className="trace-tag">
                  <FaMapMarkerAlt /> Traceable
                </p>
              </div>

              {/* Product 3 */}
              <div className="product-card">
                <img
                  src={prodBrown}
                  alt="Brown Rice"
                  className="product-img-real"
                />
                <h3>Organic Brown Rice</h3>
                <p className="price">
                  Rs. 520<span className="unit">/kg</span>
                </p>
                <p className="trace-tag">
                  <FaMapMarkerAlt /> Traceable
                </p>
              </div>
            </div>
          </section>
        </div>

        <div className="right-column">
          {/* Latest News */}
          <section className="section-block news-block">
            <h2 className="section-title">Latest News</h2>
            <div className="news-card">
              <h3>New Traceability System Live!</h3>
              <p>
                We now track every grain from harvest to packaging to ensure
                100% purity.
              </p>
              <button className="read-more-btn">Read More</button>
            </div>
          </section>

          {/* Market Ticker */}
          <section className="section-block ticker-block">
            <h2 className="section-title">Live Market Rates</h2>
            <table className="ticker-table">
              <thead>
                <tr>
                  <th>Rice Type</th>
                  <th>Price (40kg)</th>
                  <th>Trend</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Super Basmati</td>
                  <td>Rs. 12,500</td>
                  <td className="price-up">▲</td>
                </tr>
                <tr>
                  <td>Kainat 1121</td>
                  <td>Rs. 11,800</td>
                  <td className="price-up">▲</td>
                </tr>
                <tr>
                  <td>Irri-6</td>
                  <td>Rs. 6,200</td>
                  <td className="price-down">▼</td>
                </tr>
              </tbody>
            </table>
          </section>
        </div>
      </div>

      {/* 2. CONTACT SECTION */}
      <section className="contact-section-home" id="contact">
        <div className="contact-content-wrapper">
          <h2 className="section-title">Get In Touch</h2>
          <div className="contact-grid-home">
            <div className="contact-info-card">
              <FaPhoneAlt className="contact-icon" />
              <h3>Call Us</h3>
              <p>+92 300 1234567</p>
            </div>

            <div className="contact-info-card">
              <FaEnvelope className="contact-icon" />
              <h3>Email Us</h3>
              <p>info@grainbridge.com</p>
            </div>

            <div className="contact-info-card">
              <FaMapMarkerAlt className="contact-icon" />
              <h3>Visit Us</h3>
              <p>Rice Industrial Zone, Punjab, Pakistan</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
