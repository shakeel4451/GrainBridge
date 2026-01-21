// backend/controllers/inventoryController.js
const Inventory = require("../models/inventoryModel");

// @desc    Get items below threshold (100 bags)
// @route   GET /api/inventory/alerts
// @access  Private/Admin
const getStockAlerts = async (req, res) => {
  try {
    const threshold = 100;

    // Find items where quantity is less than the threshold
    const lowStockItems = await Inventory.find({
      quantity: { $lt: threshold },
    }).select("name quantity category");

    res.json({
      count: lowStockItems.length,
      alerts: lowStockItems,
      timestamp: new Date(),
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch stock alerts" });
  }
};

module.exports = { getStockAlerts };
