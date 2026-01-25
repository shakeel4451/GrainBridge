// backend/seeder.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const colors = require("colors");
const User = require("./models/User");
const Inventory = require("./models/inventoryModel");
const Order = require("./models/orderModel");

dotenv.config();

// --- CONFIGURATION ---
// Ensure this matches your .env file
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/ricemill";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.error(`Error: ${error.message}`.red.underline.bold);
    process.exit(1);
  }
};

const importData = async () => {
  try {
    await connectDB();

    console.log("🧹 Clearing old data...".yellow);
    await Order.deleteMany();
    await Inventory.deleteMany();
    // Note: We are NOT deleting Users so you don't lose your Admin login.

    console.log("🌱 Seeding Inventory...".magenta);
    // Create Standard Inventory
    const inventoryItems = await Inventory.insertMany([
      {
        name: "Super Basmati",
        category: "Basmati",
        quantity: 15000,
        pricePerBag: 5000,
        supplier: "Supplier Alpha",
      },
      {
        name: "Kainat 1121",
        category: "Basmati",
        quantity: 8000,
        pricePerBag: 4800,
        supplier: "Global Grains",
      },
      {
        name: "Irri-6",
        category: "Non-Basmati",
        quantity: 25000,
        pricePerBag: 3200,
        supplier: "Local Farmers",
      },
      {
        name: "Brown Rice",
        category: "Organic",
        quantity: 3500,
        pricePerBag: 6000,
        supplier: "Organic Farms Ltd",
      },
      {
        name: "Broken Rice",
        category: "Feed",
        quantity: 12000,
        pricePerBag: 2500,
        supplier: "Mill Output",
      },
      // --- NEW ITEMS ---
      {
        name: "Jasmine Rice",
        category: "Basmati",
        quantity: 5000,
        pricePerBag: 5500,
        supplier: "Import Co.",
      },
      {
        name: "Parboiled Sella",
        category: "Sella",
        quantity: 10000,
        pricePerBag: 4200,
        supplier: "Golden Grains",
      },
      {
        name: "Red Rice",
        category: "Healthy",
        quantity: 2000,
        pricePerBag: 7000,
        supplier: "Nature Best",
      },
      {
        name: "Supreme Kernel",
        category: "Basmati",
        quantity: 6000,
        pricePerBag: 5100,
        supplier: "Supplier Alpha",
      },
      {
        name: "Rice Bran",
        category: "Feed",
        quantity: 20000,
        pricePerBag: 1500,
        supplier: "Mill Output",
      },
    ]);

    // We need a valid user ID for orders (just picking the first one found or creating a dummy ID)
    let adminUser = await User.findOne({ role: "Admin" });
    if (!adminUser) {
      // Fallback if no admin exists
      console.log(
        "⚠️ No Admin found, using dummy ID (Charts will work, but Order links might not)"
          .gray,
      );
      adminUser = { _id: new mongoose.Types.ObjectId() };
    }

    console.log("📈 Seeding 6 Months of Orders...".green);

    const orders = [];
    const statuses = [
      "Success",
      "Pending",
      "Processing",
      "Delivered",
      "Cancelled",
    ];
    const customers = [
      "Global Foods Inc",
      "Lahore Retailers",
      "Karachi Mart",
      "Asian Exporters",
      "Daily Fresh",
    ];

    // Generate 50 realistic orders
    for (let i = 0; i < 50; i++) {
      // Random Date within last 6 months
      const date = new Date();
      date.setMonth(date.getMonth() - Math.floor(Math.random() * 6));
      date.setDate(Math.floor(Math.random() * 28) + 1);

      // Random Amount (between 50k and 500k)
      const amount = Math.floor(Math.random() * 450000) + 50000;

      // Random Status (Weighted towards Success)
      const status =
        Math.random() > 0.3
          ? "Success"
          : statuses[Math.floor(Math.random() * statuses.length)];

      orders.push({
        customer: adminUser._id, // Assigning to admin for simplicity
        shippingAddress: "123 Seeded Data St, Lahore",
        items: [
          {
            product: inventoryItems[0]._id, // Just linking to first inventory item
            quantity: Math.floor(amount / 5000),
            priceAtOrder: 5000,
          },
        ],
        totalAmount: amount,
        status: status,
        createdAt: date, // Crucial for Line Chart
        updatedAt: date,
      });
    }

    await Order.insertMany(orders);

    console.log("✅ Data Imported Successfully!".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await connectDB();
    await Order.deleteMany();
    await Inventory.deleteMany();

    console.log("🔴 Data Destroyed!".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

// Check command line arguments to decide action
if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
