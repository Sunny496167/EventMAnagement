// routes/blogRoutes.js
const express = require('express');
const blogController = require('../controllers/blogController');
const { authenticateUser, isAdmin } = require('../middleware/auth');
const { upload } = require('../config/cloudinary');

const router = express.Router();

// Public routes
router.get('/', blogController.getAllBlogs);
router.get('/slug/:slug', blogController.getBlogBySlug);
router.get('/:id', blogController.getBlog);

// Admin routes for dashboard stats
router.get('/admin/stats', authenticateUser, isAdmin, blogController.getBlogStats);

// Admin routes for creating, updating, and deleting blogs
router.post(
  '/',
  authenticateUser,
  isAdmin,
  upload.single('coverImage'), // Cloudinary handles upload
  blogController.createBlog
);

router.patch(
  '/:id',
  authenticateUser,
  isAdmin,
  upload.single('coverImage'), // Cloudinary handles upload if a file is provided
  blogController.updateBlog
);

router.delete('/:id', authenticateUser, isAdmin, blogController.deleteBlog);

module.exports = router;
