require('dotenv').config();
const express = require('express');
const path = require('path');
const { connectDB } = require('./config/database');
const v1Routes = require('./routes/v1');
const healthRoutes = require('./routes/health.routes');
const requestLogger = require('./middlewares/requestLogger.middleware');

const app = express();

// Middleware
app.use(express.json());


app.use(requestLogger);


app.use(express.static(path.join(__dirname, 'views')));


connectDB();


app.use('/health', healthRoutes);

app.use('/api/v1', v1Routes);


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});


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
