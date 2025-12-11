import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Login from "./pages/Login"; // <-- Import Login
import AdminDashboard from "./pages/AdminDashboard";
import CustomerDashboard from "./pages/CustomerDashboard";
import SupplierDashboard from "./pages/SupplierDashboard";
import SupplierPayments from "./pages/SupplierPayments";
import SupplierDemand from "./pages/SupplierDemand";
import SupplierQuality from "./pages/SupplierQuality";
import CustomerHistory from "./pages/CustomerHistory";
import CustomerTracking from "./pages/CustomerTracking";
import CustomerTraceability from "./pages/CustomerTraceability";
import AiChatbot from "./components/AiChatbot";
import AdminInventory from "./pages/AdminInventory";
import AdminSales from "./pages/AdminSales";
import AdminMilling from "./pages/AdminMilling"; // New Page
import AdminCustomers from "./pages/AdminCustomers"; // New Page
import AdminSuppliers from "./pages/AdminSuppliers";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          {/* Add these routes for Login */}
          <Route path="/login" element={<Login />} />
          <Route path="/login/customer" element={<Login />} />
          <Route path="/login/supplier" element={<Login />} />
          <Route path="/login/admin" element={<Login />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/customer/dashboard" element={<CustomerDashboard />} />
          <Route path="/supplier/dashboard" element={<SupplierDashboard />} />
          <Route path="/supplier/dashboard" element={<SupplierDashboard />} />
          <Route path="/supplier/payments" element={<SupplierPayments />} />
          <Route path="/supplier/demand" element={<SupplierDemand />} />
          <Route path="/supplier/quality" element={<SupplierQuality />} />
          <Route path="/customer/dashboard" element={<CustomerDashboard />} />
          <Route path="/customer/history" element={<CustomerHistory />} />
          <Route path="/customer/tracking" element={<CustomerTracking />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/inventory" element={<AdminInventory />} />
          <Route path="/admin/sales" element={<AdminSales />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/inventory" element={<AdminInventory />} />
          <Route path="/admin/sales" element={<AdminSales />} />
          <Route path="/admin/orders" element={<AdminSales />} />{" "}
          <Route path="/admin/milling" element={<AdminMilling />} />
          <Route path="/admin/customers" element={<AdminCustomers />} />
          <Route path="/admin/suppliers" element={<AdminSuppliers />} />
          <Route
            path="/customer/traceability"
            element={<CustomerTraceability />}
          />
        </Routes>
        <Footer />
        <AiChatbot />
      </div>
    </Router>
  );
}

export default App;
