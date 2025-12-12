const express = require('express');
const router = express.Router();
const Schedule = require('../models/Schedule');

// Get all schedules
router.get('/', async (req, res) => {
  try {
    const { deviceName } = req.query;
    const filter = deviceName ? { deviceName } : {};
    const schedules = await Schedule.find(filter).sort({ time: 1 });
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get schedules for specific device
router.get('/:deviceName', async (req, res) => {
  try {
    const schedules = await Schedule.find({ 
      deviceName: req.params.deviceName 
    }).sort({ time: 1 });
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new schedule
router.post('/', async (req, res) => {
  try {
    const schedule = new Schedule(req.body);
    await schedule.save();
    res.status(201).json(schedule);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update schedule
router.put('/:id', async (req, res) => {
  try {
    const schedule = await Schedule.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!schedule) {
      return res.status(404).json({ error: 'Schedule not found' });
    }
    res.json(schedule);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Toggle schedule enabled/disabled
router.patch('/:id/toggle', async (req, res) => {
  try {
    const schedule = await Schedule.findById(req.params.id);
    if (!schedule) {
      return res.status(404).json({ error: 'Schedule not found' });
    }
    schedule.enabled = !schedule.enabled;
    await schedule.save();
    res.json(schedule);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete schedule
router.delete('/:id', async (req, res) => {
  try {
    const schedule = await Schedule.findByIdAndDelete(req.params.id);
    if (!schedule) {
      return res.status(404).json({ error: 'Schedule not found' });
    }
    res.json({ message: 'Schedule deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
