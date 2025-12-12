const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  deviceName: {
    type: String,
    required: true,
    enum: ['aerator', 'lights', 'feeder', 'heater']
  },
  scheduleName: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true,
    match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/ // 24-hour format HH:MM
  },
  action: {
    type: String,
    enum: ['on', 'off'],
    required: true
  },
  enabled: {
    type: Boolean,
    default: true
  },
  days: [{
    type: String,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for efficient querying
scheduleSchema.index({ deviceName: 1, time: 1 });

module.exports = mongoose.model('Schedule', scheduleSchema);
