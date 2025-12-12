const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
  deviceName: {
    type: String,
    required: true,
    enum: ['aerator', 'lights', 'feeder', 'heater']
  },
  status: {
    type: Boolean,
    default: false
  },
  autoMode: {
    type: Boolean,
    default: true
  },
  dutyCycle: {
    type: Number,
    min: 0,
    max: 100,
    default: 70
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Device', deviceSchema);
