// src/components/AdminSidebar.jsx
import React from "react";
import { Link } from "react-router-dom"; // <-- MUST import Link
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
} from "react-icons/fa";

const AdminSidebar = () => {
  // Use a function to check active state for styling (optional, but good practice)
  const isLinkActive = (path) => window.location.pathname.startsWith(path);

  return (
    <div className="admin-sidebar">
      <div className="sidebar-header">
        <h3>Admin Portal</h3>
      </div>

      <ul className="sidebar-menu">
        {/* Dashboard Link */}
        <li className={isLinkActive("/admin/dashboard") ? "active" : ""}>
          <Link to="/admin/dashboard">
            <FaThLarge /> Dashboard
          </Link>
        </li>

        {/* My Orders Link (Routes to AdminSales) */}
        <li className={isLinkActive("/admin/orders") ? "active" : ""}>
          <Link to="/admin/orders">
            <FaShoppingCart /> My Orders
          </Link>
        </li>

        {/* Milling System Link */}
        <li className={isLinkActive("/admin/milling") ? "active" : ""}>
          <Link to="/admin/milling">
            <FaCogs /> Milling System
          </Link>
        </li>

        {/* Inventory Link */}
        <li className={isLinkActive("/admin/inventory") ? "active" : ""}>
          <Link to="/admin/inventory">
            <FaWarehouse /> Inventory
          </Link>
        </li>

        {/* Sales & Orders Link */}
        <li className={isLinkActive("/admin/sales") ? "active" : ""}>
          <Link to="/admin/sales">
            <FaChartLine /> Sales & Orders
          </Link>
        </li>

        {/* Customer Accounts Link */}
        <li className={isLinkActive("/admin/customers") ? "active" : ""}>
          <Link to="/admin/customers">
            <FaUsers /> Customer Accounts
          </Link>
        </li>

        {/* Supplier Mgmt Link */}
        <li className={isLinkActive("/admin/suppliers") ? "active" : ""}>
          <Link to="/admin/suppliers">
            <FaTruck /> Supplier Mgmt
          </Link>
        </li>

        {/* BI & Reports Link (Placeholder, points to dashboard for now) */}
        <li className={isLinkActive("/admin/reports") ? "active" : ""}>
          <Link to="/admin/reports">
            <FaFileAlt /> BI & Reports
          </Link>
        </li>

        {/* Settings Link */}
        <li className={isLinkActive("/admin/settings") ? "active" : ""}>
          <Link to="/admin/settings">
            <FaCog /> Settings
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
