import React, { useState, useEffect } from "react";
import axios from "axios";
import CustomerSidebar from "../components/CustomerSidebar";
import "./CustomerHistory.css";
import {
  FaHistory,
  FaCalendarAlt,
  FaHashtag,
  FaRupeeSign,
  FaBox,
  FaInfoCircle,
} from "react-icons/fa";

const CustomerHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const API_URL = "http://localhost:5000/api/orders";

  useEffect(() => {
    const fetchMyOrders = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${userInfo?.token}` },
        };
        // The backend controller automatically filters orders for the logged-in customer
        const { data } = await axios.get(API_URL, config);
        setOrders(data);
        setLoading(false);
      } catch (err) {
        setError(
          "Could not retrieve your order history. Please try again later."
        );
        setLoading(false);
      }
    };

    fetchMyOrders();
  }, [userInfo?.token]);

  // Helper to format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="customer-layout">
      <CustomerSidebar />
      <main className="customer-content">
        <h1 className="page-title">
          <FaHistory /> Order History
        </h1>

        <div className="history-container">
          {loading ? (
            <div className="loading-state">Loading your rice purchases...</div>
          ) : error ? (
            <div className="error-message">{error}</div>
          ) : orders.length === 0 ? (
            <div className="card empty-history">
              <FaBox size={50} color="#ddd" />
              <h3>No Orders Found</h3>
              <p>
                You haven't placed any orders yet. Visit our product range to
                get started!
              </p>
              <button
                className="shop-now-btn"
                onClick={() => (window.location.href = "/products")}
              >
                Browse Products
              </button>
            </div>
          ) : (
            <div className="orders-list">
              {orders.map((order) => (
                <div key={order._id} className="order-history-card">
                  <div className="order-card-header">
                    <div className="order-main-info">
                      <span>
                        <FaHashtag /> ID: {order._id.slice(-8).toUpperCase()}
                      </span>
                      <span>
                        <FaCalendarAlt /> Ordered on:{" "}
                        {formatDate(order.createdAt)}
                      </span>
                    </div>
                    <span
                      className={`status-badge ${order.status.toLowerCase()}`}
                    >
                      {order.status}
                    </span>
                  </div>

                  <div className="order-card-body">
                    <div className="items-summary">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="history-item-row">
                          <span className="item-name">
                            {item.product?.name || "Premium Rice"}
                          </span>
                          <span className="item-qty">{item.quantity} Bags</span>
                          <span className="item-price">
                            Rs. {item.priceAtOrder} / bag
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="order-footer">
                      <div className="total-box">
                        <p>Total Amount</p>
                        <h3>Rs. {order.totalAmount.toLocaleString()}</h3>
                      </div>
                      <button className="details-btn">
                        <FaInfoCircle /> View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default CustomerHistory;
