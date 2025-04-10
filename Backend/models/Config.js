// models/Config.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// For system-wide configuration and settings
const ConfigSchema = new Schema({
  key: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  value: {
    type: Schema.Types.Mixed,
    required: true
  },
  description: {
    type: String,
    trim: true
  },
  updatedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Config', ConfigSchema);