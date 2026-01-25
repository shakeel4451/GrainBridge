import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CustomerSidebar from "../components/CustomerSidebar";
import "./CustomerDashboard.css";
import { API_BASE_URL } from "../config";
import { FaWallet, FaBox, FaTruck, FaClock } from "react-icons/fa";

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalSpent: 0,
    activeOrders: 0,
    totalOrders: 0,
  });
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      const user = JSON.parse(localStorage.getItem("userInfo"));
      if (!user) {
        navigate("/login");
        return;
      }
      setUserInfo(user);

      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const { data } = await axios.get(`${API_BASE_URL}/api/orders`, config);

        // Calculate Stats locally
        const totalSpent = data.reduce(
          (acc, curr) => acc + curr.totalAmount,
          0,
        );
        const activeOrders = data.filter((o) =>
          ["Pending", "Processing", "Shipped"].includes(o.status),
        ).length;

        setStats({
          totalSpent,
          activeOrders,
          totalOrders: data.length,
        });
      } catch (err) {
        console.error("Error fetching stats", err);
      }
    };
    fetchStats();
  }, [navigate]);

  return (
    <div className="customer-layout">
      <CustomerSidebar />
      <main className="customer-content">
        <h1 className="page-title">Welcome Back, {userInfo?.name}</h1>
        <p className="subtitle">Here is what is happening with your account.</p>

        {/* Stats Grid */}
        <div
          className="stats-row"
          style={{ display: "flex", gap: "20px", marginTop: "30px" }}
        >
          <div
            className="stat-card"
            style={{ borderLeft: "5px solid #2e7d32" }}
          >
            <FaWallet
              className="stat-icon"
              style={{ color: "#2e7d32", fontSize: "30px" }}
            />
            <div className="stat-info">
              <p>Total Spent</p>
              <h2>Rs. {stats.totalSpent.toLocaleString()}</h2>
            </div>
          </div>
          <div
            className="stat-card"
            style={{ borderLeft: "5px solid #f57c00" }}
          >
            <FaClock
              className="stat-icon"
              style={{ color: "#f57c00", fontSize: "30px" }}
            />
            <div className="stat-info">
              <p>Active Orders</p>
              <h2>{stats.activeOrders}</h2>
            </div>
          </div>
          <div
            className="stat-card"
            style={{ borderLeft: "5px solid #1976d2" }}
          >
            <FaBox
              className="stat-icon"
              style={{ color: "#1976d2", fontSize: "30px" }}
            />
            <div className="stat-info">
              <p>Total Orders</p>
              <h2>{stats.totalOrders}</h2>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div
          className="card"
          style={{ marginTop: "30px", textAlign: "center", padding: "40px" }}
        >
          <h3>Need to restock?</h3>
          <p>Our mill has fresh stock of Super Basmati available today.</p>
          <button
            className="checkout-btn"
            style={{ maxWidth: "300px", margin: "20px auto" }}
            onClick={() => navigate("/customer/order")}
          >
            <FaTruck /> Place New Order
          </button>
        </div>
      </main>
    </div>
  );
};

export default CustomerDashboard;
