const mongoose = require("mongoose");

const inventorySchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    category: { type: String, required: true },
  },
  { timestamps: true },
);

const Inventory = mongoose.model("Inventory", inventorySchema);
module.exports =
  mongoose.models.Inventory || mongoose.model("Inventory", inventorySchema);
