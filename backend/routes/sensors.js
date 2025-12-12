const express = require('express');
const router = express.Router();
const SensorData = require('../models/SensorData');

// Get all latest sensor readings
router.get('/latest', async (req, res) => {
  try {
    const sensorTypes = ['waterTemp', 'airTemp', 'waterLevel', 'pH', 'turbidity'];
    const latestData = {};

    for (const type of sensorTypes) {
      const data = await SensorData.findOne({ sensorType: type })
        .sort({ timestamp: -1 })
        .limit(1);
      if (data) {
        latestData[type] = data;
      }
    }

    res.json(latestData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get historical data for a specific sensor
router.get('/:sensorType/history', async (req, res) => {
  try {
    const { sensorType } = req.params;
    const { hours = 24 } = req.query;

    const startTime = new Date();
    startTime.setHours(startTime.getHours() - parseInt(hours));

    const data = await SensorData.find({
      sensorType,
      timestamp: { $gte: startTime }
    }).sort({ timestamp: 1 });

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Post new sensor reading (from Arduino)
router.post('/', async (req, res) => {
  try {
    const sensorData = new SensorData(req.body);
    await sensorData.save();
    res.status(201).json(sensorData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Bulk insert sensor data
router.post('/bulk', async (req, res) => {
  try {
    const { readings } = req.body;
    const result = await SensorData.insertMany(readings);
    res.status(201).json({ 
      message: 'Sensor data inserted successfully', 
      count: result.length 
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
