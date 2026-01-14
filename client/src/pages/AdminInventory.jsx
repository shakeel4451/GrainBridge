import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminSidebar from "../components/AdminSidebar";
import "./AdminInventory.css";
import {
  FaWarehouse,
  FaPlus,
  FaTrash,
  FaEdit,
  FaBox,
  FaExclamationTriangle,
  FaCheckCircle,
} from "react-icons/fa";

const AdminInventory = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    category: "Basmati",
    currentStock: "",
    pricePerBag: "",
  });

  const API_URL = "http://localhost:5000/api/products";

  // 1. Fetch Products from Database
  const fetchProducts = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const config = {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      };
      const { data } = await axios.get(API_URL, config);
      setProducts(data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch inventory. Please check your connection.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 2. Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. Add New Product
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const config = {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      };
      await axios.post(API_URL, formData, config);

      // Reset form and refresh list
      setFormData({
        name: "",
        sku: "",
        category: "Basmati",
        currentStock: "",
        pricePerBag: "",
      });
      fetchProducts();
    } catch (err) {
      alert(err.response?.data?.message || "Error adding product.");
    }
  };

  // 4. Delete Product
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const config = {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        };
        await axios.delete(`${API_URL}/${id}`, config);
        fetchProducts();
      } catch (err) {
        alert("Deletion failed.");
      }
    }
  };

  // Helper for dynamic status classes
  const getStockStatus = (stock) => {
    if (stock <= 100) return { label: "Critical", class: "status error" };
    if (stock <= 500) return { label: "Low Stock", class: "status pending" };
    return { label: "Optimal", class: "status success" };
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <main className="admin-content">
        <h1 className="page-title">
          <FaWarehouse /> Inventory Management
        </h1>

        {/* STATS OVERVIEW */}
        <div
          className="dashboard-grid inventory-stats"
          style={{ marginBottom: "30px" }}
        >
          <div
            className="card stat-card"
            style={{ borderLeft: "4px solid #3e5235" }}
          >
            <p>Total Varieties</p>
            <h2>{products.length}</h2>
          </div>
          <div
            className="card stat-card"
            style={{ borderLeft: "4px solid #f57c00" }}
          >
            <p>Low Stock Items</p>
            <h2 style={{ color: "#f57c00" }}>
              {products.filter((p) => p.currentStock <= 500).length}
            </h2>
          </div>
        </div>

        {/* ADD PRODUCT FORM */}
        <div className="card inventory-form-card">
          <h3>
            <FaPlus /> Add New Rice Variety
          </h3>
          <form className="inventory-form" onSubmit={handleSubmit}>
            <input
              name="name"
              type="text"
              placeholder="Product Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              name="sku"
              type="text"
              placeholder="SKU (e.g., BSM-01)"
              value={formData.sku}
              onChange={handleChange}
              required
            />
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="Basmati">Basmati</option>
              <option value="Kainat">Kainat</option>
              <option value="Irri-6">Irri-6</option>
              <option value="Brown Rice">Brown Rice</option>
            </select>
            <input
              name="currentStock"
              type="number"
              placeholder="Stock (Bags)"
              value={formData.currentStock}
              onChange={handleChange}
              required
            />
            <input
              name="pricePerBag"
              type="number"
              placeholder="Price / Bag"
              value={formData.pricePerBag}
              onChange={handleChange}
              required
            />
            <button type="submit" className="add-btn">
              Add to Stock
            </button>
          </form>
        </div>

        {/* INVENTORY TABLE */}
        <div className="card">
          <h3>Current Stock Levels</h3>
          {loading ? (
            <p>Loading your inventory...</p>
          ) : error ? (
            <p className="error-text">{error}</p>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>SKU</th>
                  <th>Stock (Bags)</th>
                  <th>Price (PKR)</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => {
                  const status = getStockStatus(product.currentStock);
                  return (
                    <tr key={product._id}>
                      <td style={{ fontWeight: "bold" }}>{product.name}</td>
                      <td>{product.sku}</td>
                      <td>{product.currentStock.toLocaleString()}</td>
                      <td>Rs. {product.pricePerBag}</td>
                      <td>
                        <span className={status.class}>{status.label}</span>
                      </td>
                      <td>
                        <button
                          className="action-btn delete"
                          onClick={() => handleDelete(product._id)}
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminInventory;
