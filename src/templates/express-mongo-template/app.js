require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database");
const authRoutes = require("./routes/auth.routes");

const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.get("/", (req, res) => {
    res.status(200).json({
      message: "Welcome to Express API Kit! 🚀",
      CreatedBy: "Express Generator API Kit Created by Muhammad Ahmad with ❤️.",
      status: "Running Smoothly ✅",
      version: "1.0.0",
    });
  });

module.exports = app;
