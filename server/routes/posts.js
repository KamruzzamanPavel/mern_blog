const express = require("express");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Post = require("../models/Post");
const User = require("../models/User");
const router = express.Router();

// Configure Multer for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Store uploaded images in "uploads" directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
  },
});
const upload = multer({ storage });

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

// Get all Posts
router.get("/", async (req, res) => {
  const posts = await Post.find().populate("user", "username email");
  res.json(posts);
});

// Get one Post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "user",
      "username email"
    );
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create Post (Admin Only with Image Upload)
router.post(
  "/",
  protect,
  adminProtect,
  upload.single("image"),
  async (req, res) => {
    try {
      const post = new Post({
        title: req.body.title,
        content: req.body.content,
        user: req.user.id,
        image: req.file ? `${req.file.filename}` : null, // Save image path if uploaded
      });
      await post.save();
      res.status(201).json(post);
    } catch (err) {
      res.status(400).json({ message: "Error creating post" });
    }
  }
);

// Update Post (Admin Only with Image Upload)
router.put(
  "/:id",
  protect,
  adminProtect,
  upload.single("image"),
  async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post) return res.status(404).json({ message: "Post not found" });

      post.title = req.body.title || post.title;
      post.content = req.body.content || post.content;
      post.isPublished = req.body.isPublished === "true"; // Convert string to boolean
      post.isPopular = req.body.isPopular === "true"; // Convert string to boolean

      if (req.file) {
        post.image = req.file.filename;
      }

      await post.save();
      res.json({ message: "Post updated successfully", post });
    } catch (error) {
      console.error("Error updating post:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);
// Delete Post (Admin Only)

router.delete("/:id", protect, adminProtect, async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: "Post not found" });

  // Check if there's an image associated with the post and delete it
  if (post.image) {
    const imagePath = path.join(__dirname, "..", "uploads", post.image); // Path to the image file in the uploads folder
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error("Error deleting image:", err);
        return res.status(500).json({ message: "Error deleting image" });
      }
      console.log("Image deleted successfully");
    });
  }

  // Delete the post using findByIdAndDelete
  await Post.findByIdAndDelete(req.params.id);

  res.json({ message: "Post removed" });
});

module.exports = router;
