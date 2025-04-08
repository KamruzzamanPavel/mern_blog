const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/token.js");

// Register
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({ username, email, password });

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Error registering user" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.matchPassword(password)))
      return res.status(401).json({ message: "Invalid credentials" });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Store refresh token in HTTP-Only Cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });

    res.json({ accessToken });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Google Login/Register
router.post("/google-login", async (req, res) => {
  const { uid, email } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      // If user doesn't exist, create a new one
      user = await User.create({
        username: "Google User",
        email,
        googleId: uid, // Store Google UID for reference
      });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Store refresh token in HTTP-Only Cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });

    res.json({ accessToken });
  } catch (err) {
    console.error("Google Login/Register Failed", err);
    res.status(500).json({ message: "Google login/register failed" });
  }
});

// Google Register
router.post("/google-register", async (req, res) => {
  const { uid, email, username } = req.body;

  try {
    // Check if the user already exists
    let user = await User.findOne({ email });

    if (!user) {
      // If user doesn't exist, create a new one
      user = await User.create({
        username,
        email,
        googleId: uid, // Store Google UID for reference
      });

      res.status(201).json({ message: "User registered successfully" });
    } else {
      res.status(400).json({ message: "User already exists" });
    }
  } catch (err) {
    console.error("Google Registration Failed", err);
    res.status(500).json({ message: "Google registration failed" });
  }
});

// Refresh Token
router.post("/refresh", (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, user) => {
      if (err) return res.status(403).json({ message: "Forbidden" });

      const user_1 = await User.findOne({ email: user.email });
      const newAccessToken = generateAccessToken(user_1);

      res.json({ accessToken: newAccessToken });
    }
  );
});

// Logout
router.post("/logout", (req, res) => {
  res.clearCookie("refreshToken");
  res.json({ message: "Logged out" });
});

module.exports = router;
