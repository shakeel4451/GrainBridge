import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import AdminSidebar from "../components/AdminSidebar";
import "./AdminDashboard.css";
// 1. IMPORT THE CONFIG
import { API_BASE_URL } from "../config";
import {
  FaMapMarkerAlt,
  FaChartLine,
  FaTruck,
  FaShoppingCart,
  FaWarehouse,
  FaExclamationTriangle,
  FaBoxOpen,
  FaArrowRight,
  FaTimes,
  FaPlusCircle,
} from "react-icons/fa";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const AdminDashboard = () => {
  // --- STATE MANAGEMENT ---
  const [stockAlerts, setStockAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Initialize metrics
  const [metrics, setMetrics] = useState({
    totalSales: 0,
    activeOrders: 0,
    millingEfficiency: 0,
    totalInventory: 0,
    inventoryDistribution: [],
    salesTrend: [],
  });

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [restockAmount, setRestockAmount] = useState(500);

  // --- DATA FETCHING ---
  const fetchDashboardData = useCallback(async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (!userInfo) return;

      const config = {
        headers: { Authorization: `Bearer ${userInfo?.token}` },
      };

      // 2. USE THE CONFIG URL HERE
      const [alertsRes, metricsRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/api/inventory/alerts`, config),
        axios.get(`${API_BASE_URL}/api/analytics/metrics`, config),
      ]);

      setStockAlerts(alertsRes.data.alerts || []);
      setMetrics(metricsRes.data);
      setLoading(false);
    } catch (err) {
      console.error("Dashboard Sync Failed:", err);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  // --- HANDLERS ---
  const openRestockModal = (item) => {
    setSelectedItem(item);
    setRestockAmount(500);
    setIsModalOpen(true);
  };

  const closeRestockModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const handleRestockSubmit = async (e) => {
    e.preventDefault();
    if (!selectedItem) return;

    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const config = {
        headers: { Authorization: `Bearer ${userInfo?.token}` },
      };

      await axios.put(
        `${API_BASE_URL}/api/inventory/${selectedItem._id}/restock`,
        { amount: parseInt(restockAmount) },
        config,
      );

      alert(`${selectedItem.name} restocked successfully!`);
      closeRestockModal();
      fetchDashboardData(); // Live refresh
    } catch (err) {
      console.error(err);
      alert("Failed to restock item.");
    }
  };

  // Fallback data for Bar Chart if DB is empty
  const inventoryFallback = [{ name: "No Data", quantity: 0 }];

  const recentOrders = [
    {
      id: "#1001",
      customer: "Global Foods Inc.",
      status: "success",
      date: "2025-12-15",
    },
    {
      id: "#1002",
      customer: "Asian Grocers",
      status: "pending",
      date: "2025-12-14",
    },
    {
      id: "#1003",
      customer: "Rice Depot Ltd.",
      status: "success",
      date: "2025-12-13",
    },
    {
      id: "#1004",
      customer: "Local Market Co.",
      status: "error",
      date: "2025-12-12",
    },
  ];

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <main className="admin-content">
        <h1 className="page-title">Admin Dashboard</h1>

        {/* 1. ALERTS SECTION */}
        {!loading && stockAlerts.length > 0 && (
          <div className="card alert-card-container">
            <div className="alert-header">
              <FaExclamationTriangle className="warning-icon" />
              <h3>Critical Stock Alerts ({stockAlerts.length})</h3>
            </div>
            <div className="alert-list">
              {stockAlerts.map((item) => (
                <div key={item._id} className="alert-item">
                  <div className="alert-info">
                    <FaBoxOpen />
                    <span>
                      <strong>{item.name}</strong> is critically low (
                      {item.category})
                    </span>
                  </div>
                  <div className="alert-count">
                    <span className="count-red">{item.quantity} Bags</span>
                    <button
                      className="procure-btn"
                      onClick={() => openRestockModal(item)}
                    >
                      Procure <FaArrowRight />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. MODAL SECTION */}
        {isModalOpen && selectedItem && (
          <div className="modal-overlay">
            <div className="modal-content card">
              <div className="modal-header">
                <h3>
                  <FaPlusCircle /> Restock Inventory
                </h3>
                <button className="close-btn" onClick={closeRestockModal}>
                  <FaTimes />
                </button>
              </div>
              <form onSubmit={handleRestockSubmit}>
                <p>
                  You are restocking: <strong>{selectedItem.name}</strong>
                </p>
                <div className="form-group">
                  <label>Quantity to add (Bags):</label>
                  <input
                    type="number"
                    value={restockAmount}
                    onChange={(e) => setRestockAmount(e.target.value)}
                    min="1"
                    required
                  />
                </div>
                <div className="modal-actions">
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={closeRestockModal}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="confirm-btn">
                    Confirm Restock
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* 3. METRICS CARDS */}
        <div className="dashboard-grid inventory-stats">
          <div className="stat-card">
            <p>Total Sales</p>
            <h2>PKR {((metrics.totalSales || 0) / 1000000).toFixed(1)}M</h2>
          </div>
          <div className="stat-card">
            <p>Active Orders</p>
            <h2>{metrics.activeOrders || 0}</h2>
          </div>
          <div className="stat-card">
            <p>Milling Efficiency</p>
            <h2 className="success">{metrics.millingEfficiency || 0}%</h2>
          </div>
          <div className="stat-card">
            <p>Total Inventory</p>
            <h2>{((metrics.totalInventory || 0) / 1000).toFixed(1)}K Bags</h2>
          </div>
        </div>

        {/* 4. CHARTS SECTION */}
        <div className="dashboard-grid">
          {/* SALES LINE CHART */}
          <div className="card chart-box" style={{ flex: 2 }}>
            <h3>
              <FaChartLine /> Sales & Profit Trend
            </h3>
            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={
                    metrics.salesTrend?.length > 0 ? metrics.salesTrend : []
                  }
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" stroke="#555" />
                  <YAxis
                    yAxisId="left"
                    stroke="#3e5235"
                    tickFormatter={(v) => `${v / 1000}K`}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    stroke="#8c734b"
                    tickFormatter={(v) => `${v / 1000}K`}
                  />
                  <Tooltip />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="sales"
                    name="Sales"
                    stroke="#3e5235"
                    strokeWidth={2}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="profit"
                    name="Profit (Est)"
                    stroke="#8c734b"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>

              {metrics.salesTrend?.length === 0 && (
                <p
                  style={{
                    textAlign: "center",
                    color: "#999",
                    marginTop: "-150px",
                  }}
                >
                  No sales data recorded yet.
                </p>
              )}
            </div>
          </div>

          {/* MAP PLACEHOLDER */}
          <div className="card chart-box" style={{ flex: 1 }}>
            <h3>
              <FaTruck /> Live Operations Map
            </h3>
            <div className="map-placeholder">
              <FaMapMarkerAlt className="map-icon" />
              <p>GPS Integration Active</p>
            </div>
          </div>
        </div>

        {/* 5. LIVE INVENTORY BAR CHART */}
        <div className="dashboard-grid">
          <div className="card chart-box" style={{ flex: 1 }}>
            <h3>
              <FaWarehouse /> Current Inventory Stock
            </h3>
            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={
                    metrics.inventoryDistribution?.length > 0
                      ? metrics.inventoryDistribution
                      : inventoryFallback
                  }
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" stroke="#555" />
                  <YAxis stroke="#555" tickFormatter={(v) => `${v / 1000}K`} />
                  <Tooltip />
                  <Bar
                    dataKey="quantity"
                    fill="#3e5235"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card chart-box" style={{ flex: 1 }}>
            <h3>AI Market Insight</h3>
            <div className="ai-content">
              <h4>Prediction Engine</h4>
              <p>
                <strong>Trend:</strong> Basmati prices expected to rise 10% in
                Q2.
              </p>
              <p>
                <strong>Action:</strong> Recommended to secure 5,000 tons from
                Supplier Alpha immediately.
              </p>
            </div>
          </div>
        </div>

        {/* 6. ORDERS TABLE */}
        <div className="card full-width">
          <h3>
            <FaShoppingCart /> Recent Orders
          </h3>
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.customer}</td>
                    <td>
                      <span className={`status ${order.status}`}>
                        {order.status}
                      </span>
                    </td>
                    <td>{order.date}</td>
                    <td>
                      <button className="action-btn">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
