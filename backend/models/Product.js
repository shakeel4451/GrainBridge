// backend/models/Product.js

const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    sku: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    category: {
      type: String,
      enum: ["Basmati", "Kainat", "Irri-6", "Brown Rice", "Other"],
      default: "Other",
    },
    currentStock: {
      type: Number,
      default: 0,
      min: 0,
    },
    pricePerBag: {
      type: Number,
      required: true,
      min: 0,
    },
    description: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", ProductSchema);
