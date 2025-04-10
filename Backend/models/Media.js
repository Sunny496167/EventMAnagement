// models/Media.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MediaSchema = new Schema({
  event: {
    type: Schema.Types.ObjectId,
    ref: 'Event'
  },
  type: {
    type: String,
    enum: ['image', 'video', 'document'],
    required: true
  },
  title: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  url: {
    type: String,
    required: true
  },
  fileKey: {
    type: String,
    // For storage reference (e.g., S3 key)
  },
  mimeType: {
    type: String
  },
  size: {
    type: Number // in bytes
  },
  uploadedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isPublic: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Media', MediaSchema);