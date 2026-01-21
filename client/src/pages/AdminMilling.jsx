import React from "react";
import AdminSidebar from "../components/AdminSidebar";
import "./AdminMilling.css";
import {
  FaCogs,
  FaCheckCircle,
  FaTools,
  FaBolt,
  FaIndustry,
  FaArrowCircleRight,
  FaHistory,
} from "react-icons/fa";

const AdminMilling = () => {
  // Mock Data for Live Batches currently in machines
  const activeBatches = [
    {
      unit: "HULLER-A",
      batch: "BATCH-882",
      variety: "Basmati 1121",
      progress: 95,
    },
    {
      unit: "POLISHER-B",
      batch: "BATCH-885",
      variety: "Kainat 1121",
      progress: 40,
    },
  ];

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <main className="admin-content">
        <h1 className="page-title">
          <FaCogs /> Milling Operation System
        </h1>

        {/* 1. REAL-TIME OPERATIONAL STATS */}
        <div
          className="dashboard-grid inventory-stats"
          style={{ marginBottom: "30px" }}
        >
          <div
            className="card stat-card"
            style={{ borderLeft: "4px solid #3e5235" }}
          >
            <div className="stat-content">
              <p>Capacity Utilization</p>
              <h2 style={{ color: "#3e5235" }}>85%</h2>
            </div>
          </div>
          <div
            className="card stat-card"
            style={{ borderLeft: "4px solid #f57c00" }}
          >
            <div className="stat-content">
              <p>Maintenance Alerts</p>
              <h2 style={{ color: "#f57c00" }}>1 Urgent</h2>
            </div>
          </div>
          <div
            className="card stat-card"
            style={{ borderLeft: "4px solid #1976d2" }}
          >
            <div className="stat-content">
              <p>Energy Consumption</p>
              <h2 style={{ color: "#1976d2" }}>450 kWh</h2>
            </div>
          </div>
        </div>

        {/* 2. LIVE PRODUCTION TRACKER */}
        <div
          className="card active-milling-card"
          style={{ marginBottom: "30px" }}
        >
          <h3>
            <FaIndustry /> Live Batch Processing
          </h3>
          <div className="live-batch-list">
            {activeBatches.map((b) => (
              <div key={b.unit} className="batch-row">
                <div className="batch-info">
                  <span className="unit-label">{b.unit}</span>
                  <p>
                    <strong>{b.variety}</strong> ({b.batch})
                  </p>
                </div>
                <div className="batch-progress">
                  <div className="progress-text">{b.progress}% Complete</div>
                  <div className="milling-progress-bg">
                    <div
                      className="milling-progress-fill"
                      style={{ width: `${b.progress}%` }}
                    ></div>
                  </div>
                </div>
                <FaArrowCircleRight className="go-icon" />
              </div>
            ))}
          </div>
        </div>

        {/* 3. UNIT STATUS & MAINTENANCE LOG */}
        <div className="card">
          <div className="card-header-flex">
            <h3>
              <FaHistory /> Unit Maintenance Log
            </h3>
            <button className="schedule-btn">+ New Maintenance Task</button>
          </div>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Unit ID</th>
                <th>Process</th>
                <th>Status</th>
                <th>Efficiency</th>
                <th>Last Service</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>HULLER-A</td>
                <td>Hulling</td>
                <td>
                  <span className="status success">
                    <FaCheckCircle /> Running
                  </span>
                </td>
                <td>98%</td>
                <td>2026-01-01</td>
                <td>
                  <button className="action-btn track">View Log</button>
                </td>
              </tr>
              <tr>
                <td>POLISHER-B</td>
                <td>Polishing</td>
                <td>
                  <span className="status pending">
                    <FaBolt /> Warning
                  </span>
                </td>
                <td>85%</td>
                <td>2026-01-20</td>
                <td>
                  <button
                    className="action-btn track"
                    style={{ color: "#d32f2f", fontWeight: "bold" }}
                  >
                    Schedule Repair
                  </button>
                </td>
              </tr>
              <tr>
                <td>PACKAGING-C</td>
                <td>Packaging</td>
                <td>
                  <span className="status success">Ready</span>
                </td>
                <td>100%</td>
                <td>2025-12-15</td>
                <td>
                  <button className="action-btn track">View Log</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default AdminMilling;
