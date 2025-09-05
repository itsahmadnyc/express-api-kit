const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';


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
          userRole: req.user.role 
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
  requireRole
};
