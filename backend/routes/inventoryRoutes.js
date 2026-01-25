const express = require("express");
const router = express.Router();

const {
  getInventory,
  createInventoryItem,
  getStockAlerts,
  restockItem,
} = require("../controllers/inventoryController");

const { protect, restrictTo } = require("../middleware/authMiddleware");

// --- 1. MAIN INVENTORY ROUTES ---
router
  .route("/")
  .get(getInventory) // ✅ REMOVED 'protect'. Now Public Page can see products.
  .post(protect, restrictTo(["Admin"]), createInventoryItem);

// --- 2. ADMIN SPECIFIC ROUTES ---
router.get("/alerts", protect, restrictTo(["Admin"]), getStockAlerts);
router.put("/:id/restock", protect, restrictTo(["Admin"]), restockItem);

module.exports = router;
