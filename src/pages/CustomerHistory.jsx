import React from "react";
import CustomerSidebar from "../components/CustomerSidebar";
import "./CustomerDashboard.css"; // Reusing dashboard styles
import { FaBoxOpen, FaEye, FaRedo } from "react-icons/fa";

const CustomerHistory = () => {
  const orders = [
    {
      id: "#11277",
      date: "2025-10-28",
      items: "Basmati 1121 (50 Bags)",
      total: 225000,
      status: "Processing",
    },
    {
      id: "#11276",
      date: "2025-10-15",
      items: "Super Kernel (20 Bags)",
      total: 76000,
      status: "Shipped",
    },
    {
      id: "#11270",
      date: "2025-09-01",
      items: "Brown Rice (10 Bags)",
      total: 52000,
      status: "Delivered",
    },
    {
      id: "#11265",
      date: "2025-08-20",
      items: "Irri-6 Economy (100 Bags)",
      total: 180000,
      status: "Delivered",
    },
  ];

  return (
    <div className="customer-layout">
      <CustomerSidebar />
      <main className="customer-content">
        <h1 className="page-title">
          <FaBoxOpen /> Order History
        </h1>

        <div className="card">
          <table className="customer-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Items Summary</th>
                <th>Total Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td style={{ fontWeight: "bold" }}>{order.id}</td>
                  <td>{order.date}</td>
                  <td>{order.items}</td>
                  <td>Rs. {order.total.toLocaleString()}</td>
                  <td>
                    <span className={`status ${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>
                    <button className="action-btn" title="View Details">
                      <FaEye />
                    </button>
                    {order.status === "Delivered" && (
                      <button
                        className="action-btn"
                        title="Reorder"
                        style={{ marginLeft: "10px", color: "#3e5235" }}
                      >
                        <FaRedo />
                      </button>
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

export default CustomerHistory;
