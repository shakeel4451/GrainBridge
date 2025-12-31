import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Added useNavigate
import "./SupplierSidebar.css";
import {
  FaThLarge,
  FaClipboardList,
  FaMoneyBillWave,
  FaSeedling,
  FaChartBar,
  FaUserCircle,
  FaCog,
  FaBars,
  FaTimes,
  FaSignOutAlt, // Added Logout Icon
} from "react-icons/fa";

const SupplierSidebar = () => {
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
      <div className={`supplier-sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <h3>Supplier Portal</h3>
          <button
            className="close-sidebar-btn"
            onClick={() => setIsOpen(false)}
          >
            <FaTimes />
          </button>
        </div>

        <ul className="sidebar-menu">
          <li className={isLinkActive("/supplier/dashboard") ? "active" : ""}>
            <Link to="/supplier/dashboard" onClick={handleLinkClick}>
              <FaThLarge /> Dashboard
            </Link>
          </li>

          <li className={isLinkActive("/supplier/demand") ? "active" : ""}>
            <Link to="/supplier/demand" onClick={handleLinkClick}>
              <FaClipboardList /> Current Demand
            </Link>
          </li>

          <li className={isLinkActive("/supplier/payments") ? "active" : ""}>
            <Link to="/supplier/payments" onClick={handleLinkClick}>
              <FaMoneyBillWave /> Payment History
            </Link>
          </li>

          <li className={isLinkActive("/supplier/quality-ai") ? "active" : ""}>
            <Link to="/supplier/quality-ai" onClick={handleLinkClick}>
              <FaSeedling /> Quality Scanner (AI)
            </Link>
          </li>

          <li
            className={isLinkActive("/supplier/market-rates") ? "active" : ""}
          >
            <Link to="/supplier/market-rates" onClick={handleLinkClick}>
              <FaChartBar /> Market Trends
            </Link>
          </li>

          <li className={isLinkActive("/supplier/profile") ? "active" : ""}>
            <Link to="/supplier/profile" onClick={handleLinkClick}>
              <FaUserCircle /> My Profile
            </Link>
          </li>

          <li className={isLinkActive("/supplier/settings") ? "active" : ""}>
            <Link to="/supplier/settings" onClick={handleLinkClick}>
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

export default SupplierSidebar;
