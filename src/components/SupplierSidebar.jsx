import React from "react";
import { Link, useLocation } from "react-router-dom"; // <-- Import useLocation
import "./SupplierSidebar.css";
import {
  FaThLarge,
  FaClipboardList,
  FaMoneyBillWave,
  FaSeedling,
  FaChartBar,
  FaUserCircle,
  FaCog,
} from "react-icons/fa";

const SupplierSidebar = () => {
  const location = useLocation(); // Initialize useLocation

  // Helper function to check if a link path is active
  // We use .startsWith for pages that might have sub-routes later
  const isLinkActive = (path) => location.pathname.startsWith(path);

  return (
    <div className="supplier-sidebar">
      <div className="sidebar-header">
        <h3>Supplier Portal</h3>
      </div>

      <ul className="sidebar-menu">
        {/* Dashboard Link */}
        <li className={isLinkActive("/supplier/dashboard") ? "active" : ""}>
          <Link to="/supplier/dashboard">
            <FaThLarge /> Dashboard
          </Link>
        </li>

        {/* Current Demand Link */}
        <li className={isLinkActive("/supplier/demand") ? "active" : ""}>
          <Link to="/supplier/demand">
            <FaClipboardList /> Current Demand
          </Link>
        </li>

        {/* Payment History Link */}
        <li className={isLinkActive("/supplier/payments") ? "active" : ""}>
          <Link to="/supplier/payments">
            <FaMoneyBillWave /> Payment History
          </Link>
        </li>

        {/* Quality Reports Link */}
        <li className={isLinkActive("/supplier/quality") ? "active" : ""}>
          <Link to="/supplier/quality">
            <FaSeedling /> Quality Reports
          </Link>
        </li>

        {/* Market Trends Link (Placeholder page for now) */}
        <li className={isLinkActive("/supplier/market-rates") ? "active" : ""}>
          <Link to="/supplier/market-rates">
            <FaChartBar /> Market Trends
          </Link>
        </li>

        {/* My Profile Link */}
        <li className={isLinkActive("/supplier/profile") ? "active" : ""}>
          <Link to="/supplier/profile">
            <FaUserCircle /> My Profile
          </Link>
        </li>

        {/* Settings Link */}
        <li className={isLinkActive("/supplier/settings") ? "active" : ""}>
          <Link to="/supplier/settings">
            <FaCog /> Settings
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SupplierSidebar;
