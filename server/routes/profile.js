const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

// Middleware to authenticate user
const protect = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Not authorized" });

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ message: "Not authorized" });
  }
};

// Get user profile
router.get("/", protect, async (req, res) => {
  // console.log(req);

  const user = await User.findById(req.user).select("-password");
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
});

// Update user profile
router.put("/", protect, async (req, res) => {
  const user = await User.findById(req.user);
  if (!user) return res.status(404).json({ message: "User not found" });

  user.username = req.body.username || user.username;
  user.email = req.body.email || user.email;

  if (req.body.password) {
    user.password = req.body.password;
  }

  await user.save();
  res.json({ message: "Profile updated successfully", user });
});

module.exports = router;
