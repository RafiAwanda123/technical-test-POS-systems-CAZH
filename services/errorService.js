class ErrorService {
  /**
   * Format error response untuk API
   * @param {Error} error - Error object
   * @returns {Object} Formatted error response
   */
  static formatErrorResponse(error) {
    
    let statusCode = 500;
    let message = 'Internal server error';
    
    
    if (error.name === 'SequelizeValidationError') {
      statusCode = 400;
      message = 'Validation error';
    } else if (error.name === 'SequelizeUniqueConstraintError') {
      statusCode = 409;
      message = 'Duplicate entry';
    } else if (error.message.includes('not found')) {
      statusCode = 404;
      message = error.message;
    } else if (error.message.includes('Insufficient stock')) {
      statusCode = 409;
      message = error.message;
    } else if (error.message.includes('Validation')) {
      statusCode = 400;
      message = error.message;
    }
    
    return {
      success: false,
      status: statusCode,
      message: message,
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    };
  }

  /**
   * Format success response untuk API
   * @param {*} data - Data yang akan dikirim
   * @param {number} statusCode - HTTP status code
   * @returns {Object} Formatted success response
   */
  static formatSuccessResponse(data, statusCode = 200) {
    return {
      success: true,
      status: statusCode,
      data: data
    };
  }
}

module.exports = ErrorService;