const express = require('express');
const authRoutes = require('./auth.routes');

const router = express.Router();

// Mount auth routes
router.use('/auth', authRoutes);

// V1 API info endpoint
router.get('/', (req, res) => {
  res.status(200).json({
    message: 'API Version 1',
    version: '1.0.0',
    endpoints: {
      auth: '/api/v1/auth/*',
    },
  });
});

module.exports = router;
