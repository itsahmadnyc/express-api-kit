const Joi = require('joi');

/**
 * Authentication Validation Schemas
 * Joi schemas for validating authentication-related requests
 */

/**
 * Register Validation Schema
 * Validates user registration data
 */
const registerSchema = {
  body: Joi.object({
    name: Joi.string().min(2).max(50).required().messages({
      'string.empty': 'Name is required',
      'string.min': 'Name must be at least 2 characters long',
      'string.max': 'Name cannot exceed 50 characters',
      'any.required': 'Name is required',
    }),
    email: Joi.string().email().required().messages({
      'string.empty': 'Email is required',
      'string.email': 'Please provide a valid email address',
      'any.required': 'Email is required',
    }),
    password: Joi.string().min(6).max(128).required().messages({
      'string.empty': 'Password is required',
      'string.min': 'Password must be at least 6 characters long',
      'string.max': 'Password cannot exceed 128 characters',
      'any.required': 'Password is required',
    }),
    role: Joi.string().valid('user', 'admin').default('user').messages({
      'any.only': 'Role must be either user or admin',
    }),
  }),
};

/**
 * Login Validation Schema
 * Validates user login credentials
 */
const loginSchema = {
  body: Joi.object({
    email: Joi.string().email().required().messages({
      'string.empty': 'Email is required',
      'string.email': 'Please provide a valid email address',
      'any.required': 'Email is required',
    }),
    password: Joi.string().required().messages({
      'string.empty': 'Password is required',
      'any.required': 'Password is required',
    }),
  }),
};

/**
 * Update Profile Validation Schema
 * Validates profile update data
 */
const updateProfileSchema = {
  body: Joi.object({
    name: Joi.string().min(2).max(50).messages({
      'string.min': 'Name must be at least 2 characters long',
      'string.max': 'Name cannot exceed 50 characters',
    }),
    email: Joi.string().email().messages({
      'string.email': 'Please provide a valid email address',
    }),
    password: Joi.string().min(6).max(128).messages({
      'string.min': 'Password must be at least 6 characters long',
      'string.max': 'Password cannot exceed 128 characters',
    }),
  })
    .min(1)
    .messages({
      'object.min': 'At least one field must be provided for update',
    }),
};

/**
 * ID Parameter Validation Schema
 * Validates MongoDB ObjectId in URL parameters
 */
const idParamSchema = {
  params: Joi.object({
    id: Joi.string()
      .pattern(/^[0-9a-fA-F]{24}$/)
      .required()
      .messages({
        'string.pattern.base': 'Invalid user ID format',
        'any.required': 'User ID is required',
      }),
  }),
};

module.exports = {
  registerSchema,
  loginSchema,
  updateProfileSchema,
  idParamSchema,
};
