// utils/catchAsync.js

/**
 * Wrapper function to catch async errors in express routes
 * @param {Function} fn - The async function to wrap
 * @returns {Function} - Express middleware function that catches errors
 */
module.exports = fn => {
    return (req, res, next) => {
      fn(req, res, next).catch(next);
    };
  };