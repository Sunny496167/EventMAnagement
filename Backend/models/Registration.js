// models/Registration.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RegistrationSchema = new Schema({
  event: {
    type: Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  // For non-registered users
  guestInfo: {
    name: {
      type: String,
      trim: true
    },
    email: {
      type: String,
      trim: true,
      lowercase: true
    },
    phone: {
      type: String,
      trim: true
    }
  },
  specialRequests: {
    type: String,
    trim: true
  },
  checkInTime: {
    type: Date
  },
  checkInStatus: {
    type: String,
    enum: ['pending', 'checked-in', 'no-show'],
    default: 'pending'
  },
  ticketNumber: {
    type: String,
    unique: true
  },
  registeredBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  status: {
    type: String,
    enum: ['confirmed', 'cancelled', 'waitlisted'],
    default: 'confirmed'
  }
}, {
  timestamps: true
});

// Generate a unique ticket number before saving
RegistrationSchema.pre('save', async function(next) {
  if (!this.ticketNumber) {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    
    this.ticketNumber = `TKT-${year}${month}-${random}`;
  }
  next();
});

// Ensure either user or guestInfo is provided
RegistrationSchema.pre('validate', function(next) {
  if (!this.user && (!this.guestInfo || !this.guestInfo.email)) {
    next(new Error('Either a user ID or guest information with email is required'));
  } else {
    next();
  }
});

module.exports = mongoose.model('Registration', RegistrationSchema);