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
  FaTimes,
} from "react-icons/fa";

const AdminInventory = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // States for Add & Edit
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    category: "Basmati",
    currentStock: "",
    pricePerBag: "",
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const API_URL = "http://localhost:5000/api/products";
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const config = { headers: { Authorization: `Bearer ${userInfo?.token}` } };

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(API_URL, config);
      setProducts(data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch inventory.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ADD PRODUCT
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, formData, config);
      setFormData({
        name: "",
        sku: "",
        category: "Basmati",
        currentStock: "",
        pricePerBag: "",
      });
      fetchProducts();
    } catch (err) {
      alert("Error adding product.");
    }
  };

  // OPEN EDIT MODAL
  const openEditModal = (product) => {
    setEditingProduct(product);
    setIsEditModalOpen(true);
  };

  // UPDATE PRODUCT
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${API_URL}/${editingProduct._id}`,
        editingProduct,
        config
      );
      setIsEditModalOpen(false);
      fetchProducts();
    } catch (err) {
      alert("Update failed.");
    }
  };

  // DELETE PRODUCT
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      await axios.delete(`${API_URL}/${id}`, config);
      fetchProducts();
    }
  };

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

        {/* ADD FORM */}
        <div className="card inventory-form-card">
          <h3>
            <FaPlus /> Add New Variety
          </h3>
          <form className="inventory-form" onSubmit={handleSubmit}>
            <input
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
            <input
              name="sku"
              placeholder="SKU"
              value={formData.sku}
              onChange={(e) =>
                setFormData({ ...formData, sku: e.target.value })
              }
              required
            />
            <select
              name="category"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            >
              <option value="Basmati">Basmati</option>
              <option value="Kainat">Kainat</option>
              <option value="Irri-6">Irri-6</option>
            </select>
            <input
              name="currentStock"
              type="number"
              placeholder="Stock"
              value={formData.currentStock}
              onChange={(e) =>
                setFormData({ ...formData, currentStock: e.target.value })
              }
              required
            />
            <input
              name="pricePerBag"
              type="number"
              placeholder="Price"
              value={formData.pricePerBag}
              onChange={(e) =>
                setFormData({ ...formData, pricePerBag: e.target.value })
              }
              required
            />
            <button type="submit" className="add-btn">
              Add Product
            </button>
          </form>
        </div>

        {/* TABLE */}
        <div className="card">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>SKU</th>
                <th>Stock</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id}>
                  <td>{p.name}</td>
                  <td>{p.sku}</td>
                  <td>{p.currentStock}</td>
                  <td>Rs. {p.pricePerBag}</td>
                  <td>
                    <span className={getStockStatus(p.currentStock).class}>
                      {getStockStatus(p.currentStock).label}
                    </span>
                  </td>
                  <td>
                    <button
                      className="action-btn edit"
                      onClick={() => openEditModal(p)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="action-btn delete"
                      onClick={() => handleDelete(p._id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* EDIT MODAL */}
        {isEditModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h3>Edit Product</h3>
                <button
                  className="close-modal"
                  onClick={() => setIsEditModalOpen(false)}
                >
                  <FaTimes />
                </button>
              </div>
              <form onSubmit={handleUpdate} className="modal-form">
                <label>Product Name</label>
                <input
                  type="text"
                  value={editingProduct.name}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      name: e.target.value,
                    })
                  }
                />
                <label>Stock (Bags)</label>
                <input
                  type="number"
                  value={editingProduct.currentStock}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      currentStock: e.target.value,
                    })
                  }
                />
                <label>Price (PKR)</label>
                <input
                  type="number"
                  value={editingProduct.pricePerBag}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      pricePerBag: e.target.value,
                    })
                  }
                />
                <button type="submit" className="update-btn">
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminInventory;
