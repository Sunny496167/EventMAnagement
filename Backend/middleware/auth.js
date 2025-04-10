const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { ForbiddenError, UnauthenticatedError } = require('../utils/errors');

/**
 * Main authentication middleware that verifies JWT token and attaches user to request
 * Optionally checks if token exists in user's tokens array (for token revocation)
 */
const authenticateUser = async (req, res, next) => {
  try {
    // Check for authorization header
    const authHeader = req.headers.authorization || req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthenticatedError('Authentication invalid: No token provided');
    }

    // Extract token
    const token = authHeader.split(' ')[1];
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Find user by id (optional: check if token is in their tokens array)
    const user = await User.findById(decoded.userId);

    if (!user) {
      return next(new UnauthenticatedError('Authentication invalid: User not found'));
    }

    // Attach user and token to request object
    req.user = {
      ...user.toObject(), // Spread user document
      userId: user._id,   // Add userId alias
      token: token        // Attach the token
    };

    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return next(new UnauthenticatedError('Authentication invalid: Invalid token'));
    }
    return next(error);
  }
};

/**
 * Role-based authorization middleware (replaces isAdmin)
 * @param {...String} roles - Allowed roles
 */
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      throw new UnauthenticatedError('Authentication required');
    }
    
    if (!roles.includes(req.user.role)) {
      throw new ForbiddenError('Unauthorized to access this route');
    }
    next();
  };
};

// Aliases for backward compatibility
const authenticateToken = authenticateUser;
const isAdmin = authorizeRoles('admin');

module.exports = {
  authenticateUser,
  authorizeRoles,
  authenticateToken, // legacy alias
  isAdmin           // legacy alias
};