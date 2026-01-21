import Order from "../models/orderModel.js";

// @desc    Get Market Insights based on real sales
// @route   GET /api/analytics/market-insights
// @access  Private/Admin
export const getMarketInsights = async (req, res) => {
  try {
    const now = new Date();
    const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    // 1. Calculate Current Month Sales Volume
    const currentSales = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: currentMonthStart },
          status: { $ne: "Cancelled" },
        },
      },
      { $group: { _id: null, totalVolume: { $sum: "$totalAmount" } } },
    ]);

    // 2. Calculate Last Month Sales Volume
    const lastMonthSales = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: lastMonthStart, $lt: currentMonthStart },
          status: { $ne: "Cancelled" },
        },
      },
      { $group: { _id: null, totalVolume: { $sum: "$totalAmount" } } },
    ]);

    const currentVol = currentSales[0]?.totalVolume || 0;
    const prevVol = lastMonthSales[0]?.totalVolume || 0;

    // 3. Calculate Growth Percentage
    let growth = 0;
    if (prevVol > 0) {
      growth = ((currentVol - prevVol) / prevVol) * 100;
    }

    // 4. Generate Strategic Recommendation
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
