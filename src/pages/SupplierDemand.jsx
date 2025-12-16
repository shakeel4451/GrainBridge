import React from "react";
import SupplierSidebar from "../components/SupplierSidebar";
import "./SupplierDashboard.css";
import { FaLeaf, FaTruck, FaChartLine } from "react-icons/fa";

const SupplierDemand = () => {
  const demands = [
    {
      id: 1,
      crop: "Super Kernel Basmati",
      urgency: "High",
      required: "1,500 Bags",
      rate: 11800,
      progress: 60,
    },
    {
      id: 2,
      crop: "Kainat 1121",
      urgency: "Medium",
      required: "800 Bags",
      rate: 12500,
      progress: 30,
    },
    {
      id: 3,
      crop: "Irri-6 (Coarse)",
      urgency: "Low",
      required: "2,000 Bags",
      rate: 6200,
      progress: 10,
    },
  ];

  return (
    <div className="supplier-layout">
      <SupplierSidebar />
      <main className="supplier-content">
        <h1 className="page-title">
          <FaLeaf /> Current Mill Demand
        </h1>
        <p style={{ marginBottom: "20px", color: "#666" }}>
          We are currently accepting the following varieties. Commit early to
          lock in the rates.
        </p>

        <div className="dashboard-grid" style={{ flexDirection: "column" }}>
          {demands.map((item) => (
            <div
              key={item.id}
              className="card demand-item-card"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ flex: 2 }}>
                <h3 style={{ margin: 0, color: "#3e5235" }}>{item.crop}</h3>
                <span
                  className={`status ${
                    item.urgency === "High" ? "processing" : "shipped"
                  }`}
                  style={{ marginTop: "5px", display: "inline-block" }}
                >
                  Urgency: {item.urgency}
                </span>
              </div>

              <div style={{ flex: 2, textAlign: "center" }}>
                <p style={{ fontSize: "14px", color: "#888" }}>
                  Purchasing Rate (40kg)
                </p>
                <h2 style={{ color: "#8c734b", margin: "5px 0" }}>
                  Rs. {item.rate.toLocaleString()}
                </h2>
              </div>

              <div style={{ flex: 2, padding: "0 20px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "12px",
                    marginBottom: "5px",
                  }}
                >
                  <span>Fulfilled</span>
                  <span>Target: {item.required}</span>
                </div>
                <div
                  style={{
                    background: "#eee",
                    height: "10px",
                    borderRadius: "5px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${item.progress}%`,
                      background: "#3e5235",
                      height: "100%",
                    }}
                  ></div>
                </div>
              </div>

              <div style={{ flex: 1 }}>
                <button className="confirm-btn">
                  <FaTruck /> Commit Supply
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default SupplierDemand;
