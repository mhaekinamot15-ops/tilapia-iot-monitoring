const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  settingType: {
    type: String,
    required: true,
    unique: true,
    enum: ['thresholds', 'system', 'automation']
  },
  waterTempThreshold: {
    type: Number,
    default: 28
  },
  phThreshold: {
    type: Number,
    default: 7.2
  },
  turbidityThreshold: {
    type: Number,
    default: 12
  },
  feedingSchedule: [{
    time: String,
    active: Boolean
  }],
  notifications: {
    push: { type: Boolean, default: true },
    sms: { type: Boolean, default: true },
    email: { type: Boolean, default: false }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Settings', settingsSchema);
