const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const userRoutes = require('./routes/auth.routes');
require('dotenv').config();
const sequelize = require('./config/database'); 


const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static files from view directory
app.use(express.static(path.join(__dirname, 'view')));

// Routes
app.use('/api', userRoutes);

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
