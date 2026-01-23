// backend/models/User.js

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    // Authentication Fields
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },

    // User Type / Role
    role: {
      type: String,
      enum: ["Admin", "Customer", "Supplier"],
      required: true,
    },

    // Company/Personal Details
    name: {
      type: String,
      required: true,
      trim: true,
    },
    companyName: {
      type: String,
      trim: true,
      // Only required for Customer and Supplier roles
      required: function () {
        return this.role === "Customer" || this.role === "Supplier";
      },
    },
    phone: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  },
);

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
