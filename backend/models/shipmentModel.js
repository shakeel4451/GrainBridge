const mongoose = require("mongoose");

const shipmentSchema = mongoose.Schema(
  {
    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    cropType: {
      type: String,
      required: true,
      enum: ["Basmati", "Kainat", "Irri-6", "Sella", "Brown"], // Matches your Inventory Categories roughly
    },
    quantity: {
      type: Number,
      required: true,
    },
    expectedDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    notes: {
      type: String,
      required: false,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Shipment", shipmentSchema);
