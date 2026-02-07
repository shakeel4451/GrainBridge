import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css";

// FIX 1: Use Vite environment variable for Vercel deployment
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Customer",
    companyName: "",
    phone: "",
    address: "",
  });

  const [adminKey, setAdminKey] = useState(""); // State for the secret key
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const navigate = useNavigate();

  const { name, email, password, role, companyName, phone, address } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // FIX 2: Send the adminKey only if the user is trying to be an Admin
      const payload = {
        ...formData,
        adminKey: role === "Admin" ? adminKey : undefined,
      };

      await axios.post(`${API_BASE_URL}/api/auth/register`, payload);

      setIsRegistered(true);

      // Redirect to login after 3 seconds
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  // SUCCESS VIEW
  if (isRegistered) {
    return (
      <div className="register-container">
        <div className="register-box" style={{ textAlign: "center" }}>
          <h2 style={{ color: "#3e5235" }}>Account Created!</h2>
          <p>
            Registration was successful. You are being redirected to the login
            page...
          </p>
          <button
            className="register-button"
            onClick={() => navigate("/login")}
            style={{ marginTop: "20px" }}
          >
            Go to Login Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Create Account</h2>
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          {/* Role Selection */}
          <div className="input-group">
            <label>I am a:</label>
            <select name="role" value={role} onChange={handleChange}>
              <option value="Customer">Customer</option>
              <option value="Supplier">Supplier</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          {/* FIX 3: THE SECURITY VAULT UI (Only shows for Admin) */}
          {role === "Admin" && (
            <div
              style={{
                marginBottom: "20px",
                padding: "15px",
                backgroundColor: "#fff5f5",
                border: "2px dashed #e53e3e",
                borderRadius: "8px",
              }}
            >
              <label
                style={{
                  color: "#e53e3e",
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  marginBottom: "8px",
                }}
              >
                <span>🔒</span> Security Clearance
              </label>
              <input
                type="password"
                placeholder="Enter Admin Secret Key"
                value={adminKey}
                onChange={(e) => setAdminKey(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #e53e3e",
                  borderRadius: "4px",
                }}
              />
              <small style={{ color: "#c53030", fontSize: "12px" }}>
                * Incorrect key will block registration.
              </small>
            </div>
          )}

          {/* Standard Fields */}
          <div className="input-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Extra Fields for Non-Admins */}
          {role !== "Admin" && (
            <>
              <div className="input-group">
                <label>Company Name</label>
                <input
                  type="text"
                  name="companyName"
                  value={companyName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group">
                <label>Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  value={phone}
                  onChange={handleChange}
                />
              </div>
              <div className="input-group">
                <label>Business Address</label>
                <textarea
                  name="address"
                  value={address}
                  onChange={handleChange}
                ></textarea>
              </div>
            </>
          )}

          <button type="submit" className="register-button" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="footer-text">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Login</span>
        </p>
      </div>
    </div>
  );
};

export default Register;
