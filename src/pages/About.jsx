import React from "react";
import "./About.css";
import hero2 from "../assets/hero2.png"; // Reusing the milling image

const About = () => {
  return (
    <div className="about-container">
      {/* 1. Page Header */}
      <div
        className="about-header"
        style={{ backgroundImage: `url(${hero2})` }}
      >
        <div className="header-overlay">
          <h1>About GrainBridge</h1>
          <p>Connecting Farmers Directly to Your Table since 2001</p>
        </div>
      </div>

      {/* 2. Our Story Section */}
      <div className="about-content">
        <section className="story-section">
          <h2>Our Story</h2>
          <p>
            Located in the heart of <strong>Punjab</strong>—known globally as
            the land of premium Basmati—GrainBridge started as a small
            family-owned sheller. Over the last two decades, we have evolved
            into a state-of-the-art rice processing facility.
          </p>
          <p>
            We noticed a gap in the market: Farmers were underpaid, and
            consumers were getting mixed-quality rice.
            <strong>GrainBridge was born to solve this.</strong> By using modern
            digital traceability, we ensure that every grain you buy puts money
            directly in a farmer's pocket and guarantees 100% purity for your
            family.
          </p>
        </section>

        {/* 3. Mission & Vision Cards */}
        <section className="mission-grid">
          <div className="mission-card">
            <h3>Our Mission</h3>
            <p>
              To digitize the rice supply chain, ensuring fair pricing for
              farmers and transparent, high-quality nutrition for consumers.
            </p>
          </div>
          <div className="mission-card">
            <h3>Our Vision</h3>
            <p>
              To become Pakistan's #1 transparent agri-tech brand, setting a
              global standard for food traceability.
            </p>
          </div>
          <div className="mission-card">
            <h3>Our Values</h3>
            <p>
              <strong>Purity:</strong> Zero compromise on quality.
              <br />
              <strong>Transparency:</strong> You know what you eat.
              <br />
              <strong>Community:</strong> Growing together with farmers.
            </p>
          </div>
        </section>

        {/* 4. Stats Section */}
        <section className="stats-bar">
          <div className="stat-item">
            <h2>20+</h2>
            <p>Years Experience</p>
          </div>
          <div className="stat-item">
            <h2>500+</h2>
            <p>Partner Farmers</p>
          </div>
          <div className="stat-item">
            <h2>100%</h2>
            <p>Export Quality</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
