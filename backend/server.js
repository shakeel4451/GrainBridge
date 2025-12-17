// backend/server.js (FINAL VERSION)

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// --- 1. Import all Routes ---
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes"); // NEW
const orderRoutes = require("./routes/orderRoutes"); // NEW

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(express.json());
app.use(cors());

// Database Connection
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected successfully!"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Basic Route Test
app.get("/", (req, res) => {
  res.send("Rice ERP Backend is running!");
});

// --- 2. Use Routes ---
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes); // NEW
app.use("/api/orders", orderRoutes); // NEW

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
