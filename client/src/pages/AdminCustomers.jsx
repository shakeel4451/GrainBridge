import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminSidebar from "../components/AdminSidebar";
import "./AdminCustomers.css";
import {
  FaUsers,
  FaSearch,
  FaEnvelope,
  FaUserEdit,
  FaSyncAlt,
  FaUserTag,
} from "react-icons/fa";

const AdminCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const config = {
    headers: { Authorization: `Bearer ${userInfo?.token}` },
  };

  // 1. Fetch real customers from the database
  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        "http://localhost:5000/api/auth/users",
        config
      );

      // Filter for only Customers
      const onlyCustomers = data.filter((user) => user.role === "Customer");
      setCustomers(onlyCustomers);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching customers", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // 2. Search Logic
  const filteredCustomers = customers.filter(
    (cust) =>
      cust.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cust.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <main className="admin-content">
        <div className="admin-header-flex">
          <h1 className="page-title">
            <FaUsers /> Customer Accounts
          </h1>
          <button className="refresh-btn" onClick={fetchCustomers}>
            <FaSyncAlt /> Sync Database
          </button>
        </div>

        {/* 3. FUNCTIONAL SEARCH BAR */}
        <div className="card search-card">
          <div className="search-wrapper">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search by name, email, or business name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="customer-count">
            Total Customers: <strong>{customers.length}</strong>
          </div>
        </div>

        <div className="card table-card">
          {loading ? (
            <div className="loading-state">Fetching customer records...</div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Customer / Company</th>
                  <th>Contact Details</th>
                  <th>Primary Address</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.length > 0 ? (
                  filteredCustomers.map((cust) => (
                    <tr key={cust._id}>
                      <td>
                        <div className="cust-identity">
                          <strong>{cust.name}</strong>
                          <span>{cust.companyName || "Retail Buyer"}</span>
                        </div>
                      </td>
                      <td>
                        <div className="contact-info">
                          <p>
                            <FaEnvelope /> {cust.email}
                          </p>
                          <p># {cust.phone || "No phone listed"}</p>
                        </div>
                      </td>
                      <td className="address-cell">
                        {cust.address || "No address provided"}
                      </td>
                      <td>
                        <span className="status-badge active">
                          <FaUserTag /> Active
                        </span>
                      </td>
                      <td>
                        <button
                          className="edit-profile-btn"
                          onClick={() => alert(`Editing: ${cust.name}`)}
                        >
                          <FaUserEdit /> Edit
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="empty-table">
                      No customers found matching your search.
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

export default AdminCustomers;
