import React, { useState } from "react";
import "./Products.css";
import { FaShoppingCart, FaFilter } from "react-icons/fa";

// Import Images
// Make sure your file names in 'src/assets' match these exactly!
import prodBasmati from "../assets/basmati.png";
import prodJasmine from "../assets/jasmine.png";
import prodBrown from "../assets/brown.png";
import prodSella from "../assets/sella.png";
import prodTotah from "../assets/totah.png";
// NEW IMAGES
import prodSuperKernel from "../assets/kernal.png";
import prodIrri6 from "../assets/irri-6.png";
import prodKainat from "../assets/kainat.png";

const Products = () => {
  // 1. Product Data Array
  const allProducts = [
    {
      id: 1,
      name: "Premium Basmati Rice (Export Quality)",
      category: "Basmati",
      price: 450,
      image: prodBasmati,
      desc: "Extra long grain, aged for 2 years. The finest choice.",
    },
    {
      id: 2,
      name: "Super Kernel Basmati",
      category: "Basmati",
      price: 380,
      image: prodSuperKernel, // Updated Image
      desc: "Aromatic everyday rice, known for its fragrance.",
    },
    {
      id: 3,
      name: "Organic Brown Rice",
      category: "Healthy",
      price: 520,
      image: prodBrown,
      desc: "Rich in fiber and nutrients. Best for diet conscious.",
    },
    {
      id: 4,
      name: "Premium Sella Rice (Parboiled)",
      category: "Basmati",
      price: 420,
      image: prodSella,
      desc: "Golden grains, non-sticky, ideal for Biryani and Pulao.",
    },
    {
      id: 5,
      name: "Broken Rice (Totah)",
      category: "Economy",
      price: 200,
      image: prodTotah,
      desc: "Best for Kheer, desserts, and poultry feed. Budget-friendly.",
    },
    {
      id: 6,
      name: "Irri-6 Economy Rice",
      category: "Economy",
      price: 180,
      image: prodIrri6, // Updated Image
      desc: "High volume, low cost standard rice. Good for daily use.",
    },
    {
      id: 7,
      name: "Kainat 1121",
      category: "Basmati",
      price: 400,
      image: prodKainat, // Updated Image
      desc: "Extra fine grain, very popular for export quality dishes.",
    },
    // RESTORED JASMINE RICE
    {
      id: 8,
      name: "Jasmine Rice",
      category: "Basmati", // Or create a new category 'Aromatic'
      price: 480,
      image: prodJasmine,
      desc: "Sticky and fragrant, perfect for Asian cuisine.",
    },
  ];

  // 2. State for Filter
  const [filter, setFilter] = useState("All");

  // 3. Filter Logic
  const filteredProducts =
    filter === "All"
      ? allProducts
      : allProducts.filter((product) => product.category === filter);

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
          <button
            className={filter === "All" ? "active" : ""}
            onClick={() => setFilter("All")}
          >
            All Products
          </button>
          <button
            className={filter === "Basmati" ? "active" : ""}
            onClick={() => setFilter("Basmati")}
          >
            Basmati Rice
          </button>
          <button
            className={filter === "Healthy" ? "active" : ""}
            onClick={() => setFilter("Healthy")}
          >
            Healthy / Brown
          </button>
          <button
            className={filter === "Economy" ? "active" : ""}
            onClick={() => setFilter("Economy")}
          >
            Economy
          </button>
        </div>

        {/* Product Grid */}
        <div className="product-list">
          {filteredProducts.map((product) => (
            <div key={product.id} className="shop-card">
              <img src={product.image} alt={product.name} />
              <div className="shop-card-body">
                <span className="category-badge">{product.category}</span>
                <h3>{product.name}</h3>
                <p className="description">{product.desc}</p>
                <div className="shop-footer">
                  <span className="shop-price">Rs. {product.price}/kg</span>
                  <button className="add-btn">
                    <FaShoppingCart /> Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
