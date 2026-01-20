const Order = require("../models/Order");
const Product = require("../models/Product"); // Changed from productModel to Product

// @desc    Get orders for Admin or Customer/Supplier
// @route   GET /api/orders
// @access  Private/Admin, Customer, Supplier
exports.getOrders = async (req, res) => {
  try {
    let query = {};
    const role = req.user.role;

    // Filter orders if not Admin
    if (role !== "Admin") {
      query = { customer: req.user.id };
    }

    const orders = await Order.find(query)
      .populate("customer", "name companyName")
      .populate("items.product", "name sku")
      .sort("-createdAt");

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error fetching orders" });
  }
};

// @desc    Create a new order & update inventory
// @route   POST /api/orders
// @access  Private/Customer
exports.createOrder = async (req, res) => {
  const { items, totalAmount, shippingAddress } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ message: "No items in order" });
  }

  try {
    // 1. Check stock availability for all items first
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res
          .status(404)
          .json({ message: `Product not found ID: ${item.product}` });
      }
      if (product.currentStock < item.quantity) {
        return res.status(400).json({
          message: `Insufficient stock for ${product.name}. Available: ${product.currentStock}`,
        });
      }
    }

    // 2. Create the order
    const order = await Order.create({
      customer: req.user.id,
      items,
      totalAmount,
      shippingAddress,
    });

    // 3. Deduct stock from Inventory
    for (const item of items) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { currentStock: -item.quantity },
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
