import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Protection Component
import ProtectedRoute from "./components/ProtectedRoute";

// Portals (Dashboards)
import AdminDashboard from "./pages/AdminDashboard";
import CustomerDashboard from "./pages/CustomerDashboard";
import SupplierDashboard from "./pages/SupplierDashboard";

// Supplier Subpages
import SupplierPayments from "./pages/SupplierPayments";
import SupplierDemand from "./pages/SupplierDemand";
import SupplierAIQuality from "./pages/SupplierAIQuality";
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
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Explicitly map potential anchor routes to Home to prevent redirect */}
          <Route path="/process" element={<Home />} />
          <Route path="/contact" element={<Home />} />

          {/* Unified Login Redirections */}
          <Route path="/login/customer" element={<Login />} />
          <Route path="/login/supplier" element={<Login />} />
          <Route path="/login/admin" element={<Login />} />

          {/* ====================================
               2. ADMIN PORTAL ROUTES (PROTECTED)
               ==================================== */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/inventory"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <AdminInventory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/sales"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <AdminSales />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/orders"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <AdminSales />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/milling"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <AdminMilling />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/customers"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <AdminCustomers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/suppliers"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <AdminSuppliers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/reports"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <AdminReports />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/settings"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <AdminSettings />
              </ProtectedRoute>
            }
          />

          {/* ====================================
               3. SUPPLIER PORTAL ROUTES (PROTECTED)
               ==================================== */}
          <Route
            path="/supplier/dashboard"
            element={
              <ProtectedRoute allowedRoles={["Supplier"]}>
                <SupplierDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/supplier/payments"
            element={
              <ProtectedRoute allowedRoles={["Supplier"]}>
                <SupplierPayments />
              </ProtectedRoute>
            }
          />
          <Route
            path="/supplier/demand"
            element={
              <ProtectedRoute allowedRoles={["Supplier"]}>
                <SupplierDemand />
              </ProtectedRoute>
            }
          />
          <Route
            path="/supplier/quality"
            element={
              <ProtectedRoute allowedRoles={["Supplier"]}>
                <SupplierAIQuality />
              </ProtectedRoute>
            }
          />
          <Route
            path="/supplier/quality-ai"
            element={
              <ProtectedRoute allowedRoles={["Supplier"]}>
                <SupplierAIQuality />
              </ProtectedRoute>
            }
          />
          <Route
            path="/supplier/profile"
            element={
              <ProtectedRoute allowedRoles={["Supplier"]}>
                <SupplierProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/supplier/settings"
            element={
              <ProtectedRoute allowedRoles={["Supplier"]}>
                <SupplierSettings />
              </ProtectedRoute>
            }
          />

          {/* ====================================
               4. CUSTOMER PORTAL ROUTES (PROTECTED)
               ==================================== */}
          <Route
            path="/customer/dashboard"
            element={
              <ProtectedRoute allowedRoles={["Customer"]}>
                <CustomerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/customer/history"
            element={
              <ProtectedRoute allowedRoles={["Customer"]}>
                <CustomerHistory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/customer/tracking"
            element={
              <ProtectedRoute allowedRoles={["Customer"]}>
                <CustomerTracking />
              </ProtectedRoute>
            }
          />
          <Route
            path="/customer/traceability"
            element={
              <ProtectedRoute allowedRoles={["Customer"]}>
                <CustomerTraceability />
              </ProtectedRoute>
            }
          />
          <Route
            path="/customer/profile"
            element={
              <ProtectedRoute allowedRoles={["Customer"]}>
                <CustomerProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/customer/settings"
            element={
              <ProtectedRoute allowedRoles={["Customer"]}>
                <CustomerSettings />
              </ProtectedRoute>
            }
          />

          {/* Fallback for unmatched routes */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
        <Footer />
        <AiChatbot />
      </div>
    </Router>
  );
}

export default App;
