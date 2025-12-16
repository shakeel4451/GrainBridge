import React, { useState } from "react";
import CustomerSidebar from "../components/CustomerSidebar";
import "./CustomerDashboard.css"; // Reusing dashboard styles
import {
  FaUserCircle,
  FaEdit,
  FaSave,
  FaMapMarkerAlt,
  FaPhone,
} from "react-icons/fa";

const CustomerProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Ali Traders",
    email: "ali.traders@example.com",
    phone: "+92 301 234 5678",
    address: "Plot 4, Main Commercial Market, DHA Phase 5, Lahore, Punjab",
    contactPerson: "Mr. Zeeshan Ali",
    discount: "5%",
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setIsEditing(false);
    alert("Profile saved successfully!");
    // In a real app: Send updated profile data to the backend API
  };

  const InputField = ({ label, name, value, disabled = !isEditing, icon }) => (
    <div className="input-field-group">
      <label>{label}</label>
      <div className="input-with-icon">
        {icon}
        <input
          type="text"
          name={name}
          value={value}
          onChange={handleChange}
          disabled={disabled}
        />
      </div>
    </div>
  );

  return (
    <div className="customer-layout">
      <CustomerSidebar />
      <main className="customer-content">
        <h1 className="page-title">
          <FaUserCircle /> My Profile
        </h1>

        <div className="card profile-card">
          <div className="profile-header">
            <h3>Account Details</h3>
            {isEditing ? (
              <button
                className="quick-reorder-btn"
                onClick={handleSave}
                style={{ backgroundColor: "#3e5235" }}
              >
                <FaSave /> Save Changes
              </button>
            ) : (
              <button
                className="quick-reorder-btn"
                onClick={() => setIsEditing(true)}
              >
                <FaEdit /> Edit
              </button>
            )}
          </div>

          <div className="profile-grid">
            <InputField
              label="Business Name"
              name="name"
              value={profile.name}
              icon={<FaUserCircle />}
            />
            <InputField
              label="Contact Person"
              name="contactPerson"
              value={profile.contactPerson}
              icon={<FaUserCircle />}
            />
            <InputField
              label="Email"
              name="email"
              value={profile.email}
              icon={<FaEdit />}
            />
            <InputField
              label="Phone"
              name="phone"
              value={profile.phone}
              icon={<FaPhone />}
            />

            <div className="input-field-group full-width">
              <label>Billing Address</label>
              <div className="input-with-icon">
                <FaMapMarkerAlt />
                <textarea
                  name="address"
                  value={profile.address}
                  onChange={handleChange}
                  disabled={!isEditing}
                  rows="3"
                />
              </div>
            </div>

            <div className="input-field-group">
              <label>Assigned Discount Level</label>
              <p
                style={{
                  fontWeight: "bold",
                  color: "#8c734b",
                  padding: "10px 0",
                  fontSize: "18px",
                }}
              >
                {profile.discount}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CustomerProfile;
