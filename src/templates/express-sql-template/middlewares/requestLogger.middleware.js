const logger = require('../utils/logger');

const requestLogger = (req, res, next) => {
  const start = Date.now();

  const originalEnd = res.end;

  res.end = function (...args) {
    const duration = Date.now() - start;
    const statusCode = res.statusCode;

    const logLevel = statusCode >= 500 ? 'error' : statusCode >= 400 ? 'warn' : 'info';

    logger[logLevel]({
      method: req.method,
      url: req.originalUrl || req.url,
      statusCode: statusCode,
      responseTime: `${duration}ms`,
      userAgent: req.get('user-agent'),
      ip: req.ip || req.connection.remoteAddress,
    });

    originalEnd.apply(res, args);
  };

  next();
};

module.exports = requestLogger;
