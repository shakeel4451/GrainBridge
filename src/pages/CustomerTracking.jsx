import React from "react";
import CustomerSidebar from "../components/CustomerSidebar";
import "./CustomerDashboard.css";
import {
  FaSearch,
  FaTruck,
  FaCheck,
  FaWarehouse,
  FaMapMarkerAlt,
} from "react-icons/fa";

const CustomerTracking = () => {
  return (
    <div className="customer-layout">
      <CustomerSidebar />
      <main className="customer-content">
        <h1 className="page-title">
          <FaTruck /> Track Your Shipment
        </h1>

        {/* Search Bar */}
        <div
          className="card"
          style={{
            marginBottom: "30px",
            display: "flex",
            gap: "15px",
            padding: "20px",
          }}
        >
          <input
            type="text"
            placeholder="Enter Order ID (e.g., #11276)"
            style={{
              flex: 1,
              padding: "12px",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          />
          <button className="trace-btn">
            <FaSearch /> Track
          </button>
        </div>

        {/* Tracking Result Card */}
        <div className="card">
          <div
            style={{
              borderBottom: "1px solid #eee",
              paddingBottom: "15px",
              marginBottom: "20px",
            }}
          >
            <h3>Order #11276</h3>
            <p style={{ color: "#666" }}>
              Expected Delivery: <strong>Tomorrow, Nov 02</strong>
            </p>
          </div>

          {/* Visual Timeline */}
          <div className="tracking-timeline">
            <div className="timeline-item completed">
              <div className="icon-box">
                <FaCheck />
              </div>
              <div className="text-box">
                <h4>Order Placed</h4>
                <p>2025-10-15 09:30 AM</p>
              </div>
            </div>

            <div className="timeline-item completed">
              <div className="icon-box">
                <FaWarehouse />
              </div>
              <div className="text-box">
                <h4>Packed & Quality Checked</h4>
                <p>2025-10-16 02:00 PM</p>
              </div>
            </div>

            <div className="timeline-item active">
              <div className="icon-box">
                <FaTruck />
              </div>
              <div className="text-box">
                <h4>In Transit</h4>
                <p>Your order is on the way to Lahore via GT Road.</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="icon-box">
                <FaMapMarkerAlt />
              </div>
              <div className="text-box">
                <h4>Delivered</h4>
                <p>Estimated: 2025-11-02</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CustomerTracking;
