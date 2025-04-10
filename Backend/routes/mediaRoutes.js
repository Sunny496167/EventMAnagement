// routes/mediaRoutes.js
const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middleware/auth');
const { uploadMedia, getEventMedia, deleteMedia } = require('../controllers/mediaController');
const { upload } = require('../config/cloudinary'); // Correct import

router.route('/:eventId/media')
  .post(
    authenticateUser,
    upload.single('file'),
    uploadMedia
  )
  .get(authenticateUser, getEventMedia);

router.delete('/media/:mediaId', authenticateUser, deleteMedia);

module.exports = router;