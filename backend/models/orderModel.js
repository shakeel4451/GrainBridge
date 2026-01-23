const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Ensures this links to your User collection
      required: true,
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Inventory", // Links to your Inventory
          required: true,
        },
        quantity: { type: Number, required: true },
        priceAtOrder: { type: Number, required: true },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
      default: 0.0,
    },
    status: {
      type: String,
      required: true,
      default: "Pending", // Default status
    },
    shippingAddress: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  },
);

// CRITICAL FIX: Direct export for CommonJS
module.exports = mongoose.models.Order || mongoose.model("Order", orderSchema);
