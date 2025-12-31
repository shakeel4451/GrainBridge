import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./CustomerSidebar.css";
import {
  FaThLarge,
  FaShoppingCart,
  FaHistory,
  FaTruck,
  FaMapMarkerAlt,
  FaUserCircle,
  FaCog,
  FaBars,
  FaTimes,
  FaSignOutAlt, // Import Logout Icon
} from "react-icons/fa";

const CustomerSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Hook for redirection
  const isLinkActive = (path) => location.pathname.startsWith(path);

  // State for Mobile Toggle
  const [isOpen, setIsOpen] = useState(false);

  // Helper to close sidebar when a link is clicked
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  // Logout Functionality
  const handleLogout = () => {
    // 1. Clear session data
    localStorage.removeItem("userInfo");
    // 2. Close mobile menu if open
    setIsOpen(false);
    // 3. Redirect to login
    navigate("/login", { replace: true });
    // 4. Force reload to reset all states
    window.location.reload();
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button className="mobile-menu-toggle" onClick={() => setIsOpen(true)}>
        <FaBars /> Menu
      </button>

      {/* Sidebar Container */}
      <div className={`customer-sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <h3>Customer Portal</h3>
          <button
            className="close-sidebar-btn"
            onClick={() => setIsOpen(false)}
          >
            <FaTimes />
          </button>
        </div>

        <ul className="sidebar-menu">
          <li className={isLinkActive("/customer/dashboard") ? "active" : ""}>
            <Link to="/customer/dashboard" onClick={handleLinkClick}>
              <FaThLarge /> Dashboard
            </Link>
          </li>

          <li className={isLinkActive("/products") ? "active" : ""}>
            <Link to="/products" onClick={handleLinkClick}>
              <FaShoppingCart /> Place New Order
            </Link>
          </li>

          <li className={isLinkActive("/customer/history") ? "active" : ""}>
            <Link to="/customer/history" onClick={handleLinkClick}>
              <FaHistory /> Order History
            </Link>
          </li>

          <li className={isLinkActive("/customer/tracking") ? "active" : ""}>
            <Link to="/customer/tracking" onClick={handleLinkClick}>
              <FaTruck /> Track Shipments
            </Link>
          </li>

          <li
            className={isLinkActive("/customer/traceability") ? "active" : ""}
          >
            <Link to="/customer/traceability" onClick={handleLinkClick}>
              <FaMapMarkerAlt /> Traceability Check
            </Link>
          </li>

          <li className={isLinkActive("/customer/profile") ? "active" : ""}>
            <Link to="/customer/profile" onClick={handleLinkClick}>
              <FaUserCircle /> My Profile
            </Link>
          </li>

          <li className={isLinkActive("/customer/settings") ? "active" : ""}>
            <Link to="/customer/settings" onClick={handleLinkClick}>
              <FaCog /> Settings
            </Link>
          </li>
        </ul>

        {/* LOGOUT BUTTON SECTION */}
        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div className="sidebar-overlay" onClick={() => setIsOpen(false)}></div>
      )}
    </>
  );
};

export default CustomerSidebar;
