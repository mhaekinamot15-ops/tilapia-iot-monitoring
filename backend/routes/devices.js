const express = require('express');
const router = express.Router();
const Device = require('../models/Device');

// Get all devices
router.get('/', async (req, res) => {
  try {
    const devices = await Device.find();
    res.json(devices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get specific device
router.get('/:deviceName', async (req, res) => {
  try {
    const device = await Device.findOne({ deviceName: req.params.deviceName });
    if (!device) {
      return res.status(404).json({ error: 'Device not found' });
    }
    res.json(device);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update device status
router.put('/:deviceName', async (req, res) => {
  try {
    const { status, autoMode, dutyCycle } = req.body;
    const device = await Device.findOneAndUpdate(
      { deviceName: req.params.deviceName },
      { 
        status, 
        autoMode, 
        dutyCycle,
        lastUpdated: Date.now()
      },
      { new: true, upsert: true }
    );
    res.json(device);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Toggle device on/off
router.patch('/:deviceName/toggle', async (req, res) => {
  try {
    const device = await Device.findOne({ deviceName: req.params.deviceName });
    if (!device) {
      return res.status(404).json({ error: 'Device not found' });
    }
    device.status = !device.status;
    device.lastUpdated = Date.now();
    await device.save();
    res.json(device);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
