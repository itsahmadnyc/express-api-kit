const sequelize = require('../config/database');

/**
 * Health Check Controller
 * Provides endpoints for monitoring application health and readiness
 */

/**
 * Basic health check
 * Returns 200 if server is running
 */
exports.healthCheck = (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
  });
};

/**
 * Readiness check
 * Checks if application is ready to accept traffic (includes DB check)
 */
exports.readinessCheck = async (req, res) => {
  try {
    // Check database connection
    await sequelize.authenticate();

    // All checks passed
    res.status(200).json({
      status: 'ready',
      timestamp: new Date().toISOString(),
      checks: {
        database: {
          status: 'up',
          type: process.env.DB_DIALECT || 'mysql',
        },
      },
    });
  } catch (error) {
    res.status(503).json({
      status: 'error',
      timestamp: new Date().toISOString(),
      checks: {
        database: {
          status: 'down',
          message: error.message,
        },
      },
    });
  }
};

/**
 * Liveness check
 * Kubernetes liveness probe endpoint
 */
exports.livenessCheck = (req, res) => {
  res.status(200).json({
    status: 'alive',
    timestamp: new Date().toISOString(),
  });
};
