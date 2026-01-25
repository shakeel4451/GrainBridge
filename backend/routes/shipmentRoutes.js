const express = require("express");
const router = express.Router();
const {
  createShipment,
  getShipments,
  updateShipmentStatus,
} = require("../controllers/shipmentController");
const { protect, restrictTo } = require("../middleware/authMiddleware");

router
  .route("/")
  .get(protect, getShipments) // Suppliers see own, Admin sees all
  .post(protect, restrictTo(["Supplier"]), createShipment); // Only Supplier can post

router
  .route("/:id/status")
  .put(protect, restrictTo(["Admin"]), updateShipmentStatus); // Only Admin approves

module.exports = router;
