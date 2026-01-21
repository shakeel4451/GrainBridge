import express from "express";
const router = express.Router();
import { getMarketInsights } from "../controllers/analyticsController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/market-insights").get(protect, admin, getMarketInsights);

export default router;
