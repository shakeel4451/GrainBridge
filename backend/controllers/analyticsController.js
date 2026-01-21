const Order = require("../models/orderModel");
const Inventory = require("../models/inventoryModel");

/**
 * @desc    Get Market Insights (Growth & Recommendations)
 * @route   GET /api/analytics/market-insights
 */
const getMarketInsights = async (req, res) => {
  try {
    const now = new Date();
    const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    // Filter to exclude any variation of "Cancelled"
    const exclusionFilter = {
      $nin: ["Cancelled", "cancelled", "Canceled", "canceled"],
    };

    // 1. Calculate Current Month Sales Volume
    const currentSales = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: currentMonthStart },
          status: exclusionFilter,
        },
      },
      { $group: { _id: null, totalVolume: { $sum: "$totalAmount" } } },
    ]);

    // 2. Calculate Last Month Sales Volume
    const lastMonthSales = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: lastMonthStart, $lt: currentMonthStart },
          status: exclusionFilter,
        },
      },
      { $group: { _id: null, totalVolume: { $sum: "$totalAmount" } } },
    ]);

    const currentVol = currentSales[0]?.totalVolume || 0;
    const prevVol = lastMonthSales[0]?.totalVolume || 0;

    // 3. Calculate Growth Percentage
    // Formula: $Growth = \frac{Current - Previous}{Previous} \times 100$
    let growth = 0;
    if (prevVol > 0) {
      growth = ((currentVol - prevVol) / prevVol) * 100;
    }

    let recommendation = "Maintain current stock levels.";
    if (growth > 5) {
      recommendation =
        "Demand is rising. Secure additional supply contracts for Basmati varieties.";
    } else if (growth < -5) {
      recommendation =
        "Demand is cooling. Consider promotional discounts for bulk buyers.";
    }

    res.json({
      forecast: `Market demand has ${
        growth >= 0 ? "INCREASED" : "DECREASED"
      } by ${Math.abs(growth).toFixed(1)}%`,
      recommendation,
      growth: growth.toFixed(1),
    });
  } catch (error) {
    res.status(500).json({ message: "Analytics calculation failed" });
  }
};

/**
 * @desc    Get Top Stats (Total Sales, Active Orders, etc.)
 * @route   GET /api/analytics/metrics
 */
const getDashboardMetrics = async (req, res) => {
  try {
    // 1. Total Sales: Including all variations of successful/delivered statuses
    const salesData = await Order.aggregate([
      {
        $match: {
          status: {
            $in: ["Success", "success", "Delivered", "delivered", "Shipped"],
          },
        },
      },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);

    // 2. Active Orders: Including your "Pending" status and "Processing"
    const activeOrdersCount = await Order.countDocuments({
      status: { $in: ["Pending", "pending", "Processing", "processing"] },
    });

    // 3. Total Inventory: Sum of all bags across all varieties
    const inventoryData = await Inventory.aggregate([
      { $group: { _id: null, totalBags: { $sum: "$quantity" } } },
    ]);

    // 4. Inventory Distribution (For your Bar Chart)
    // Fetches the name and quantity of every item in your collection
    const distribution = await Inventory.find({}).select("name quantity -_id");

    res.json({
      totalSales: salesData.length > 0 ? salesData[0].total : 0,
      activeOrders: activeOrdersCount || 0,
      totalInventory: inventoryData.length > 0 ? inventoryData[0].totalBags : 0,
      millingEfficiency: 98.5,
      inventoryDistribution: distribution.length > 0 ? distribution : [],
    });
  } catch (error) {
    console.error("DASHBOARD METRICS ERROR:", error.message);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = { getMarketInsights, getDashboardMetrics };
