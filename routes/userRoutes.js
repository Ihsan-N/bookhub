// const express = require("express");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const User = require("../models/userModel");

// const router = express.Router();

// // Register User
// router.post("/register", async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     const user = await User.create({ name, email, password });
//     res.status(201).json({ message: "User registered successfully!" });
//   } catch (error) {
//     res.status(400).json({ message: "Registration failed!", error });
//   }
// });

// // Login User
// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
    
//     if (!user || !(await bcrypt.compare(password, user.password))) {
//       return res.status(400).json({ message: "Invalid credentials!" });
//     }

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
//     res.json({ message: "Login successful!", token });
//   } catch (error) {
//     res.status(400).json({ message: "Login failed!", error });
//   }
// });

// module.exports = router;

const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const router = express.Router();

// Register User
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered!" });
    }

    // Create new user
    const user = await User.create({ name, email, password });
    res.status(201).json({ message: "User registered successfully!" });

  } catch (error) {
    res.status(500).json({ message: "Registration failed!", error: error.message });
  }
});

// Login User
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ message: "Login successful!", token });
  } catch (error) {
    res.status(400).json({ message: "Login failed!", error: error.message });
  }
});

module.exports = router;
