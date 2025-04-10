// controllers/userController.js
const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError, UnauthenticatedError } = require('../utils/errors');

// Get all users (admin only)
exports.getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, sort = '-createdAt' } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const users = await User.find({})
      .select('-password')
      .sort(sort)
      .skip(skip)
      .limit(Number(limit));

    const totalUsers = await User.countDocuments({});

    res.status(StatusCodes.OK).json({
      users,
      count: users.length,
      totalPages: Math.ceil(totalUsers / Number(limit)),
      currentPage: Number(page)
    });
  } catch (err) {
    console.error('Error in getAllUsers:', err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};


// Get a single user
exports.getUser = async (req, res) => {
  const { id: userId } = req.params;
  
  // Users can only access their own profile unless they're admin
  if (req.user.role !== 'admin' && req.user.userId !== userId) {
    throw new UnauthenticatedError('You do not have permission to access this profile');
  }
  
  const user = await User.findById(userId).select('-password');
  
  if (!user) {
    throw new NotFoundError(`No user found with ID: ${userId}`);
  }
  
  res.status(StatusCodes.OK).json({ user });
};

// Update user profile
exports.updateUser = async (req, res) => {
  const { id: userId } = req.params;
  
  // Users can only update their own profile unless they're admin
  if (req.user.role !== 'admin' && req.user.userId !== userId) {
    throw new UnauthenticatedError('You do not have permission to update this profile');
  }
  
  // Remove password from fields that can be updated via this endpoint
  const { password, role, ...updateData } = req.body;
  
  // Only admin can update user roles
  if (req.user.role === 'admin' && role) {
    updateData.role = role;
  }
  
  const user = await User.findByIdAndUpdate(
    userId,
    updateData,
    { new: true, runValidators: true }
  ).select('-password');
  
  if (!user) {
    throw new NotFoundError(`No user found with ID: ${userId}`);
  }
  
  res.status(StatusCodes.OK).json({ user });
  
};