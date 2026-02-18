const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const v1Routes = require('./routes/v1');
const healthRoutes = require('./routes/health.routes');
require('dotenv').config();
const sequelize = require('./config/database');
const requestLogger = require('./middlewares/requestLogger.middleware');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Request logging middleware
app.use(requestLogger);

// Serve static files from views directory
app.use(express.static(path.join(__dirname, 'views')));

// Health check routes (before API versioning)
app.use('/health', healthRoutes);

// API Routes - Version 1
app.use('/api/v1', v1Routes);

// Serve the landing page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// API info endpoint
app.get('/api', (req, res) => {
  res.status(200).json({
    message: 'Welcome to Express API Kit! 🚀',
    CreatedBy: 'Express Generator API Kit Created by Muhammad Ahmad with ❤️.',
    status: 'Running Smoothly ✅',
    versions: {
      v1: '/api/v1',
    },
    documentation: '/api-docs',
  });
});

module.exports = app;
