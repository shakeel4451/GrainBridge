import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SupplierSidebar from "../components/SupplierSidebar";
import "./SupplierDashboard.css";
import { API_BASE_URL } from "../config";
import {
  FaCalendarAlt,
  FaMoneyBillAlt,
  FaClipboardCheck,
  FaLeaf,
  FaTractor,
  FaPlus,
  FaTimes,
} from "react-icons/fa";

const SupplierDashboard = () => {
  const navigate = useNavigate();
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    cropType: "Basmati",
    quantity: "",
    expectedDate: "",
    notes: "",
  });

  // 1. Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      const user = JSON.parse(localStorage.getItem("userInfo"));
      if (!user) {
        navigate("/login");
        return;
      }
      setUserInfo(user);

      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const { data } = await axios.get(
          `${API_BASE_URL}/api/shipments`,
          config,
        );
        setShipments(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching shipments", err);
        setLoading(false);
      }
    };
    fetchData();
  }, [navigate]);

  // 2. Submit New Shipment
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      await axios.post(`${API_BASE_URL}/api/shipments`, formData, config);

      alert("Shipment Proposal Sent! Admin will review shortly.");
      setIsModalOpen(false);
      window.location.reload(); // Refresh to see new item
    } catch (err) {
      alert("Failed to create shipment. Check data.");
    }
  };

  // Stats Calculations
  const approvedShipments = shipments.filter((s) => s.status === "Approved");
  // Assuming a rough rate of Rs. 5000 per bag for estimation
  const estimatedEarnings = approvedShipments.reduce(
    (acc, curr) => acc + curr.quantity * 5000,
    0,
  );

  return (
    <div className="supplier-layout">
      <SupplierSidebar />

      <main className="supplier-content">
        <h1 className="page-title">Welcome, Farmer {userInfo?.name}!</h1>

        {/* STATS ROW */}
        <div className="stats-row">
          <div className="stat-card">
            <FaCalendarAlt className="stat-icon calendar" />
            <div className="stat-info">
              <p>Active Shipments</p>
              <h2>{shipments.filter((s) => s.status === "Pending").length}</h2>
            </div>
          </div>
          <div className="stat-card">
            <FaMoneyBillAlt className="stat-icon money" />
            <div className="stat-info">
              <p>Est. Earnings (Approved)</p>
              <h2>Rs. {estimatedEarnings.toLocaleString()}</h2>
            </div>
          </div>
          <div className="stat-card">
            <FaClipboardCheck className="stat-icon check" />
            <div className="stat-info">
              <p>Completed Deliveries</p>
              <h2>{approvedShipments.length}</h2>
            </div>
          </div>
        </div>

        {/* DASHBOARD CONTENT */}
        <div className="dashboard-grid">
          {/* DEMAND WIDGET (Trigger for Modal) */}
          <div className="card demand-card">
            <h3>
              <FaLeaf /> Current Mill Demand
            </h3>
            <p className="demand-qty">
              We need: <strong>Super Basmati & Kainat</strong>
            </p>
            <p className="demand-rate">Current Rate: Rs. 5,000 / bag</p>
            <button
              className="confirm-btn"
              onClick={() => setIsModalOpen(true)}
            >
              <FaTractor /> Create New Shipment
            </button>
          </div>

          {/* SHIPMENT HISTORY TABLE */}
          <div className="card payment-card">
            <h3>My Shipment History</h3>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <table className="supplier-table">
                <thead>
                  <tr>
                    <th>Crop</th>
                    <th>Qty (Bags)</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {shipments.length === 0 ? (
                    <tr>
                      <td colSpan="4">No shipments yet. Start supplying!</td>
                    </tr>
                  ) : (
                    shipments.map((ship) => (
                      <tr key={ship._id}>
                        <td>{ship.cropType}</td>
                        <td>{ship.quantity}</td>
                        <td>
                          {new Date(ship.expectedDate).toLocaleDateString()}
                        </td>
                        <td>
                          <span
                            className={`status-badge ${ship.status.toLowerCase()}`}
                          >
                            {ship.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>

      {/* CREATE SHIPMENT MODAL */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>
                <FaPlus /> New Supply Proposal
              </h3>
              <button
                className="close-modal"
                onClick={() => setIsModalOpen(false)}
              >
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="modal-form">
              <label>Crop Variety</label>
              <select
                value={formData.cropType}
                onChange={(e) =>
                  setFormData({ ...formData, cropType: e.target.value })
                }
              >
                <option value="Basmati">Super Basmati</option>
                <option value="Kainat">Kainat 1121</option>
                <option value="Irri-6">Irri-6</option>
                <option value="Brown">Organic Brown</option>
              </select>

              <label>Quantity (Bags)</label>
              <input
                type="number"
                min="1"
                required
                value={formData.quantity}
                onChange={(e) =>
                  setFormData({ ...formData, quantity: e.target.value })
                }
              />

              <label>Expected Delivery Date</label>
              <input
                type="date"
                required
                value={formData.expectedDate}
                onChange={(e) =>
                  setFormData({ ...formData, expectedDate: e.target.value })
                }
              />

              <label>Notes (Optional)</label>
              <input
                type="text"
                placeholder="e.g. Harvested yesterday, dry stock"
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
              />

              <button type="submit" className="update-btn">
                Submit Proposal
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupplierDashboard;
