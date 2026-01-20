// backend/seedProducts.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");

dotenv.config();

const products = [
  {
    name: "Premium Basmati Rice",
    sku: "BSM-EXP-01",
    category: "Basmati",
    pricePerBag: 4500,
    currentStock: 500,
  },
  {
    name: "Super Kernel Basmati",
    sku: "SKB-002",
    category: "Basmati",
    pricePerBag: 3800,
    currentStock: 1200,
  },
  {
    name: "Organic Brown Rice",
    sku: "BRN-003",
    category: "Healthy",
    pricePerBag: 5200,
    currentStock: 250,
  },
  {
    name: "Premium Sella Rice",
    sku: "SEL-004",
    category: "Basmati",
    pricePerBag: 4200,
    currentStock: 800,
  },
  {
    name: "Broken Rice (Totah)",
    sku: "TOT-005",
    category: "Economy",
    pricePerBag: 2000,
    currentStock: 1500,
  },
  {
    name: "Irri-6 Economy Rice",
    sku: "IR6-006",
    category: "Economy",
    pricePerBag: 1800,
    currentStock: 5000,
  },
  {
    name: "Kainat 1121",
    sku: "KNT-007",
    category: "Basmati",
    pricePerBag: 4000,
    currentStock: 600,
  },
  {
    name: "Jasmine Rice",
    sku: "JAS-008",
    category: "Basmati",
    pricePerBag: 4800,
    currentStock: 300,
  }
];

const seedDatabase = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    
    // Clear existing products
    await Product.deleteMany();
    console.log("Existing products cleared...");

    // Insert new products
    await Product.insertMany(products);
    console.log("Database Seeded Successfully! 🌱");
    
    process.exit();
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();