import React, { useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import CustomerSidebar from "../components/CustomerSidebar";
import SupplierSidebar from "../components/SupplierSidebar";
import "./AdminDashboard.css";
import "./CustomerDashboard.css";
import { FaCog, FaLock, FaBell } from "react-icons/fa";

const PortalSettings = ({ role }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [notifications, setNotifications] = useState(true);

  const handleSubmitPassword = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("New passwords do not match!");
      return;
    }
    alert(`Password changed successfully for ${role}!`);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    // In a real app: Send change request
  };

  const renderSidebar = () => {
    if (role === "admin") return <AdminSidebar />;
    if (role === "supplier") return <SupplierSidebar />;
    return <CustomerSidebar />;
  };

  return (
    <div className={`${role}-layout`}>
      {renderSidebar()}
      <main className={`${role}-content`}>
        <h1 className="page-title">
          <FaCog /> {role.charAt(0).toUpperCase() + role.slice(1)} Settings
        </h1>

        {/* Change Password Card */}
        <div
          className="card"
          style={{ maxWidth: "600px", marginBottom: "30px" }}
        >
          <h3>
            <FaLock /> Change Password
          </h3>
          <form onSubmit={handleSubmitPassword}>
            <div className="input-field-group">
              <label>Current Password</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </div>
            <div className="input-field-group">
              <label>New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className="input-field-group">
              <label>Confirm New Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className={
                role === "admin" ? "action-btn track" : "quick-reorder-btn"
              }
            >
              Update Password
            </button>
          </form>
        </div>

        {/* Notification Settings Card */}
        <div className="card" style={{ maxWidth: "600px" }}>
          <h3>
            <FaBell /> Notification Preferences
          </h3>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "15px 0",
              borderBottom: "1px solid #eee",
            }}
          >
            <p>Email/SMS Alerts for new orders/payments:</p>
            <label className="switch">
              <input
                type="checkbox"
                checked={notifications}
                onChange={() => setNotifications(!notifications)}
              />
              <span className="slider round"></span>
            </label>
          </div>
          <p style={{ fontSize: "14px", color: "#888", marginTop: "15px" }}>
            Note: Transactional emails (invoices, receipts) cannot be disabled.
          </p>
        </div>
      </main>
    </div>
  );
};

// Export specialized components for routing
export const AdminSettings = () => <PortalSettings role="admin" />;
export const CustomerSettings = () => <PortalSettings role="customer" />;
export const SupplierSettings = () => <PortalSettings role="supplier" />;
