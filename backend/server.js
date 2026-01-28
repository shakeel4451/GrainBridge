// backend/server.js (UPDATED WITH INVENTORY)

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// --- 1. Import all Routes ---
const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const shipmentRoutes = require("./routes/shipmentRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

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
app.use("/api/orders", orderRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/shipments", shipmentRoutes);
app.use("/api/payment", paymentRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
});

// Start the server

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
