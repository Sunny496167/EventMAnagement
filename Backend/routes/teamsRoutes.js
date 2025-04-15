const express = require('express');
const teamController = require('../controllers/teamsController');
const { authenticateUser, isAdmin } = require('../middleware/auth');
const { upload } = require('../config/cloudinary');

const router = express.Router();

// Admin-only stats route
router.get('/admin/stats', authenticateUser, isAdmin, teamController.getTeamStats);

// Public
router.get('/', teamController.getAllTeamMembers);
router.get('/:id', teamController.getTeamMember);

// Admin: Create, update, delete
router.post(
  '/',
  authenticateUser,
  isAdmin,
  upload.single('profilePic'),
  teamController.createTeamMember
);

router.patch(
  '/:id',
  authenticateUser,
  isAdmin,
  upload.single('profilePic'),
  teamController.updateTeamMember
);

router.delete('/:id', authenticateUser, isAdmin, teamController.deleteTeamMember);

module.exports = router;
