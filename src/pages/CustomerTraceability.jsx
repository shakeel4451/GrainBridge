import React from "react";
import CustomerSidebar from "../components/CustomerSidebar";
import "./CustomerDashboard.css";
import { FaSeedling, FaIndustry, FaBox, FaMapMarkedAlt } from "react-icons/fa";

const CustomerTraceability = () => {
  return (
    <div className="customer-layout">
      <CustomerSidebar />
      <main className="customer-content">
        <h1 className="page-title">
          <FaMapMarkedAlt /> Farm-to-Table Traceability
        </h1>
        <p style={{ color: "#666", marginBottom: "30px" }}>
          Enter the Batch ID found on the back of your GrainBridge packaging to
          see its journey.
        </p>

        {/* Search Section */}
        <div
          className="card"
          style={{ padding: "30px", textAlign: "center", marginBottom: "30px" }}
        >
          <input
            type="text"
            placeholder="Enter Batch ID (e.g., PBK-1121-089)"
            style={{
              padding: "12px",
              width: "300px",
              marginRight: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
          <button className="trace-btn" style={{ display: "inline-flex" }}>
            Search History
          </button>
        </div>

        {/* Results Chain */}
        <div className="dashboard-grid">
          <div
            className="card"
            style={{ textAlign: "center", borderTop: "4px solid #3e5235" }}
          >
            <FaSeedling
              style={{
                fontSize: "40px",
                color: "#3e5235",
                marginBottom: "15px",
              }}
            />
            <h3>Harvest</h3>
            <p>
              <strong>Farmer:</strong> Nasir Khan
            </p>
            <p>
              <strong>Location:</strong> Gujranwala, Punjab
            </p>
            <p>
              <strong>Date:</strong> 25 Sep 2025
            </p>
          </div>

          <div
            className="card"
            style={{ textAlign: "center", borderTop: "4px solid #8c734b" }}
          >
            <FaIndustry
              style={{
                fontSize: "40px",
                color: "#8c734b",
                marginBottom: "15px",
              }}
            />
            <h3>Milling</h3>
            <p>
              <strong>Facility:</strong> GrainBridge Unit 1
            </p>
            <p>
              <strong>Process:</strong> Aged & Polished
            </p>
            <p>
              <strong>Date:</strong> 01 Oct 2025
            </p>
          </div>

          <div
            className="card"
            style={{ textAlign: "center", borderTop: "4px solid #3e5235" }}
          >
            <FaBox
              style={{
                fontSize: "40px",
                color: "#3e5235",
                marginBottom: "15px",
              }}
            />
            <h3>Packaging</h3>
            <p>
              <strong>Batch:</strong> PBK-1121-089
            </p>
            <p>
              <strong>Quality:</strong> Export Grade A
            </p>
            <p>
              <strong>Date:</strong> 03 Oct 2025
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CustomerTraceability;
