// backend/routes/orderRoutes.js

const express = require("express");
const {
  getOrders,
  createOrder,
  updateOrderStatus,
} = require("../controllers/orderController");
const { protect, restrictTo } = require("../middleware/authMiddleware");

const router = express.Router();

router
  .route("/")
  .get(protect, getOrders) // Access for Admin, Customer, Supplier (filtered by controller)
  .post(protect, restrictTo(["Customer"]), createOrder); // Only Customers can place orders

router
  .route("/:id/status")
  .put(protect, restrictTo(["Admin"]), updateOrderStatus); // Only Admin can update status

module.exports = router;
