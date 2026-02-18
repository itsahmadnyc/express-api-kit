const UserResponse = require('./user.response');

/**
 * Example: Post Response Formatter
 * Demonstrates how to create response formatters for other models
 * and compose them with existing formatters
 */

class PostResponse {
  /**
   * Format a single post object
   * @param {Object} post - Post object from database
   * @returns {Object|null} Formatted post data
   */
  static format(post) {
    if (!post) {
      return null;
    }

    const postObj = post.toObject ? post.toObject() : post;

    return {
      id: postObj._id || postObj.id,
      title: postObj.title,
      content: postObj.content,
      author: postObj.author ? UserResponse.format(postObj.author) : undefined,
      createdAt: postObj.createdAt,
      updatedAt: postObj.updatedAt,
    };
  }

  /**
   * Format multiple post objects
   * @param {Array} posts - Array of post objects
   * @returns {Array} Array of formatted post data
   */
  static formatMany(posts) {
    if (!posts || !Array.isArray(posts)) {
      return [];
    }

    return posts.map(post => this.format(post));
  }

  /**
   * Format post with additional metadata
   * @param {Object} post - Post object
   * @param {Object} meta - Additional metadata (e.g., likes count, comments count)
   * @returns {Object} Post with metadata
   */
  static formatWithMeta(post, meta = {}) {
    return {
      ...this.format(post),
      meta,
    };
  }
}

module.exports = PostResponse;
