const Order = require("../models/orderModel");
const Inventory = require("../models/inventoryModel");

// @desc    Get orders (Admin sees all, Customer sees theirs)
// @route   GET /api/orders
// @access  Private
const getOrders = async (req, res) => {
  try {
    let query = {};
    // If not Admin, only show their own orders
    if (req.user.role !== "Admin") {
      query = { customer: req.user._id };
    }

    const orders = await Order.find(query)
      .populate("customer", "name email") // Show customer details
      .populate("items.product", "name category") // Show product details
      .sort("-createdAt");

    res.status(200).json(orders);
  } catch (error) {
    console.error("Fetch Error:", error);
    res.status(500).json({ message: "Server error fetching orders" });
  }
};

// @desc    Create a new order & update inventory
// @route   POST /api/orders
// @access  Private/Customer
const createOrder = async (req, res) => {
  const { items, totalAmount, shippingAddress } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ message: "No items in order" });
  }

  try {
    // 1. Check stock availability FIRST
    for (const item of items) {
      const product = await Inventory.findById(item.product);

      if (!product) {
        return res
          .status(404)
          .json({ message: `Product not found ID: ${item.product}` });
      }

      if (product.quantity < item.quantity) {
        return res.status(400).json({
          message: `Insufficient stock for ${product.name}. Available: ${product.quantity}`,
        });
      }
    }

    // 2. Create the order
    const order = await Order.create({
      customer: req.user._id,
      items,
      totalAmount,
      shippingAddress,
      status: "Pending",
    });

    // 3. Deduct stock from Inventory
    for (const item of items) {
      await Inventory.findByIdAndUpdate(item.product, {
        $inc: { quantity: -item.quantity },
      });
    }

    res.status(201).json(order);
  } catch (error) {
    console.error("Order Creation Error:", error);
    res.status(400).json({ message: "Invalid order data or server error" });
  }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
const updateOrderStatus = async (req, res) => {
  const { status } = req.body;
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true },
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ message: "Invalid status update data" });
  }
};

module.exports = {
  getOrders,
  createOrder,
  updateOrderStatus,
};
