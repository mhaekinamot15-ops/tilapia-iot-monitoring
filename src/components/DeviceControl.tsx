import { useState } from 'react';
import { Fan, Lightbulb, Droplets, Thermometer } from 'lucide-react';

export function DeviceControl() {
  const [aeratorOn, setAeratorOn] = useState(true);
  const [lightsOn, setLightsOn] = useState(false);
  const [feederOn, setFeederOn] = useState(false);
  const [heaterOn, setHeaterOn] = useState(true);
  const [aerationDuty, setAerationDuty] = useState(70);
  const [autoMode, setAutoMode] = useState(true);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h2 className="text-white text-3xl">Device Control Center</h2>
          <p className="text-[#A9B4C9]">Manage and monitor all connected equipment</p>
        </div>
        <div className="flex gap-3">
          <button className="h-11 px-6 rounded-xl bg-[#223354] text-[#A9B4C9] hover:text-white transition-colors">
            Automation Rules
          </button>
          <button className="h-11 px-6 rounded-xl border-2 border-[#4DA3FF] text-[#4DA3FF] hover:bg-[#4DA3FF]/10 transition-colors">
            Add Device
          </button>
        </div>
      </div>

      {/* Intelligent Aeration Card */}
      <div className="bg-gradient-to-br from-[#4DA3FF]/20 to-[#223354] rounded-3xl p-6 border border-[#4DA3FF]/30">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-white text-xl mb-1">Intelligent Aeration System</h3>
                <p className="text-[#A9B4C9]">
                  Automatically manages aeration duty cycle based on oxygen levels
                </p>
              </div>
              <Toggle enabled={autoMode} onChange={setAutoMode} />
            </div>

            {/* Duty Cycle Display */}
            <div className="flex items-center gap-6">
              <div className="flex-1">
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-white text-5xl">{aerationDuty}</span>
                  <span className="text-[#A9B4C9] text-xl">% duty cycle</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={aerationDuty}
                  onChange={(e) => setAerationDuty(Number(e.target.value))}
                  disabled={autoMode}
                  className="w-full h-3 bg-[#223354] rounded-full appearance-none cursor-pointer disabled:opacity-50"
                  style={{
                    background: `linear-gradient(to right, #4DA3FF ${aerationDuty}%, #223354 ${aerationDuty}%)`,
                  }}
                />
                <div className="flex justify-between text-sm text-[#A9B4C9] mt-2">
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </div>
              <div className="w-24 h-24 rounded-2xl bg-[#4DA3FF]/20 flex items-center justify-center border border-[#4DA3FF]/30">
                <Fan className={`w-12 h-12 text-[#4DA3FF] ${aeratorOn ? 'animate-spin' : ''}`} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Device Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <DeviceCard
          icon={<Fan className="w-10 h-10" />}
          label="Aerator"
          status={aeratorOn}
          onToggle={() => setAeratorOn(!aeratorOn)}
        />
        <DeviceCard
          icon={<Lightbulb className="w-10 h-10" />}
          label="UV Light"
          status={lightsOn}
          onToggle={() => setLightsOn(!lightsOn)}
        />
        <DeviceCard
          icon={<Droplets className="w-10 h-10" />}
          label="Auto Feeder"
          status={feederOn}
          onToggle={() => setFeederOn(!feederOn)}
        />
        <DeviceCard
          icon={<Thermometer className="w-10 h-10" />}
          label="Heater"
          status={heaterOn}
          onToggle={() => setHeaterOn(!heaterOn)}
        />
      </div>

      {/* Two Column Layout for Schedule and Emergency */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Schedule */}
        <div className="bg-[#223354] rounded-3xl p-6 border border-white/5">
          <h3 className="text-white text-xl mb-5">Feeding Schedule</h3>
          <div className="space-y-3">
            <ScheduleItem time="08:00 AM" active={true} />
            <ScheduleItem time="02:00 PM" active={true} />
            <ScheduleItem time="08:00 PM" active={true} />
          </div>
          <button className="w-full mt-4 h-11 rounded-xl border border-[#4DA3FF] text-[#4DA3FF] hover:bg-[#4DA3FF]/10 transition-colors">
            + Add Schedule
          </button>
        </div>

        {/* Emergency Controls */}
        <div className="bg-[#FF5E5E]/10 rounded-3xl p-6 border border-[#FF5E5E]/30">
          <h3 className="text-white text-xl mb-2">Emergency Controls</h3>
          <p className="text-[#A9B4C9] mb-6">
            Immediately activate all aeration and filtration systems at maximum capacity
          </p>
          <button className="w-full h-14 rounded-xl bg-[#FF5E5E] text-white hover:bg-[#FF4E4E] transition-colors text-lg">
            🚨 Emergency Aeration
          </button>
          <div className="mt-4 p-4 bg-[#FF5E5E]/5 rounded-xl">
            <p className="text-[#A9B4C9] text-sm">Last activated: Never</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function DeviceCard({ icon, label, status, onToggle }: { icon: React.ReactNode; label: string; status: boolean; onToggle: () => void }) {
  return (
    <div className="relative bg-[#223354] rounded-3xl p-5 border border-white/5 overflow-hidden">
      {/* Gloss */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/12 to-transparent pointer-events-none"></div>
      
      <div className="relative space-y-4">
        <div className={`transition-colors ${status ? 'text-[#4DA3FF]' : 'text-[#A9B4C9]'}`}>
          {icon}
        </div>
        <div>
          <p className="text-white mb-2">{label}</p>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${status ? 'bg-[#4CFFB3]' : 'bg-[#A9B4C9]/40'}`}></div>
            <span className="text-[#A9B4C9] text-sm">{status ? 'On' : 'Off'}</span>
          </div>
        </div>
        <Toggle enabled={status} onChange={onToggle} />
      </div>
    </div>
  );
}

function ScheduleItem({ time, active }: { time: string; active: boolean }) {
  return (
    <div className="flex items-center justify-between p-3 bg-[#0E1523]/40 rounded-xl">
      <div className="flex items-center gap-3">
        <div className={`w-1.5 h-10 rounded-full ${active ? 'bg-[#4DA3FF]' : 'bg-[#A9B4C9]/20'}`}></div>
        <div>
          <p className="text-white">{time}</p>
          <p className="text-[#A9B4C9] text-xs">Daily feeding</p>
        </div>
      </div>
      <Toggle enabled={active} onChange={() => {}} />
    </div>
  );
}

function Toggle({ enabled, onChange }: { enabled: boolean; onChange?: (value: boolean) => void }) {
  return (
    <button
      onClick={() => onChange?.(!enabled)}
      className={`w-12 h-6 rounded-full relative transition-colors ${
        enabled ? 'bg-[#4DA3FF]' : 'bg-[#A9B4C9]/20'
      }`}
    >
      <div
        className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
          enabled ? 'translate-x-7' : 'translate-x-1'
        }`}
      ></div>
    </button>
  );
}