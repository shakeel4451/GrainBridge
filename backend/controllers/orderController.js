// backend/controllers/orderController.js

const Order = require("../models/Order");

// @desc    Get orders for Admin or Customer/Supplier
// @route   GET /api/orders
// @access  Private/Admin, Customer, Supplier
exports.getOrders = async (req, res) => {
  try {
    let query = {};
    const role = req.user.role;

    // If not Admin, filter orders specific to the logged-in user (Customer or Supplier)
    if (role !== "Admin") {
      query = { customer: req.user.id };
    }

    const orders = await Order.find(query)
      .populate("customer", "name companyName")
      .populate("items.product", "name sku");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error fetching orders" });
  }
};

// @desc    Create a new order
// @route   POST /api/orders
// @access  Private/Customer
exports.createOrder = async (req, res) => {
  // Logic to calculate total, check stock, and create order goes here
  const orderData = {
    ...req.body,
    customer: req.user.id, // Assign logged-in user as the customer
  };

  try {
    const order = await Order.create(orderData);
    // In a real app, you would reduce product stock here.
    res.status(201).json(order);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Invalid order data" });
  }
};

// @desc    Update order status (e.g., Processing, Shipped)
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
exports.updateOrderStatus = async (req, res) => {
  const { status } = req.body;
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ message: "Invalid status update data" });
  }
};
// Add getOrderById as needed
