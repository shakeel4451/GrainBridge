import React from "react";
import AdminSidebar from "../components/AdminSidebar";
import "./AdminReports.css"; // Using dedicated CSS
import {
  FaChartBar,
  FaCalendarAlt,
  FaDownload,
  FaDatabase,
  FaClipboardCheck,
  FaLightbulb,
  FaArrowUp,
  FaFilter,
} from "react-icons/fa";

const AdminReports = () => {
  return (
    <div className="admin-layout">
      <AdminSidebar />
      <main className="admin-content">
        <div className="reports-header">
          <h1 className="page-title">
            <FaChartBar /> Business Intelligence & Reports
          </h1>
          <button className="download-pdf-btn">
            <FaDownload /> Export PDF Report
          </button>
        </div>

        {/* ANALYTICS FILTER BAR */}
        <div className="card filter-card">
          <div className="filter-section">
            <div className="filter-item">
              <FaCalendarAlt className="filter-icon" />
              <select className="report-select">
                <option>Last 30 Days</option>
                <option>Last 90 Days</option>
                <option>Financial Year 2025-26</option>
              </select>
            </div>
            <div className="filter-item">
              <FaFilter className="filter-icon" />
              <select className="report-select">
                <option>All Product Categories</option>
                <option>Basmati (Export)</option>
                <option>Sella (Local)</option>
                <option>Economy (Broken)</option>
              </select>
            </div>
          </div>
          <div className="report-timestamp">
            Data last updated: Jan 21, 2026, 01:14 PM
          </div>
        </div>

        {/* MAIN DATA GRID */}
        <div className="dashboard-grid reports-grid">
          {/* PROFITABILITY CHART (CSS-BASED) */}
          <div className="card chart-container">
            <h3>
              <FaDatabase /> Product Profitability Margin
            </h3>
            <p className="subtitle">
              Visual comparison of gross margins per category.
            </p>

            <div className="bar-chart-vertical">
              <div className="bar-group">
                <div className="bar-wrapper">
                  <div className="bar olive" style={{ height: "88%" }}>
                    <span className="bar-value">22%</span>
                  </div>
                </div>
                <span className="bar-label">Basmati</span>
              </div>
              <div className="bar-group">
                <div className="bar-wrapper">
                  <div className="bar gold" style={{ height: "72%" }}>
                    <span className="bar-value">18%</span>
                  </div>
                </div>
                <span className="bar-label">Super Kernel</span>
              </div>
              <div className="bar-group">
                <div className="bar-wrapper">
                  <div className="bar orange" style={{ height: "48%" }}>
                    <span className="bar-value">12%</span>
                  </div>
                </div>
                <span className="bar-label">Economy</span>
              </div>
            </div>
          </div>

          {/* TOP SUPPLIERS TABLE */}
          <div className="card table-container">
            <h3>
              <FaClipboardCheck /> High-Performance Suppliers
            </h3>
            <table className="report-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Supplier Entity</th>
                  <th>Quality Score</th>
                  <th>Volume (Tons)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="top-rank">
                  <td>1</td>
                  <td>
                    <strong>Gujranwala Agri</strong>
                  </td>
                  <td>
                    <span className="score-badge high">9.5</span>
                  </td>
                  <td>480</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>
                    <strong>Nasir Khan Farms</strong>
                  </td>
                  <td>
                    <span className="score-badge high">9.2</span>
                  </td>
                  <td>720</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>
                    <strong>Multan Growers</strong>
                  </td>
                  <td>
                    <span className="score-badge med">8.8</span>
                  </td>
                  <td>290</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* PREDICTIVE AI INSIGHT */}
        <div className="card insight-card">
          <div className="insight-header">
            <div className="ai-icon-circle">
              <FaLightbulb />
            </div>
            <div>
              <h3>Predictive Strategic Insight</h3>
              <p>Powered by Market Intelligence Engine</p>
            </div>
          </div>
          <div className="insight-body">
            <p className="insight-text">
              <FaArrowUp className="trend-up" />
              Forecast: <strong>Basmati 1121 Export Demand</strong> is projected
              to rise by <strong>7.4%</strong> by March 2026.
            </p>
            <div className="insight-action-box">
              <strong>Strategy Recommendation:</strong> Renew procurement
              contracts with Top-Tier suppliers immediately to hedge against
              impending price volatility.
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminReports;
