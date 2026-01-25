const mongoose = require("mongoose");

const inventorySchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    quantity: { type: Number, required: true, min: 0 }, // Ensure stock doesn't go negative

    // --- ADDED THESE TWO FIELDS ---
    pricePerBag: { type: Number, required: true, default: 0 },
    supplier: { type: String, required: false },
  },
  { timestamps: true },
);

module.exports =
  mongoose.models.Inventory || mongoose.model("Inventory", inventorySchema);
