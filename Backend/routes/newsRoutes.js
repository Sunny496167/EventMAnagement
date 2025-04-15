const express = require('express');
const newsController = require('../controllers/newsController');
const { authenticateUser, isAdmin } = require('../middleware/auth');
const { upload } = require('../config/cloudinary');

const router = express.Router();

router.get('/admin/stats', authenticateUser, isAdmin, newsController.getNewsStats);


// Public routes
router.get('/', newsController.getAllNews);
router.get('/:id', newsController.getNews);

// Admin routes: create, update, and delete news items
router.post(
  '/',
  authenticateUser,
  isAdmin,
  upload.single('coverImage'), // Cloudinary handles image upload
  newsController.createNews
);

router.patch(
  '/:id',
  authenticateUser,
  isAdmin,
  upload.single('coverImage'),
  newsController.updateNews
);

router.delete('/:id', authenticateUser, isAdmin, newsController.deleteNews);

module.exports = router;
