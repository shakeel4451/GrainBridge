import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./CustomerSidebar.css";
import {
  FaThLarge,
  FaShoppingCart,
  FaHistory,
  FaTruck,
  FaMapMarkerAlt,
  FaUserCircle,
  FaCog,
  FaBars, // Import Menu Icon
  FaTimes, // Import Close Icon
} from "react-icons/fa";

const CustomerSidebar = () => {
  const location = useLocation();
  const isLinkActive = (path) => location.pathname.startsWith(path);

  // State for Mobile Toggle
  const [isOpen, setIsOpen] = useState(false);

  // Helper to close sidebar when a link is clicked
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button className="mobile-menu-toggle" onClick={() => setIsOpen(true)}>
        <FaBars /> Menu
      </button>

      {/* Sidebar Container with conditional class */}
      <div className={`customer-sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <h3>Customer Portal</h3>
          {/* Close Button */}
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
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setIsOpen(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)",
            zIndex: 1099,
          }}
        ></div>
      )}
    </>
  );
};

export default CustomerSidebar;
