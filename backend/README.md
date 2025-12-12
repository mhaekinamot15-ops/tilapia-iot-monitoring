# Tilapia IoT Monitoring System - Backend

Backend API for the Tilapia IoT Smart Aquaculture Monitoring System built with Node.js, Express, and MongoDB.

## 🚀 Features

- **Real-time Sensor Data Management** - Store and retrieve water quality readings
- **Device Control** - Manage aerator, lights, feeder, and heater
- **Notifications System** - Alert management with severity levels
- **Settings Management** - Configure thresholds and automation rules
- **RESTful API** - Clean API endpoints for frontend integration

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB Atlas account or local MongoDB
- Git

## 🛠️ Installation & Setup

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the backend directory:

```env
PORT=5000
MONGODB_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/tilapia-iot?retryWrites=true&w=majority
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### 3. MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user
4. Whitelist your IP address (0.0.0.0/0 for testing)
5. Get your connection string and add it to `.env`

### 4. Run the Server

**Development:**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

Server will run on `http://localhost:5000`

## 📡 API Endpoints

### Sensors
- `GET /api/sensors/latest` - Get latest readings from all sensors
- `GET /api/sensors/:sensorType/history?hours=24` - Get historical data
- `POST /api/sensors` - Add new sensor reading
- `POST /api/sensors/bulk` - Bulk insert sensor data

### Devices
- `GET /api/devices` - Get all devices status
- `GET /api/devices/:deviceName` - Get specific device
- `PUT /api/devices/:deviceName` - Update device settings
- `PATCH /api/devices/:deviceName/toggle` - Toggle device on/off

### Notifications
- `GET /api/notifications` - Get all notifications
- `GET /api/notifications/unread` - Get unread notifications
- `POST /api/notifications` - Create new notification
- `PATCH /api/notifications/:id/read` - Mark as read
- `DELETE /api/notifications/:id` - Delete notification
- `DELETE /api/notifications` - Clear all notifications

### Settings
- `GET /api/settings` - Get system settings
- `PUT /api/settings` - Update settings

### Health Check
- `GET /api/health` - Check if API is running

## 🌐 Deployment to Render

### 1. Push to GitHub

```bash
cd backend
git init
git add .
git commit -m "Initial backend setup"
git branch -M main
git remote add origin https://github.com/your-username/tilapia-iot-backend.git
git push -u origin main
```

### 2. Deploy on Render

1. Go to [Render.com](https://render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name:** tilapia-iot-backend
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** Free

5. Add Environment Variables:
   - `MONGODB_URI` - Your MongoDB connection string
   - `NODE_ENV` - `production`
   - `FRONTEND_URL` - Your frontend URL

6. Click "Create Web Service"

Your API will be available at: `https://tilapia-iot-backend.onrender.com`

## 📁 Project Structure

```
backend/
├── models/
│   ├── SensorData.js      # Sensor readings model
│   ├── Device.js          # Device control model
│   ├── Notification.js    # Notifications model
│   └── Settings.js        # System settings model
├── routes/
│   ├── sensors.js         # Sensor API routes
│   ├── devices.js         # Device control routes
│   ├── notifications.js   # Notification routes
│   └── settings.js        # Settings routes
├── .env.example           # Environment variables template
├── .gitignore
├── package.json
├── server.js              # Main server file
└── README.md
```

## 🔌 Arduino Integration

To send data from Arduino to the API:

```cpp
// Example POST request to send sensor data
POST /api/sensors/bulk
Content-Type: application/json

{
  "readings": [
    {
      "sensorType": "waterTemp",
      "value": 28.3,
      "unit": "°C",
      "status": "normal"
    },
    {
      "sensorType": "pH",
      "value": 7.2,
      "unit": "",
      "status": "normal"
    }
  ]
}
```

## 🐛 Troubleshooting

**MongoDB Connection Error:**
- Check your MONGODB_URI is correct
- Ensure IP whitelist includes 0.0.0.0/0
- Verify database user has proper permissions

**Port Already in Use:**
- Change PORT in .env file
- Kill the process using the port: `npx kill-port 5000`

**CORS Error:**
- Update FRONTEND_URL in .env to match your frontend URL
- Check cors configuration in server.js

## 📝 License

MIT License
