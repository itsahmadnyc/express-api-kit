/**
 * Send a success response
 * @param {object} res - Express response object
 * @param {number} statusCode - HTTP status code (default: 200)
 * @param {string} message - Success message
 * @param {object} data - Response data (optional)
 */
const successResponse = (res, statusCode = 200, message = 'Success', data = {}) => {
    res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  };
  
  /**
   * Send an error response
   * @param {object} res - Express response object
   * @param {number} statusCode - HTTP status code (default: 500)
   * @param {string} message - Error message
   */
  const errorResponse = (res, statusCode = 500, message = 'An error occurred') => {
    res.status(statusCode).json({
      success: false,
      message,
    });
  };
  
  module.exports = { successResponse, errorResponse };
  