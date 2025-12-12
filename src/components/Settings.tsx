import { ChevronRight, Sliders, Phone, Calendar, Bell, Database, Bluetooth } from 'lucide-react';
import { useState } from 'react';

export function Settings() {
  const [waterTempThreshold, setWaterTempThreshold] = useState(28);
  const [phThreshold, setPhThreshold] = useState(7.2);
  const [turbidityThreshold, setTurbidityThreshold] = useState(12);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h2 className="text-white text-3xl">Settings & Configuration</h2>
          <p className="text-[#A9B4C9]">Manage system preferences and thresholds</p>
        </div>
        <div className="flex gap-3">
          <button className="h-11 px-6 rounded-xl bg-[#223354] text-[#A9B4C9] hover:text-white transition-colors">
            Import Settings
          </button>
          <button className="h-11 px-6 rounded-xl border-2 border-[#4DA3FF] text-[#4DA3FF] hover:bg-[#4DA3FF]/10 transition-colors">
            Export Settings
          </button>
        </div>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monitoring Settings */}
        <div className="bg-[#223354] rounded-3xl overflow-hidden border border-white/5">
          <h3 className="text-white px-5 pt-5 pb-3">Monitoring</h3>
          <div className="divide-y divide-white/5">
            <SettingsItem
              icon={<Sliders className="w-5 h-5" />}
              label="Threshold Settings"
              description="Configure alert thresholds"
            />
            <SettingsItem
              icon={<Phone className="w-5 h-5" />}
              label="Phone Number"
              description="+1 (555) 123-4567"
            />
          </div>
        </div>

        {/* Automation Settings */}
        <div className="bg-[#223354] rounded-3xl overflow-hidden border border-white/5">
          <h3 className="text-white px-5 pt-5 pb-3">Automation</h3>
          <div className="divide-y divide-white/5">
            <SettingsItem
              icon={<Calendar className="w-5 h-5" />}
              label="Feeding Schedule"
              description="3 times daily"
            />
            <SettingsItem
              icon={<Bell className="w-5 h-5" />}
              label="Cleaning Reminders"
              description="Weekly notifications"
            />
          </div>
        </div>

        {/* Data & Devices */}
        <div className="bg-[#223354] rounded-3xl overflow-hidden border border-white/5">
          <h3 className="text-white px-5 pt-5 pb-3">Data & Devices</h3>
          <div className="divide-y divide-white/5">
            <SettingsItem
              icon={<Database className="w-5 h-5" />}
              label="Biomass Input"
              description="850 kg current stock"
            />
            <SettingsItem
              icon={<Bluetooth className="w-5 h-5" />}
              label="Device Pairing"
              description="6 devices connected"
            />
          </div>
        </div>
      </div>

      {/* Threshold Configuration */}
      <div className="bg-gradient-to-br from-[#4DA3FF]/20 to-[#223354] rounded-3xl p-5 border border-[#4DA3FF]/30">
        <h3 className="text-white mb-4">Quick Threshold Adjust</h3>
        <div className="space-y-4">
          <ThresholdSlider 
            label="Water Temp" 
            min={25} 
            max={32} 
            current={waterTempThreshold} 
            unit="°C" 
            onChange={setWaterTempThreshold}
          />
          <ThresholdSlider 
            label="pH Level" 
            min={6.5} 
            max={8.5} 
            current={phThreshold} 
            unit="" 
            step={0.1}
            onChange={setPhThreshold}
          />
          <ThresholdSlider 
            label="Turbidity" 
            min={0} 
            max={20} 
            current={turbidityThreshold} 
            unit="NTU"
            onChange={setTurbidityThreshold}
          />
        </div>
      </div>

      {/* System Info */}
      <div className="bg-[#223354]/60 rounded-3xl p-5 border border-white/5">
        <h3 className="text-white mb-4">System Information</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-[#A9B4C9]">Firmware Version</span>
            <span className="text-white">v2.4.1</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#A9B4C9]">Last Sync</span>
            <span className="text-white">2 min ago</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#A9B4C9]">Storage Used</span>
            <span className="text-white">2.3 GB / 16 GB</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button className="w-full h-12 rounded-[20px] border-2 border-[#4DA3FF] text-[#4DA3FF] hover:bg-[#4DA3FF]/10 transition-colors">
          Backup Data
        </button>
        <button className="w-full h-12 rounded-[20px] border-2 border-[#FF5E5E] text-[#FF5E5E] hover:bg-[#FF5E5E]/10 transition-colors">
          Factory Reset
        </button>
      </div>
    </div>
  );
}

function SettingsItem({ icon, label, description }: { icon: React.ReactNode; label: string; description: string }) {
  return (
    <button className="w-full flex items-center gap-4 px-5 py-4 hover:bg-white/5 transition-colors group">
      <div className="text-[#4DA3FF]">
        {icon}
      </div>
      <div className="flex-1 text-left">
        <p className="text-white">{label}</p>
        <p className="text-[#A9B4C9] text-sm">{description}</p>
      </div>
      <ChevronRight className="w-5 h-5 text-[#A9B4C9] group-hover:text-[#4DA3FF] transition-colors" />
    </button>
  );
}

function ThresholdSlider({ label, min, max, current, unit, step = 1, onChange }: { label: string; min: number; max: number; current: number; unit: string; step?: number; onChange: (value: number) => void }) {
  const percentage = ((current - min) / (max - min)) * 100;

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-[#A9B4C9] text-sm">{label}</span>
        <span className="text-white">
          {current.toFixed(step < 1 ? 1 : 0)}{unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={current}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-[#223354] rounded-full appearance-none cursor-pointer"
        style={{
          background: `linear-gradient(to right, #4DA3FF ${percentage}%, #223354 ${percentage}%)`,
        }}
      />
      <div className="flex justify-between text-xs text-[#A9B4C9] mt-1">
        <span>{min}{unit}</span>
        <span>{max}{unit}</span>
      </div>
    </div>
  );
}