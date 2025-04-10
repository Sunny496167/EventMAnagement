// models/Notification.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
  event: {
    type: Schema.Types.ObjectId,
    ref: 'Event'
  },
  type: {
    type: String,
    enum: ['reminder', 'update', 'cancellation', 'custom'],
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  message: {
    type: String,
    required: true,
    trim: true
  },
  recipients: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    email: String,
    sentAt: Date,
    deliveryStatus: {
      type: String,
      enum: ['pending', 'sent', 'failed', 'delivered'],
      default: 'pending'
    },
    openedAt: Date
  }],
  scheduledFor: {
    type: Date
  },
  sentBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['draft', 'scheduled', 'sending', 'sent', 'cancelled'],
    default: 'draft'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Notification', NotificationSchema);