require("dotenv").config();
const express = require("express");
const path = require("path");
const { connectDB } = require("./config/database");
const authRoutes = require("./routes/auth.routes");

const app = express();

// Middleware
app.use(express.json());

// Serve static files from view directory
app.use(express.static(path.join(__dirname, 'view')));

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/auth", authRoutes);

// Serve the landing page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'view', 'index.html'));
});

// API info endpoint
app.get("/api", (req, res) => {
    res.status(200).json({
      message: "Welcome to Express API Kit! 🚀",
      CreatedBy: "Express Generator API Kit Created by Muhammad Ahmad with ❤️.",
      status: "Running Smoothly ✅",
      version: "1.0.0",
      endpoints: {
        auth: "/api/auth/*",
        documentation: "/api-docs",
        landing: "/"
      }
    });
  });

module.exports = app;
