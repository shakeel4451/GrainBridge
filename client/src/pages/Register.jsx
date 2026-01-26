import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css";

import { API_BASE_URL } from "../config";

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

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false); // Success state
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
      await axios.post(`${API_BASE_URL}/api/auth/register`, formData);

      setIsRegistered(true);

      setTimeout(() => navigate("/login"), 4000);
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
            page to sign in.
          </p>
          <button
            className="register-button"
            onClick={() => navigate("/login")}
            style={{ marginTop: "20px" }}
          >
            Go to Login
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
          <div className="input-group">
            <label>I am a:</label>
            <select name="role" value={role} onChange={handleChange}>
              <option value="Customer">Customer</option>
              <option value="Supplier">Supplier</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

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
