import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
// Import the logo image from your assets folder
import logo from "../assets/logo.png";

const Navbar = () => {
  const location = useLocation();

  // Check if we are in ANY dashboard (Admin, Customer, or Supplier)
  const isDashboardRoute =
    location.pathname.includes("/dashboard") ||
    location.pathname.includes("/admin") ||
    location.pathname.includes("/supplier") ||
    location.pathname.includes("/customer");

  return (
    <nav className="navbar">
      {/* Brand Link */}
      <Link to="/" className="navbar-brand">
        {/* LOGO IMAGE RESTORED */}
        <img
          src={logo}
          alt="GrainBridge Logo"
          className="logo-img"
          style={{
            height: "45px", // Adjust height to fit navbar
            width: "auto", // Maintains aspect ratio
            marginRight: "10px", // Space between logo and text
            objectFit: "contain",
          }}
        />

        {/* Brand Text (You can remove this div if your logo image already has text) */}
        <div className="brand-text">
          <span className="text-white">Grain</span>
          <span className="text-gold">Bridge</span>
        </div>
      </Link>

      <ul className="navbar-links">
        {/* CONDITIONAL RENDERING */}
        {!isDashboardRoute ? (
          <>
            {/* PUBLIC LINKS (Visible when NOT logged in) */}
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>
              <Link to="/process">Our Process</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>

            {/* LOGIN BUTTON */}
            <li>
              <Link to="/login" className="login-link-btn">
                <button className="login-btn">Login/Register</button>
              </Link>
            </li>
          </>
        ) : (
          <>
            {/* DASHBOARD HEADER (Visible when logged in) */}
            {/* We only show a welcome message here. Logout is handled by the Sidebar. */}
            <li className="admin-info">Welcome Back!</li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
