import React, { useState } from "react"; // 1. Import useState
import { Link, useLocation } from "react-router-dom";
import "./SupplierSidebar.css";
import {
  FaThLarge,
  FaClipboardList,
  FaMoneyBillWave,
  FaSeedling,
  FaChartBar,
  FaUserCircle,
  FaCog,
  FaBars, // 2. Import Menu Icon
  FaTimes, // 2. Import Close Icon
} from "react-icons/fa";

const SupplierSidebar = () => {
  const location = useLocation();
  const isLinkActive = (path) => location.pathname.startsWith(path);

  // 3. Add State for Mobile Toggle
  const [isOpen, setIsOpen] = useState(false);

  // 4. Helper to close sidebar when a link is clicked
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* 5. Mobile Toggle Button (Visible only on mobile via CSS) */}
      <button className="mobile-menu-toggle" onClick={() => setIsOpen(true)}>
        <FaBars /> Menu
      </button>

      {/* 6. Add 'open' class based on state */}
      <div className={`supplier-sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <h3>Supplier Portal</h3>
          {/* 7. Close Button inside Sidebar */}
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
      </div>

      {/* 8. Overlay to close when clicking outside */}
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

export default SupplierSidebar;
