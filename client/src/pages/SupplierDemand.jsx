import React, { useState } from "react";
import SupplierSidebar from "../components/SupplierSidebar";
import "./SupplierDemand.css";
import {
  FaLeaf,
  FaTruck,
  FaChartLine,
  FaExclamationCircle,
  FaCheckDouble,
} from "react-icons/fa";

const SupplierDemand = () => {
  const [demands, setDemands] = useState([
    {
      id: 1,
      crop: "Super Kernel Basmati",
      urgency: "High",
      required: 1500,
      fulfilled: 900,
      rate: 11800,
      progress: 60,
    },
    {
      id: 2,
      crop: "Kainat 1121",
      urgency: "Medium",
      required: 800,
      fulfilled: 240,
      rate: 12500,
      progress: 30,
    },
    {
      id: 3,
      crop: "Irri-6 (Coarse)",
      urgency: "Low",
      required: 2000,
      fulfilled: 200,
      rate: 6200,
      progress: 10,
    },
  ]);

  const handleCommit = (cropName) => {
    const amount = prompt(`How many bags of ${cropName} can you supply?`);
    if (amount && !isNaN(amount)) {
      alert(
        `Commitment received for ${amount} bags of ${cropName}. Our procurement team will contact you shortly.`
      );
    }
  };

  return (
    <div className="supplier-layout">
      <SupplierSidebar />
      <main className="supplier-content">
        <div className="demand-header">
          <h1 className="page-title">
            <FaLeaf /> Current Mill Demand
          </h1>
          <div className="live-tag">
            <span className="dot"></span> LIVE RATES
          </div>
        </div>

        <p className="demand-subtitle">
          The mill is actively sourcing the following varieties. Commit your
          stock to lock in current market premiums.
        </p>

        <div className="demand-container">
          {demands.map((item) => (
            <div
              key={item.id}
              className={`demand-card ${item.urgency.toLowerCase()}`}
            >
              <div className="demand-info">
                <div className="crop-details">
                  <h3>{item.crop}</h3>
                  <span className={`urgency-tag ${item.urgency.toLowerCase()}`}>
                    {item.urgency === "High" && <FaExclamationCircle />}
                    {item.urgency} Urgency
                  </span>
                </div>

                <div className="pricing-details">
                  <p>Buying Rate (40kg)</p>
                  <h2 className="rate-text">
                    Rs. {item.rate.toLocaleString()}
                  </h2>
                </div>

                <div className="fulfillment-details">
                  <div className="fulfillment-labels">
                    <span>{item.progress}% Fulfilled</span>
                    <span>Target: {item.required} Bags</span>
                  </div>
                  <div className="progress-bar-bg">
                    <div
                      className="progress-bar-fill"
                      style={{ width: `${item.progress}%` }}
                    ></div>
                  </div>
                  <p className="remaining-text">
                    Remaining: {item.required - item.fulfilled} Bags
                  </p>
                </div>

                <div className="demand-actions">
                  <button
                    className="commit-btn"
                    onClick={() => handleCommit(item.crop)}
                  >
                    <FaTruck /> Commit Supply
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="demand-footer-note card">
          <FaCheckDouble />
          <p>
            Note: Prices are subject to quality inspection at the mill gate. AI
            Quality Pre-Scan is recommended before dispatch.
          </p>
        </div>
      </main>
    </div>
  );
};

export default SupplierDemand;
