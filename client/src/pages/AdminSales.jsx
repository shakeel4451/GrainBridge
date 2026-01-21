import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminSidebar from "../components/AdminSidebar";
import "./AdminSales.css";
import {
  FaChartLine,
  FaCheck,
  FaTimes,
  FaShippingFast,
  FaFileInvoice,
  FaSyncAlt,
} from "react-icons/fa";

const AdminSales = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    avgMargin: "19.2%",
    pendingShips: 0,
  });

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const config = { headers: { Authorization: `Bearer ${userInfo?.token}` } };

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        "http://localhost:5000/api/orders",
        config
      );
      setOrders(data);

      // Calculate basic stats from real data
      const revenue = data.reduce((acc, curr) => acc + curr.totalAmount, 0);
      const pending = data.filter(
        (o) => o.status === "Processing" || o.status === "Pending"
      ).length;

      setStats((prev) => ({
        ...prev,
        totalRevenue: revenue,
        pendingShips: pending,
      }));
      setLoading(false);
    } catch (err) {
      console.error("Error fetching sales data", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(
        `http://localhost:5000/api/orders/${id}/status`,
        { status: newStatus },
        config
      );
      fetchOrders(); // Refresh data
      alert(`Order ${id.slice(-6)} updated to ${newStatus}`);
    } catch (err) {
      alert("Failed to update status");
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Shipped":
        return "status processing";
      case "Delivered":
        return "status success";
      case "Pending":
        return "status pending";
      case "Processing":
        return "status pending";
      case "Cancelled":
        return "status error";
      default:
        return "status";
    }
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <main className="admin-content">
        <div className="sales-header">
          <h1 className="page-title">
            <FaChartLine /> Sales & Order Fulfillment
          </h1>
          <button className="refresh-btn" onClick={fetchOrders}>
            <FaSyncAlt /> Refresh Ledger
          </button>
        </div>

        {/* 1. KEY PERFORMANCE INDICATORS */}
        <div
          className="dashboard-grid inventory-stats"
          style={{ marginBottom: "30px" }}
        >
          <div
            className="card stat-card"
            style={{ borderLeft: "4px solid #3e5235" }}
          >
            <p>Total Revenue (Accumulated)</p>
            <h2>Rs. {stats.totalRevenue.toLocaleString()}</h2>
          </div>
          <div
            className="card stat-card"
            style={{ borderLeft: "4px solid #8c734b" }}
          >
            <p>Target Margin</p>
            <h2 style={{ color: "#8c734b" }}>{stats.avgMargin}</h2>
          </div>
          <div
            className="card stat-card"
            style={{ borderLeft: "4px solid #1976d2" }}
          >
            <p>Awaiting Action</p>
            <h2 style={{ color: "#1976d2" }}>{stats.pendingShips}</h2>
          </div>
        </div>

        {/* 2. SALES TABLE */}
        <div className="card sales-table-card">
          <div className="table-title-area">
            <h3>Recent Sales Ledger</h3>
            <p>Real-time order tracking from customer portal</p>
          </div>

          {loading ? (
            <div className="loading-spinner-box">Loading Ledger...</div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order Ref</th>
                  <th>Date</th>
                  <th>Customer / Company</th>
                  <th>Total Amount</th>
                  <th>Status</th>
                  <th>Fulfillment Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.length > 0 ? (
                  orders.map((order) => (
                    <tr key={order._id}>
                      <td className="order-id">
                        #{order._id.slice(-6).toUpperCase()}
                      </td>
                      <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td>
                        <div className="cust-info">
                          <strong>{order.customer?.name}</strong>
                          <span>
                            {order.customer?.companyName || "Retail Client"}
                          </span>
                        </div>
                      </td>
                      <td className="price-bold">
                        Rs. {order.totalAmount.toLocaleString()}
                      </td>
                      <td>
                        <span className={getStatusClass(order.status)}>
                          {order.status}
                        </span>
                      </td>
                      <td>
                        <div className="action-button-group">
                          {order.status === "Pending" ||
                          order.status === "Processing" ? (
                            <button
                              className="ship-btn"
                              onClick={() => updateStatus(order._id, "Shipped")}
                            >
                              <FaShippingFast /> Dispatch
                            </button>
                          ) : (
                            <button className="invoice-btn">
                              <FaFileInvoice /> Invoice
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" style={{ textAlign: "center" }}>
                      No sales recorded yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminSales;
