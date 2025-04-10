// models/Event.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Event title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Event description is required'],
    trim: true
  },
  startDate: {
    type: Date,
    required: [true, 'Start date is required']
  },
  endDate: {
    type: Date,
    default: function() {
      // Default to 24 hours after start date if not specified
      const date = new Date(this.startDate);
      date.setHours(date.getHours() + 24);
      return date;
    }
  },
  location: {
    type: String,
    required: [true, 'Event location is required'],
    trim: true
  },
  maxSeats: {
    type: Number,
    required: [true, 'Maximum seats is required'],
    min: [1, 'At least one seat must be available']
  },
  registeredAttendees: {
    type: Number,
    default: 0
  },
  imageUrl: {
    type: String,
    default: ''
  },
  videoUrl: {
    type: String
  },
  additionalInfo: {
    type: String,
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  updatedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Virtual for checking if event is full
EventSchema.virtual('isFull').get(function() {
  return this.registeredAttendees >= this.maxSeats;
});

// Virtual for remaining seats
EventSchema.virtual('remainingSeats').get(function() {
  return Math.max(0, this.maxSeats - this.registeredAttendees);
});

// Add a method to check event status (upcoming, current, past)
EventSchema.methods.getStatus = function() {
  const now = new Date();
  if (now < this.startDate) {
    return 'upcoming';
  } else if (now >= this.startDate && now <= this.endDate) {
    return 'current';
  } else {
    return 'past';
  }
};

// Indexes for efficient queries
EventSchema.index({ startDate: 1 });
EventSchema.index({ endDate: 1 });
EventSchema.index({ title: 'text', description: 'text', location: 'text' });

module.exports = mongoose.model('Event', EventSchema);
