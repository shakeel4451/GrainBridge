import React from "react";
import AdminSidebar from "../components/AdminSidebar";
import "./AdminDashboard.css";
import {
  FaTruck,
  FaFileContract,
  FaChartBar,
  FaUserEdit,
  FaMoneyBillAlt,
} from "react-icons/fa";

const AdminSuppliers = () => {
  const suppliers = [
    {
      id: 1,
      name: "Nasir Khan Farms",
      contract: "Basmati",
      quality: "9.5",
      paymentDue: 85000,
      status: "Good",
    },
    {
      id: 2,
      name: "Gujranwala Agri",
      contract: "Irri-6",
      quality: "8.8",
      paymentDue: 0,
      status: "Excellent",
    },
    {
      id: 3,
      name: "Sadiqabad Growers",
      contract: "Kainat 1121",
      quality: "7.5",
      paymentDue: 150000,
      status: "Warning",
    },
  ];

  const getStatusClass = (status) => {
    if (status === "Excellent" || status === "Good") return "status success";
    if (status === "Warning") return "status error";
    return "";
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <main className="admin-content">
        <h1 className="page-title">
          <FaTruck /> Supplier Management
        </h1>

        <div
          className="dashboard-grid inventory-stats"
          style={{ marginBottom: "30px" }}
        >
          <div
            className="card stat-card"
            style={{ borderLeft: "4px solid #3e5235" }}
          >
            <p>Total Active Suppliers</p>
            <h2>45</h2>
          </div>
          <div
            className="card stat-card"
            style={{ borderLeft: "4px solid #f57c00" }}
          >
            <p>Pending Payments</p>
            <h2 style={{ color: "#f57c00" }}>2</h2>
          </div>
          <div
            className="card stat-card"
            style={{ borderLeft: "4px solid #1976d2" }}
          >
            <p>Avg. Quality Score</p>
            <h2 style={{ color: "#1976d2" }}>9.1</h2>
          </div>
        </div>

        <div className="card">
          <h3>Supplier Roster and Performance</h3>
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Supplier Name</th>
                <th>Contract Type</th>
                <th>Avg. Quality Score</th>
                <th>Payment Due (PKR)</th>
                <th>Overall Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map((sup) => (
                <tr key={sup.id}>
                  <td>{sup.id}</td>
                  <td style={{ fontWeight: "bold" }}>{sup.name}</td>
                  <td>
                    <FaFileContract
                      style={{ marginRight: "5px", color: "#8c734b" }}
                    />
                    {sup.contract}
                  </td>
                  <td>
                    <FaChartBar
                      style={{ marginRight: "5px", color: "#3e5235" }}
                    />
                    {sup.quality}
                  </td>
                  <td
                    style={{
                      color: sup.paymentDue > 0 ? "#d32f2f" : "#2e7d32",
                    }}
                  >
                    {sup.paymentDue > 0
                      ? `Rs. ${sup.paymentDue.toLocaleString()}`
                      : "None"}
                  </td>
                  <td>
                    <span className={getStatusClass(sup.status)}>
                      {sup.status}
                    </span>
                  </td>
                  <td>
                    <button className="action-btn track">
                      <FaUserEdit /> View Profile
                    </button>
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

export default AdminSuppliers;
