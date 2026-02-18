const express = require('express');
const { register, login, getProfile } = require('../../controllers/auth.controller');
const { authenticate } = require('../../middlewares/auth.middleware');
const validate = require('../../middlewares/validators/validate.middleware');
const { registerSchema, loginSchema } = require('../../middlewares/validators/auth.validator');

const router = express.Router();

// Public routes - with validation
router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);

// Protected routes
router.get('/profile', authenticate, getProfile);

module.exports = router;
