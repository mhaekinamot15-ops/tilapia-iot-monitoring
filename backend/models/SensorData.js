const mongoose = require('mongoose');

const sensorDataSchema = new mongoose.Schema({
  sensorType: {
    type: String,
    required: true,
    enum: ['waterTemp', 'airTemp', 'waterLevel', 'pH', 'turbidity']
  },
  value: {
    type: Number,
    required: true
  },
  unit: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['normal', 'warning', 'critical'],
    default: 'normal'
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for efficient querying
sensorDataSchema.index({ sensorType: 1, timestamp: -1 });

module.exports = mongoose.model('SensorData', sensorDataSchema);
