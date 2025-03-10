const express = require("express");
const jwt = require("jsonwebtoken");
const Post = require("../models/Post");
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

// Create Post (Admin Only)
router.post("/", protect, adminProtect, async (req, res) => {
  try {
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      user: req.user.id, // use the user id from the decoded token
    });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ message: "Error creating post" });
  }
});

// Get all Posts
router.get("/", async (req, res) => {
  const posts = await Post.find().populate("user", "username email");
  res.json(posts);
});

// Update Post (Admin Only)
router.put("/:id", protect, adminProtect, async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: "Post not found" });

  post.title = req.body.title || post.title;
  post.content = req.body.content || post.content;
  await post.save();
  res.json(post);
});

// Delete Post (Admin Only)
router.delete("/:id", protect, adminProtect, async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: "Post not found" });

  await post.remove();
  res.json({ message: "Post removed" });
});

module.exports = router;
