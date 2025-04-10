// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getUser,
  updateUser
} = require('../controllers/userController');
const { authenticateUser, authorizeRoles } = require('../middleware/auth');

router.get('/', authenticateUser, authorizeRoles('admin'), getAllUsers);
router.route('/:id')
  .get(authenticateUser, getUser)
  .patch(authenticateUser, updateUser);

module.exports = router;