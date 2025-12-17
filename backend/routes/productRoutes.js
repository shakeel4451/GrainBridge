// backend/routes/productRoutes.js

const express = require("express");
const {
  getProducts,
  createProduct,
  updateProduct,
} = require("../controllers/productController");
const { protect, restrictTo } = require("../middleware/authMiddleware");

const router = express.Router();

// Protected routes using middleware
router
  .route("/")
  .get(protect, restrictTo(["Admin", "Supplier", "Customer"]), getProducts) // Customer/Supplier can view products
  .post(protect, restrictTo(["Admin"]), createProduct); // Only Admin can create products

router.route("/:id").put(protect, restrictTo(["Admin"]), updateProduct); // Only Admin can update products

module.exports = router;
