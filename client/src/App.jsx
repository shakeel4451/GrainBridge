import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import AiChatbot from "./components/AiChatbot";

// Public Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import OurProcess from "./pages/OurProcess";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Admin Pages
import AdminDashboard from "./pages/AdminDashboard";
import AdminOrders from "./pages/AdminOrders";
import AdminSales from "./pages/AdminSales";
import AdminInventory from "./pages/AdminInventory";
import AdminMilling from "./pages/AdminMilling";
import AdminCustomers from "./pages/AdminCustomers";
import AdminSuppliers from "./pages/AdminSuppliers";
import AdminReports from "./pages/AdminReports";
import AdminShipments from "./pages/AdminShipments"; // ✅ Verified Import
import { AdminSettings } from "./pages/PortalSettings";

// Supplier Pages
import SupplierDashboard from "./pages/SupplierDashboard";
import SupplierDemand from "./pages/SupplierDemand";
import SupplierPayments from "./pages/SupplierPayments";
import SupplierMarketRates from "./pages/SupplierMarketRates";
import SupplierAIQuality from "./pages/SupplierAIQuality";
import SupplierProfile from "./pages/SupplierProfile";
import { SupplierSettings } from "./pages/PortalSettings";

// Customer Pages
import CustomerOrder from "./pages/CustomerOrder";
import CustomerDashboard from "./pages/CustomerDashboard";
import CustomerHistory from "./pages/CustomerHistory";
import CustomerTracking from "./pages/CustomerTracking";
import CustomerProfile from "./pages/CustomerProfile";
import Traceability from "./pages/Traceability";
import { CustomerSettings } from "./pages/PortalSettings";

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
          <Route path="/process" element={<OurProcess />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

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
            path="/admin/shipments"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <AdminShipments />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/orders"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <AdminOrders />
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
            path="/admin/inventory"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <AdminInventory />
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
            path="/supplier/payments"
            element={
              <ProtectedRoute allowedRoles={["Supplier"]}>
                <SupplierPayments />
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
            path="/supplier/market-rates"
            element={
              <ProtectedRoute allowedRoles={["Supplier"]}>
                <SupplierMarketRates />
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
            path="/customer/order"
            element={
              <ProtectedRoute allowedRoles={["Customer"]}>
                <CustomerOrder />
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
                <Traceability />
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

          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
        <Footer />
        <AiChatbot />
      </div>
    </Router>
  );
}

export default App;
