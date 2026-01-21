import React, { useState, useEffect } from "react";
import axios from "axios";
import CustomerSidebar from "../components/CustomerSidebar";
import "./CustomerProfile.css";
import {
  FaUserCircle,
  FaEdit,
  FaSave,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaBuilding,
  FaTimes,
} from "react-icons/fa";

// --- 1. MOVE COMPONENT OUTSIDE TO FIX FOCUS BUG ---
const InputField = ({
  label,
  name,
  value,
  disabled,
  icon,
  type = "text",
  onChange,
}) => (
  <div className="input-field-group">
    <label>{label}</label>
    <div className="input-with-icon">
      {icon}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={disabled ? "disabled-input" : ""}
      />
    </div>
  </div>
);

const CustomerProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    companyName: "",
    role: "",
  });

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    if (userInfo) {
      setProfile({
        name: userInfo.name || "",
        email: userInfo.email || "",
        phone: userInfo.phone || "",
        address: userInfo.address || "",
        companyName: userInfo.companyName || "",
        role: userInfo.role || "",
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        "http://localhost:5000/api/auth/profile",
        profile,
        config
      );

      // Keep token in the new object if backend doesn't return it
      const updatedInfo = { ...data, token: userInfo.token };
      localStorage.setItem("userInfo", JSON.stringify(updatedInfo));

      setIsEditing(false);
      setMessage({ type: "success", text: "Profile updated successfully!" });
    } catch (error) {
      setMessage({
        type: "error",
        text:
          error.response?.data?.message || "Update failed. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    // Reset to what is in localStorage
    if (userInfo) {
      setProfile({
        name: userInfo.name || "",
        email: userInfo.email || "",
        phone: userInfo.phone || "",
        address: userInfo.address || "",
        companyName: userInfo.companyName || "",
        role: userInfo.role || "",
      });
    }
    setIsEditing(false);
  };

  return (
    <div className="customer-layout">
      <CustomerSidebar />
      <main className="customer-content">
        <div className="profile-top-header">
          <h1 className="page-title">
            <FaUserCircle /> My Profile
          </h1>
          {message.text && (
            <div className={`profile-alert ${message.type}`}>
              {message.text}
            </div>
          )}
        </div>

        <div className="card profile-card">
          <div className="profile-header">
            <div className="header-text">
              <h3>Account Settings</h3>
              <p>
                Registered Role:{" "}
                <span className="role-tag">{profile.role}</span>
              </p>
            </div>

            <div className="header-actions">
              {isEditing ? (
                <>
                  <button className="cancel-btn" onClick={handleCancel}>
                    <FaTimes /> Cancel
                  </button>
                  <button
                    className="save-btn"
                    onClick={handleSave}
                    disabled={loading}
                  >
                    <FaSave /> {loading ? "Saving..." : "Save Changes"}
                  </button>
                </>
              ) : (
                <button className="edit-btn" onClick={() => setIsEditing(true)}>
                  <FaEdit /> Edit Profile
                </button>
              )}
            </div>
          </div>

          <div className="profile-grid">
            <InputField
              label="Full Name"
              name="name"
              value={profile.name}
              icon={<FaUserCircle />}
              onChange={handleChange}
              disabled={!isEditing}
            />
            <InputField
              label="Business Name"
              name="companyName"
              value={profile.companyName}
              icon={<FaBuilding />}
              onChange={handleChange}
              disabled={!isEditing}
            />
            <InputField
              label="Email Address"
              name="email"
              value={profile.email}
              icon={<FaEnvelope />}
              disabled={true} // Email should stay read-only
            />
            <InputField
              label="Phone Number"
              name="phone"
              value={profile.phone}
              icon={<FaPhone />}
              onChange={handleChange}
              disabled={!isEditing}
            />

            <div className="input-field-group full-width">
              <label>Default Shipping Address</label>
              <div className="input-with-icon">
                <FaMapMarkerAlt />
                <textarea
                  name="address"
                  value={profile.address}
                  onChange={handleChange}
                  disabled={!isEditing}
                  rows="3"
                  className={!isEditing ? "disabled-input" : ""}
                  placeholder="Complete address for rice deliveries..."
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CustomerProfile;
