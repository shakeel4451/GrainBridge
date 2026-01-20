import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminSidebar from "../components/AdminSidebar";
import "./AdminOrders.css";
import {
  FaClipboardList,
  FaTruck,
  FaCheckCircle,
  FaClock,
  FaUser,
  FaBox,
} from "react-icons/fa";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const API_URL = "http://localhost:5000/api/orders";

  // 1. Fetch all orders (Admin logic is handled in the controller)
  const fetchAllOrders = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${userInfo?.token}` },
      };
      const { data } = await axios.get(API_URL, config);
      setOrders(data);
      setLoading(false);
    } catch (err) {
      setError("Failed to load orders. Please check your connection.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  // 2. Update Order Status (Pending -> Shipped -> Delivered)
  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      };
      await axios.put(
        `${API_URL}/${orderId}/status`,
        { status: newStatus },
        config
      );

      // Refresh list to show updated status
      fetchAllOrders();
    } catch (err) {
      alert("Status update failed.");
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Pending":
        return <FaClock className="status-icon pending" />;
      case "Shipped":
        return <FaTruck className="status-icon shipped" />;
      case "Delivered":
        return <FaCheckCircle className="status-icon delivered" />;
      default:
        return null;
    }
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <main className="admin-content">
        <h1 className="page-title">
          <FaClipboardList /> Order Management
        </h1>

        {/* ORDER STATS SUMMARY */}
        <div className="orders-stats-grid">
          <div className="stat-card">
            <h3>{orders.length}</h3>
            <p>Total Orders</p>
          </div>
          <div className="stat-card">
            <h3>{orders.filter((o) => o.status === "Pending").length}</h3>
            <p>Pending Orders</p>
          </div>
          <div className="stat-card">
            <h3>{orders.filter((o) => o.status === "Delivered").length}</h3>
            <p>Successful Deliveries</p>
          </div>
        </div>

        {/* ORDERS LIST */}
        <div className="card">
          <h3>Recent Incoming Orders</h3>
          {loading ? (
            <p>Loading orders...</p>
          ) : error ? (
            <p className="error-text">{error}</p>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Items</th>
                  <th>Total Amount</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td className="order-id">#{order._id.slice(-6)}</td>
                    <td>
                      <div className="customer-info">
                        <FaUser className="user-icon" />
                        <span>{order.customer?.name || "Guest"}</span>
                      </div>
                    </td>
                    <td>
                      {order.items.map((item, index) => (
                        <div key={index} className="order-item-desc">
                          <FaBox className="box-icon" /> {item.product?.name} (
                          {item.quantity} Bags)
                        </div>
                      ))}
                    </td>
                    <td className="amount-cell">
                      Rs. {order.totalAmount.toLocaleString()}
                    </td>
                    <td>
                      <span
                        className={`status-badge ${order.status.toLowerCase()}`}
                      >
                        {getStatusIcon(order.status)} {order.status}
                      </span>
                    </td>
                    <td>
                      <select
                        className="status-select"
                        value={order.status}
                        onChange={(e) =>
                          handleStatusUpdate(order._id, e.target.value)
                        }
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminOrders;
