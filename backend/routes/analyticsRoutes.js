// backend/routes/analyticsRoutes.js
const express = require("express");
const router = express.Router();
const {
  getMarketInsights,
  getDashboardMetrics,
} = require("../controllers/analyticsController");
const { protect, restrictTo } = require("../middleware/authMiddleware");

// Route for Growth Trends (The code you provided)
router.get(
  "/market-insights",
  protect,
  restrictTo(["Admin"]),
  getMarketInsights
);

// Route for Top Dashboard Cards
router.get("/metrics", protect, restrictTo(["Admin"]), getDashboardMetrics);

module.exports = router;
