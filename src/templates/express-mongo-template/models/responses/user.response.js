/**
 * User Response Formatter
 * Formats user data for API responses and hides sensitive fields
 */

class UserResponse {
  /**
   * Format a single user object
   * @param {Object} user - User object from database
   * @returns {Object|null} Formatted user data without sensitive fields
   */
  static format(user) {
    if (!user) {
      return null;
    }

    // Convert Mongoose document to plain object if needed
    const userObj = user.toObject ? user.toObject() : user;

    return {
      id: userObj._id || userObj.id,
      name: userObj.name,
      email: userObj.email,
      role: userObj.role,
      createdAt: userObj.createdAt,
      updatedAt: userObj.updatedAt,
      // Exclude sensitive fields like password, __v, etc.
    };
  }

  /**
   * Format multiple user objects
   * @param {Array} users - Array of user objects
   * @returns {Array} Array of formatted user data
   */
  static formatMany(users) {
    if (!users || !Array.isArray(users)) {
      return [];
    }

    return users.map(user => this.format(user));
  }

  /**
   * Format user with authentication token
   * @param {Object} user - User object
   * @param {string} token - JWT token
   * @returns {Object} User data with token
   */
  static formatWithToken(user, token) {
    return {
      token,
      user: this.format(user),
    };
  }

  /**
   * Format user profile (extended info)
   * @param {Object} user - User object
   * @returns {Object} Extended user profile data
   */
  static formatProfile(user) {
    if (!user) {
      return null;
    }

    const userObj = user.toObject ? user.toObject() : user;

    return {
      id: userObj._id || userObj.id,
      name: userObj.name,
      email: userObj.email,
      role: userObj.role,
      createdAt: userObj.createdAt,
      updatedAt: userObj.updatedAt,
      // Add any additional profile-specific fields here
    };
  }
}

module.exports = UserResponse;
