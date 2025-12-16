import React from "react";
import SupplierSidebar from "../components/SupplierSidebar";
import "./SupplierDashboard.css";
import {
  FaCalendarAlt,
  FaMoneyBillAlt,
  FaClipboardCheck,
  FaLeaf,
  FaTractor,
  FaSeedling,
} from "react-icons/fa";

const SupplierDashboard = () => {
  return (
    <div className="supplier-layout">
      <SupplierSidebar />

      <main className="supplier-content">
        <h1 className="page-title">Welcome, Farmer Nasir Khan!</h1>

        {/* STATS ROW */}
        <div className="stats-row">
          <div className="stat-card">
            <FaCalendarAlt className="stat-icon calendar" />
            <div className="stat-info">
              <p>Next Harvest Due</p>
              <h2>25 Nov 2025</h2>
            </div>
          </div>
          <div className="stat-card">
            <FaMoneyBillAlt className="stat-icon money" />
            <div className="stat-info">
              <p>Last Payment (Amount)</p>
              <h2>Rs. 85,000</h2>
            </div>
          </div>
          <div className="stat-card">
            <FaClipboardCheck className="stat-icon check" />
            <div className="stat-info">
              <p>Quality Score (Last Batch)</p>
              <h2>9.5/10</h2>
            </div>
          </div>
        </div>

        {/* MAIN CONTENT GRID */}
        <div className="dashboard-grid">
          {/* Widget 1: Current GrainBridge Demand */}
          <div className="card demand-card">
            <h3>
              <FaLeaf /> Current Demand: Super Kernel Rice
            </h3>
            <p className="demand-qty">Required Quantity: 1,500 Bags</p>
            <p className="demand-rate">
              Current Purchase Rate: **Rs. 11,800/40kg**
            </p>
            <button className="confirm-btn">
              <FaTractor /> Confirm Your Harvest
            </button>
          </div>

          {/* Widget 2: Recent Payment Details */}
          <div className="card payment-card">
            <h3>Recent Payment Details</h3>
            <table className="supplier-table">
              <thead>
                <tr>
                  <th>Batch ID</th>
                  <th>Date</th>
                  <th>Weight (kg)</th>
                  <th>Amount (PKR)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>PBK-1020-004</td>
                  <td>2025-10-25</td>
                  <td>3,400 kg</td>
                  <td>Rs. 85,000</td>
                </tr>
                <tr>
                  <td>PBK-1010-003</td>
                  <td>2025-09-15</td>
                  <td>2,500 kg</td>
                  <td>Rs. 62,500</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SupplierDashboard;
