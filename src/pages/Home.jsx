import React, { useState, useEffect } from "react";
import "./Home.css";
import { FaMapMarkerAlt, FaPlayCircle } from "react-icons/fa";

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
  }, []);

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
          {/* Virtual Mill Tour */}
          <section className="section-block">
            <h2 className="section-title">Virtual Mill Tour</h2>
            <div className="video-wrapper">
              <div className="video-placeholder">
                <FaPlayCircle className="play-icon" />
                <p>Watch Virtual Tour</p>
              </div>
            </div>
          </section>

          {/* Featured Products - UPDATED WITH IMAGES & PKR */}
          <section className="section-block">
            <h2 className="section-title">Featured Products</h2>
            <div className="product-grid">
              {/* Product 1: Basmati */}
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

              {/* Product 2: Jasmine */}
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

              {/* Product 3: Brown */}
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

          {/* Market Ticker - UPDATED CURRENCY */}
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
    </div>
  );
};

export default Home;
