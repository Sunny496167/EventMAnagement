// routes/eventRoutes.js
const express = require('express');
const router = express.Router();
const {
  getAllEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  registerForEvent,
  cancelRegistration,
  getEventRegistrations
} = require('../controllers/eventController'); // Verify this path is correct

const { authenticateUser, isAdmin } = require('../middleware/auth');

// Public routes
router.get('/', getAllEvents);
router.get('/:id', getEvent);

// Protected routes
router.post('/', authenticateUser, isAdmin, createEvent);
router.patch('/:id', authenticateUser, updateEvent);
router.delete('/:id', authenticateUser, deleteEvent);

// Registration routes
router.post('/:id/registrations', authenticateUser, registerForEvent);
router.delete('/:id/registrations/:registrationId', authenticateUser, cancelRegistration);
router.get('/:id/registrations', authenticateUser, isAdmin, getEventRegistrations);

module.exports = router;