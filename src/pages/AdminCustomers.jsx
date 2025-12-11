import React from "react";
import AdminSidebar from "../components/AdminSidebar";
import "./AdminDashboard.css";
import { FaUsers, FaSearch, FaEnvelope, FaUserEdit } from "react-icons/fa";

const AdminCustomers = () => {
  const customers = [
    {
      id: 1,
      name: "Lahore Mart",
      email: "lahoremart@example.com",
      totalSpent: 12500000,
      status: "Active",
    },
    {
      id: 2,
      name: "Ali Traders",
      email: "alitraders@example.com",
      totalSpent: 5400000,
      status: "Active",
    },
    {
      id: 3,
      name: "Karachi Wholesale",
      email: "karachiw@example.com",
      totalSpent: 18000000,
      status: "VIP",
    },
    {
      id: 4,
      name: "Multan Bulk",
      email: "multanbulk@example.com",
      totalSpent: 2100000,
      status: "Inactive",
    },
  ];

  const getStatusClass = (status) => {
    if (status === "VIP") return "status success";
    if (status === "Active") return "status processing";
    if (status === "Inactive") return "status error";
    return "";
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <main className="admin-content">
        <h1 className="page-title">
          <FaUsers /> Customer Accounts Management
        </h1>

        {/* Search Bar */}
        <div
          className="card"
          style={{
            marginBottom: "30px",
            display: "flex",
            gap: "15px",
            padding: "20px",
          }}
        >
          <input
            type="text"
            placeholder="Search by Name or Email..."
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          />
          <button className="trace-btn" style={{ backgroundColor: "#3e5235" }}>
            <FaSearch /> Search
          </button>
        </div>

        <div className="card">
          <h3>Customer List</h3>
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Total Spent (PKR)</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((cust) => (
                <tr key={cust.id}>
                  <td>{cust.id}</td>
                  <td style={{ fontWeight: "bold" }}>{cust.name}</td>
                  <td>
                    <FaEnvelope
                      style={{ marginRight: "5px", color: "#8c734b" }}
                    />
                    {cust.email}
                  </td>
                  <td style={{ color: "#3e5235", fontWeight: "bold" }}>
                    Rs. {cust.totalSpent.toLocaleString()}
                  </td>
                  <td>
                    <span className={getStatusClass(cust.status)}>
                      {cust.status}
                    </span>
                  </td>
                  <td>
                    <button className="action-btn track">
                      <FaUserEdit /> Edit
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

export default AdminCustomers;
