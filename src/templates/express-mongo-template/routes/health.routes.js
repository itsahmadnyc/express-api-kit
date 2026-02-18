const express = require('express');
const { healthCheck, readinessCheck, livenessCheck } = require('../controllers/health.controller');

const router = express.Router();

// Health check endpoints
router.get('/', healthCheck);
router.get('/ready', readinessCheck);
router.get('/live', livenessCheck);

module.exports = router;
