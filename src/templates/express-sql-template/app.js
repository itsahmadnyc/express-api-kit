const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/auth.routes');
require('dotenv').config();
const sequelize = require('./config/database'); 


const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api', userRoutes);
app.get("/", (req, res) => {
    res.status(200).json({
      message: "Welcome to Express API Kit! 🚀",
      CreatedBy: "Express Generator API Kit Created by Muhammad Ahmad with ❤️.",
      status: "Running Smoothly ✅",
      version: "1.0.0",
    });
  });

module.exports = app;
