const Shipment = require("../models/shipmentModel");
const Inventory = require("../models/inventoryModel");

// @desc    Create new shipment (Supplier)
// @route   POST /api/shipments
const createShipment = async (req, res) => {
  try {
    const { cropType, quantity, expectedDate, notes } = req.body;

    const shipment = await Shipment.create({
      supplier: req.user._id,
      cropType,
      quantity,
      expectedDate,
      notes,
      status: "Pending",
    });

    res.status(201).json(shipment);
  } catch (error) {
    res.status(400).json({ message: "Invalid shipment data" });
  }
};

// @desc    Get shipments (Supplier sees theirs, Admin sees all)
// @route   GET /api/shipments
const getShipments = async (req, res) => {
  try {
    let query = {};
    if (req.user.role !== "Admin") {
      query = { supplier: req.user._id };
    }

    const shipments = await Shipment.find(query)
      .populate("supplier", "name companyName")
      .sort("-createdAt");

    res.json(shipments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching shipments" });
  }
};

// @desc    Update Status & Add to Inventory (Admin)
// @route   PUT /api/shipments/:id/status
const updateShipmentStatus = async (req, res) => {
  const { status } = req.body;

  try {
    const shipment = await Shipment.findById(req.params.id);

    if (!shipment) {
      return res.status(404).json({ message: "Shipment not found" });
    }

    // Prevent double approval
    if (shipment.status === "Approved") {
      return res.status(400).json({ message: "Already approved" });
    }

    shipment.status = status;
    await shipment.save();

    // --- MAGICAL STEP: INCREASE INVENTORY ---
    if (status === "Approved") {
      // Find matching inventory item (e.g., "Super Basmati" for "Basmati" crop)
      // This is a simple fuzzy search logic
      const inventoryItem = await Inventory.findOne({
        category: { $regex: shipment.cropType, $options: "i" },
      });

      if (inventoryItem) {
        inventoryItem.quantity += shipment.quantity;
        await inventoryItem.save();
      } else {
        // Optional: Create new if doesn't exist (Skipped for safety)
        console.log("No matching inventory category found, stock not added.");
      }
    }

    res.json(shipment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Update failed" });
  }
};

module.exports = { createShipment, getShipments, updateShipmentStatus };
