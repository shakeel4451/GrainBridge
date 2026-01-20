import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Products.css";
import { FaShoppingCart, FaFilter } from "react-icons/fa";

// Import Images
import prodBasmati from "../assets/basmati.png";
import prodJasmine from "../assets/jasmine.png";
import prodBrown from "../assets/brown.png";
import prodSella from "../assets/sella.png";
import prodTotah from "../assets/totah.png";
import prodSuperKernel from "../assets/kernal.png";
import prodIrri6 from "../assets/irri-6.png";
import prodKainat from "../assets/kainat.png";

const Products = () => {
  // 1. States
  const [dbProducts, setDbProducts] = useState([]); // Real data from MongoDB
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [quantities, setQuantities] = useState({}); // Track quantity for each item

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  // 2. Fetch Live Inventory from Backend
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

  // 3. Helper to match DB products with your local Images
  const getImage = (category) => {
    if (category === "Basmati") return prodBasmati;
    if (category === "Healthy") return prodBrown;
    if (category === "Economy") return prodIrri6;
    return prodKainat; // Default
  };

  // 4. Filter Logic
  const filteredProducts =
    filter === "All"
      ? dbProducts
      : dbProducts.filter((p) => p.category === filter);

  // 5. Handle Quantity Change
  const handleQtyChange = (id, val) => {
    setQuantities({ ...quantities, [id]: val });
  };

  // 6. Place Order Logic
  const handleOrder = async (product) => {
    const qty = parseInt(quantities[product._id] || 1);

    if (qty > product.currentStock) {
      alert(`Only ${product.currentStock} bags available!`);
      return;
    }

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
        shippingAddress:
          userInfo.address || "Please provide address in profile",
      };

      await axios.post("http://localhost:5000/api/orders", orderData, config);
      alert(`Order placed for ${qty} bag(s) of ${product.name}!`);
      window.location.reload(); // Refresh to update stock count
    } catch (err) {
      alert("Order failed. Please try again.");
    }
  };

  return (
    <div className="products-page">
      <div className="products-header">
        <h1>Our Product Range</h1>
        <p>Choose from Pakistan's finest selection of rice</p>
      </div>

      <div className="products-container">
        {/* Filter Sidebar */}
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
              {cat === "All" ? "All Products" : cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="product-list">
          {loading ? (
            <p>Loading Premium Grains...</p>
          ) : (
            filteredProducts.map((product) => (
              <div key={product._id} className="shop-card">
                <img src={getImage(product.category)} alt={product.name} />
                <div className="shop-card-body">
                  <span className="category-badge">{product.category}</span>
                  <h3>{product.name}</h3>
                  <p className="stock-info">
                    Available: {product.currentStock} Bags
                  </p>
                  <div className="qty-input-group">
                    <label>Qty:</label>
                    <input
                      type="number"
                      min="1"
                      defaultValue="1"
                      onChange={(e) =>
                        handleQtyChange(product._id, e.target.value)
                      }
                    />
                  </div>
                  <div className="shop-footer">
                    <span className="shop-price">
                      Rs. {product.pricePerBag}/bag
                    </span>
                    <button
                      className="add-btn"
                      onClick={() => handleOrder(product)}
                      disabled={product.currentStock <= 0}
                    >
                      <FaShoppingCart />{" "}
                      {product.currentStock > 0 ? "Order" : "Sold Out"}
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
