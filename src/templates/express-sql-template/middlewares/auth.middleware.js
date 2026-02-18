const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Validate JWT_SECRET at module load time
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error(
    '❌ FATAL: JWT_SECRET environment variable is not set. ' +
      'This is required for authentication. Please set it in your .env file.'
  );
}

if (process.env.NODE_ENV === 'production' && JWT_SECRET.length < 32) {
  throw new Error(
    '❌ FATAL: JWT_SECRET must be at least 32 characters long in production. ' +
      'Current length: ' +
      JWT_SECRET.length
  );
}

const authenticate = async (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

const requireRole = (...allowedRoles) => {
  return async (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;

    try {
      const decoded = jwt.verify(token, JWT_SECRET);

      const user = await User.findByPk(decoded.id);
      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }

      req.user = decoded;

      if (!allowedRoles.includes(req.user.role)) {
        return res.status(401).json({
          message: 'Access denied. Insufficient privileges.',
          requiredRoles: allowedRoles,
          userRole: req.user.role,
        });
      }

      next();
    } catch (err) {
      res.status(401).json({ message: 'Invalid token' });
    }
  };
};

module.exports = {
  authenticate,
  requireRole,
};
