const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { 
        type: String, 
        required: true 
    },
    sku: { 
        type: String, 
        required: true, 
        unique: true 
    },
    category: { 
        type: String, 
        required: true,
        enum: ["Basmati", "Healthy", "Economy", "Sella", "Kainat"] // Added allowed categories
    },
    currentStock: { 
        type: Number, 
        required: true, 
        default: 0 
    },
    pricePerBag: { 
        type: Number, 
        required: true 
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);