import React from "react";
import { Link, useLocation } from "react-router-dom"; // <-- Import useLocation
import "./CustomerSidebar.css";
import {
  FaThLarge,
  FaShoppingCart,
  FaHistory,
  FaTruck,
  FaMapMarkerAlt,
  FaUserCircle,
  FaCog,
} from "react-icons/fa";

const CustomerSidebar = () => {
  const location = useLocation(); // Initialize useLocation

  // Helper function to check if a link path is active or should be highlighted
  const isLinkActive = (path) => location.pathname.startsWith(path);

  return (
    <div className="customer-sidebar">
      <div className="sidebar-header">
        <h3>Customer Portal</h3>
      </div>

      <ul className="sidebar-menu">
        {/* Dashboard Link - Match exact path */}
        <li className={isLinkActive("/customer/dashboard") ? "active" : ""}>
          <Link to="/customer/dashboard">
            <FaThLarge /> Dashboard
          </Link>
        </li>

        {/* Place New Order Link - Note: This links to the public /products page */}
        <li className={isLinkActive("/products") ? "active" : ""}>
          <Link to="/products">
            <FaShoppingCart /> Place New Order
          </Link>
        </li>

        {/* Order History Link */}
        <li className={isLinkActive("/customer/history") ? "active" : ""}>
          <Link to="/customer/history">
            <FaHistory /> Order History
          </Link>
        </li>

        {/* Track Shipments Link */}
        <li className={isLinkActive("/customer/tracking") ? "active" : ""}>
          <Link to="/customer/tracking">
            <FaTruck /> Track Shipments
          </Link>
        </li>

        {/* Traceability Check Link */}
        <li className={isLinkActive("/customer/traceability") ? "active" : ""}>
          <Link to="/customer/traceability">
            <FaMapMarkerAlt /> Traceability Check
          </Link>
        </li>

        {/* My Profile Link */}
        <li className={isLinkActive("/customer/profile") ? "active" : ""}>
          <Link to="/customer/profile">
            <FaUserCircle /> My Profile
          </Link>
        </li>

        {/* Settings Link */}
        <li className={isLinkActive("/customer/settings") ? "active" : ""}>
          <Link to="/customer/settings">
            <FaCog /> Settings
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default CustomerSidebar;
