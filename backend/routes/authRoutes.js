// backend/routes/authRoutes.js

const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  updateUserProfile,
  getUsers,
} = require("../controllers/authController");

// Import the protect middleware to ensure only logged-in users can access certain routes
const { protect } = require("../middleware/authMiddleware");

// --- Public Routes ---
router.post("/register", registerUser);
router.post("/login", loginUser);

// --- Private Routes (Require Token) ---
// Route for a user to update their own profile (Customer/Supplier/Admin)
router.put("/profile", protect, updateUserProfile);

// Route for Admin to fetch all users (used for Supplier/Customer management)
router.get("/users", protect, getUsers);

module.exports = router;
