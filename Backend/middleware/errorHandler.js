// middleware/errorHandler.js
const { env } = require('process');

const errorHandler = (err, req, res, next) => {
  // Default error response
  let error = {
    statusCode: err.statusCode || 500,
    message: err.message || 'Internal Server Error',
    success: false
  };

  // Handle different error types
  if (err.name === 'ValidationError') { // Mongoose validation error
    error.statusCode = 400;
    error.message = 'Validation Error';
    error.errors = Object.values(err.errors).map(el => el.message);
  } else if (err.code === 11000) { // Mongoose duplicate key
    error.statusCode = 409;
    error.message = 'Duplicate field value entered';
    error.field = Object.keys(err.keyValue)[0];
  } else if (err.name === 'CastError') { // Mongoose bad ObjectId
    error.statusCode = 400;
    error.message = `Invalid ${err.path}: ${err.value}`;
  } else if (err.name === 'JsonWebTokenError') { // JWT errors
    error.statusCode = 401;
    error.message = 'Invalid token';
  } else if (err.name === 'TokenExpiredError') { // Expired JWT
    error.statusCode = 401;
    error.message = 'Token expired';
  }

  // Log errors in development
  if (process.env.NODE_ENV === 'development') {
    console.error('[ERROR]', err);
    error.stack = err.stack;
    error.error = err;
  }

  // Optional logging to file (uncomment if using logger)
  // logError(error, req);

  // Send response
  res.status(error.statusCode).json({
    success: error.success,
    message: error.message,
    ...(error.errors && { errors: error.errors }),
    ...(error.field && { field: error.field }),
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
  });
};

module.exports = errorHandler;