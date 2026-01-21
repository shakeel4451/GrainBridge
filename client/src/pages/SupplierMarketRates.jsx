import React, { useState } from "react";
import SupplierSidebar from "../components/SupplierSidebar";
import "./SupplierMarketRates.css";
import {
  FaChartLine,
  FaArrowUp,
  FaArrowDown,
  FaInfoCircle,
  FaCalendarAlt,
  FaGlobeAmericas,
} from "react-icons/fa";

const SupplierMarketRates = () => {
  // Mock data for price trends
  const marketData = [
    {
      id: 1,
      variety: "Super Kernel Basmati",
      current: 12500,
      previous: 11800,
      change: "+5.9%",
      trend: "up",
    },
    {
      id: 2,
      variety: "Kainat 1121 (Steam)",
      current: 14200,
      previous: 14500,
      change: "-2.1%",
      trend: "down",
    },
    {
      id: 3,
      variety: "Irri-6 (Coarse)",
      current: 6400,
      previous: 6200,
      change: "+3.2%",
      trend: "up",
    },
    {
      id: 4,
      variety: "C-9 (Hybrid)",
      current: 7100,
      previous: 7100,
      change: "0.0%",
      trend: "stable",
    },
  ];

  return (
    <div className="supplier-layout">
      <SupplierSidebar />
      <main className="supplier-content">
        <div className="market-header">
          <h1 className="page-title">
            <FaChartLine /> Market Trends & Pricing
          </h1>
          <div className="last-update">
            <FaCalendarAlt /> Last Update: Jan 21, 2026
          </div>
        </div>

        {/* 1. MARKET INSIGHT CARDS */}
        <div className="market-insight-grid">
          <div className="card insight-card export">
            <FaGlobeAmericas className="insight-icon" />
            <div>
              <h4>Export Demand</h4>
              <p>
                Strong demand from GCC countries is driving Basmati prices up.
              </p>
            </div>
          </div>
          <div className="card insight-card tip">
            <FaInfoCircle className="insight-icon" />
            <div>
              <h4>Supplier Pro-Tip</h4>
              <p>
                Consider holding Irri-6 stock; prices expected to peak in 3
                weeks.
              </p>
            </div>
          </div>
        </div>

        {/* 2. PRICE TREND CHART (CSS BARS) */}
        <div className="card trend-chart-section">
          <h3>6-Month Price Index (Basmati 1121)</h3>
          <div className="bar-chart-container">
            {[45, 55, 65, 60, 80, 95].map((height, i) => (
              <div key={i} className="bar-wrapper">
                <div className="bar-fill" style={{ height: `${height}%` }}>
                  <span className="bar-label">
                    Rs.{(height * 150).toLocaleString()}
                  </span>
                </div>
                <span className="month-label">
                  {["Aug", "Sep", "Oct", "Nov", "Dec", "Jan"][i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 3. CURRENT MARKET RATES TABLE */}
        <div className="card">
          <h3>Current Mandi Rates (Per 40kg)</h3>
          <table className="market-table">
            <thead>
              <tr>
                <th>Rice Variety</th>
                <th>Current Rate</th>
                <th>Previous Rate</th>
                <th>Change</th>
                <th>Market Sentiment</th>
              </tr>
            </thead>
            <tbody>
              {marketData.map((item) => (
                <tr key={item.id}>
                  <td className="variety-name">{item.variety}</td>
                  <td className="rate-now">
                    Rs. {item.current.toLocaleString()}
                  </td>
                  <td className="rate-prev">
                    Rs. {item.previous.toLocaleString()}
                  </td>
                  <td className={`change-cell ${item.trend}`}>
                    {item.trend === "up" ? (
                      <FaArrowUp />
                    ) : item.trend === "down" ? (
                      <FaArrowDown />
                    ) : (
                      ""
                    )}{" "}
                    {item.change}
                  </td>
                  <td>
                    <span className={`sentiment-tag ${item.trend}`}>
                      {item.trend === "up"
                        ? "Bullish"
                        : item.trend === "down"
                        ? "Bearish"
                        : "Stable"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default SupplierMarketRates;
