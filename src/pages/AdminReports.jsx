import React from "react";
import AdminSidebar from "../components/AdminSidebar";
import "./AdminDashboard.css"; // Reusing dashboard styles
import {
  FaChartBar,
  FaCalendarAlt,
  FaDownload,
  FaDatabase,
  FaClipboardCheck,
} from "react-icons/fa";

const AdminReports = () => {
  return (
    <div className="admin-layout">
      <AdminSidebar />
      <main className="admin-content">
        <h1 className="page-title">
          <FaChartBar /> Business Intelligence & Reports
        </h1>

        {/* Filters and Actions */}
        <div
          className="card"
          style={{
            marginBottom: "30px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "20px",
          }}
        >
          <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
            <FaCalendarAlt style={{ color: "#8c734b", fontSize: "20px" }} />
            <select
              style={{
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            >
              <option>Last 30 Days</option>
              <option>Last 90 Days</option>
              <option>Year 2025</option>
            </select>
            <select
              style={{
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            >
              <option>All Products</option>
              <option>Basmati 1121</option>
              <option>Super Kernel</option>
            </select>
          </div>
          <button
            className="action-btn track"
            style={{
              backgroundColor: "#3e5235",
              color: "white",
              border: "none",
            }}
          >
            <FaDownload /> Download PDF Report
          </button>
        </div>

        {/* Key Report Widgets */}
        <div className="dashboard-grid">
          {/* Report 1: Profitability Trend */}
          <div className="card chart-card">
            <h3>
              <FaDatabase /> Product Profitability by Volume
            </h3>
            <p className="subtitle">
              Identifies highest and lowest margin products.
            </p>
            {/* Simulated Chart Bars */}
            <div
              className="chart-placeholder"
              style={{
                height: "200px",
                alignItems: "flex-start",
                justifyContent: "space-around",
              }}
            >
              <div style={{ textAlign: "center", flex: 1 }}>
                <p style={{ color: "#3e5235", fontWeight: "bold" }}>
                  Basmati 1121
                </p>
                <h2 style={{ color: "#3e5235", fontSize: "36px" }}>22%</h2>
                <p>Margin</p>
              </div>
              <div style={{ textAlign: "center", flex: 1 }}>
                <p style={{ color: "#8c734b", fontWeight: "bold" }}>
                  Super Kernel
                </p>
                <h2 style={{ color: "#8c734b", fontSize: "36px" }}>18%</h2>
                <p>Margin</p>
              </div>
              <div style={{ textAlign: "center", flex: 1 }}>
                <p style={{ color: "#f57c00", fontWeight: "bold" }}>
                  Irri-6 Economy
                </p>
                <h2 style={{ color: "#f57c00", fontSize: "36px" }}>12%</h2>
                <p>Margin</p>
              </div>
            </div>
          </div>

          {/* Report 2: Supplier Performance Ranking */}
          <div className="card table-card">
            <h3>
              <FaClipboardCheck /> Top 3 Suppliers (By Quality Score)
            </h3>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Supplier</th>
                  <th>Avg. Score</th>
                  <th>Deliveries</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Gujranwala Agri</td>
                  <td style={{ color: "#2e7d32", fontWeight: "bold" }}>9.5</td>
                  <td>12</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Nasir Khan Farms</td>
                  <td style={{ color: "#2e7d32", fontWeight: "bold" }}>9.2</td>
                  <td>18</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Multan Growers</td>
                  <td style={{ color: "#8c734b", fontWeight: "bold" }}>8.8</td>
                  <td>7</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Predictive Insight Widget */}
        <div className="card" style={{ marginTop: "25px" }}>
          <h3 style={{ color: "#1976d2" }}>
            <FaChartBar /> Predictive Market Insight
          </h3>
          <p style={{ fontSize: "18px", padding: "15px 0" }}>
            **Forecast:** Basmati 1121 Export Demand is likely to **INCREASE by
            7%** over the next 45 days.
          </p>
          <p style={{ color: "#777", fontSize: "14px" }}>
            *Action Required: Initiate new supply contracts immediately to
            secure stock before market rates rise.*
          </p>
        </div>
      </main>
    </div>
  );
};

export default AdminReports;
