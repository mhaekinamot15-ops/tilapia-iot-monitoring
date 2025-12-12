const express = require('express');
const router = express.Router();
const Settings = require('../models/Settings');

// Get settings
router.get('/', async (req, res) => {
  try {
    let settings = await Settings.findOne({ settingType: 'thresholds' });
    if (!settings) {
      // Create default settings if none exist
      settings = new Settings({
        settingType: 'thresholds',
        waterTempThreshold: 28,
        phThreshold: 7.2,
        turbidityThreshold: 12,
        feedingSchedule: [
          { time: '08:00 AM', active: true },
          { time: '02:00 PM', active: true },
          { time: '08:00 PM', active: true }
        ],
        notifications: {
          push: true,
          sms: true,
          email: false
        }
      });
      await settings.save();
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update settings
router.put('/', async (req, res) => {
  try {
    const settings = await Settings.findOneAndUpdate(
      { settingType: 'thresholds' },
      req.body,
      { new: true, upsert: true }
    );
    res.json(settings);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
