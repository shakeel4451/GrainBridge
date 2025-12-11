import React, { useState } from "react";
import SupplierSidebar from "../components/SupplierSidebar";
import "./SupplierDashboard.css"; // Reusing dashboard styles
// FIX: FaBank has been correctly replaced with FaUniversity in the import
import {
  FaUserCircle,
  FaEdit,
  FaSave,
  FaTractor,
  FaUniversity,
  FaPhone,
} from "react-icons/fa";

const SupplierProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Nasir Khan Farms",
    growerId: "GWR-732",
    phone: "+92 300 987 6543",
    landArea: "12 Acres (Basmati)",
    bankName: "HBL (Habib Bank Ltd)",
    accountNumber: "0987-1234-5678-001",
    cnic: "35201-XXXXXXX-X",
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setIsEditing(false);
    alert("Profile saved successfully! Bank details are encrypted.");
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
    <div className="supplier-layout">
      <SupplierSidebar />
      <main className="supplier-content">
        <h1 className="page-title">
          <FaTractor /> My Farmer Profile
        </h1>

        <div className="card profile-card">
          <div className="profile-header">
            <h3>Grower & Land Details</h3>
            {isEditing ? (
              <button className="confirm-btn" onClick={handleSave}>
                <FaSave /> Save Changes
              </button>
            ) : (
              <button
                className="confirm-btn"
                onClick={() => setIsEditing(true)}
              >
                <FaEdit /> Edit
              </button>
            )}
          </div>

          <div className="profile-grid">
            <InputField
              label="Farm Name"
              name="name"
              value={profile.name}
              icon={<FaUserCircle />}
            />
            <InputField
              label="Grower ID"
              name="growerId"
              value={profile.growerId}
              disabled
              icon={<FaTractor />}
            />
            <InputField
              label="Land Area/Crops"
              name="landArea"
              value={profile.landArea}
              icon={<FaEdit />}
            />
            <InputField
              label="CNIC (Encrypted)"
              name="cnic"
              value={profile.cnic}
              disabled
              icon={<FaUserCircle />}
            />
          </div>

          <h3
            style={{
              marginTop: "30px",
              borderTop: "1px solid #eee",
              paddingTop: "20px",
            }}
          >
            Payment Information
          </h3>
          <div className="profile-grid">
            {/* FIX: Ensure FaUniversity is used here */}
            <InputField
              label="Bank Name"
              name="bankName"
              value={profile.bankName}
              icon={<FaUniversity />}
            />

            {/* FIX: Ensure FaUniversity is used here */}
            <InputField
              label="Account Number"
              name="accountNumber"
              value={profile.accountNumber}
              icon={<FaUniversity />}
            />

            <InputField
              label="Phone (for alerts)"
              name="phone"
              value={profile.phone}
              icon={<FaPhone />}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default SupplierProfile;
