// API Configuration
const API_BASE_URL = 'https://tilapia-iot-monitoring.onrender.com/api';

// API Helper Functions
const api = {
  // Sensor API calls
  async getLatestSensors() {
    const response = await fetch(`${API_BASE_URL}/sensors/latest`);
    return await response.json();
  },
  
  async getSensorHistory(sensorType, hours = 24) {
    const response = await fetch(`${API_BASE_URL}/sensors/${sensorType}/history?hours=${hours}`);
    return await response.json();
  },
  
  async sendSensorData(sensorData) {
    const response = await fetch(`${API_BASE_URL}/sensors`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sensorData)
    });
    return await response.json();
  },
  
  // Device API calls
  async getDevices() {
    const response = await fetch(`${API_BASE_URL}/devices`);
    return await response.json();
  },
  
  async updateDevice(deviceName, data) {
    const response = await fetch(`${API_BASE_URL}/devices/${deviceName}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await response.json();
  },
  
  async toggleDevice(deviceName) {
    const response = await fetch(`${API_BASE_URL}/devices/${deviceName}/toggle`, {
      method: 'PATCH'
    });
    return await response.json();
  },
  
  // Notification API calls
  async getNotifications() {
    const response = await fetch(`${API_BASE_URL}/notifications`);
    return await response.json();
  },
  
  async createNotification(notification) {
    const response = await fetch(`${API_BASE_URL}/notifications`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(notification)
    });
    return await response.json();
  },
  
  async markNotificationRead(id) {
    const response = await fetch(`${API_BASE_URL}/notifications/${id}/read`, {
      method: 'PATCH'
    });
    return await response.json();
  },
  
  async clearAllNotifications() {
    const response = await fetch(`${API_BASE_URL}/notifications`, {
      method: 'DELETE'
    });
    return await response.json();
  },
  
  // Settings API calls
  async getSettings() {
    const response = await fetch(`${API_BASE_URL}/settings`);
    return await response.json();
  },
  
  async updateSettings(settings) {
    const response = await fetch(`${API_BASE_URL}/settings`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings)
    });
    return await response.json();
  },

  // Schedule API calls
  async getSchedules(deviceName = null) {
    const url = deviceName 
      ? `${API_BASE_URL}/schedules/${deviceName}`
      : `${API_BASE_URL}/schedules`;
    const response = await fetch(url);
    return await response.json();
  },

  async createSchedule(schedule) {
    const response = await fetch(`${API_BASE_URL}/schedules`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(schedule)
    });
    return await response.json();
  },

  async updateSchedule(id, schedule) {
    const response = await fetch(`${API_BASE_URL}/schedules/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(schedule)
    });
    return await response.json();
  },

  async toggleSchedule(id) {
    const response = await fetch(`${API_BASE_URL}/schedules/${id}/toggle`, {
      method: 'PATCH'
    });
    return await response.json();
  },

  async deleteSchedule(id) {
    const response = await fetch(`${API_BASE_URL}/schedules/${id}`, {
      method: 'DELETE'
    });
    return await response.json();
  }
};

// Export for use in script.js
window.api = api;
window.API_BASE_URL = API_BASE_URL;
