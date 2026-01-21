import React, { useState, useEffect } from "react";
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
  FaSignOutAlt,
} from "react-icons/fa";

const CustomerSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const isLinkActive = (path) => location.pathname === path;

  // Automatically close sidebar on route change (for mobile)
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/login", { replace: true });
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
          <div className="sidebar-logo">
            <h3>Customer Portal</h3>
          </div>
          <button
            className="close-sidebar-btn"
            onClick={() => setIsOpen(false)}
          >
            <FaTimes />
          </button>
        </div>

        <ul className="sidebar-menu">
          <li className={isLinkActive("/customer/dashboard") ? "active" : ""}>
            <Link to="/customer/dashboard">
              <FaThLarge /> Dashboard
            </Link>
          </li>

          <li className={isLinkActive("/products") ? "active" : ""}>
            <Link to="/products">
              <FaShoppingCart /> Place New Order
            </Link>
          </li>

          <li className={isLinkActive("/customer/history") ? "active" : ""}>
            <Link to="/customer/history">
              <FaHistory /> Order History
            </Link>
          </li>

          <li className={isLinkActive("/customer/tracking") ? "active" : ""}>
            <Link to="/customer/tracking">
              <FaTruck /> Track Shipments
            </Link>
          </li>

          <li
            className={isLinkActive("/customer/traceability") ? "active" : ""}
          >
            <Link to="/customer/traceability">
              <FaMapMarkerAlt /> Traceability Check
            </Link>
          </li>

          <li className={isLinkActive("/customer/profile") ? "active" : ""}>
            <Link to="/customer/profile">
              <FaUserCircle /> My Profile
            </Link>
          </li>

          <li className={isLinkActive("/customer/settings") ? "active" : ""}>
            <Link to="/customer/settings">
              <FaCog /> Settings
            </Link>
          </li>
        </ul>

        {/* LOGOUT BUTTON */}
        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div className="sidebar-overlay" onClick={() => setIsOpen(false)}></div>
      )}
    </>
  );
};

export default CustomerSidebar;
