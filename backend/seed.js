const SensorData = require('./models/SensorData');
const Device = require('./models/Device');
const Notification = require('./models/Notification');
const Settings = require('./models/Settings');
const mongoose = require('mongoose');
require('dotenv').config();

// Seed data for testing
const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/tilapia-iot');
    console.log('Connected to MongoDB');

    // Clear existing data
    await SensorData.deleteMany({});
    await Device.deleteMany({});
    await Notification.deleteMany({});
    await Settings.deleteMany({});

    // Seed Sensor Data
    const sensorReadings = [
      { sensorType: 'waterTemp', value: 28.3, unit: '°C', status: 'normal' },
      { sensorType: 'airTemp', value: 31.5, unit: '°C', status: 'normal' },
      { sensorType: 'waterLevel', value: 87, unit: '%', status: 'normal' },
      { sensorType: 'pH', value: 7.2, unit: '', status: 'normal' },
      { sensorType: 'turbidity', value: 12.4, unit: 'NTU', status: 'warning' }
    ];
    await SensorData.insertMany(sensorReadings);
    console.log('✅ Sensor data seeded');

    // Seed Devices
    const devices = [
      { deviceName: 'aerator', status: true, autoMode: true, dutyCycle: 70 },
      { deviceName: 'lights', status: false, autoMode: false, dutyCycle: 0 },
      { deviceName: 'feeder', status: false, autoMode: true, dutyCycle: 0 },
      { deviceName: 'heater', status: true, autoMode: true, dutyCycle: 60 }
    ];
    await Device.insertMany(devices);
    console.log('✅ Devices seeded');

    // Seed Notifications
    const notifications = [
      {
        title: 'Turbidity Level Rising',
        message: 'Turbidity has increased to 12.4 NTU. Consider water change.',
        severity: 'warning',
        read: false
      },
      {
        title: 'pH Level Optimal',
        message: 'pH stabilized at 7.2. Water quality is good.',
        severity: 'normal',
        read: false
      },
      {
        title: 'Temperature Alert',
        message: 'Water temperature reached 30°C. Aeration activated.',
        severity: 'critical',
        read: true
      }
    ];
    await Notification.insertMany(notifications);
    console.log('✅ Notifications seeded');

    // Seed Settings
    const settings = new Settings({
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
    console.log('✅ Settings seeded');

    console.log('🎉 Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
