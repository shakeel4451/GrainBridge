import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Login from "./pages/Login";

// Portals (Dashboards)
import AdminDashboard from "./pages/AdminDashboard";
import CustomerDashboard from "./pages/CustomerDashboard";
import SupplierDashboard from "./pages/SupplierDashboard";

// Supplier Subpages
import SupplierPayments from "./pages/SupplierPayments";
import SupplierDemand from "./pages/SupplierDemand";
import SupplierAIQuality from "./pages/SupplierAIQuality"; // <-- AI Quality Scanner Import
import SupplierProfile from "./pages/SupplierProfile";
import { SupplierSettings } from "./pages/PortalSettings";

// Customer Subpages
import CustomerHistory from "./pages/CustomerHistory";
import CustomerTracking from "./pages/CustomerTracking";
import CustomerTraceability from "./pages/CustomerTraceability";
import CustomerProfile from "./pages/CustomerProfile";
import { CustomerSettings } from "./pages/PortalSettings";

// Admin Subpages
import AdminInventory from "./pages/AdminInventory";
import AdminSales from "./pages/AdminSales";
import AdminMilling from "./pages/AdminMilling";
import AdminCustomers from "./pages/AdminCustomers";
import AdminSuppliers from "./pages/AdminSuppliers";
import AdminReports from "./pages/AdminReports";
import { AdminSettings } from "./pages/PortalSettings";

// AI Component
import AiChatbot from "./components/AiChatbot";

import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          {/* ====================================
             1. PUBLIC ROUTES
             ==================================== */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          {/* Login Routes (all point to the unified Login component) */}
          <Route path="/login" element={<Login />} />
          <Route path="/login/customer" element={<Login />} />
          <Route path="/login/supplier" element={<Login />} />
          <Route path="/login/admin" element={<Login />} />
          {/* ====================================
             2. ADMIN PORTAL ROUTES
             ==================================== */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/inventory" element={<AdminInventory />} />
          <Route path="/admin/sales" element={<AdminSales />} />
          <Route path="/admin/orders" element={<AdminSales />} />{" "}
          <Route path="/admin/milling" element={<AdminMilling />} />
          <Route path="/admin/customers" element={<AdminCustomers />} />
          <Route path="/admin/suppliers" element={<AdminSuppliers />} />
          <Route path="/admin/reports" element={<AdminReports />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          {/* ====================================
             3. SUPPLIER PORTAL ROUTES
             ==================================== */}
          <Route path="/supplier/dashboard" element={<SupplierDashboard />} />
          <Route path="/supplier/payments" element={<SupplierPayments />} />
          <Route path="/supplier/demand" element={<SupplierDemand />} />
          {/* AI Quality Scanner Routes (Both quality/ and quality-ai/ point to the new component) */}
          <Route path="/supplier/quality" element={<SupplierAIQuality />} />
          <Route path="/supplier/quality-ai" element={<SupplierAIQuality />} />
          <Route path="/supplier/profile" element={<SupplierProfile />} />
          <Route path="/supplier/settings" element={<SupplierSettings />} />
          {/* ====================================
             4. CUSTOMER PORTAL ROUTES
             ==================================== */}
          <Route path="/customer/dashboard" element={<CustomerDashboard />} />
          <Route path="/customer/history" element={<CustomerHistory />} />
          <Route path="/customer/tracking" element={<CustomerTracking />} />
          <Route
            path="/customer/traceability"
            element={<CustomerTraceability />}
          />
          <Route path="/customer/profile" element={<CustomerProfile />} />
          <Route path="/customer/settings" element={<CustomerSettings />} />
        </Routes>
        <Footer />
        <AiChatbot />
      </div>
    </Router>
  );
}

export default App;
