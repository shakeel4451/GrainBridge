import React from "react";
import AdminSidebar from "../components/AdminSidebar";
import "./AdminDashboard.css";
import {
  FaMapMarkerAlt,
  FaChartLine,
  FaTruck,
  FaShoppingCart,
  FaWarehouse,
} from "react-icons/fa";

// 1. IMPORT RECHARTS COMPONENTS
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

// 2. SAMPLE DATA
const salesData = [
  { name: "Jul", sales: 400000, profit: 80000 },
  { name: "Aug", sales: 450000, profit: 95000 },
  { name: "Sep", sales: 520000, profit: 105000 },
  { name: "Oct", sales: 500000, profit: 100000 },
  { name: "Nov", sales: 600000, profit: 120000 },
  { name: "Dec", sales: 750000, profit: 150000 },
];

const inventoryData = [
  { name: "Basmati", stock: 15000 },
  { name: "Kainat", stock: 8000 },
  { name: "Irri-6", stock: 25000 },
  { name: "Brown", stock: 3500 },
];

const AdminDashboard = () => {
  // Placeholder data for recent orders and metrics
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

  const metrics = {
    totalSales: "PKR 12.5M",
    activeOrders: 45,
    millingEfficiency: "98%",
    totalInventory: "55K Bags",
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <main className="admin-content">
        <h1 className="page-title">Admin Dashboard</h1>

        {/* 1. TOP METRICS ROW (Keep existing) */}
        <div className="dashboard-grid inventory-stats">
          <div className="stat-card">
            <p>Total Sales</p>
            <h2>{metrics.totalSales}</h2>
          </div>
          <div className="stat-card">
            <p>Active Orders</p>
            <h2>{metrics.activeOrders}</h2>
          </div>
          <div className="stat-card">
            <p>Milling Efficiency</p>
            <h2 className="success">{metrics.millingEfficiency}</h2>
          </div>
          <div className="stat-card">
            <p>Total Inventory</p>
            <h2>{metrics.totalInventory}</h2>
          </div>
        </div>

        {/* 2. SALES TREND CHART */}
        <div className="dashboard-grid">
          <div className="card" style={{ flex: 2 }}>
            <h3>
              <FaChartLine /> Sales & Profit Trend (Last 6 Months)
            </h3>
            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={salesData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" stroke="#555" />
                  <YAxis
                    yAxisId="left"
                    stroke="#3e5235"
                    label={{
                      value: "Revenue (PKR)",
                      angle: -90,
                      position: "left",
                    }}
                    tickFormatter={(value) => `${value / 1000}K`}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    stroke="#8c734b"
                    label={{
                      value: "Profit (PKR)",
                      angle: 90,
                      position: "right",
                    }}
                    tickFormatter={(value) => `${value / 1000}K`}
                  />
                  <Tooltip
                    formatter={(value, name) => [
                      value.toLocaleString() + " PKR",
                      name.charAt(0).toUpperCase() + name.slice(1),
                    ]}
                  />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="sales"
                    name="Sales"
                    stroke="#3e5235"
                    activeDot={{ r: 8 }}
                    strokeWidth={2}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="profit"
                    name="Profit"
                    stroke="#8c734b"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 3. LIVE OPERATIONS MAP (Keep existing placeholder) */}
          <div className="card" style={{ flex: 1 }}>
            <h3>
              <FaTruck /> Live Operations Map
            </h3>
            <div className="map-placeholder">
              <FaMapMarkerAlt className="map-icon" />
              <p>Map Integration Placeholder</p>
              <span
                className="map-pin"
                style={{ top: "30%", left: "40%" }}
              ></span>
              <span
                className="map-pin"
                style={{ top: "65%", left: "70%", backgroundColor: "#2e7d32" }}
              ></span>
            </div>
          </div>
        </div>

        {/* 4. INVENTORY BAR CHART & AI INSIGHTS */}
        <div className="dashboard-grid">
          <div className="card" style={{ flex: 1 }}>
            <h3>
              <FaWarehouse /> Current Inventory Stock
            </h3>
            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={inventoryData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" stroke="#555" />
                  <YAxis
                    stroke="#555"
                    label={{
                      value: "Stock (Bags)",
                      angle: -90,
                      position: "left",
                    }}
                    tickFormatter={(value) => `${value / 1000}K`}
                  />
                  <Tooltip
                    formatter={(value) => [
                      value.toLocaleString() + " Bags",
                      "Stock",
                    ]}
                  />
                  <Bar dataKey="stock" fill="#1976d2" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* AI Insight Card (Keep existing placeholder) */}
          <div className="card" style={{ flex: 1 }}>
            <h3>AI Market Insight</h3>
            <div className="ai-content">
              <p>
                Prediction: Basmati rice prices expected to rise 10% next
                quarter due to global demand shift.
              </p>
              <p>
                Action: Recommend securing 5,000 additional tons from Supplier
                Alpha before month-end.
              </p>
              <p>
                Efficiency: Milling system flagged for routine maintenance
                efficiency dropped to 98% (target 99%).
              </p>
            </div>
          </div>
        </div>

        {/* 5. RECENT ORDERS TABLE */}
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
                        {order.status.charAt(0).toUpperCase() +
                          order.status.slice(1)}
                      </span>
                    </td>
                    <td>{order.date}</td>
                    <td>
                      <button className="action-btn">View Details</button>
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
