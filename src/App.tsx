import { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { Charts } from './components/Charts';
import { Notifications } from './components/Notifications';
import { DeviceControl } from './components/DeviceControl';
import { Settings } from './components/Settings';
import { Home, LineChart, Bell, Settings as SettingsIcon, Zap, Menu, Search, LogOut, User } from 'lucide-react';

type Screen = 'dashboard' | 'charts' | 'notifications' | 'control' | 'settings';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<Screen>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0E1523] via-[#1C2B4A] to-[#0E1523]">
      {/* Top Navigation Bar */}
      <header className="h-16 bg-[#0E1523]/80 backdrop-blur-xl border-b border-white/5 fixed top-0 left-0 right-0 z-50">
        <div className="h-full px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-white hover:text-[#4DA3FF] transition-colors lg:hidden"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4DA3FF] to-[#4CFFB3] flex items-center justify-center">
                <span className="text-white">🐟</span>
              </div>
              <div>
                <h1 className="text-white">Tilapia IoT Monitor</h1>
                <p className="text-[#A9B4C9] text-xs">Smart Aquaculture System</p>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center gap-3 flex-1 max-w-md mx-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A9B4C9]" />
              <input
                type="text"
                placeholder="Search sensors, alerts..."
                className="w-full h-10 bg-[#223354] border border-white/10 rounded-xl pl-10 pr-4 text-white text-sm placeholder:text-[#A9B4C9] focus:outline-none focus:border-[#4DA3FF]/50"
              />
            </div>
          </div>

          {/* User Menu */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-[#223354] rounded-xl">
              <div className="w-2 h-2 rounded-full bg-[#4CFFB3] animate-pulse"></div>
              <span className="text-[#4CFFB3] text-sm">System Online</span>
            </div>
            <button className="w-9 h-9 rounded-lg bg-[#223354] flex items-center justify-center text-[#A9B4C9] hover:text-white hover:bg-[#4DA3FF] transition-all">
              <User className="w-5 h-5" />
            </button>
            <button className="w-9 h-9 rounded-lg bg-[#223354] flex items-center justify-center text-[#A9B4C9] hover:text-[#FF5E5E] hover:bg-[#FF5E5E]/10 transition-all">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex pt-16">
        {/* Sidebar Navigation */}
        <aside className={`fixed lg:sticky top-16 left-0 h-[calc(100vh-4rem)] bg-[#0E1523]/80 backdrop-blur-xl border-r border-white/5 transition-transform duration-300 z-40 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} w-64`}>
          <nav className="p-4 space-y-2">
            <NavItem
              icon={<Home className="w-5 h-5" />}
              label="Dashboard"
              active={activeScreen === 'dashboard'}
              onClick={() => {
                setActiveScreen('dashboard');
                setSidebarOpen(false);
              }}
            />
            <NavItem
              icon={<LineChart className="w-5 h-5" />}
              label="Analytics"
              active={activeScreen === 'charts'}
              onClick={() => {
                setActiveScreen('charts');
                setSidebarOpen(false);
              }}
            />
            <NavItem
              icon={<Zap className="w-5 h-5" />}
              label="Device Control"
              active={activeScreen === 'control'}
              onClick={() => {
                setActiveScreen('control');
                setSidebarOpen(false);
              }}
            />
            <NavItem
              icon={<Bell className="w-5 h-5" />}
              label="Notifications"
              active={activeScreen === 'notifications'}
              badge={6}
              onClick={() => {
                setActiveScreen('notifications');
                setSidebarOpen(false);
              }}
            />
            <NavItem
              icon={<SettingsIcon className="w-5 h-5" />}
              label="Settings"
              active={activeScreen === 'settings'}
              onClick={() => {
                setActiveScreen('settings');
                setSidebarOpen(false);
              }}
            />
          </nav>

          {/* System Stats in Sidebar */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="bg-[#223354]/60 backdrop-blur-sm rounded-2xl p-4 border border-white/5">
              <h4 className="text-white text-sm mb-3">Quick Stats</h4>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#A9B4C9]">Uptime</span>
                  <span className="text-white">48h 23m</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#A9B4C9]">Devices</span>
                  <span className="text-white">6/6</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#A9B4C9]">Alerts</span>
                  <span className="text-[#FFED87]">2 warnings</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto h-[calc(100vh-4rem)]">
          {activeScreen === 'dashboard' && <Dashboard />}
          {activeScreen === 'charts' && <Charts />}
          {activeScreen === 'notifications' && <Notifications />}
          {activeScreen === 'control' && <DeviceControl />}
          {activeScreen === 'settings' && <Settings />}
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
}

function NavItem({ icon, label, active, badge, onClick }: { icon: React.ReactNode; label: string; active: boolean; badge?: number; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
        active 
          ? 'bg-[#4DA3FF] text-white shadow-lg shadow-[#4DA3FF]/20' 
          : 'text-[#A9B4C9] hover:bg-[#223354] hover:text-white'
      }`}
    >
      {icon}
      <span className="flex-1 text-left">{label}</span>
      {badge && (
        <span className="px-2 py-0.5 bg-[#FF5E5E] text-white text-xs rounded-full">
          {badge}
        </span>
      )}
    </button>
  );
}
