// backend/routes/productRoutes.js

const express = require("express");
const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct, // 1. Added the delete controller import
} = require("../controllers/productController");
const { protect, restrictTo } = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * @route   /api/products
 * @desc    Get all products or create a new one
 * @access  Private
 */
router
  .route("/")
  .get(protect, restrictTo(["Admin", "Supplier", "Customer"]), getProducts)
  .post(protect, restrictTo(["Admin"]), createProduct);

/**
 * @route   /api/products/:id
 * @desc    Update or Delete a specific product
 * @access  Private (Admin Only)
 */
router
  .route("/:id")
  .put(protect, restrictTo(["Admin"]), updateProduct)
  .delete(protect, restrictTo(["Admin"]), deleteProduct); // 2. Added the DELETE route

module.exports = router;
