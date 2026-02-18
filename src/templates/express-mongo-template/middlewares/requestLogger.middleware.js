const logger = require('../utils/logger');

/**
 * Request Logging Middleware
 * Logs all incoming requests with method, URL, status code, and response time
 */
const requestLogger = (req, res, next) => {
  const start = Date.now();

  // Capture original end function
  const originalEnd = res.end;

  // Override res.end to log after response is sent
  res.end = function (...args) {
    const duration = Date.now() - start;
    const statusCode = res.statusCode;

    // Determine log level based on status code
    const logLevel = statusCode >= 500 ? 'error' : statusCode >= 400 ? 'warn' : 'info';

    // Log request details
    logger[logLevel]({
      method: req.method,
      url: req.originalUrl || req.url,
      statusCode: statusCode,
      responseTime: `${duration}ms`,
      userAgent: req.get('user-agent'),
      ip: req.ip || req.connection.remoteAddress,
    });

    // Call original end function
    originalEnd.apply(res, args);
  };

  next();
};

module.exports = requestLogger;
