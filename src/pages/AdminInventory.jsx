import React from "react";
import AdminSidebar from "../components/AdminSidebar";
import "./AdminDashboard.css"; // Reusing dashboard styles
import {
  FaWarehouse,
  FaCheck,
  FaExclamationTriangle,
  FaBox,
} from "react-icons/fa";

const AdminInventory = () => {
  const inventory = [
    {
      id: 1,
      product: "Premium Basmati",
      grade: "Export Grade A",
      stock: 5500,
      location: "WH-A1",
      lastChecked: "2025-11-28",
      status: "Optimal",
    },
    {
      id: 2,
      product: "Super Kernel Basmati",
      grade: "Grade B",
      stock: 1200,
      location: "WH-C2",
      lastChecked: "2025-11-27",
      status: "Low Stock",
    },
    {
      id: 3,
      product: "Organic Brown Rice",
      grade: "Health Grade",
      stock: 250,
      location: "WH-B3",
      lastChecked: "2025-11-29",
      status: "Critical",
    },
    {
      id: 4,
      product: "Irri-6 Economy Rice",
      grade: "Standard Grade",
      stock: 15000,
      location: "WH-D1",
      lastChecked: "2025-11-29",
      status: "Optimal",
    },
  ];

  const getStatusClass = (status) => {
    if (status === "Optimal") return "status success";
    if (status === "Low Stock") return "status pending";
    if (status === "Critical") return "status error";
    return "";
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <main className="admin-content">
        <h1 className="page-title">
          <FaWarehouse /> Inventory Management
        </h1>

        <div
          className="dashboard-grid inventory-stats"
          style={{ marginBottom: "30px" }}
        >
          <div
            className="card stat-card"
            style={{ borderLeft: "4px solid #3e5235" }}
          >
            <p>Total Stock (Bags)</p>
            <h2>22,000</h2>
          </div>
          <div
            className="card stat-card"
            style={{ borderLeft: "4px solid #8c734b" }}
          >
            <p>Low Stock Alerts</p>
            <h2 style={{ color: "#f57c00" }}>3</h2>
          </div>
          <div
            className="card stat-card"
            style={{ borderLeft: "4px solid #f57c00" }}
          >
            <p>Needs Quality Check</p>
            <h2 style={{ color: "#d32f2f" }}>12 Batches</h2>
          </div>
        </div>

        <div className="card">
          <h3>Current Stock Levels</h3>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Grade</th>
                <th>Stock (Bags)</th>
                <th>Warehouse Loc.</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((item) => (
                <tr key={item.id}>
                  <td style={{ fontWeight: "bold" }}>{item.product}</td>
                  <td>{item.grade}</td>
                  <td>{item.stock.toLocaleString()}</td>
                  <td>
                    <FaBox style={{ marginRight: "5px", color: "#8c734b" }} />
                    {item.location}
                  </td>
                  <td>
                    <span className={getStatusClass(item.status)}>
                      {item.status}
                    </span>
                  </td>
                  <td>
                    <button className="action-btn track">View Details</button>
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

export default AdminInventory;
