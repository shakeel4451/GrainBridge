import React from "react";
import { Link, useLocation } from "react-router-dom"; // <-- Import useLocation
import "./Navbar.css";
import logo from "../assets/logo.png";
import { FaSignOutAlt } from "react-icons/fa"; // For Logout Icon

const Navbar = () => {
  const location = useLocation(); // Get current URL path
  // Check if the current path starts with /admin
  const isAdminRoute = location.pathname.startsWith("/admin");

  // Function to handle logout (simulated for now)
  const handleLogout = () => {
    alert("Logging out...");
    // In a real app: clear user token, then navigate to /login
    // For now, we'll navigate back to the homepage
    // window.location.href = '/login';
  };

  return (
    <nav className="navbar">
      {/* Brand Link always visible */}
      <Link to="/" className="navbar-brand">
        <img src={logo} alt="GrainBridge Logo" className="logo-img" />
        <div className="brand-text">
          <span className="text-white">Grain</span>
          <span className="text-gold">Bridge</span>
        </div>
      </Link>

      <ul className="navbar-links">
        {/* CONDITIONAL RENDERING */}
        {!isAdminRoute ? (
          <>
            {/* PUBLIC LINKS */}
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
            {/* ADMIN LINKS */}
            <li className="admin-info">Welcome, Admin!</li>
            <li>
              <button onClick={handleLogout} className="logout-btn">
                <FaSignOutAlt /> Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
