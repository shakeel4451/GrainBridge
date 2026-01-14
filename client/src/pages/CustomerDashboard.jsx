import React, { useState, useEffect } from "react";
import axios from "axios";
import CustomerSidebar from "../components/CustomerSidebar";
import "./CustomerDashboard.css";
import {
  FaCheckCircle,
  FaTruck,
  FaShoppingCart,
  FaMapMarkedAlt,
  FaLeaf,
} from "react-icons/fa";

const CustomerDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  // Fetch live products from Admin Inventory
  useEffect(() => {
    const fetchLiveStock = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${userInfo?.token}` },
        };
        const { data } = await axios.get(
          "http://localhost:5000/api/products",
          config
        );
        // Show only products in stock
        setProducts(data.filter((p) => p.currentStock > 0).slice(0, 3));
        setLoading(false);
      } catch (err) {
        console.error("Error fetching live stock", err);
        setLoading(false);
      }
    };
    fetchLiveStock();
  }, [userInfo?.token]);

  return (
    <div className="customer-layout">
      <CustomerSidebar />

      <main className="customer-content">
        <h1 className="page-title">
          Welcome Back, {userInfo?.name || "Customer"}!
        </h1>

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
              <p>Quick Reorder</p>
              <button className="quick-reorder-btn">Last Order</button>
            </div>
          </div>
        </div>

        {/* MAIN CONTENT GRID */}
        <div className="dashboard-grid">
          {/* Recent Orders Table */}
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
                    <button className="action-btn">Track</button>
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
                    <button className="action-btn">Review</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Live Market (Dynamic from Admin Inventory) */}
          <div className="card live-stock-card">
            <h3>
              <FaLeaf /> Live Market Stock
            </h3>
            {loading ? (
              <p>Loading market data...</p>
            ) : (
              <div className="live-items-list">
                {products.map((product) => (
                  <div key={product._id} className="live-item">
                    <div className="item-details">
                      <h4>{product.name}</h4>
                      <p>Rs. {product.pricePerBag} / Bag</p>
                    </div>
                    <span className="stock-tag">In Stock</span>
                  </div>
                ))}
                <button
                  className="order-now-link"
                  onClick={() => (window.location.href = "/products")}
                >
                  View All Products →
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Traceability Section */}
        <div
          className="card traceability-full-card"
          style={{ marginTop: "25px" }}
        >
          <h3>Traceability Check</h3>
          <p className="subtitle">Verify the origin of your rice bag:</p>
          <div className="trace-input-group">
            <input type="text" placeholder="Batch Code (e.g., PBK-1121-089)" />
            <button className="trace-btn">
              <FaMapMarkedAlt /> Trace Now
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CustomerDashboard;
