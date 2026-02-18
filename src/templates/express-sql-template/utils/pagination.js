/**
 * Pagination Utility for SQL (Sequelize)
 * Provides reusable pagination logic for Sequelize queries
 */

class PaginationHelper {
  /**
   * Paginate a Sequelize query
   * @param {Object} model - Sequelize model
   * @param {Object} options - Query and pagination options
   * @param {Object} options.where - Where conditions
   * @param {number} options.page - Page number (default: 1)
   * @param {number} options.limit - Items per page (default: 10)
   * @param {Array} options.order - Sort order (default: [['createdAt', 'DESC']])
   * @param {Array} options.attributes - Attributes to select
   * @param {Array} options.include - Associations to include
   * @returns {Promise<Object>} Paginated results with metadata
   */
  static async paginate(model, options = {}) {
    const page = parseInt(options.page) || 1;
    const limit = parseInt(options.limit) || 10;
    const where = options.where || {};
    const order = options.order || [['createdAt', 'DESC']];
    const attributes = options.attributes || undefined;
    const include = options.include || [];

    // Ensure page and limit are positive
    const validPage = Math.max(1, page);
    const validLimit = Math.max(1, Math.min(100, limit)); // Max 100 items per page

    const offset = (validPage - 1) * validLimit;

    // Build query options
    const queryOptions = {
      where,
      limit: validLimit,
      offset,
      order,
      distinct: true, // For accurate count with includes
    };

    if (attributes) {
      queryOptions.attributes = attributes;
    }

    if (include.length > 0) {
      queryOptions.include = include;
    }

    // Execute query
    const { count: total, rows: data } = await model.findAndCountAll(queryOptions);

    const totalPages = Math.ceil(total / validLimit);
    const hasNextPage = validPage < totalPages;
    const hasPrevPage = validPage > 1;

    return {
      data,
      pagination: {
        page: validPage,
        limit: validLimit,
        total,
        totalPages,
        hasNextPage,
        hasPrevPage,
        nextPage: hasNextPage ? validPage + 1 : null,
        prevPage: hasPrevPage ? validPage - 1 : null,
      },
    };
  }

  /**
   * Extract pagination params from request query
   * @param {Object} req - Express request object
   * @returns {Object} Pagination options
   */
  static getPaginationParams(req) {
    return {
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 10,
      order: req.query.sort
        ? [[req.query.sort.replace('-', ''), req.query.sort.startsWith('-') ? 'DESC' : 'ASC']]
        : [['createdAt', 'DESC']],
    };
  }
}

module.exports = PaginationHelper;
