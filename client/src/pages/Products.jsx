import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Products.css";
import { FaShoppingCart, FaFilter, FaExclamationCircle } from "react-icons/fa";
import { API_BASE_URL } from "../config";

import prodBasmati from "../assets/basmati.png";
import prodBrown from "../assets/brown.png";
import prodIrri6 from "../assets/irri-6.png";
import prodKainat from "../assets/kainat.png";

const Products = () => {
  const [dbProducts, setDbProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // NO HEADER/CONFIG needed because we unlocked the backend!
        const { data } = await axios.get(`${API_BASE_URL}/api/inventory`);
        setDbProducts(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products", err);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const getImage = (category) => {
    switch (category) {
      case "Basmati":
        return prodBasmati;
      case "Organic":
        return prodBrown;
      case "Non-Basmati":
        return prodIrri6;
      default:
        return prodKainat;
    }
  };

  const filteredProducts =
    filter === "All"
      ? dbProducts
      : dbProducts.filter((p) => p.category === filter);

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
          {["All", "Basmati", "Non-Basmati", "Organic"].map((cat) => (
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
            </div>
          ) : (
            filteredProducts.map((product) => (
              <div key={product._id} className="shop-card">
                <img src={getImage(product.category)} alt={product.name} />
                <div className="shop-card-body">
                  <span className="category-badge">{product.category}</span>
                  <h3>{product.name}</h3>
                  <p className="stock-info">Stock: {product.quantity} Bags</p>

                  <div className="shop-footer">
                    <span className="shop-price">
                      Rs. {product.pricePerBag}
                    </span>
                    <button
                      className="add-btn"
                      onClick={() => (window.location.href = "/login")}
                    >
                      <FaShoppingCart /> Login to Buy
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
