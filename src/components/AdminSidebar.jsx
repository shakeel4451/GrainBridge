import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./AdminSidebar.css";
import {
  FaThLarge,
  FaShoppingCart,
  FaCogs,
  FaWarehouse,
  FaChartLine,
  FaUsers,
  FaTruck,
  FaFileAlt,
  FaCog,
  FaBars, // Import Menu Icon
  FaTimes, // Import Close Icon
} from "react-icons/fa";

const AdminSidebar = () => {
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
      <div className={`admin-sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <h3>Admin Portal</h3>
          {/* Close Button */}
          <button
            className="close-sidebar-btn"
            onClick={() => setIsOpen(false)}
          >
            <FaTimes />
          </button>
        </div>

        <ul className="sidebar-menu">
          <li className={isLinkActive("/admin/dashboard") ? "active" : ""}>
            <Link to="/admin/dashboard" onClick={handleLinkClick}>
              <FaThLarge /> Dashboard
            </Link>
          </li>

          <li className={isLinkActive("/admin/orders") ? "active" : ""}>
            <Link to="/admin/orders" onClick={handleLinkClick}>
              <FaShoppingCart /> My Orders
            </Link>
          </li>

          <li className={isLinkActive("/admin/milling") ? "active" : ""}>
            <Link to="/admin/milling" onClick={handleLinkClick}>
              <FaCogs /> Milling System
            </Link>
          </li>

          <li className={isLinkActive("/admin/inventory") ? "active" : ""}>
            <Link to="/admin/inventory" onClick={handleLinkClick}>
              <FaWarehouse /> Inventory
            </Link>
          </li>

          <li className={isLinkActive("/admin/sales") ? "active" : ""}>
            <Link to="/admin/sales" onClick={handleLinkClick}>
              <FaChartLine /> Sales & Orders
            </Link>
          </li>

          <li className={isLinkActive("/admin/customers") ? "active" : ""}>
            <Link to="/admin/customers" onClick={handleLinkClick}>
              <FaUsers /> Customer Accounts
            </Link>
          </li>

          <li className={isLinkActive("/admin/suppliers") ? "active" : ""}>
            <Link to="/admin/suppliers" onClick={handleLinkClick}>
              <FaTruck /> Supplier Mgmt
            </Link>
          </li>

          <li className={isLinkActive("/admin/reports") ? "active" : ""}>
            <Link to="/admin/reports" onClick={handleLinkClick}>
              <FaFileAlt /> BI & Reports
            </Link>
          </li>

          <li className={isLinkActive("/admin/settings") ? "active" : ""}>
            <Link to="/admin/settings" onClick={handleLinkClick}>
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

export default AdminSidebar;
