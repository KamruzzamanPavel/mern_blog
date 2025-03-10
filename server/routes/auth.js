const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.create({ username, email, password });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(201).json({ token });
  } catch (err) {
    res.status(400).json({ message: "Error registering user" });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Find the user by email
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    // Create a token that includes user data
    const token = jwt.sign(
      {
        id: user._id, // User's ID
        username: user.username, // User's username
        email: user.email, // User's email
        role: user.role, // User's role (admin/user)
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // Set token expiration time (1 hour)
    );

    // Send the token in the response
    res.json({ token });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

module.exports = router;
