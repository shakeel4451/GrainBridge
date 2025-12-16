import React from "react";
import CustomerSidebar from "../components/CustomerSidebar";
import "./CustomerDashboard.css";
import {
  FaCheckCircle,
  FaTruck,
  FaShoppingCart,
  FaClipboardList,
  FaMapMarkedAlt,
} from "react-icons/fa";

const CustomerDashboard = () => {
  return (
    <div className="customer-layout">
      <CustomerSidebar />

      <main className="customer-content">
        <h1 className="page-title">Welcome Back, Ali Traders!</h1>

        {/* STATS ROW */}
        <div className="stats-row">
          <div className="stat-card">
            <FaCheckCircle className="stat-icon check" />
            <div className="stat-info">
              <p>Completed Orders</p>
              <h2>28</h2>
            </div>
          </div>
          <div className="stat-card">
            <FaTruck className="stat-icon truck" />
            <div className="stat-info">
              <p>Orders In Transit</p>
              <h2>3</h2>
            </div>
          </div>
          <div className="stat-card">
            <FaShoppingCart className="stat-icon cart" />
            <div className="stat-info">
              <p>Reorder Quickly</p>
              <button className="quick-reorder-btn">View Last Order</button>
            </div>
          </div>
        </div>

        {/* MAIN CONTENT GRID */}
        <div className="dashboard-grid">
          {/* Widget 1: Recent Orders Table */}
          <div className="card table-card">
            <h3>Recent Order Activity</h3>
            <table className="customer-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>#11277</td>
                  <td>Basmati 1121</td>
                  <td>50 Bags</td>
                  <td>
                    <span className="status processing">Processing</span>
                  </td>
                  <td>
                    <button className="action-btn track">Track</button>
                  </td>
                </tr>
                <tr>
                  <td>#11276</td>
                  <td>Super Kernel</td>
                  <td>20 Bags</td>
                  <td>
                    <span className="status shipped">Shipped</span>
                  </td>
                  <td>
                    <button className="action-btn track">Track</button>
                  </td>
                </tr>
                <tr>
                  <td>#11275</td>
                  <td>Brown Rice</td>
                  <td>10 Bags</td>
                  <td>
                    <span className="status delivered">Delivered</span>
                  </td>
                  <td>
                    <button className="action-btn review">Review</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Widget 2: Traceability Feature */}
          <div className="card traceability-card">
            <h3>Traceability Check</h3>
            <p className="subtitle">Enter the batch code from your rice bag:</p>
            <div className="trace-input-group">
              <input
                type="text"
                placeholder="Batch Code (e.g., PBK-1121-089)"
              />
              <button className="trace-btn">
                <FaMapMarkedAlt /> Trace Now
              </button>
            </div>
            <p className="trace-result">
              Trace Result: **Batch PBK-1121-089** traced to **Farmer Nasir** in
              **Gujranwala**, Milled on **10/01/2025**.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CustomerDashboard;
