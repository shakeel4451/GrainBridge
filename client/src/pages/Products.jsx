import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Products.css";
import { FaShoppingCart, FaFilter, FaExclamationCircle } from "react-icons/fa";

// Import Images
import prodBasmati from "../assets/basmati.png";
import prodBrown from "../assets/brown.png";
import prodIrri6 from "../assets/irri-6.png";
import prodKainat from "../assets/kainat.png";

const Products = () => {
  const [dbProducts, setDbProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [quantities, setQuantities] = useState({});

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${userInfo?.token}` },
        };
        const { data } = await axios.get(
          "http://localhost:5000/api/products",
          config
        );
        setDbProducts(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products", err);
        setLoading(false);
      }
    };
    fetchProducts();
  }, [userInfo?.token]);

  // Helper to match DB products with local assets
  const getImage = (category) => {
    switch (category) {
      case "Basmati":
        return prodBasmati;
      case "Healthy":
        return prodBrown;
      case "Economy":
        return prodIrri6;
      default:
        return prodKainat;
    }
  };

  const filteredProducts =
    filter === "All"
      ? dbProducts
      : dbProducts.filter((p) => p.category === filter);

  const handleOrder = async (product) => {
    const qty = parseInt(quantities[product._id] || 1);
    try {
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      const orderData = {
        items: [
          {
            product: product._id,
            quantity: qty,
            priceAtOrder: product.pricePerBag,
          },
        ],
        totalAmount: product.pricePerBag * qty,
        shippingAddress: userInfo.address || "Check Profile for Address",
      };
      await axios.post("http://localhost:5000/api/orders", orderData, config);
      alert("Order placed successfully!");
      window.location.reload();
    } catch (err) {
      alert(err.response?.data?.message || "Order failed.");
    }
  };

  return (
    <div className="products-page">
      <div className="products-header">
        <h1>Our Product Range</h1>
        <p>Directly from the Rice Mill to your doorstep</p>
      </div>

      <div className="products-container">
        <div className="filter-bar">
          <h3>
            <FaFilter /> Categories
          </h3>
          {["All", "Basmati", "Healthy", "Economy"].map((cat) => (
            <button
              key={cat}
              className={filter === cat ? "active" : ""}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="product-list">
          {loading ? (
            <p>Loading Products...</p>
          ) : filteredProducts.length === 0 ? (
            <div className="empty-state">
              <FaExclamationCircle size={50} color="#ccc" />
              <h3>No products found!</h3>
              <p>
                Please log in as <b>Admin</b> and add products to the Inventory
                to see them here.
              </p>
            </div>
          ) : (
            filteredProducts.map((product) => (
              <div key={product._id} className="shop-card">
                <img src={getImage(product.category)} alt={product.name} />
                <div className="shop-card-body">
                  <span className="category-badge">{product.category}</span>
                  <h3>{product.name}</h3>
                  <p className="stock-info">
                    Stock: {product.currentStock} Bags
                  </p>
                  <div className="qty-input-group">
                    <label>Qty:</label>
                    <input
                      type="number"
                      min="1"
                      defaultValue="1"
                      onChange={(e) =>
                        setQuantities({
                          ...quantities,
                          [product._id]: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="shop-footer">
                    <span className="shop-price">
                      Rs. {product.pricePerBag}
                    </span>
                    <button
                      className="add-btn"
                      onClick={() => handleOrder(product)}
                      disabled={product.currentStock <= 0}
                    >
                      <FaShoppingCart />{" "}
                      {product.currentStock > 0 ? "Order" : "Out of Stock"}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
