// backend/controllers/authController.js

const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// --- Helper function to generate a JWT token ---
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
exports.registerUser = async (req, res) => {
  const { name, email, password, role, adminKey, companyName, phone, address } =
    req.body;

  try {
    // ---------------------------------------------------------
    // 🔒 SECURITY CHECK: THE "GATEKEEPER" LOGIC
    // ---------------------------------------------------------
    if (role === "Admin") {
      // 1. Check if the environment variable is actually set on the server
      if (!process.env.ADMIN_SECRET_KEY) {
        console.error("ADMIN_SECRET_KEY is missing in .env or Vercel settings");
        return res.status(500).json({
          message: "Server Configuration Error: Admin Secret Key is missing.",
        });
      }

      // 2. Compare the key sent by user with the server's secret
      // Note: We trim() whitespace to prevent accidental copy-paste errors
      if (adminKey !== process.env.ADMIN_SECRET_KEY) {
        return res.status(403).json({
          message: "SECURITY ALERT: Invalid Admin Secret Key! Access Denied.",
        });
      }
    }
    // ---------------------------------------------------------

    // 1. Check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 2. Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Create User
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      companyName,
      phone,
      address,
    });

    // 4. Respond with token and user details
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        companyName: user.companyName,
        phone: user.phone,
        address: user.address,
        token: generateToken(user._id, user.role),
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error during registration" });
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Check for user email
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // 2. Passwords match, return token
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        companyName: user.companyName,
        phone: user.phone,
        address: user.address,
        token: generateToken(user._id, user.role),
      });
    } else {
      // 3. Invalid credentials
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error during login" });
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
exports.updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.phone = req.body.phone || user.phone;
      user.address = req.body.address || user.address;
      user.companyName = req.body.companyName || user.companyName;

      // Only hash password if it's being sent for update
      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(req.body.password, salt);
      }

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        companyName: updatedUser.companyName,
        phone: updatedUser.phone,
        address: updatedUser.address,
        token: generateToken(updatedUser._id, updatedUser.role),
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Profile update failed" });
  }
};

// @desc    Get all users (Used by Admin to see Suppliers/Customers)
// @route   GET /api/auth/users
// @access  Private/Admin
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password"); // Exclude passwords for security
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
};
