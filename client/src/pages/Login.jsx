import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

import { API_BASE_URL } from "../config";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Admin");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { data } = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        email,
        password,
      });

      // --- ROLE VALIDATION LOGIC ---
      // Compare the toggle selected in UI (role) with the database result (data.role)
      if (data.role !== role) {
        setError(
          `Access Denied: You are registered as a ${data.role}, not an ${role}.`,
        );
        return; // Halt the login process
      }

      // Store persistent user info in localStorage
      localStorage.setItem("userInfo", JSON.stringify(data));

      // Navigate based on verified role
      if (data.role === "Admin") navigate("/admin/dashboard");
      else if (data.role === "Customer") navigate("/customer/dashboard");
      else navigate("/supplier/dashboard");
    } catch (apiError) {
      const errorMessage =
        apiError.response?.data?.message ||
        "Login failed. Check server connection.";
      setError(errorMessage);
    }
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-card">
        <h2>ERP Login</h2>

        <div className="role-selector">
          <button
            className={role === "Admin" ? "active" : ""}
            onClick={() => setRole("Admin")}
            type="button"
          >
            Admin
          </button>
          <button
            className={role === "Customer" ? "active" : ""}
            onClick={() => setRole("Customer")}
            type="button"
          >
            Customer
          </button>
          <button
            className={role === "Supplier" ? "active" : ""}
            onClick={() => setRole("Supplier")}
            type="button"
          >
            Supplier
          </button>
        </div>

        <p className="login-prompt-text">
          Log in as <strong>{role}</strong>
        </p>

        {error && <div className="login-error-box">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="login-form-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="login-form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-submit-btn">
            Login
          </button>
        </form>

        <div className="login-footer-link">
          Don't have an account?{" "}
          <span onClick={() => navigate("/register")}>Register</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
