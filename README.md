# 🐟 Tilapia IoT Smart Monitoring System

A comprehensive full-stack IoT monitoring and automation system for tilapia aquaculture, featuring real-time sensor data tracking, automated device control, and intelligent scheduling capabilities.

This is a code bundle for Tilapia IoT Monitoring UI. The original project is available at https://www.figma.com/design/MM3iOs9pESW6bawiXgyzmP/Tilapia-IoT-Monitoring-UI.

---

## 📋 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Quick Start](#quick-start)
- [Backend API](#backend-api)
- [Frontend Application](#frontend-application)
- [Authentication](#authentication)
- [Deployment](#deployment)
- [Arduino Integration](#arduino-integration)

---

## 🎯 Overview

This system helps fish farmers monitor and automate their tilapia aquaculture operations. It tracks water quality parameters in real-time and allows remote control of devices like aerators, lights, feeders, and heaters through a web interface.

### What It Does:
- **Monitors** water temperature, air temperature, water level, pH, and turbidity
- **Controls** aerator, UV lights, auto feeder, and heater remotely
- **Schedules** automated device operations (e.g., turn aerator on/off at specific times)
- **Alerts** operators when parameters exceed safe thresholds
- **Tracks** historical data and trends for analysis

---

## ✨ Features

### 📊 Real-Time Monitoring
- 5 sensor types: Water Temp, Air Temp, Water Level, pH, Turbidity
- Live data visualization with color-coded status indicators
- Historical data charts (24-hour trends)
- System uptime and performance metrics

### 🎛️ Device Control
- Remote on/off control for all devices
- Manual and automatic operation modes
- Duty cycle adjustment for aerator
- Emergency controls for critical situations

### ⏰ Smart Scheduling
- Create time-based schedules for device automation
- Turn devices on/off at specific times
- Enable/disable schedules individually
- Daily recurring schedules

### 🔔 Notifications & Alerts
- Real-time alerts for abnormal readings
- Three severity levels: Normal, Warning, Critical
- Push notifications, SMS, and email support
- Alert history tracking

### 👤 User Authentication
- JWT-based secure authentication
- User registration and login
- Protected routes and API endpoints
- Session management

### 📈 Analytics Dashboard
- Interactive charts for trend analysis
- Multi-parameter comparison
- Data export capabilities
- System status overview

---

## 🛠️ Technology Stack

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (MongoDB Atlas)
- **Authentication:** JWT (jsonwebtoken) + bcryptjs
- **ODM:** Mongoose
- **CORS:** Cross-origin resource sharing enabled

### Frontend
- **Framework:** Vanilla JavaScript (ES6+)
- **Build Tool:** Vite
- **UI:** Custom CSS with modern design
- **Charts:** Chart.js
- **State Management:** Local state management
- **Storage:** LocalStorage for auth tokens

### DevOps
- **Version Control:** Git/GitHub
- **Deployment:** Render (Backend), Render/Vercel (Frontend)
- **Environment:** dotenv for configuration

---

## 📁 Project Structure

```
Tilapia IoT Monitoring UI/
│
├── backend/                      # Node.js Backend
│   ├── models/                   # MongoDB Models
│   │   ├── User.js              # User authentication model
│   │   ├── SensorData.js        # Sensor readings model
│   │   ├── Device.js            # Device control model
│   │   ├── Schedule.js          # Device scheduling model
│   │   ├── Notification.js      # Alerts model
│   │   └── Settings.js          # System settings model
│   │
│   ├── routes/                   # API Routes
│   │   ├── auth.js              # Login/Register endpoints
│   │   ├── sensors.js           # Sensor data endpoints
│   │   ├── devices.js           # Device control endpoints
│   │   ├── schedules.js         # Scheduling endpoints
│   │   ├── notifications.js     # Notification endpoints
│   │   └── settings.js          # Settings endpoints
│   │
│   ├── middleware/               # Custom Middleware
│   │   └── auth.js              # JWT authentication middleware
│   │
│   ├── server.js                # Main server file
│   ├── seed.js                  # Database seeder
│   ├── package.json             # Backend dependencies
│   ├── .env                     # Environment variables (not in repo)
│   └── README.md                # Backend documentation
│
├── src/                         # Frontend Source
│   ├── api.js                   # API client functions
│   ├── auth.js                  # Authentication helper
│   ├── script.js                # Main application logic
│   ├── styles.css               # Main stylesheet
│   ├── index.html               # HTML template
│   │
│   └── components/              # UI Components (unused in current setup)
│       └── ui/                  # Reusable UI components
│
├── index.html                   # Main entry HTML
├── package.json                 # Frontend dependencies
├── vite.config.ts               # Vite configuration
├── DEPLOYMENT_GUIDE.md          # Deployment instructions
└── README.md                    # This file
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js v16+ installed
- MongoDB Atlas account (or local MongoDB)
- Git installed

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/tilapia-iot-monitoring.git
cd tilapia-iot-monitoring
```

### 2. Setup Backend
```bash
cd backend
npm install

# Create .env file
echo "PORT=5000" > .env
echo "MONGODB_URI=your_mongodb_connection_string" >> .env
echo "JWT_SECRET=your_secret_key" >> .env
echo "FRONTEND_URL=http://localhost:3000" >> .env

# Start backend server
npm run dev
```

Backend runs at: **http://localhost:5000**

### 3. Setup Frontend
```bash
# In root directory
npm install

# Start frontend dev server
npm run dev
```

Frontend runs at: **http://localhost:3000**

### 4. Seed Database (Optional)
```bash
cd backend
node seed.js
```

---

## 🔌 Backend API

Base URL: `http://localhost:5000/api`

### Authentication Endpoints
```
POST   /auth/register      - Register new user
POST   /auth/login         - Login user
GET    /auth/me            - Get current user (protected)
POST   /auth/logout        - Logout user (protected)
```

### Sensor Endpoints
```
GET    /sensors/latest                - Get latest readings from all sensors
GET    /sensors/:type/history?hours=24 - Get historical data
POST   /sensors                       - Add new sensor reading (from Arduino)
POST   /sensors/bulk                  - Bulk insert sensor data
```

### Device Endpoints
```
GET    /devices              - Get all devices status
GET    /devices/:name        - Get specific device
PUT    /devices/:name        - Update device settings
PATCH  /devices/:name/toggle - Toggle device on/off
```

### Schedule Endpoints
```
GET    /schedules                - Get all schedules
GET    /schedules/:deviceName    - Get schedules for device
POST   /schedules                - Create new schedule
PUT    /schedules/:id            - Update schedule
PATCH  /schedules/:id/toggle     - Enable/disable schedule
DELETE /schedules/:id            - Delete schedule
```

### Notification Endpoints
```
GET    /notifications        - Get all notifications
GET    /notifications/unread - Get unread notifications
POST   /notifications        - Create notification
PATCH  /notifications/:id/read - Mark as read
DELETE /notifications/:id    - Delete notification
DELETE /notifications        - Clear all notifications
```

### Settings Endpoints
```
GET    /settings    - Get system settings
PUT    /settings    - Update settings
```

### Health Check
```
GET    /health      - Check if API is running
```

---

## 🎨 Frontend Application

### Pages

#### 1. Dashboard (Home)
- Overview of all sensor readings
- System status and uptime
- Recent alerts
- Quick stats

#### 2. Analytics
- Historical data charts
- Multi-parameter trend analysis
- Time-range filtering
- Data export

#### 3. Device Control
- Manual device controls
- Automated scheduling
- Duty cycle adjustment
- Emergency controls

#### 4. Notifications
- All system alerts
- Filter by severity
- Mark as read/unread
- Clear notifications

#### 5. Settings
- Threshold configuration
- System preferences
- User profile
- Data management

### Features
- **Responsive Design:** Works on desktop, tablet, and mobile
- **Real-Time Updates:** Live sensor data display
- **Interactive Charts:** Zoom, hover, and export
- **Dark Theme:** Modern dark UI optimized for monitoring
- **Fast Navigation:** Sidebar navigation with active states

---

## 🔐 Authentication

### How It Works
1. User registers with username, email, and password
2. Password is hashed using bcryptjs
3. JWT token is generated on successful login
4. Token stored in localStorage
5. Token sent in Authorization header for protected routes
6. Token expires after 7 days

### Protected Routes
- All sensor data endpoints (optional)
- Device control endpoints
- Schedule management
- Settings updates

### Login Flow
```javascript
// Frontend login
const result = await authAPI.login(username, password);
// Token stored automatically in localStorage

// API calls with token
fetch('/api/devices', {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
})
```

---

## 🌐 Deployment

See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for complete deployment instructions.

### Quick Deployment Steps

1. **MongoDB Atlas**
   - Create free cluster
   - Create database user
   - Whitelist IP (0.0.0.0/0)
   - Get connection string

2. **Deploy Backend to Render**
   - Push code to GitHub
   - Create Web Service on Render
   - Add environment variables
   - Deploy

3. **Deploy Frontend**
   - Update API URL in src/api.js
   - Build: `npm run build`
   - Deploy to Render/Vercel

---

## 🔧 Arduino Integration

### Sending Sensor Data to API

```cpp
#include <WiFi.h>
#include <HTTPClient.h>

const char* serverUrl = "https://your-api.onrender.com/api/sensors/bulk";

void sendSensorData(float waterTemp, float pH, float turbidity) {
  HTTPClient http;
  http.begin(serverUrl);
  http.addHeader("Content-Type", "application/json");
  
  String jsonData = "{\"readings\":[";
  jsonData += "{\"sensorType\":\"waterTemp\",\"value\":" + String(waterTemp) + ",\"unit\":\"°C\",\"status\":\"normal\"},";
  jsonData += "{\"sensorType\":\"pH\",\"value\":" + String(pH) + ",\"unit\":\"\",\"status\":\"normal\"},";
  jsonData += "{\"sensorType\":\"turbidity\",\"value\":" + String(turbidity) + ",\"unit\":\"NTU\",\"status\":\"normal\"}";
  jsonData += "]}";
  
  int httpResponseCode = http.POST(jsonData);
  
  if (httpResponseCode > 0) {
    Serial.println("Data sent successfully");
  } else {
    Serial.println("Error sending data");
  }
  
  http.end();
}
```

### Reading Device Status from API

```cpp
void checkDeviceStatus() {
  HTTPClient http;
  http.begin("https://your-api.onrender.com/api/devices/aerator");
  
  int httpResponseCode = http.GET();
  
  if (httpResponseCode > 0) {
    String response = http.getString();
    // Parse JSON and control device
  }
  
  http.end();
}
```

---

## 📝 Environment Variables

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/tilapia-iot
NODE_ENV=production
FRONTEND_URL=https://your-frontend.com
JWT_SECRET=your_secret_key_here
```

### Frontend (src/api.js)
```javascript
const API_BASE_URL = 'https://your-backend.onrender.com/api';
```

---

## 🐛 Troubleshooting

**Backend not connecting to MongoDB:**
- Check MONGODB_URI in .env
- Verify network access in MongoDB Atlas
- Ensure database user credentials are correct

**Frontend can't reach backend:**
- Check CORS settings in backend
- Verify API_BASE_URL in src/api.js
- Ensure both servers are running

**Authentication not working:**
- Check JWT_SECRET is set
- Verify token is stored in localStorage
- Check token expiration (7 days)

---

## 📄 License

MIT License - Feel free to use this project for educational purposes.

---

## 👥 Credits

Developed for aquaculture automation and monitoring.
Built with ❤️ for tilapia farmers.

---

## 📞 Support

For issues and questions, please refer to:
- [Backend Documentation](backend/README.md)
- [Deployment Guide](DEPLOYMENT_GUIDE.md)

---

**Last Updated:** December 2025
  