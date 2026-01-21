import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
  FaBars,
  FaTimes,
  FaSignOutAlt,
} from "react-icons/fa";

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  // Exact match helper for active links
  const isLinkActive = (path) => location.pathname === path;

  const handleLinkClick = () => setIsOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    setIsOpen(false);
    navigate("/login", { replace: true });
    window.location.reload();
  };

  return (
    <>
      <button className="mobile-menu-toggle" onClick={() => setIsOpen(true)}>
        <FaBars /> Menu
      </button>

      <div className={`admin-sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <h3>Admin Portal</h3>
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

        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="sidebar-overlay" onClick={() => setIsOpen(false)}></div>
      )}
    </>
  );
};

export default AdminSidebar;
