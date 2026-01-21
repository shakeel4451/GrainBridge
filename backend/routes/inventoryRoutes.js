const express = require("express");
const router = express.Router();

// 1. Import the controller functions
// Ensure the filename matches exactly: controllers/inventoryController.js
const { getStockAlerts } = require("../controllers/inventoryController");

// 2. Import your specific middleware functions
// Using 'restrictTo' as defined in your authMiddleware.js
const { protect, restrictTo } = require("../middleware/authMiddleware");

/**
 * @desc    Get all items below the critical threshold (100 bags)
 * @route   GET /api/inventory/alerts
 * @access  Private (Admin Only)
 */
router.get("/alerts", protect, restrictTo(["Admin"]), getStockAlerts);

module.exports = router;
