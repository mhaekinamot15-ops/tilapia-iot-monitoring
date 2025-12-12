import { Droplets, Thermometer, Waves, TestTube, Eye, Activity } from 'lucide-react';
import { SensorCard } from './SensorCard';

export function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white text-3xl">Welcome back!</h2>
          <p className="text-[#A9B4C9]">Here's what's happening with your aquaculture system</p>
        </div>
        <div className="flex gap-3">
          <button className="h-11 px-6 rounded-xl border-2 border-[#4DA3FF] text-[#4DA3FF] hover:bg-[#4DA3FF]/10 transition-colors">
            Refresh Data
          </button>
          <button className="h-11 px-6 rounded-xl bg-[#4DA3FF] text-white hover:bg-[#3D93EF] transition-colors shadow-lg shadow-[#4DA3FF]/20">
            Export Report
          </button>
        </div>
      </div>

      {/* Sensor Grid - Larger layout for desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <SensorCard
          icon={<Thermometer className="w-8 h-8" />}
          label="Water Temp"
          value="28.3"
          unit="°C"
          status="normal"
        />
        <SensorCard
          icon={<Thermometer className="w-8 h-8" />}
          label="Air Temp"
          value="31.5"
          unit="°C"
          status="normal"
        />
        <SensorCard
          icon={<Waves className="w-8 h-8" />}
          label="Water Level"
          value="87"
          unit="%"
          status="normal"
        />
        <SensorCard
          icon={<TestTube className="w-8 h-8" />}
          label="pH Level"
          value="7.2"
          unit=""
          status="normal"
        />
        <SensorCard
          icon={<Eye className="w-8 h-8" />}
          label="Turbidity"
          value="12.4"
          unit="NTU"
          status="warning"
        />
        <SensorCard
          icon={<Droplets className="w-8 h-8" />}
          label="Dissolved O₂"
          value="6.8"
          unit="mg/L"
          status="normal"
        />
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* System Status */}
        <div className="lg:col-span-2 bg-[#223354]/60 backdrop-blur-sm rounded-3xl p-6 border border-white/5">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-white text-xl">System Status</h3>
              <p className="text-[#A9B4C9] text-sm">Real-time monitoring</p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-[#4CFFB3]/10 rounded-xl border border-[#4CFFB3]/20">
              <div className="w-2 h-2 rounded-full bg-[#4CFFB3] animate-pulse"></div>
              <span className="text-[#4CFFB3]">All Systems Operational</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <StatusItem label="Last Update" value="2 seconds ago" />
            <StatusItem label="Uptime" value="48h 23m" />
            <StatusItem label="Data Points" value="15,432" />
            <StatusItem label="Avg Response" value="120ms" />
          </div>

          <div className="mt-6 pt-6 border-t border-white/5">
            <h4 className="text-white mb-4">Active Devices</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <DeviceStatus name="Aerator" status="active" />
              <DeviceStatus name="UV Light" status="standby" />
              <DeviceStatus name="Auto Feeder" status="standby" />
              <DeviceStatus name="Heater" status="active" />
              <DeviceStatus name="Filter Pump" status="active" />
              <DeviceStatus name="pH Sensor" status="active" />
            </div>
          </div>
        </div>

        {/* Recent Alerts */}
        <div className="bg-[#223354]/60 backdrop-blur-sm rounded-3xl p-6 border border-white/5">
          <h3 className="text-white text-xl mb-4">Recent Alerts</h3>
          <div className="space-y-3">
            <AlertItem 
              title="Turbidity Rising"
              time="5 min ago"
              severity="warning"
            />
            <AlertItem 
              title="pH Optimal"
              time="1 hour ago"
              severity="normal"
            />
            <AlertItem 
              title="Temp Alert"
              time="3 hours ago"
              severity="critical"
            />
          </div>
          <button className="w-full mt-4 h-10 rounded-xl border border-[#4DA3FF] text-[#4DA3FF] text-sm hover:bg-[#4DA3FF]/10 transition-colors">
            View All Notifications
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <QuickAction 
          icon={<Activity className="w-6 h-6" />}
          title="Start Full Scan"
          description="Run complete system diagnostic"
          color="blue"
        />
        <QuickAction 
          icon={<Droplets className="w-6 h-6" />}
          title="Water Change"
          description="Schedule maintenance task"
          color="cyan"
        />
        <QuickAction 
          icon={<TestTube className="w-6 h-6" />}
          title="Calibrate Sensors"
          description="Ensure accurate readings"
          color="purple"
        />
        <QuickAction 
          icon={<Thermometer className="w-6 h-6" />}
          title="Adjust Thresholds"
          description="Modify alert parameters"
          color="orange"
        />
      </div>
    </div>
  );
}

function StatusItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-[#0E1523]/40 rounded-xl p-4">
      <p className="text-[#A9B4C9] text-sm mb-1">{label}</p>
      <p className="text-white text-xl">{value}</p>
    </div>
  );
}

function DeviceStatus({ name, status }: { name: string; status: 'active' | 'standby' }) {
  return (
    <div className="flex items-center gap-2 bg-[#0E1523]/40 rounded-lg px-3 py-2">
      <div className={`w-2 h-2 rounded-full ${status === 'active' ? 'bg-[#4CFFB3]' : 'bg-[#A9B4C9]/40'}`}></div>
      <span className="text-white text-sm">{name}</span>
    </div>
  );
}

function AlertItem({ title, time, severity }: { title: string; time: string; severity: 'normal' | 'warning' | 'critical' }) {
  const colors = {
    normal: '#4CFFB3',
    warning: '#FFED87',
    critical: '#FF5E5E',
  };

  return (
    <div className="relative bg-[#0E1523]/40 rounded-xl p-3 pl-5 overflow-hidden">
      <div 
        className="absolute left-0 top-0 bottom-0 w-1"
        style={{ backgroundColor: colors[severity] }}
      ></div>
      <p className="text-white text-sm">{title}</p>
      <p className="text-[#A9B4C9] text-xs mt-1">{time}</p>
    </div>
  );
}

function QuickAction({ icon, title, description, color }: { icon: React.ReactNode; title: string; description: string; color: string }) {
  const colorMap: Record<string, string> = {
    blue: 'from-[#4DA3FF]/20 to-[#223354] border-[#4DA3FF]/30 hover:border-[#4DA3FF]/50',
    cyan: 'from-[#4CFFB3]/20 to-[#223354] border-[#4CFFB3]/30 hover:border-[#4CFFB3]/50',
    purple: 'from-[#B44CFF]/20 to-[#223354] border-[#B44CFF]/30 hover:border-[#B44CFF]/50',
    orange: 'from-[#FFED87]/20 to-[#223354] border-[#FFED87]/30 hover:border-[#FFED87]/50',
  };

  return (
    <button className={`bg-gradient-to-br ${colorMap[color]} rounded-2xl p-5 border text-left transition-all hover:scale-105`}>
      <div className="text-[#4DA3FF] mb-3">
        {icon}
      </div>
      <h4 className="text-white mb-1">{title}</h4>
      <p className="text-[#A9B4C9] text-sm">{description}</p>
    </button>
  );
}
