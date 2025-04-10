// models/Feedback.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FeedbackSchema = new Schema({
  event: {
    type: Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  guestEmail: {
    type: String,
    trim: true,
    lowercase: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  comments: {
    type: String,
    trim: true
  },
  anonymous: {
    type: Boolean,
    default: false
  },
  categories: [{
    category: {
      type: String,
      enum: ['content', 'speaker', 'venue', 'organization', 'catering', 'other'],
      required: true
    },
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    comments: String
  }]
}, {
  timestamps: true
});

// Ensure either user or guestEmail is provided
FeedbackSchema.pre('validate', function(next) {
  if (!this.user && !this.guestEmail) {
    next(new Error('Either a user ID or guest email is required'));
  } else {
    next();
  }
});

module.exports = mongoose.model('Feedback', FeedbackSchema);