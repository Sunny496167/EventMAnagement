const Media = require('../models/Media');
const Event = require('../models/Event');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError, ForbiddenError } = require('../utils/errors');
const { cloudinary } = require('../config/cloudinary');

// Helper function to determine media type
const getMediaType = (mimeType) => {
  if (mimeType.startsWith('image/')) return 'image';
  if (mimeType.startsWith('video/')) return 'video';
  return 'document';
};

// Upload media to an event
exports.uploadMedia = async (req, res) => {
  const { eventId } = req.params;
  const userId = req.user.userId;

  // Validate event and permissions
  const event = await Event.findById(eventId);
  if (!event) throw new NotFoundError(`No event found with ID: ${eventId}`);

  if (req.user.role !== 'admin' && event.createdBy.toString() !== userId) {
    throw new ForbiddenError('No permission to upload media to this event');
  }

  if (!req.file) throw new BadRequestError('No file uploaded');

  // Create media record from Cloudinary response
  const media = await Media.create({
    event: eventId,
    type: getMediaType(req.file.mimetype),
    title: req.body.title || req.file.originalname,
    description: req.body.description || '',
    url: req.file.path, // Cloudinary URL from Multer middleware
    fileKey: req.file.filename, // Cloudinary public_id
    mimeType: req.file.mimetype,
    size: req.file.size,
    uploadedBy: userId,
    isPublic: req.body.isPublic !== 'false'
  });

  res.status(StatusCodes.CREATED).json({ media });
};

// Get all media for an event
exports.getEventMedia = async (req, res) => {
  const { eventId } = req.params;
  const { type } = req.query;

  const event = await Event.findOne({ _id: eventId, isActive: true });
  if (!event) throw new NotFoundError(`No event found with ID: ${eventId}`);

  const query = { event: eventId };
  
  // Access control for non-admins
  if (req.user.role !== 'admin' && event.createdBy.toString() !== req.user.userId) {
    query.isPublic = true;
  }

  if (type) query.type = type;

  const media = await Media.find(query)
    .sort('-createdAt')
    .select('-__v');

  res.status(StatusCodes.OK).json({ media, count: media.length });
};

// Delete media
exports.deleteMedia = async (req, res) => {
  const { mediaId } = req.params;
  const userId = req.user.userId;

  const media = await Media.findById(mediaId);
  if (!media) throw new NotFoundError(`No media found with ID: ${mediaId}`);

  // Authorization check
  if (req.user.role !== 'admin' && media.uploadedBy.toString() !== userId) {
    throw new ForbiddenError('No permission to delete this media');
  }

  // Cloudinary deletion
  if (media.fileKey) {
    await cloudinary.uploader.destroy(media.fileKey);
  }

  await Media.findByIdAndDelete(mediaId);

  res.status(StatusCodes.OK).json({ 
    message: 'Media deleted successfully',
    deletedMedia: media
  });
};