/**
 * Pagination Utility for MongoDB
 * Provides reusable pagination logic for Mongoose queries
 */

class PaginationHelper {
  /**
   * Paginate a Mongoose query
   * @param {Object} model - Mongoose model
   * @param {Object} query - Query conditions
   * @param {Object} options - Pagination options
   * @param {number} options.page - Page number (default: 1)
   * @param {number} options.limit - Items per page (default: 10)
   * @param {string} options.sort - Sort field (default: '-createdAt')
   * @param {Object} options.select - Fields to select
   * @param {Object} options.populate - Fields to populate
   * @returns {Promise<Object>} Paginated results with metadata
   */
  static async paginate(model, query = {}, options = {}) {
    const page = parseInt(options.page) || 1;
    const limit = parseInt(options.limit) || 10;
    const sort = options.sort || '-createdAt';
    const select = options.select || '';
    const populate = options.populate || '';

    // Ensure page and limit are positive
    const validPage = Math.max(1, page);
    const validLimit = Math.max(1, Math.min(100, limit)); // Max 100 items per page

    const skip = (validPage - 1) * validLimit;

    // Build query
    let mongooseQuery = model.find(query).sort(sort).skip(skip).limit(validLimit);

    if (select) {
      mongooseQuery = mongooseQuery.select(select);
    }

    if (populate) {
      mongooseQuery = mongooseQuery.populate(populate);
    }

    // Execute query and count in parallel
    const [data, total] = await Promise.all([mongooseQuery.exec(), model.countDocuments(query)]);

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
      sort: req.query.sort || '-createdAt',
    };
  }
}

module.exports = PaginationHelper;
