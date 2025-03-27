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

    res.status(201);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Error registering user" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log(user);

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

router.post("/refresh", (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  // console.log(refreshToken);

  if (!refreshToken) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, user) => {
      if (err) return res.status(403).json({ message: "Forbidden" });
      console.log("inside refresh user:", user);
      const user_1 = await User.findOne({ email: user.email });
      const newAccessToken = generateAccessToken(user_1);
      console.log("new token: ", newAccessToken);

      res.json({ accessToken: newAccessToken });
    }
  );
});

router.post("/logout", (req, res) => {
  res.clearCookie("refreshToken");
  res.json({ message: "Logged out" });
});

module.exports = router;
