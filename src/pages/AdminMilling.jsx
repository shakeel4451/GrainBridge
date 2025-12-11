import React from "react";
import AdminSidebar from "../components/AdminSidebar";
import "./AdminDashboard.css"; // Reusing dashboard styles
import { FaCogs, FaCheckCircle, FaTools, FaBolt } from "react-icons/fa";

const AdminMilling = () => {
  return (
    <div className="admin-layout">
      <AdminSidebar />
      <main className="admin-content">
        <h1 className="page-title">
          <FaCogs /> Milling Operation System
        </h1>

        {/* Real-time Status and Alerts */}
        <div
          className="dashboard-grid inventory-stats"
          style={{ marginBottom: "30px" }}
        >
          <div
            className="card stat-card"
            style={{ borderLeft: "4px solid #3e5235" }}
          >
            <p>Current Capacity Utilization</p>
            <h2 style={{ color: "#3e5235" }}>85%</h2>
          </div>
          <div
            className="card stat-card"
            style={{ borderLeft: "4px solid #f57c00" }}
          >
            <p>Maintenance Alerts</p>
            <h2 style={{ color: "#f57c00" }}>1 Urgent</h2>
          </div>
          <div
            className="card stat-card"
            style={{ borderLeft: "4px solid #1976d2" }}
          >
            <p>Energy Consumption</p>
            <h2 style={{ color: "#1976d2" }}>450 kWh</h2>
          </div>
        </div>

        <div className="card">
          <h3>Unit Status and Maintenance Log</h3>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Unit ID</th>
                <th>Process</th>
                <th>Status</th>
                <th>Efficiency</th>
                <th>Last Maintenance</th>
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
                <td>2025-11-01</td>
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
                <td>2025-11-20</td>
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
                <td>2025-10-15</td>
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
