interface SensorCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  unit: string;
  status: 'normal' | 'warning' | 'critical';
}

export function SensorCard({ icon, label, value, unit, status }: SensorCardProps) {
  const statusColors = {
    normal: '#4CFFB3',
    warning: '#FFED87',
    critical: '#FF5E5E',
  };

  return (
    <div className="relative bg-[#223354] rounded-3xl p-5 shadow-lg border border-[#4DA3FF]/20 overflow-hidden group hover:border-[#4DA3FF]/40 transition-all">
      {/* Gloss effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/12 to-transparent pointer-events-none"></div>
      
      <div className="relative space-y-3">
        {/* Icon and Status */}
        <div className="flex items-start justify-between">
          <div className="text-[#4DA3FF]">
            {icon}
          </div>
          <div 
            className="w-2.5 h-2.5 rounded-full" 
            style={{ backgroundColor: statusColors[status] }}
          ></div>
        </div>

        {/* Label */}
        <p className="text-[#A9B4C9] text-sm">{label}</p>

        {/* Value */}
        <div className="flex items-baseline gap-1">
          <span className="text-white text-3xl tracking-tight">{value}</span>
          <span className="text-[#A9B4C9] text-sm">{unit}</span>
        </div>
      </div>
    </div>
  );
}
