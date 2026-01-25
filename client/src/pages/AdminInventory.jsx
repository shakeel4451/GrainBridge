import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminSidebar from "../components/AdminSidebar";
import "./AdminInventory.css";
import { API_BASE_URL } from "../config"; // Use the central config
import {
  FaWarehouse,
  FaPlus,
  FaTrash,
  FaEdit,
  FaTimes,
  FaExclamationTriangle,
} from "react-icons/fa";

const AdminInventory = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal & Form State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "Basmati",
    quantity: "",
    pricePerBag: "",
    supplier: "",
  });

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const config = { headers: { Authorization: `Bearer ${userInfo?.token}` } };

  // 1. Fetch Inventory (The REAL Data)
  const fetchInventory = async () => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/api/inventory`, config);
      setItems(data);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch inventory", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  // 2. Add New Item
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/api/inventory`, formData, config);
      alert("Item added successfully!");
      setFormData({
        name: "",
        category: "Basmati",
        quantity: "",
        pricePerBag: "",
        supplier: "",
      });
      fetchInventory(); // Refresh list
    } catch (err) {
      alert("Failed to add item.");
    }
  };

  // 3. Update Item (Restock or Price Change)
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      // We use the "restock" route or build a general update route.
      // For simplicity, let's assume we are updating stock/price.
      // Note: You might need to add a general PUT route in backend if you want to rename items.
      // For now, we will use the restock endpoint logic which acts as an update in many ERPs,
      // or we can skip full editing if the backend only supports restocking.

      // Let's assume we just want to update quantity for now via the Restock Endpoint
      // logic we built earlier, OR ideally, we'd add a full PUT /api/inventory/:id route.

      // Since your backend currently only has `restockItem` (PUT /:id/restock),
      // we will use that for adding stock.

      await axios.put(
        `${API_BASE_URL}/api/inventory/${editingItem._id}/restock`,
        { amount: parseInt(editingItem.addAmount) }, // We add a temporary field for input
        config,
      );

      setIsEditModalOpen(false);
      fetchInventory();
      alert("Stock updated!");
    } catch (err) {
      alert("Update failed.");
    }
  };

  const getStockStatus = (qty) => {
    if (qty <= 100) return { label: "Critical", class: "status error" };
    if (qty <= 500) return { label: "Low", class: "status pending" };
    return { label: "Good", class: "status success" };
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <main className="admin-content">
        <h1 className="page-title">
          <FaWarehouse /> Live Inventory
        </h1>

        {/* ADD ITEM FORM */}
        <div className="card inventory-form-card">
          <h3>
            <FaPlus /> Add New Stock
          </h3>
          <form className="inventory-form" onSubmit={handleAdd}>
            <input
              placeholder="Item Name (e.g. Super Basmati)"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            >
              <option value="Basmati">Basmati</option>
              <option value="Non-Basmati">Non-Basmati</option>
              <option value="Organic">Organic</option>
              <option value="Feed">Feed/Broken</option>
            </select>
            <input
              type="number"
              placeholder="Quantity (Bags)"
              value={formData.quantity}
              onChange={(e) =>
                setFormData({ ...formData, quantity: e.target.value })
              }
              required
            />
            <input
              type="number"
              placeholder="Price (Rs/Bag)"
              value={formData.pricePerBag}
              onChange={(e) =>
                setFormData({ ...formData, pricePerBag: e.target.value })
              }
              required
            />
            <button type="submit" className="add-btn">
              Add to Stock
            </button>
          </form>
        </div>

        {/* INVENTORY TABLE */}
        <div className="card">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Stock Level</th>
                  <th>Price / Bag</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item._id}>
                    <td style={{ fontWeight: "bold", color: "#333" }}>
                      {item.name}
                    </td>
                    <td>{item.category}</td>
                    <td>{item.quantity} Bags</td>
                    <td>Rs. {item.pricePerBag}</td>
                    <td>
                      <span className={getStockStatus(item.quantity).class}>
                        {getStockStatus(item.quantity).label}
                      </span>
                    </td>
                    <td>
                      <button
                        className="action-btn edit"
                        onClick={() => {
                          setEditingItem({ ...item, addAmount: 0 });
                          setIsEditModalOpen(true);
                        }}
                      >
                        <FaEdit /> Restock
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* RESTOCK MODAL */}
        {isEditModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h3>Restock: {editingItem.name}</h3>
                <button
                  className="close-modal"
                  onClick={() => setIsEditModalOpen(false)}
                >
                  <FaTimes />
                </button>
              </div>
              <form onSubmit={handleUpdate} className="modal-form">
                <p>
                  Current Stock: <strong>{editingItem.quantity}</strong> bags
                </p>
                <label>Add Bags:</label>
                <input
                  type="number"
                  autoFocus
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      addAmount: e.target.value,
                    })
                  }
                />
                <button type="submit" className="update-btn">
                  Confirm Restock
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
