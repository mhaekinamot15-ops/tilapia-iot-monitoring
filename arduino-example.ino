#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

// WiFi credentials
const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";

// API endpoint (replace with your deployed backend URL)
const char* apiUrl = "http://localhost:5000/api";
// For production: "https://your-backend.onrender.com/api"

// Sensor pins (adjust based on your wiring)
#define WATER_TEMP_PIN 4
#define PH_SENSOR_PIN 34
#define TURBIDITY_PIN 35
#define WATER_LEVEL_PIN 5

// Relay pins for devices
#define AERATOR_RELAY 12
#define LIGHTS_RELAY 13
#define FEEDER_RELAY 14
#define HEATER_RELAY 15

void setup() {
  Serial.begin(115200);
  
  // Initialize relay pins
  pinMode(AERATOR_RELAY, OUTPUT);
  pinMode(LIGHTS_RELAY, OUTPUT);
  pinMode(FEEDER_RELAY, OUTPUT);
  pinMode(HEATER_RELAY, OUTPUT);
  
  // Connect to WiFi
  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi");
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  
  Serial.println("\nWiFi Connected!");
  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());
}

void loop() {
  // Read sensors every 10 seconds
  readAndSendSensorData();
  
  // Check device status from API
  checkDeviceCommands();
  
  delay(10000); // 10 seconds
}

// Function to read sensors and send to API
void readAndSendSensorData() {
  // Read sensor values (replace with actual sensor reading code)
  float waterTemp = readWaterTemperature();
  float airTemp = readAirTemperature();
  float waterLevel = readWaterLevel();
  float pH = readPH();
  float turbidity = readTurbidity();
  
  // Send data to API
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    
    // Build JSON payload
    String jsonData = "{\"readings\":[";
    
    // Water Temperature
    jsonData += "{\"sensorType\":\"waterTemp\",\"value\":" + String(waterTemp) + ",\"unit\":\"°C\",\"status\":\"";
    jsonData += getStatus(waterTemp, 26.0, 30.0) + "\"},";
    
    // Air Temperature
    jsonData += "{\"sensorType\":\"airTemp\",\"value\":" + String(airTemp) + ",\"unit\":\"°C\",\"status\":\"";
    jsonData += getStatus(airTemp, 25.0, 32.0) + "\"},";
    
    // Water Level
    jsonData += "{\"sensorType\":\"waterLevel\",\"value\":" + String(waterLevel) + ",\"unit\":\"cm\",\"status\":\"";
    jsonData += getStatus(waterLevel, 80.0, 100.0) + "\"},";
    
    // pH
    jsonData += "{\"sensorType\":\"pH\",\"value\":" + String(pH) + ",\"unit\":\"\",\"status\":\"";
    jsonData += getStatus(pH, 6.5, 8.5) + "\"},";
    
    // Turbidity
    jsonData += "{\"sensorType\":\"turbidity\",\"value\":" + String(turbidity) + ",\"unit\":\"NTU\",\"status\":\"";
    jsonData += getStatus(turbidity, 0.0, 50.0) + "\"}";
    
    jsonData += "]}";
    
    // Send POST request
    String endpoint = String(apiUrl) + "/sensors/bulk";
    http.begin(endpoint);
    http.addHeader("Content-Type", "application/json");
    
    int httpResponseCode = http.POST(jsonData);
    
    if (httpResponseCode > 0) {
      Serial.println("✓ Sensor data sent successfully");
      Serial.println("Response: " + http.getString());
    } else {
      Serial.println("✗ Error sending data: " + String(httpResponseCode));
    }
    
    http.end();
  }
}

// Function to check device commands from API
void checkDeviceCommands() {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    
    // Get device status from API
    String endpoint = String(apiUrl) + "/devices";
    http.begin(endpoint);
    
    int httpResponseCode = http.GET();
    
    if (httpResponseCode > 0) {
      String response = http.getString();
      
      // Parse JSON response
      DynamicJsonDocument doc(2048);
      deserializeJson(doc, response);
      
      JsonArray devices = doc["devices"];
      
      // Control each device based on API response
      for (JsonObject device : devices) {
        String name = device["name"];
        bool isOn = device["isOn"];
        
        if (name == "aerator") {
          digitalWrite(AERATOR_RELAY, isOn ? HIGH : LOW);
          Serial.println("Aerator: " + String(isOn ? "ON" : "OFF"));
        }
        else if (name == "lights") {
          digitalWrite(LIGHTS_RELAY, isOn ? HIGH : LOW);
          Serial.println("Lights: " + String(isOn ? "ON" : "OFF"));
        }
        else if (name == "feeder") {
          digitalWrite(FEEDER_RELAY, isOn ? HIGH : LOW);
          Serial.println("Feeder: " + String(isOn ? "ON" : "OFF"));
        }
        else if (name == "heater") {
          digitalWrite(HEATER_RELAY, isOn ? HIGH : LOW);
          Serial.println("Heater: " + String(isOn ? "ON" : "OFF"));
        }
      }
    }
    
    http.end();
  }
}

// Sensor reading functions (implement based on your actual sensors)
float readWaterTemperature() {
  // Replace with actual DS18B20 sensor reading
  return 28.5; // Mock value
}

float readAirTemperature() {
  // Replace with actual DHT22 sensor reading
  return 30.2; // Mock value
}

float readWaterLevel() {
  // Replace with actual ultrasonic/float sensor reading
  return 85.0; // Mock value in cm
}

float readPH() {
  // Replace with actual pH sensor reading
  int sensorValue = analogRead(PH_SENSOR_PIN);
  float voltage = sensorValue * (3.3 / 4095.0);
  float ph = 3.5 * voltage; // Calibrate this formula
  return ph;
}

float readTurbidity() {
  // Replace with actual turbidity sensor reading
  int sensorValue = analogRead(TURBIDITY_PIN);
  float voltage = sensorValue * (3.3 / 4095.0);
  float ntu = (voltage - 2.5) * 100; // Calibrate this formula
  return abs(ntu);
}

// Helper function to determine status
String getStatus(float value, float minNormal, float maxNormal) {
  if (value < minNormal - 2 || value > maxNormal + 2) {
    return "critical";
  } else if (value < minNormal || value > maxNormal) {
    return "warning";
  } else {
    return "normal";
  }
}
