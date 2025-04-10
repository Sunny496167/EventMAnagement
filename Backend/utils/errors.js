// utils/errors.js
class CustomAPIError extends Error {
    constructor(message) {
      super(message);
      this.name = this.constructor.name;
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  class BadRequestError extends CustomAPIError {
    constructor(message = 'Bad Request') {
      super(message);
      this.statusCode = 400;
    }
  }
  
  class UnauthenticatedError extends CustomAPIError {
    constructor(message = 'Authentication Invalid') {
      super(message);
      this.statusCode = 401;
    }
  }
  
  class ForbiddenError extends CustomAPIError {
    constructor(message = 'Forbidden') {
      super(message);
      this.statusCode = 403;
    }
  }
  
  class NotFoundError extends CustomAPIError {
    constructor(message = 'Resource Not Found') {
      super(message);
      this.statusCode = 404;
    }
  }
  
  module.exports = {
    CustomAPIError,
    BadRequestError,
    UnauthenticatedError,
    ForbiddenError,
    NotFoundError
  };