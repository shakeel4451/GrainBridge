const Inventory = require("../models/inventoryModel");

/**
 * @desc    Get items below threshold (100 bags)
 * @route   GET /api/inventory/alerts
 * @access  Private/Admin
 */
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

/**
 * @desc    Update stock quantity (Restock)
 * @route   PUT /api/inventory/:id/restock
 * @access  Private/Admin
 */
const restockItem = async (req, res) => {
  try {
    const { amount } = req.body; // The number of bags to add

    if (!amount || amount <= 0) {
      return res
        .status(400)
        .json({ message: "Please provide a valid amount to restock." });
    }

    // Find the item by ID from the URL parameter
    const item = await Inventory.findById(req.params.id);

    if (item) {
      // Use Number() to ensure mathematical addition, not string concatenation
      item.quantity += Number(amount);

      const updatedItem = await item.save();
      res.json({
        message: "Stock updated successfully",
        updatedItem,
      });
    } else {
      res.status(404).json({ message: "Inventory item not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Restock operation failed" });
  }
};

module.exports = { getStockAlerts, restockItem };
