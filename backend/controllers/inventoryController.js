const Inventory = require("../models/inventoryModel");

// @desc    Get all inventory items
// @route   GET /api/inventory
// @access  Private (Everyone)
const getInventory = async (req, res) => {
  try {
    const items = await Inventory.find({});
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Server Error fetching inventory" });
  }
};

// @desc    Create a new inventory item
// @route   POST /api/inventory
// @access  Private (Admin Only)
const createInventoryItem = async (req, res) => {
  const { name, category, quantity, pricePerBag, supplier } = req.body;

  try {
    const item = new Inventory({
      name,
      category,
      quantity,
      pricePerBag,
      supplier,
    });

    const createdItem = await item.save();
    res.status(201).json(createdItem);
  } catch (error) {
    res.status(400).json({ message: "Invalid inventory data" });
  }
};

// @desc    Get all items below threshold
// @route   GET /api/inventory/alerts
// @access  Private (Admin Only)
const getStockAlerts = async (req, res) => {
  try {
    // Alert if stock is below 100 bags
    const alerts = await Inventory.find({ quantity: { $lt: 100 } });
    res.json({ alerts });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Restock an item
// @route   PUT /api/inventory/:id/restock
// @access  Private (Admin Only)
const restockItem = async (req, res) => {
  try {
    const item = await Inventory.findById(req.params.id);

    if (item) {
      item.quantity += Number(req.body.amount);
      const updatedItem = await item.save();
      res.json(updatedItem);
    } else {
      res.status(404).json({ message: "Item not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// IMPORTANT: Make sure all 4 functions are in this object
module.exports = {
  getInventory,
  createInventoryItem,
  getStockAlerts,
  restockItem,
};
