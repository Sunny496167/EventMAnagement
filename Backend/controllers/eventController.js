const Event = require('../models/Event');
const Registration = require('../models/Registration');
const Media = require('../models/Media');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError, ForbiddenError } = require('../utils/errors');

// Get all events with filters
exports.getAllEvents = async (req, res) => {
  // Extract query parameters
  const { search, status, page = 1, limit = 10, sort = '-startDate' } = req.query;
  
  // Build query
  const queryObject = { isActive: true };
  
  // Search functionality
  if (search) {
    queryObject.$text = { $search: search };
  }
  
  // Filter by status
  if (status) {
    const now = new Date();
    
    if (status === 'upcoming') {
      queryObject.startDate = { $gt: now };
    } else if (status === 'current') {
      queryObject.startDate = { $lte: now };
      queryObject.endDate = { $gte: now };
    } else if (status === 'past') {
      queryObject.endDate = { $lt: now };
    }
  }
  
  // Execute query with pagination
  const skip = (Number(page) - 1) * Number(limit);
  
  const events = await Event.find(queryObject)
    .sort(sort)
    .skip(skip)
    .limit(Number(limit))
    .select('-__v');
  
  // Get total count for pagination
  const totalEvents = await Event.countDocuments(queryObject);
  
  res.status(StatusCodes.OK).json({
    events,
    count: events.length,
    totalPages: Math.ceil(totalEvents / Number(limit)),
    currentPage: Number(page)
  });
};

// Get a single event by ID
exports.getEvent = async (req, res) => {
  const { id: eventId } = req.params;
  
  const event = await Event.findOne({ _id: eventId, isActive: true });
  
  if (!event) {
    throw new NotFoundError(`No event found with ID: ${eventId}`);
  }
  
  // Get associated media
  const media = await Media.find({ event: eventId, isPublic: true }).select('-__v');
  
  res.status(StatusCodes.OK).json({ event, media });
};

// Create a new event
exports.createEvent = async (req, res) => {
  req.body.createdBy = req.user.userId;
  
  const event = await Event.create(req.body);
  
  res.status(StatusCodes.CREATED).json({ event });
};

// Update an event
exports.updateEvent = async (req, res) => {
  const { id: eventId } = req.params;
  const userId = req.user.userId;
  
  const event = await Event.findOne({ _id: eventId });
  
  if (!event) {
    throw new NotFoundError(`No event found with ID: ${eventId}`);
  }
  
  // Check if user is admin or the creator of the event
  if (req.user.role !== 'admin' && event.createdBy.toString() !== userId) {
    throw new ForbiddenError('You do not have permission to update this event');
  }
  
  req.body.updatedBy = userId;
  
  const updatedEvent = await Event.findByIdAndUpdate(
    eventId,
    req.body,
    { new: true, runValidators: true }
  );
  
  res.status(StatusCodes.OK).json({ event: updatedEvent });
};

// Delete an event (soft delete)
exports.deleteEvent = async (req, res) => {
  const { id: eventId } = req.params;
  const userId = req.user.userId;
  
  const event = await Event.findOne({ _id: eventId });
  
  if (!event) {
    throw new NotFoundError(`No event found with ID: ${eventId}`);
  }
  
  // Check if user is admin or the creator of the event
  if (req.user.role !== 'admin' && event.createdBy.toString() !== userId) {
    throw new ForbiddenError('You do not have permission to delete this event');
  }
  
  // Soft delete by setting isActive to false
  event.isActive = false;
  event.updatedBy = userId;
  await event.save();
  
  res.status(StatusCodes.OK).json({ message: 'Event deleted successfully' });
};

// Controller for registering for an event
exports.registerForEvent = async (req, res) => {
  const { id: eventId } = req.params;
  const userId = req.user?.userId;
  
  // Find the event
  const event = await Event.findOne({ _id: eventId, isActive: true });
  
  if (!event) {
    throw new NotFoundError(`No event found with ID: ${eventId}`);
  }
  
  // Check if event is in the past
  if (new Date() > event.endDate) {
    throw new BadRequestError('Cannot register for a past event');
  }
  
  // Check if event is full
  if (event.registeredAttendees >= event.maxSeats) {
    throw new BadRequestError('This event is already full');
  }
  
  // Check if user is already registered
  if (userId) {
    const existingRegistration = await Registration.findOne({
      event: eventId,
      user: userId,
      status: { $ne: 'cancelled' }
    });
    
    if (existingRegistration) {
      throw new BadRequestError('You are already registered for this event');
    }
  }
  
  // Create registration object
  const registration = {
    event: eventId,
    registeredBy: userId,
    status: 'confirmed'
  };
  
  // Handle registered user vs guest registration
  if (userId) {
    registration.user = userId;
  } else {
    // Guest registration requires email
    if (!req.body.email) {
      throw new BadRequestError('Email is required for guest registration');
    }
    
    registration.guestInfo = {
      name: req.body.name || 'Guest',
      email: req.body.email,
      phone: req.body.phone || ''
    };
    
    // Check if this email is already registered
    const existingGuestRegistration = await Registration.findOne({
      event: eventId,
      'guestInfo.email': req.body.email,
      status: { $ne: 'cancelled' }
    });
    
    if (existingGuestRegistration) {
      throw new BadRequestError('This email is already registered for this event');
    }
  }
  
  // Add special requests if provided
  if (req.body.specialRequests) {
    registration.specialRequests = req.body.specialRequests;
  }
  
  // Create the registration
  const newRegistration = await Registration.create(registration);
  
  // Increment the registeredAttendees count
  event.registeredAttendees += 1;
  await event.save();
  
  res.status(StatusCodes.CREATED).json({ 
    registration: newRegistration,
    remainingSeats: event.maxSeats - event.registeredAttendees
  });
};

// Controller for cancelling a registration
exports.cancelRegistration = async (req, res) => {
  const { id: eventId, registrationId } = req.params;
  const userId = req.user?.userId;
  
  // Find the registration
  const registration = await Registration.findOne({ _id: registrationId, event: eventId });
  
  if (!registration) {
    throw new NotFoundError(`No registration found with ID: ${registrationId}`);
  }
  
  // Check if user has permission to cancel
  const isAdmin = req.user?.role === 'admin';
  const isOwner = userId && registration.user && registration.user.toString() === userId;
  const isRegistrar = userId && registration.registeredBy && registration.registeredBy.toString() === userId;
  
  if (!isAdmin && !isOwner && !isRegistrar) {
    throw new ForbiddenError('You do not have permission to cancel this registration');
  }
  
  // Update registration status
  registration.status = 'cancelled';
  await registration.save();
  
  // Decrement the registeredAttendees count if it wasn't already counted as cancelled
  if (registration.status !== 'cancelled') {
    const event = await Event.findById(eventId);
    if (event) {
      event.registeredAttendees = Math.max(0, event.registeredAttendees - 1);
      await event.save();
    }
  }
  
  res.status(StatusCodes.OK).json({ 
    message: 'Registration cancelled successfully',
    registration
  });
};

// Get registrations for an event (admin only)
exports.getEventRegistrations = async (req, res) => {
  const { id: eventId } = req.params;
  const { status, page = 1, limit = 25 } = req.query;
  
  // Check if event exists
  const event = await Event.findOne({ _id: eventId, isActive: true });
  
  if (!event) {
    throw new NotFoundError(`No event found with ID: ${eventId}`);
  }
  
  // Build query
  const queryObject = { event: eventId };
  
  if (status) {
    queryObject.status = status;
  }
  
  // Pagination
  const skip = (Number(page) - 1) * Number(limit);
  
  // Get registrations
  const registrations = await Registration.find(queryObject)
    .populate('user', 'firstName lastName email')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(Number(limit));
  
  // Get total count
  const totalRegistrations = await Registration.countDocuments(queryObject);
  
  res.status(StatusCodes.OK).json({
    registrations,
    count: registrations.length,
    totalPages: Math.ceil(totalRegistrations / Number(limit)),
    currentPage: Number(page)
  });
};
