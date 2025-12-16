import React from "react";
import AdminSidebar from "../components/AdminSidebar";
import "./AdminDashboard.css";
import { FaChartLine, FaCheck, FaTimes, FaShippingFast } from "react-icons/fa";

const AdminSales = () => {
  const salesData = [
    {
      id: "#11280",
      date: "2025-11-29",
      customer: "Karachi Wholesale",
      total: 450000,
      margin: "18%",
      status: "Shipped",
    },
    {
      id: "#11279",
      date: "2025-11-29",
      customer: "Lahore Mart",
      total: 120000,
      margin: "22%",
      status: "Processing",
    },
    {
      id: "#11278",
      date: "2025-11-28",
      customer: "Ali Traders",
      total: 680000,
      margin: "15%",
      status: "Delivered",
    },
    {
      id: "#11277",
      date: "2025-11-28",
      customer: "Multan Bulk",
      total: 950000,
      margin: "19%",
      status: "Cancelled",
    },
  ];

  const getStatusClass = (status) => {
    if (status === "Shipped") return "status processing";
    if (status === "Delivered") return "status success";
    if (status === "Processing") return "status pending";
    if (status === "Cancelled") return "status error";
    return "";
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <main className="admin-content">
        <h1 className="page-title">
          <FaChartLine /> Sales & Order Fulfillment
        </h1>

        <div
          className="dashboard-grid inventory-stats"
          style={{ marginBottom: "30px" }}
        >
          <div
            className="card stat-card"
            style={{ borderLeft: "4px solid #3e5235" }}
          >
            <p>Revenue (Last 30 Days)</p>
            <h2>Rs. 8.5M</h2>
          </div>
          <div
            className="card stat-card"
            style={{ borderLeft: "4px solid #8c734b" }}
          >
            <p>Average Profit Margin</p>
            <h2 style={{ color: "#8c734b" }}>19.2%</h2>
          </div>
          <div
            className="card stat-card"
            style={{ borderLeft: "4px solid #1976d2" }}
          >
            <p>Orders to Ship Today</p>
            <h2 style={{ color: "#1976d2" }}>4</h2>
          </div>
        </div>

        <div className="card">
          <h3>Recent Sales Ledger</h3>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Customer</th>
                <th>Total (PKR)</th>
                <th>Margin</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {salesData.map((sale) => (
                <tr key={sale.id}>
                  <td style={{ fontWeight: "bold" }}>{sale.id}</td>
                  <td>{sale.date}</td>
                  <td>{sale.customer}</td>
                  <td style={{ fontWeight: "bold" }}>
                    Rs. {sale.total.toLocaleString()}
                  </td>
                  <td style={{ color: "#2e7d32" }}>{sale.margin}</td>
                  <td>
                    <span className={getStatusClass(sale.status)}>
                      {sale.status}
                    </span>
                  </td>
                  <td>
                    {sale.status === "Processing" ? (
                      <button className="action-btn track">
                        <FaShippingFast /> Ship Now
                      </button>
                    ) : (
                      <button className="action-btn track">View Invoice</button>
                    )}
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

export default AdminSales;
