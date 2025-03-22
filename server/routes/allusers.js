const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

// Middleware to authenticate user
const protect = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Not authorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // store the whole decoded user in the request (including role)
    next();
  } catch (err) {
    res.status(401).json({ message: "Not authorized" });
  }
};

// Middleware to check if the user is an admin
const adminProtect = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden: Admins only" });
  }
  next();
};

// Get all users
router.get("/", protect, adminProtect, async (req, res) => {
  const users = await User.find();
  res.json(users);
});

module.exports = router;
