import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // 1. Import useNavigate
import "./Login.css";
import {
  FaUser,
  FaLock,
  FaTractor,
  FaUserShield,
  FaLeaf,
} from "react-icons/fa";
import logo from "../assets/logo.png";

const Login = () => {
  const [role, setRole] = useState("customer");
  const [formData, setFormData] = useState({ email: "", password: "" });

  // 2. Initialize the navigate function
  const navigate = useNavigate();

  const handleRoleChange = (selectedRole) => {
    setRole(selectedRole);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (role === "admin") {
      navigate("/admin/dashboard");
    } else if (role === "supplier") {
      // REDIRECT SUPPLIER HERE
      navigate("/supplier/dashboard");
    } else {
      // Customer
      navigate("/customer/dashboard"); // Sending customer to their dashboard now
    }
  };

  return (
    <div className="login-container">
      <div className="login-overlay"></div>
      <div className="login-card">
        <div className="login-header">
          <img src={logo} alt="GrainBridge" className="login-logo" />
          <h2>Welcome Back</h2>
          <p>Please select your portal to continue</p>
        </div>

        {/* Role Switcher */}
        <div className="role-switcher">
          <button
            className={`role-btn ${role === "customer" ? "active" : ""}`}
            onClick={() => handleRoleChange("customer")}
          >
            <FaUser /> Customer
          </button>
          <button
            className={`role-btn ${role === "supplier" ? "active" : ""}`}
            onClick={() => handleRoleChange("supplier")}
          >
            <FaTractor /> Farmer
          </button>
          <button
            className={`role-btn ${role === "admin" ? "active" : ""}`}
            onClick={() => handleRoleChange("admin")}
          >
            <FaUserShield /> Admin
          </button>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <div className="input-icon">
              {role === "supplier" ? <FaLeaf /> : <FaUser />}
            </div>
            <input
              type={role === "supplier" ? "text" : "email"}
              placeholder={
                role === "supplier"
                  ? "Grower ID / Phone Number"
                  : "Email Address"
              }
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          <div className="input-group">
            <div className="input-icon">
              <FaLock />
            </div>
            <input
              type="password"
              placeholder="Password"
              required
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>

          <div className="form-options">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="#" className="forgot-link">
              Forgot Password?
            </a>
          </div>

          <button type="submit" className="submit-btn">
            Login as {role.charAt(0).toUpperCase() + role.slice(1)}
          </button>
        </form>

        <div className="login-footer">
          <p>
            New to GrainBridge? <Link to="/register">Create Account</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
