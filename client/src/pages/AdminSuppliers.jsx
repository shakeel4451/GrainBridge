import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminSidebar from "../components/AdminSidebar";
import "./AdminSuppliers.css"; // Ensure you create this or keep AdminDashboard.css
import {
  FaTruck,
  FaFileContract,
  FaChartBar,
  FaUserEdit,
  FaMoneyBillAlt,
  FaUserTie,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

const AdminSuppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const config = {
    headers: { Authorization: `Bearer ${userInfo?.token}` },
  };

  // 1. Fetch real suppliers from the backend
  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        // We call our auth endpoint to get users and filter by role
        const { data } = await axios.get(
          "http://localhost:5000/api/auth/users",
          config
        );
        const supplierList = data.filter((user) => user.role === "Supplier");
        setSuppliers(supplierList);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch supplier data.");
        setLoading(false);
      }
    };
    fetchSuppliers();
  }, []);

  // Helper for performance status (since this isn't in DB yet, we randomize for UI)
  const getStatusClass = (id) => {
    const statuses = ["status success", "status pending", "status success"];
    return statuses[id % 3];
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <main className="admin-content">
        <h1 className="page-title">
          <FaTruck /> Supplier Management
        </h1>

        {/* STATS OVERVIEW */}
        <div
          className="dashboard-grid inventory-stats"
          style={{ marginBottom: "30px" }}
        >
          <div
            className="card stat-card"
            style={{ borderLeft: "4px solid #3e5235" }}
          >
            <p>Total Active Suppliers</p>
            <h2>{suppliers.length}</h2>
          </div>
          <div
            className="card stat-card"
            style={{ borderLeft: "4px solid #f57c00" }}
          >
            <p>Verification Pending</p>
            <h2 style={{ color: "#f57c00" }}>0</h2>
          </div>
          <div
            className="card stat-card"
            style={{ borderLeft: "4px solid #1976d2" }}
          >
            <p>Region Coverage</p>
            <h2 style={{ color: "#1976d2" }}>Punjab</h2>
          </div>
        </div>

        {/* SUPPLIER TABLE */}
        <div className="card">
          <h3>Supplier Roster and Contact Details</h3>
          {loading ? (
            <p>Loading suppliers...</p>
          ) : error ? (
            <p className="error-text">{error}</p>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Mill / Company</th>
                  <th>Contact Person</th>
                  <th>Contact Details</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {suppliers.length > 0 ? (
                  suppliers.map((sup, index) => (
                    <tr key={sup._id}>
                      <td style={{ fontWeight: "bold", color: "#3e5235" }}>
                        {sup.companyName || "Independent Farmer"}
                      </td>
                      <td>
                        <FaUserTie
                          style={{ marginRight: "8px", color: "#8c734b" }}
                        />
                        {sup.name}
                      </td>
                      <td>
                        <div style={{ fontSize: "13px" }}>
                          <FaPhoneAlt style={{ marginRight: "5px" }} />{" "}
                          {sup.phone || "No Phone"}
                        </div>
                        <div style={{ fontSize: "11px", color: "#777" }}>
                          {sup.email}
                        </div>
                      </td>
                      <td>
                        <FaMapMarkerAlt
                          style={{ marginRight: "5px", color: "#d32f2f" }}
                        />
                        {sup.address || "Gujranwala"}
                      </td>
                      <td>
                        <span className={getStatusClass(index)}>Verified</span>
                      </td>
                      <td>
                        <button className="action-btn track">
                          <FaUserEdit /> Profile
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      style={{ textAlign: "center", padding: "20px" }}
                    >
                      No suppliers registered in the system yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminSuppliers;
