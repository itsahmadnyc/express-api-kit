const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserResponse } = require('../models/responses');
const { successResponse, errorResponse } = require('../utils/responseHandler');

const JWT_SECRET = process.env.JWT_SECRET;

// Register User
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return errorResponse(res, 400, 'User already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || 'user',
    });

    // Generate JWT token
    const token = jwt.sign({ id: newUser.id, role: newUser.role }, JWT_SECRET, {
      expiresIn: '7d',
    });

    // Use response formatter with response handler
    successResponse(
      res,
      201,
      'User registered successfully',
      UserResponse.formatWithToken(newUser, token)
    );
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};

// Login User
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return errorResponse(res, 400, 'Invalid credentials');
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return errorResponse(res, 400, 'Invalid credentials');
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: '7d',
    });

    // Use response formatter with response handler
    successResponse(res, 200, 'Login successful', UserResponse.formatWithToken(user, token));
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};

// Get User Profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] },
    });

    if (!user) {
      return errorResponse(res, 404, 'User not found');
    }

    // Use response formatter with response handler
    successResponse(res, 200, 'Profile retrieved successfully', UserResponse.formatProfile(user));
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};
