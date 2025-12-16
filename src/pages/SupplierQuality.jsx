import React from "react";
import SupplierSidebar from "../components/SupplierSidebar";
import "./SupplierDashboard.css";
import { FaFlask, FaExclamationTriangle, FaCheckDouble } from "react-icons/fa";

const SupplierQuality = () => {
  return (
    <div className="supplier-layout">
      <SupplierSidebar />
      <main className="supplier-content">
        <h1 className="page-title">
          <FaFlask /> Lab Quality Reports
        </h1>

        {/* Detailed Report Card */}
        <div className="card">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              borderBottom: "1px solid #eee",
              paddingBottom: "15px",
              marginBottom: "15px",
            }}
          >
            <div>
              <h3>Batch #PBK-1020-004</h3>
              <p style={{ color: "#666" }}>
                Delivered on: 25 Oct 2025 | Variety: Super Kernel
              </p>
            </div>
            <div style={{ textAlign: "right" }}>
              <h2 style={{ color: "#3e5235" }}>Grade A</h2>
              <span className="status delivered">Passed Inspection</span>
            </div>
          </div>

          <div className="dashboard-grid">
            <div
              style={{
                flex: 1,
                textAlign: "center",
                borderRight: "1px solid #eee",
              }}
            >
              <h4 style={{ color: "#555" }}>Moisture Content</h4>
              <h2 style={{ color: "#2e7d32" }}>11.5%</h2>
              <p style={{ fontSize: "12px", color: "#999" }}>
                Ideal Range: 10-12%
              </p>
            </div>
            <div
              style={{
                flex: 1,
                textAlign: "center",
                borderRight: "1px solid #eee",
              }}
            >
              <h4 style={{ color: "#555" }}>Broken Grain</h4>
              <h2 style={{ color: "#f57c00" }}>4.2%</h2>
              <p style={{ fontSize: "12px", color: "#999" }}>
                Acceptable: &lt; 5%
              </p>
            </div>
            <div style={{ flex: 1, textAlign: "center" }}>
              <h4 style={{ color: "#555" }}>Purity Level</h4>
              <h2 style={{ color: "#2e7d32" }}>98%</h2>
              <p style={{ fontSize: "12px", color: "#999" }}>Excellent</p>
            </div>
          </div>

          <div
            style={{
              background: "#f9f9f9",
              padding: "15px",
              marginTop: "20px",
              borderRadius: "8px",
              borderLeft: "4px solid #8c734b",
            }}
          >
            <strong>
              <FaCheckDouble /> Lab Note:
            </strong>{" "}
            This batch meets Export Quality standards. A bonus of Rs. 50/40kg
            has been applied to your payment.
          </div>
        </div>

        {/* Second Report (Failed/Lower Grade Example) */}
        <div className="card" style={{ marginTop: "25px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              borderBottom: "1px solid #eee",
              paddingBottom: "15px",
              marginBottom: "15px",
            }}
          >
            <div>
              <h3>Batch #PBK-0925-001</h3>
              <p style={{ color: "#666" }}>
                Delivered on: 28 Sep 2025 | Variety: Irri-6
              </p>
            </div>
            <div style={{ textAlign: "right" }}>
              <h2 style={{ color: "#f57c00" }}>Grade B</h2>
              <span className="status processing">Standard Quality</span>
            </div>
          </div>
          <div style={{ padding: "10px", color: "#666" }}>
            <FaExclamationTriangle style={{ color: "#f57c00" }} />{" "}
            <em>
              Moisture content was slightly high (14%). Drying deduction
              applied.
            </em>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SupplierQuality;
