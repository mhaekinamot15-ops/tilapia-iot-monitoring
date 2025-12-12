// State Management
const state = {
    activeScreen: 'dashboard',
    sidebarOpen: false,
    aeratorOn: true,
    lightsOn: false,
    feederOn: false,
    heaterOn: true,
    aerationDuty: 70,
    autoMode: true,
    waterTempThreshold: 28,
    phThreshold: 7.2,
    turbidityThreshold: 12,
    isAuthenticated: false,
    currentUser: null
};

// Check authentication on load
document.addEventListener('DOMContentLoaded', () => {
    checkAuthentication();
});

function checkAuthentication() {
    if (authAPI.isAuthenticated()) {
        state.isAuthenticated = true;
        state.currentUser = authAPI.getUser();
        updateUIForAuthState();
    } else {
        showLoginModal();
    }
}

function updateUIForAuthState() {
    // Update user profile button or status
    const statusText = document.querySelector('.status-text');
    if (statusText && state.currentUser) {
        statusText.textContent = `${state.currentUser.username} - Online`;
    }
}

function showLoginModal() {
    const modalHTML = `
        <div class="modal-overlay" id="loginModal" style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.8); display: flex; align-items: center; justify-content: center; z-index: 9999;">
            <div class="modal-content" style="background: #1C2B4A; padding: 32px; border-radius: 16px; max-width: 400px; width: 90%;">
                <h2 style="margin-bottom: 24px; text-align: center;">Login to Tilapia IoT</h2>
                <div id="loginError" style="display: none; background: rgba(255,94,94,0.2); border: 1px solid #FF5E5E; padding: 12px; border-radius: 8px; margin-bottom: 16px; color: #FF5E5E;"></div>
                <form id="loginForm">
                    <div style="margin-bottom: 16px;">
                        <label style="display: block; margin-bottom: 8px; color: #A9B4C9;">Username</label>
                        <input type="text" id="loginUsername" required style="width: 100%; padding: 12px; background: #223354; border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; color: white;">
                    </div>
                    <div style="margin-bottom: 24px; position: relative;">
                        <label style="display: block; margin-bottom: 8px; color: #A9B4C9;">Password</label>
                        <input type="password" id="loginPassword" required style="width: 100%; padding: 12px 40px 12px 12px; background: #223354; border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; color: white;">
                        <button type="button" id="toggleLoginPassword" style="position: absolute; right: 12px; top: 38px; background: none; border: none; cursor: pointer; color: #A9B4C9; padding: 4px;">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                        </button>
                    </div>
                    <button type="submit" class="btn btn-primary" style="width: 100%; padding: 12px; margin-bottom: 12px;">Login</button>
                    <button type="button" class="btn btn-secondary" id="showRegisterBtn" style="width: 100%; padding: 12px;">Create Account</button>
                </form>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    document.getElementById('showRegisterBtn').addEventListener('click', showRegisterModal);
    
    // Toggle password visibility
    const toggleBtn = document.getElementById('toggleLoginPassword');
    const passwordInput = document.getElementById('loginPassword');
    toggleBtn.addEventListener('click', () => {
        const type = passwordInput.type === 'password' ? 'text' : 'password';
        passwordInput.type = type;
        toggleBtn.innerHTML = type === 'password' 
            ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>`
            : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>`;
    });
}

function showRegisterModal() {
    document.getElementById('loginModal')?.remove();
    
    const modalHTML = `
        <div class="modal-overlay" id="registerModal" style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.8); display: flex; align-items: center; justify-content: center; z-index: 9999;">
            <div class="modal-content" style="background: #1C2B4A; padding: 32px; border-radius: 16px; max-width: 400px; width: 90%;">
                <h2 style="margin-bottom: 24px; text-align: center;">Create Account</h2>
                <div id="registerError" style="display: none; background: rgba(255,94,94,0.2); border: 1px solid #FF5E5E; padding: 12px; border-radius: 8px; margin-bottom: 16px; color: #FF5E5E;"></div>
                <form id="registerForm">
                    <div style="margin-bottom: 16px;">
                        <label style="display: block; margin-bottom: 8px; color: #A9B4C9;">Username</label>
                        <input type="text" id="registerUsername" required minlength="3" style="width: 100%; padding: 12px; background: #223354; border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; color: white;">
                    </div>
                    <div style="margin-bottom: 16px;">
                        <label style="display: block; margin-bottom: 8px; color: #A9B4C9;">Email</label>
                        <input type="email" id="registerEmail" required style="width: 100%; padding: 12px; background: #223354; border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; color: white;">
                    </div>
                    <div style="margin-bottom: 24px; position: relative;">
                        <label style="display: block; margin-bottom: 8px; color: #A9B4C9;">Password</label>
                        <input type="password" id="registerPassword" required minlength="6" style="width: 100%; padding: 12px 40px 12px 12px; background: #223354; border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; color: white;">
                        <button type="button" id="toggleRegisterPassword" style="position: absolute; right: 12px; top: 38px; background: none; border: none; cursor: pointer; color: #A9B4C9; padding: 4px;">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                        </button>
                    </div>
                    <button type="submit" class="btn btn-primary" style="width: 100%; padding: 12px; margin-bottom: 12px;">Register</button>
                    <button type="button" class="btn btn-secondary" id="showLoginBtn" style="width: 100%; padding: 12px;">Back to Login</button>
                </form>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    document.getElementById('registerForm').addEventListener('submit', handleRegister);
    document.getElementById('showLoginBtn').addEventListener('click', showLoginModal);
    
    // Toggle password visibility
    const toggleBtn = document.getElementById('toggleRegisterPassword');
    const passwordInput = document.getElementById('registerPassword');
    toggleBtn.addEventListener('click', () => {
        const type = passwordInput.type === 'password' ? 'text' : 'password';
        passwordInput.type = type;
        toggleBtn.innerHTML = type === 'password' 
            ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>`
            : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>`;
    });
}

async function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const errorDiv = document.getElementById('loginError');
    
    try {
        const result = await authAPI.login(username, password);
        if (result.token) {
            state.isAuthenticated = true;
            state.currentUser = result.user;
            document.getElementById('loginModal')?.remove();
            updateUIForAuthState();
            renderDashboard();
        } else {
            errorDiv.textContent = result.error || 'Login failed';
            errorDiv.style.display = 'block';
        }
    } catch (error) {
        errorDiv.textContent = 'Login failed. Please try again.';
        errorDiv.style.display = 'block';
    }
}

async function handleRegister(e) {
    e.preventDefault();
    const username = document.getElementById('registerUsername').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const errorDiv = document.getElementById('registerError');
    
    try {
        const result = await authAPI.register(username, email, password);
        if (result.token) {
            state.isAuthenticated = true;
            state.currentUser = result.user;
            document.getElementById('registerModal')?.remove();
            updateUIForAuthState();
            renderDashboard();
        } else {
            errorDiv.textContent = result.error || 'Registration failed';
            errorDiv.style.display = 'block';
        }
    } catch (error) {
        errorDiv.textContent = 'Registration failed. Please try again.';
        errorDiv.style.display = 'block';
    }
}

async function handleLogout() {
    await authAPI.logout();
    state.isAuthenticated = false;
    state.currentUser = null;
    showLoginModal();
}

// DOM Elements
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const menuBtn = document.getElementById('menuBtn');
const mainContent = document.getElementById('mainContent');
const navItems = document.querySelectorAll('.nav-item');

// Sensor Data
const sensorData = {
    waterTemp: { label: 'Water Temp', value: 28.3, unit: '°C', status: 'normal', icon: 'thermometer' },
    airTemp: { label: 'Air Temp', value: 31.5, unit: '°C', status: 'normal', icon: 'thermometer' },
    waterLevel: { label: 'Water Level', value: 87, unit: '%', status: 'normal', icon: 'waves' },
    pH: { label: 'pH Level', value: 7.2, unit: '', status: 'normal', icon: 'test-tube' },
    turbidity: { label: 'Turbidity', value: 12.4, unit: 'NTU', status: 'warning', icon: 'eye' }
};

// Chart Data
const chartData = {
    waterTemp: [
        { time: '00:00', value: 27.8 },
        { time: '04:00', value: 27.5 },
        { time: '08:00', value: 28.2 },
        { time: '12:00', value: 29.1 },
        { time: '16:00', value: 28.7 },
        { time: '20:00', value: 28.3 }
    ],
    pH: [
        { time: '00:00', value: 7.1 },
        { time: '04:00', value: 7.0 },
        { time: '08:00', value: 7.2 },
        { time: '12:00', value: 7.3 },
        { time: '16:00', value: 7.2 },
        { time: '20:00', value: 7.2 }
    ],
    turbidity: [
        { time: '00:00', value: 10.2 },
        { time: '04:00', value: 11.5 },
        { time: '08:00', value: 12.8 },
        { time: '12:00', value: 13.1 },
        { time: '16:00', value: 12.9 },
        { time: '20:00', value: 12.4 }
    ],
    waterLevel: [
        { time: '00:00', value: 88 },
        { time: '04:00', value: 87 },
        { time: '08:00', value: 86 },
        { time: '12:00', value: 87 },
        { time: '16:00', value: 87 },
        { time: '20:00', value: 87 }
    ]
};

// Notifications Data
const notifications = [
    { id: 1, title: 'Turbidity Level Rising', message: 'Turbidity has increased to 12.4 NTU. Consider water change.', timestamp: '5 min ago', severity: 'warning' },
    { id: 2, title: 'pH Level Optimal', message: 'pH stabilized at 7.2. Water quality is good.', timestamp: '1 hour ago', severity: 'normal' },
    { id: 3, title: 'Temperature Alert', message: 'Water temperature reached 30°C. Aeration activated.', timestamp: '3 hours ago', severity: 'critical' },
    { id: 4, title: 'Feeding Reminder', message: 'Time for scheduled feeding (2:00 PM).', timestamp: '5 hours ago', severity: 'normal' },
    { id: 5, title: 'Water Level Low', message: 'Water level at 85%. Refill recommended.', timestamp: '8 hours ago', severity: 'warning' },
    { id: 6, title: 'System Online', message: 'All sensors connected and reporting normally.', timestamp: '12 hours ago', severity: 'normal' }
];

// Event Listeners
menuBtn.addEventListener('click', toggleSidebar);
overlay.addEventListener('click', closeSidebar);

navItems.forEach(item => {
    item.addEventListener('click', () => {
        const screen = item.getAttribute('data-screen');
        switchScreen(screen);
        if (window.innerWidth < 1024) {
            closeSidebar();
        }
    });
});

// Add logout button handler
document.addEventListener('DOMContentLoaded', () => {
    const logoutBtn = document.querySelector('.logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
});

// Navigation Functions
function toggleSidebar() {
    state.sidebarOpen = !state.sidebarOpen;
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
}

function closeSidebar() {
    state.sidebarOpen = false;
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
}

function switchScreen(screen) {
    state.activeScreen = screen;
    
    // Update nav items
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-screen') === screen) {
            item.classList.add('active');
        }
    });
    
    // Render content
    renderScreen(screen);
}

// Screen Rendering Functions
function renderScreen(screen) {
    switch(screen) {
        case 'dashboard':
            renderDashboard();
            break;
        case 'charts':
            renderCharts();
            break;
        case 'control':
            renderDeviceControl();
            break;
        case 'notifications':
            renderNotifications();
            break;
        case 'settings':
            renderSettings();
            break;
    }
}

function renderDashboard() {
    mainContent.innerHTML = `
        <div class="page-header">
            <div class="page-title">
                <h2>Welcome back!</h2>
                <p>Here's what's happening with your aquaculture system</p>
            </div>
            <div class="header-actions">
                <button class="btn btn-outline">Refresh Data</button>
                <button class="btn btn-primary">Export Report</button>
            </div>
        </div>

        <div class="sensor-grid">
            ${renderSensorCards()}
        </div>

        <div class="grid-2 mb-24">
            <div class="card">
                <div class="card-header">
                    <div class="card-title">
                        <h3>System Status</h3>
                        <p>Real-time monitoring</p>
                    </div>
                    <div class="status-badge">
                        <div class="status-dot"></div>
                        <span class="status-text">All Systems Operational</span>
                    </div>
                </div>
                <div class="grid-2">
                    <div class="stat-card">
                        <p class="stat-label">Last Update</p>
                        <p class="stat-value">2 seconds ago</p>
                    </div>
                    <div class="stat-card">
                        <p class="stat-label">Uptime</p>
                        <p class="stat-value">48h 23m</p>
                    </div>
                    <div class="stat-card">
                        <p class="stat-label">Data Points</p>
                        <p class="stat-value">15,432</p>
                    </div>
                    <div class="stat-card">
                        <p class="stat-label">Avg Response</p>
                        <p class="stat-value">120ms</p>
                    </div>
                </div>
            </div>

            <div class="card">
                <h3 style="margin-bottom: 16px;">Recent Alerts</h3>
                ${notifications.slice(0, 3).map(n => `
                    <div class="notification-card" style="margin-bottom: 12px;">
                        <div class="notification-bar" style="background: ${getSeverityColor(n.severity)}"></div>
                        <div class="notification-content">
                            <div class="notification-body">
                                <div class="notification-title">${n.title}</div>
                                <div class="notification-time">${n.timestamp}</div>
                            </div>
                        </div>
                    </div>
                `).join('')}
                <button class="btn btn-outline" style="width: 100%; margin-top: 16px;">View All Notifications</button>
            </div>
        </div>
    `;
}

function renderSensorCards() {
    return Object.values(sensorData).map(sensor => `
        <div class="sensor-card">
            <div class="sensor-header">
                <div class="sensor-icon">
                    ${getIconSVG(sensor.icon)}
                </div>
                <div class="status-indicator status-${sensor.status}"></div>
            </div>
            <div class="sensor-label">${sensor.label}</div>
            <div class="sensor-value">
                <span class="value">${sensor.value}</span>
                <span class="unit">${sensor.unit}</span>
            </div>
        </div>
    `).join('');
}

function renderCharts() {
    mainContent.innerHTML = `
        <div class="page-header">
            <div class="page-title">
                <h2>Analytics Dashboard</h2>
                <p>Monitor trends and historical data</p>
            </div>
            <div class="header-actions">
                <button class="btn btn-secondary">Last 24 Hours</button>
                <button class="btn btn-outline">Export CSV</button>
            </div>
        </div>

        <div style="display: flex; gap: 12px; margin-bottom: 24px; flex-wrap: wrap;">
            <button class="btn btn-primary chart-selector" data-chart="waterTemp">Water Temperature</button>
            <button class="btn btn-secondary chart-selector" data-chart="pH">pH Level</button>
            <button class="btn btn-secondary chart-selector" data-chart="turbidity">Turbidity</button>
            <button class="btn btn-secondary chart-selector" data-chart="waterLevel">Water Level</button>
        </div>

        <div class="card">
            <div class="card-header">
                <div class="card-title">
                    <h3 id="chartTitle">Water Temperature</h3>
                    <p>24-hour trend analysis</p>
                </div>
            </div>
            <div class="chart-container">
                <canvas id="mainChart"></canvas>
            </div>
        </div>
    `;

    // Initialize chart
    initializeChart('waterTemp');

    // Add chart selector event listeners
    document.querySelectorAll('.chart-selector').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.chart-selector').forEach(b => {
                b.className = 'btn btn-secondary chart-selector';
            });
            e.target.className = 'btn btn-primary chart-selector';
            const chartType = e.target.getAttribute('data-chart');
            initializeChart(chartType);
        });
    });
}

let currentChart = null;

function initializeChart(type) {
    const ctx = document.getElementById('mainChart');
    if (!ctx) return;

    const data = chartData[type];
    const labels = data.map(d => d.time);
    const values = data.map(d => d.value);

    const chartConfig = {
        waterTemp: { label: 'Water Temperature', color: '#4DA3FF' },
        pH: { label: 'pH Level', color: '#4CFFB3' },
        turbidity: { label: 'Turbidity', color: '#FFED87' },
        waterLevel: { label: 'Water Level', color: '#FF5E5E' }
    };

    document.getElementById('chartTitle').textContent = chartConfig[type].label;

    if (currentChart) {
        currentChart.destroy();
    }

    currentChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: chartConfig[type].label,
                data: values,
                borderColor: chartConfig[type].color,
                backgroundColor: chartConfig[type].color + '20',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointRadius: 5,
                pointHoverRadius: 7
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: '#0E1523',
                    borderColor: '#4DA3FF40',
                    borderWidth: 1,
                    padding: 12,
                    titleColor: '#A9B4C9',
                    bodyColor: 'white'
                }
            },
            scales: {
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.06)',
                        drawBorder: false
                    },
                    ticks: {
                        color: '#A9B4C9'
                    }
                },
                y: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.06)',
                        drawBorder: false
                    },
                    ticks: {
                        color: '#A9B4C9'
                    }
                }
            }
        }
    });
}

function renderDeviceControl() {
    mainContent.innerHTML = `
        <div class="page-header">
            <div class="page-title">
                <h2>Device Control Center</h2>
                <p>Manage and monitor all connected equipment</p>
            </div>
            <div class="header-actions">
                <button class="btn btn-secondary">Automation Rules</button>
                <button class="btn btn-outline">Add Device</button>
            </div>
        </div>

        <div class="card mb-24" style="background: linear-gradient(135deg, rgba(77, 163, 255, 0.2), #223354); border-color: rgba(77, 163, 255, 0.3);">
            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 24px;">
                <div>
                    <h3 style="margin-bottom: 8px;">Intelligent Aeration System</h3>
                    <p style="color: #A9B4C9;">Automatically manages aeration duty cycle based on oxygen levels</p>
                </div>
                <div class="toggle-switch ${state.autoMode ? 'active' : ''}" id="autoModeToggle">
                    <div class="toggle-slider"></div>
                </div>
            </div>
            <div style="display: flex; align-items: center; gap: 24px;">
                <div style="flex: 1;">
                    <div style="display: flex; align-items: baseline; gap: 8px; margin-bottom: 12px;">
                        <span style="font-size: 48px; font-weight: 600;" id="dutyValue">${state.aerationDuty}</span>
                        <span style="color: #A9B4C9; font-size: 20px;">% duty cycle</span>
                    </div>
                    <input type="range" min="0" max="100" value="${state.aerationDuty}" id="dutySlider" 
                        style="width: 100%; height: 12px; border-radius: 6px; appearance: none; cursor: pointer; 
                        background: linear-gradient(to right, #4DA3FF ${state.aerationDuty}%, #223354 ${state.aerationDuty}%);"
                        ${state.autoMode ? 'disabled' : ''}>
                </div>
                <div style="width: 96px; height: 96px; background: rgba(77, 163, 255, 0.2); border: 1px solid rgba(77, 163, 255, 0.3); border-radius: 16px; display: flex; align-items: center; justify-content: center;">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#4DA3FF" stroke-width="2" class="${state.aeratorOn ? 'rotating' : ''}">
                        <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
                    </svg>
                </div>
            </div>
        </div>

        <div class="device-grid mb-24">
            ${renderDeviceCard('Aerator', state.aeratorOn, 'aerator')}
            ${renderDeviceCard('UV Light', state.lightsOn, 'lights')}
            ${renderDeviceCard('Auto Feeder', state.feederOn, 'feeder')}
            ${renderDeviceCard('Heater', state.heaterOn, 'heater')}
        </div>

        <div class="grid-2">
            <div class="card">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                    <h3>Aerator Schedule</h3>
                    <button class="btn btn-primary" id="addAeratorScheduleBtn" style="padding: 8px 16px; font-size: 14px;">+ Add Schedule</button>
                </div>
                <div id="aeratorScheduleList"></div>
            </div>
            <div class="card" style="background: rgba(255, 94, 94, 0.1); border-color: rgba(255, 94, 94, 0.3);">
                <h3 style="margin-bottom: 8px;">Emergency Controls</h3>
                <p style="color: #A9B4C9; margin-bottom: 24px;">Immediately activate all aeration and filtration systems at maximum capacity</p>
                <button class="btn" style="width: 100%; height: 56px; background: #FF5E5E; color: white; font-size: 16px;">
                    🚨 Emergency Aeration
                </button>
            </div>
        </div>
    `;

    // Add event listeners
    const dutySlider = document.getElementById('dutySlider');
    const dutyValue = document.getElementById('dutyValue');
    const autoModeToggle = document.getElementById('autoModeToggle');

    if (dutySlider) {
        dutySlider.addEventListener('input', (e) => {
            state.aerationDuty = e.target.value;
            dutyValue.textContent = e.target.value;
            e.target.style.background = `linear-gradient(to right, #4DA3FF ${e.target.value}%, #223354 ${e.target.value}%)`;
        });
    }

    if (autoModeToggle) {
        autoModeToggle.addEventListener('click', () => {
            state.autoMode = !state.autoMode;
            autoModeToggle.classList.toggle('active');
            dutySlider.disabled = state.autoMode;
        });
    }

    document.querySelectorAll('.device-toggle').forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            const device = e.currentTarget.getAttribute('data-device');
            state[device + 'On'] = !state[device + 'On'];
            e.currentTarget.classList.toggle('active');
        });
    });

    // Load and display aerator schedules
    loadAeratorSchedules();

    // Add schedule button listener
    const addScheduleBtn = document.getElementById('addAeratorScheduleBtn');
    if (addScheduleBtn) {
        addScheduleBtn.addEventListener('click', showAddScheduleModal);
    }
}

function renderDeviceCard(name, status, device) {
    return `
        <div class="device-card">
            <div class="sensor-icon" style="margin-bottom: 16px; color: ${status ? '#4DA3FF' : '#A9B4C9'};">
                ${getDeviceIcon(device)}
            </div>
            <div style="margin-bottom: 16px;">
                <div style="font-size: 16px; margin-bottom: 8px;">${name}</div>
                <div style="display: flex; align-items: center; gap: 8px;">
                    <div style="width: 8px; height: 8px; background: ${status ? '#4CFFB3' : 'rgba(169, 180, 201, 0.4)'}; border-radius: 50%;"></div>
                    <span style="color: #A9B4C9; font-size: 14px;">${status ? 'On' : 'Off'}</span>
                </div>
            </div>
            <div class="toggle-switch ${status ? 'active' : ''} device-toggle" data-device="${device}">
                <div class="toggle-slider"></div>
            </div>
        </div>
    `;
}

function renderScheduleItem(time, active) {
    return `
        <div style="display: flex; align-items: center; justify-content: space-between; padding: 12px; background: rgba(14, 21, 35, 0.4); border-radius: 12px; margin-bottom: 12px;">
            <div style="display: flex; align-items: center; gap: 12px;">
                <div style="width: 6px; height: 40px; background: ${active ? '#4DA3FF' : 'rgba(169, 180, 201, 0.2)'}; border-radius: 3px;"></div>
                <div>
                    <div style="color: white; margin-bottom: 4px;">${time}</div>
                    <div style="color: #A9B4C9; font-size: 12px;">Daily feeding</div>
                </div>
            </div>
            <div class="toggle-switch ${active ? 'active' : ''}">
                <div class="toggle-slider"></div>
            </div>
        </div>
    `;
}

function renderNotifications() {
    mainContent.innerHTML = `
        <div class="page-header">
            <div class="page-title">
                <h2>Notifications Center</h2>
                <p>${notifications.length} total alerts and updates</p>
            </div>
            <div class="header-actions">
                <button class="btn btn-secondary">Filter</button>
                <button class="btn btn-outline" style="border-color: #FF5E5E; color: #FF5E5E;">Clear All</button>
            </div>
        </div>

        <div class="notifications-grid">
            ${notifications.map(n => `
                <div class="notification-card">
                    <div class="notification-bar" style="background: ${getSeverityColor(n.severity)}"></div>
                    <div class="notification-content">
                        <div class="notification-icon" style="color: ${getSeverityColor(n.severity)}">
                            ${getSeverityIcon(n.severity)}
                        </div>
                        <div style="flex: 1;">
                            <div class="notification-title">${n.title}</div>
                            <div class="notification-message">${n.message}</div>
                            <div class="notification-time">${n.timestamp}</div>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>

        <div class="card" style="margin-top: 24px;">
            <h3 style="margin-bottom: 24px;">Notification Preferences</h3>
            <div class="grid-3">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="color: #A9B4C9;">Push Notifications</span>
                    <div class="toggle-switch active"><div class="toggle-slider"></div></div>
                </div>
                <div style="display: flex; justify-space-between; align-items: center;">
                    <span style="color: #A9B4C9;">SMS Alerts</span>
                    <div class="toggle-switch active"><div class="toggle-slider"></div></div>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="color: #A9B4C9;">Email Reports</span>
                    <div class="toggle-switch"><div class="toggle-slider"></div></div>
                </div>
            </div>
        </div>
    `;
}

function renderSettings() {
    mainContent.innerHTML = `
        <div class="page-header">
            <div class="page-title">
                <h2>Settings & Configuration</h2>
                <p>Manage system preferences and thresholds</p>
            </div>
            <div class="header-actions">
                <button class="btn btn-secondary">Import Settings</button>
                <button class="btn btn-outline">Export Settings</button>
            </div>
        </div>

        <div class="grid-2 mb-24">
            <div class="card">
                <h3 style="margin-bottom: 16px;">Monitoring</h3>
                ${renderSettingItem('Threshold Settings', 'Configure alert thresholds')}
                ${renderSettingItem('Phone Number', '+1 (555) 123-4567')}
            </div>
            <div class="card">
                <h3 style="margin-bottom: 16px;">Automation</h3>
                ${renderSettingItem('Feeding Schedule', '3 times daily')}
                ${renderSettingItem('Cleaning Reminders', 'Weekly notifications')}
            </div>
        </div>

        <div class="card mb-24" style="background: linear-gradient(135deg, rgba(77, 163, 255, 0.2), #223354); border-color: rgba(77, 163, 255, 0.3);">
            <h3 style="margin-bottom: 24px;">Quick Threshold Adjust</h3>
            ${renderThresholdSlider('Water Temp', 25, 32, state.waterTempThreshold, '°C', 'waterTemp')}
            ${renderThresholdSlider('pH Level', 6.5, 8.5, state.phThreshold, '', 'ph')}
            ${renderThresholdSlider('Turbidity', 0, 20, state.turbidityThreshold, 'NTU', 'turbidity')}
        </div>

        <div class="card mb-24">
            <h3 style="margin-bottom: 16px;">System Information</h3>
            <div style="display: grid; gap: 8px;">
                <div style="display: flex; justify-content: space-between; font-size: 14px;">
                    <span style="color: #A9B4C9;">Firmware Version</span>
                    <span style="color: white;">v2.4.1</span>
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 14px;">
                    <span style="color: #A9B4C9;">Last Sync</span>
                    <span style="color: white;">2 min ago</span>
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 14px;">
                    <span style="color: #A9B4C9;">Storage Used</span>
                    <span style="color: white;">2.3 GB / 16 GB</span>
                </div>
            </div>
        </div>

        <div style="display: grid; gap: 12px;">
            <button class="btn btn-outline" style="width: 100%;">Backup Data</button>
            <button class="btn btn-outline" style="width: 100%; border-color: #FF5E5E; color: #FF5E5E;">Factory Reset</button>
        </div>
    `;

    // Add threshold slider listeners
    ['waterTemp', 'ph', 'turbidity'].forEach(type => {
        const slider = document.getElementById(`slider-${type}`);
        const value = document.getElementById(`value-${type}`);
        if (slider && value) {
            slider.addEventListener('input', (e) => {
                const val = parseFloat(e.target.value);
                state[type + 'Threshold'] = val;
                value.textContent = type === 'ph' ? val.toFixed(1) : Math.round(val);
                const percent = ((val - parseFloat(slider.min)) / (parseFloat(slider.max) - parseFloat(slider.min))) * 100;
                e.target.style.background = `linear-gradient(to right, #4DA3FF ${percent}%, #223354 ${percent}%)`;
            });
        }
    });
}

function renderSettingItem(label, description) {
    return `
        <div style="display: flex; align-items: center; justify-content: space-between; padding: 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.05); cursor: pointer;" 
            onmouseover="this.style.background='rgba(255,255,255,0.05)'" 
            onmouseout="this.style.background='transparent'">
            <div>
                <div style="color: white; margin-bottom: 4px;">${label}</div>
                <div style="color: #A9B4C9; font-size: 14px;">${description}</div>
            </div>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#A9B4C9" stroke-width="2">
                <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
        </div>
    `;
}

function renderThresholdSlider(label, min, max, current, unit, id) {
    const percent = ((current - min) / (max - min)) * 100;
    const step = id === 'ph' ? 0.1 : 1;
    const displayValue = id === 'ph' ? current.toFixed(1) : Math.round(current);
    
    return `
        <div style="margin-bottom: 24px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                <span style="color: #A9B4C9; font-size: 14px;">${label}</span>
                <span style="color: white;" id="value-${id}">${displayValue}${unit}</span>
            </div>
            <input type="range" min="${min}" max="${max}" step="${step}" value="${current}" id="slider-${id}"
                style="width: 100%; height: 8px; border-radius: 4px; appearance: none; cursor: pointer;
                background: linear-gradient(to right, #4DA3FF ${percent}%, #223354 ${percent}%);">
            <div style="display: flex; justify-content: space-between; margin-top: 4px; font-size: 12px; color: #A9B4C9;">
                <span>${min}${unit}</span>
                <span>${max}${unit}</span>
            </div>
        </div>
    `;
}

// Helper Functions
function getIconSVG(icon) {
    const icons = {
        thermometer: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"></path></svg>',
        waves: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"></path><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"></path><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"></path></svg>',
        'test-tube': '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.5 2v17.5c0 1.4-1.1 2.5-2.5 2.5s-2.5-1.1-2.5-2.5V2"></path><path d="M8.5 2h7"></path><path d="M14.5 16h-5"></path></svg>',
        eye: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>',
        droplets: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"></path><path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"></path></svg>'
    };
    return icons[icon] || '';
}

function getDeviceIcon(device) {
    const icons = {
        aerator: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/></svg>',
        lights: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"></path><path d="M9 18h6"></path><path d="M10 22h4"></path></svg>',
        feeder: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"></path><path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"></path></svg>',
        heater: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"></path></svg>'
    };
    return icons[device] || '';
}

function getSeverityColor(severity) {
    const colors = {
        normal: '#4CFFB3',
        warning: '#FFED87',
        critical: '#FF5E5E'
    };
    return colors[severity] || '#4CFFB3';
}

function getSeverityIcon(severity) {
    const icons = {
        critical: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>',
        warning: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>',
        normal: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>'
    };
    return icons[severity] || icons.normal;
}

// Add CSS for rotating animation
const style = document.createElement('style');
style.textContent = `
    .rotating {
        animation: rotate 2s linear infinite;
    }
    @keyframes rotate {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    
    input[type="range"] {
        -webkit-appearance: none;
    }
    input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 16px;
        height: 16px;
        background: white;
        border-radius: 50%;
        cursor: pointer;
    }
    input[type="range"]::-moz-range-thumb {
        width: 16px;
        height: 16px;
        background: white;
        border-radius: 50%;
        cursor: pointer;
        border: none;
    }
`;
document.head.appendChild(style);

// Schedule Management Functions
async function loadAeratorSchedules() {
    try {
        const schedules = await api.getSchedules('aerator');
        const scheduleList = document.getElementById('aeratorScheduleList');
        
        if (!scheduleList) return;
        
        if (schedules.length === 0) {
            scheduleList.innerHTML = '<p style="color: #A9B4C9; text-align: center; padding: 20px;">No schedules yet. Add one to automate your aerator.</p>';
            return;
        }
        
        scheduleList.innerHTML = schedules.map(schedule => `
            <div style="display: flex; align-items: center; justify-content: space-between; padding: 12px; background: rgba(14, 21, 35, 0.4); border-radius: 12px; margin-bottom: 12px; ${!schedule.enabled ? 'opacity: 0.5;' : ''}">
                <div style="display: flex; align-items: center; gap: 12px;">
                    <div style="width: 6px; height: 40px; background: ${schedule.action === 'on' ? '#4CFFB3' : '#FF5E5E'}; border-radius: 3px;"></div>
                    <div>
                        <div style="color: white; margin-bottom: 4px;">${schedule.time} - Turn ${schedule.action.toUpperCase()}</div>
                        <div style="color: #A9B4C9; font-size: 12px;">${schedule.scheduleName}</div>
                    </div>
                </div>
                <div style="display: flex; gap: 8px; align-items: center;">
                    <div class="toggle-switch ${schedule.enabled ? 'active' : ''}" onclick="toggleScheduleStatus('${schedule._id}')" style="cursor: pointer;">
                        <div class="toggle-slider"></div>
                    </div>
                    <button onclick="deleteScheduleItem('${schedule._id}')" style="background: rgba(255,94,94,0.2); border: 1px solid #FF5E5E; color: #FF5E5E; padding: 8px 12px; border-radius: 8px; cursor: pointer; font-size: 12px;">Delete</button>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading schedules:', error);
    }
}

function showAddScheduleModal() {
    const modalHTML = `
        <div class="modal-overlay" id="scheduleModal" style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.8); display: flex; align-items: center; justify-content: center; z-index: 9999;">
            <div class="modal-content" style="background: #1C2B4A; padding: 32px; border-radius: 16px; max-width: 500px; width: 90%;">
                <h2 style="margin-bottom: 24px; text-align: center;">Add Aerator Schedule</h2>
                <div id="scheduleError" style="display: none; background: rgba(255,94,94,0.2); border: 1px solid #FF5E5E; padding: 12px; border-radius: 8px; margin-bottom: 16px; color: #FF5E5E;"></div>
                <form id="scheduleForm">
                    <div style="margin-bottom: 16px;">
                        <label style="display: block; margin-bottom: 8px; color: #A9B4C9;">Schedule Name</label>
                        <input type="text" id="scheduleName" required placeholder="e.g., Morning Aeration" style="width: 100%; padding: 12px; background: #223354; border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; color: white;">
                    </div>
                    <div style="margin-bottom: 16px;">
                        <label style="display: block; margin-bottom: 8px; color: #A9B4C9;">Time (24-hour format)</label>
                        <input type="time" id="scheduleTime" required style="width: 100%; padding: 12px; background: #223354; border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; color: white;">
                    </div>
                    <div style="margin-bottom: 24px;">
                        <label style="display: block; margin-bottom: 8px; color: #A9B4C9;">Action</label>
                        <div style="display: flex; gap: 12px;">
                            <label id="actionOnLabel" class="action-label" style="flex: 1; padding: 12px; background: rgba(76, 255, 179, 0.3); border: 2px solid #4CFFB3; border-radius: 8px; cursor: pointer; text-align: center; transition: all 0.3s;">
                                <input type="radio" name="action" value="on" checked style="display: none;">
                                <span style="color: #4CFFB3; font-weight: 600;">Turn ON</span>
                            </label>
                            <label id="actionOffLabel" class="action-label" style="flex: 1; padding: 12px; background: rgba(255, 94, 94, 0.1); border: 2px solid rgba(255, 94, 94, 0.3); border-radius: 8px; cursor: pointer; text-align: center; transition: all 0.3s;">
                                <input type="radio" name="action" value="off" style="display: none;">
                                <span style="color: #FF5E5E; font-weight: 600;">Turn OFF</span>
                            </label>
                        </div>
                    </div>
                    <div style="display: flex; gap: 12px;">
                        <button type="submit" class="btn btn-primary" style="flex: 1; padding: 12px;">Add Schedule</button>
                        <button type="button" class="btn btn-secondary" id="cancelScheduleBtn" style="flex: 1; padding: 12px;">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Add radio button visual feedback
    const actionOnLabel = document.getElementById('actionOnLabel');
    const actionOffLabel = document.getElementById('actionOffLabel');
    const radioButtons = document.querySelectorAll('input[name="action"]');
    
    radioButtons.forEach(radio => {
        radio.addEventListener('change', () => {
            if (radio.value === 'on') {
                actionOnLabel.style.background = 'rgba(76, 255, 179, 0.3)';
                actionOnLabel.style.borderColor = '#4CFFB3';
                actionOffLabel.style.background = 'rgba(255, 94, 94, 0.1)';
                actionOffLabel.style.borderColor = 'rgba(255, 94, 94, 0.3)';
            } else {
                actionOffLabel.style.background = 'rgba(255, 94, 94, 0.3)';
                actionOffLabel.style.borderColor = '#FF5E5E';
                actionOnLabel.style.background = 'rgba(76, 255, 179, 0.1)';
                actionOnLabel.style.borderColor = 'rgba(76, 255, 179, 0.3)';
            }
        });
    });
    
    document.getElementById('scheduleForm').addEventListener('submit', handleAddSchedule);
    document.getElementById('cancelScheduleBtn').addEventListener('click', () => {
        document.getElementById('scheduleModal')?.remove();
    });
}

async function handleAddSchedule(e) {
    e.preventDefault();
    const errorDiv = document.getElementById('scheduleError');
    
    const scheduleData = {
        deviceName: 'aerator',
        scheduleName: document.getElementById('scheduleName').value,
        time: document.getElementById('scheduleTime').value,
        action: document.querySelector('input[name="action"]:checked').value,
        enabled: true,
        days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    };
    
    try {
        await api.createSchedule(scheduleData);
        document.getElementById('scheduleModal')?.remove();
        await loadAeratorSchedules();
    } catch (error) {
        errorDiv.textContent = 'Failed to create schedule. Please try again.';
        errorDiv.style.display = 'block';
    }
}

async function toggleScheduleStatus(scheduleId) {
    try {
        await api.toggleSchedule(scheduleId);
        await loadAeratorSchedules();
    } catch (error) {
        console.error('Error toggling schedule:', error);
    }
}

async function deleteScheduleItem(scheduleId) {
    if (confirm('Are you sure you want to delete this schedule?')) {
        try {
            await api.deleteSchedule(scheduleId);
            await loadAeratorSchedules();
        } catch (error) {
            console.error('Error deleting schedule:', error);
        }
    }
}

// Make functions globally available
window.toggleScheduleStatus = toggleScheduleStatus;
window.deleteScheduleItem = deleteScheduleItem;

// Initialize app
renderDashboard();
