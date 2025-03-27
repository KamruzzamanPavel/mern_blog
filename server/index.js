const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const fs = require("fs");
const uploadDir = "uploads";
const path = require("path");
const cookieParser = require("cookie-parser");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const app = express();

app.use(express.json());

app.use(cookieParser());
// app.use(cors());
app.use(
  cors({
    origin: "http://localhost:5173", // Explicitly allow your frontend URL
    credentials: true, // Allow sending cookies and authentication headers
  })
);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/posts", require("./routes/posts"));
app.use("/api/profile", require("./routes/profile"));
app.use("/api/users", require("./routes/allusers"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Port
const PORT = process.env.PORT || 5555;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
