import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminSidebar from "../components/AdminSidebar";
import { API_BASE_URL } from "../config";
import "./AdminSuppliers.css"; // Reuse existing styles
import { FaTruck, FaCheck, FaTimes, FaClock } from "react-icons/fa";

const AdminShipments = () => {
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const config = { headers: { Authorization: `Bearer ${userInfo?.token}` } };

  // 1. Fetch All Shipments
  const fetchShipments = async () => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/api/shipments`, config);
      setShipments(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching shipments", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShipments();
  }, []);

  // 2. Handle Approval
  const handleStatus = async (id, newStatus, quantity, crop) => {
    if (!window.confirm(`Are you sure you want to ${newStatus} this shipment?`))
      return;

    try {
      await axios.put(
        `${API_BASE_URL}/api/shipments/${id}/status`,
        { status: newStatus },
        config,
      );

      alert(
        newStatus === "Approved"
          ? `✅ Success! ${quantity} bags of ${crop} added to Inventory.`
          : "❌ Shipment Rejected.",
      );

      fetchShipments(); // Refresh list
    } catch (err) {
      alert("Error updating status.");
    }
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <main className="admin-content">
        <h1 className="page-title">
          <FaTruck /> Incoming Shipments
        </h1>

        <div className="card">
          <h3>Pending Approvals</h3>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Supplier</th>
                  <th>Crop</th>
                  <th>Quantity</th>
                  <th>Date Expected</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {shipments.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <strong>{item.supplier?.name}</strong>
                      <br />
                      <span style={{ fontSize: "12px", color: "#777" }}>
                        {item.supplier?.companyName}
                      </span>
                    </td>
                    <td>{item.cropType}</td>
                    <td style={{ fontWeight: "bold", color: "#3e5235" }}>
                      {item.quantity} Bags
                    </td>
                    <td>{new Date(item.expectedDate).toLocaleDateString()}</td>
                    <td>
                      <span
                        className={`status-badge ${item.status.toLowerCase()}`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td>
                      {item.status === "Pending" ? (
                        <div style={{ display: "flex", gap: "10px" }}>
                          <button
                            className="ship-btn"
                            style={{ backgroundColor: "#2e7d32" }}
                            onClick={() =>
                              handleStatus(
                                item._id,
                                "Approved",
                                item.quantity,
                                item.cropType,
                              )
                            }
                          >
                            <FaCheck /> Approve
                          </button>
                          <button
                            className="ship-btn"
                            style={{ backgroundColor: "#c62828" }}
                            onClick={() => handleStatus(item._id, "Rejected")}
                          >
                            <FaTimes /> Reject
                          </button>
                        </div>
                      ) : (
                        <span style={{ color: "#888", fontSize: "12px" }}>
                          Completed
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminShipments;
