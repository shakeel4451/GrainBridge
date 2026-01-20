// backend/routes/orderRoutes.js
const express = require("express");
const router = express.Router();
const {
  getOrders,
  createOrder,
  updateOrderStatus,
} = require("../controllers/orderController");
const { protect, restrictTo } = require("../middleware/authMiddleware");

// 1. General Order Routes
router
  .route("/")
  .get(protect, getOrders) // Admin gets all, Customer/Supplier get their own (logic is inside controller)
  .post(protect, restrictTo(["Customer"]), createOrder); // Only Customers can place orders

// 2. Admin Specific Route (Status Updates)
router
  .route("/:id/status")
  .put(protect, restrictTo(["Admin"]), updateOrderStatus);

module.exports = router;
