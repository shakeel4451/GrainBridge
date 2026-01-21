import React, { useState } from "react";
import CustomerSidebar from "../components/CustomerSidebar";
import "./Traceability.css";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaSeedling,
  FaIndustry,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";

const Traceability = () => {
  const [batchCode, setBatchCode] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Data to verify search is working
  const traceDatabase = {
    "PBK-1121-089": {
      farmer: "Nasir Khan",
      location: "Gujranwala, Punjab",
      milledDate: "January 10, 2026",
      qualityScore: "9.8/10",
      variety: "Basmati 1121 (Export)",
      status: "Verified Authentic",
    },
  };

  const handleTrace = (e) => {
    e.preventDefault();
    console.log("Trace button clicked for code:", batchCode); // DEBUG LOG

    if (!batchCode.trim()) return;

    setLoading(true);
    setResult(null);

    // Simulate API delay
    setTimeout(() => {
      const code = batchCode.toUpperCase().trim();
      const foundData = traceDatabase[code];

      if (foundData) {
        setResult({ success: true, ...foundData });
      } else {
        setResult({ success: false });
      }
      setLoading(false);
    }, 600);
  };

  return (
    <div className="customer-layout">
      <CustomerSidebar />
      <main className="customer-content">
        <h1 className="page-title">
          <FaMapMarkerAlt /> Traceability Check
        </h1>

        <div className="trace-search-section card">
          <h3>Verify Batch Origin</h3>
          <p>
            Transparency is our priority. Enter your batch code to see the
            farm-to-mill journey.
          </p>

          <form onSubmit={handleTrace} className="trace-form">
            <div className="search-input-wrapper">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Enter Code (e.g. PBK-1121-089)"
                value={batchCode}
                onChange={(e) => setBatchCode(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="trace-submit-btn"
              disabled={loading}
            >
              {loading ? "Searching..." : "Trace Now"}
            </button>
          </form>
        </div>

        {/* LOADING INDICATOR */}
        {loading && <div className="loading-spinner">Verifying records...</div>}

        {/* RESULT SECTION */}
        {result && result.success && (
          <div className="trace-result-container fade-in card">
            <div className="result-header">
              <FaCheckCircle className="verified-icon" />
              <div>
                <h2>Verified Authentic</h2>
                <p>Batch: {batchCode.toUpperCase()}</p>
              </div>
            </div>
            <div className="trace-details">
              <div className="detail-item">
                <FaSeedling /> <strong>Farmer:</strong> {result.farmer}
              </div>
              <div className="detail-item">
                <FaMapMarkerAlt /> <strong>Region:</strong> {result.location}
              </div>
              <div className="detail-item">
                <FaIndustry /> <strong>Milled:</strong> {result.milledDate}
              </div>
              <div className="detail-item">
                <FaCheckCircle /> <strong>Quality:</strong>{" "}
                {result.qualityScore}
              </div>
            </div>
          </div>
        )}

        {result && !result.success && (
          <div className="trace-error card fade-in">
            <FaExclamationTriangle className="error-icon" />
            <h3>Code Not Found</h3>
            <p>
              We couldn't find records for "{batchCode}". Please check the code
              on the bag.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Traceability;
