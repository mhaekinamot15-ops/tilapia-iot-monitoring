import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { TrendingUp, TrendingDown, Calendar } from 'lucide-react';

type ChartType = 'waterTemp' | 'pH' | 'turbidity' | 'waterLevel';

const chartData = {
  waterTemp: [
    { time: '00:00', value: 27.8 },
    { time: '04:00', value: 27.5 },
    { time: '08:00', value: 28.2 },
    { time: '12:00', value: 29.1 },
    { time: '16:00', value: 28.7 },
    { time: '20:00', value: 28.3 },
  ],
  pH: [
    { time: '00:00', value: 7.1 },
    { time: '04:00', value: 7.0 },
    { time: '08:00', value: 7.2 },
    { time: '12:00', value: 7.3 },
    { time: '16:00', value: 7.2 },
    { time: '20:00', value: 7.2 },
  ],
  turbidity: [
    { time: '00:00', value: 10.2 },
    { time: '04:00', value: 11.5 },
    { time: '08:00', value: 12.8 },
    { time: '12:00', value: 13.1 },
    { time: '16:00', value: 12.9 },
    { time: '20:00', value: 12.4 },
  ],
  waterLevel: [
    { time: '00:00', value: 88 },
    { time: '04:00', value: 87 },
    { time: '08:00', value: 86 },
    { time: '12:00', value: 87 },
    { time: '16:00', value: 87 },
    { time: '20:00', value: 87 },
  ],
};

const chartConfig = {
  waterTemp: { label: 'Water Temperature', unit: '°C', color: '#4DA3FF' },
  pH: { label: 'pH Level', unit: '', color: '#4CFFB3' },
  turbidity: { label: 'Turbidity', unit: 'NTU', color: '#FFED87' },
  waterLevel: { label: 'Water Level', unit: '%', color: '#FF5E5E' },
};

export function Charts() {
  const [activeChart, setActiveChart] = useState<ChartType>('waterTemp');
  const [timeRange, setTimeRange] = useState('24h');

  const data = chartData[activeChart];
  const avg = (data.reduce((a, b) => a + b.value, 0) / data.length).toFixed(1);
  const peak = Math.max(...data.map(d => d.value)).toFixed(1);
  const low = Math.min(...data.map(d => d.value)).toFixed(1);
  const trend = data[data.length - 1].value - data[0].value;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h2 className="text-white text-3xl">Analytics Dashboard</h2>
          <p className="text-[#A9B4C9]">Monitor trends and historical data</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 h-11 px-4 rounded-xl bg-[#223354] text-[#A9B4C9] hover:text-white transition-colors">
            <Calendar className="w-4 h-4" />
            <span>Last 24 Hours</span>
          </button>
          <button className="h-11 px-6 rounded-xl border-2 border-[#4DA3FF] text-[#4DA3FF] hover:bg-[#4DA3FF]/10 transition-colors">
            Export CSV
          </button>
        </div>
      </div>

      {/* Chart Selector Tabs */}
      <div className="grid grid-cols-2 lg:flex lg:flex-wrap gap-3">
        {(Object.keys(chartConfig) as ChartType[]).map((key) => (
          <button
            key={key}
            onClick={() => setActiveChart(key)}
            className={`px-6 py-3 rounded-xl transition-all ${
              activeChart === key
                ? 'bg-[#4DA3FF] text-white shadow-lg shadow-[#4DA3FF]/20'
                : 'bg-[#223354] text-[#A9B4C9] hover:bg-[#223354]/80 hover:text-white'
            }`}
          >
            {chartConfig[key].label}
          </button>
        ))}
      </div>

      {/* Main Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Area */}
        <div className="lg:col-span-2 bg-[#223354] rounded-3xl p-6 border border-white/5">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-white text-xl">{chartConfig[activeChart].label}</h3>
              <p className="text-[#A9B4C9] text-sm">24-hour trend analysis</p>
            </div>
            <div className="flex items-center gap-2">
              {trend >= 0 ? (
                <TrendingUp className="w-5 h-5 text-[#4CFFB3]" />
              ) : (
                <TrendingDown className="w-5 h-5 text-[#FF5E5E]" />
              )}
              <span className={trend >= 0 ? 'text-[#4CFFB3]' : 'text-[#FF5E5E]'}>
                {Math.abs(trend).toFixed(1)}{chartConfig[activeChart].unit}
              </span>
            </div>
          </div>
          
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData[activeChart]}>
                <defs>
                  <linearGradient id={`color${activeChart}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={chartConfig[activeChart].color} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={chartConfig[activeChart].color} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis 
                  dataKey="time" 
                  stroke="#A9B4C9" 
                  tick={{ fill: '#A9B4C9', fontSize: 12 }}
                />
                <YAxis 
                  stroke="#A9B4C9" 
                  tick={{ fill: '#A9B4C9', fontSize: 12 }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0E1523', 
                    border: '1px solid #4DA3FF40',
                    borderRadius: '12px',
                    color: 'white'
                  }}
                  labelStyle={{ color: '#A9B4C9' }}
                />
                <Area
                  type="monotone" 
                  dataKey="value" 
                  stroke={chartConfig[activeChart].color}
                  strokeWidth={3}
                  fill={`url(#color${activeChart})`}
                  dot={{ fill: chartConfig[activeChart].color, r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Stats Panel */}
        <div className="space-y-4">
          <StatCard
            label="Current Value"
            value={data[data.length - 1].value.toFixed(1)}
            unit={chartConfig[activeChart].unit}
            color={chartConfig[activeChart].color}
          />
          <StatCard
            label="Average"
            value={avg}
            unit={chartConfig[activeChart].unit}
            color="#A9B4C9"
          />
          <StatCard
            label="Peak"
            value={peak}
            unit={chartConfig[activeChart].unit}
            color="#4CFFB3"
          />
          <StatCard
            label="Lowest"
            value={low}
            unit={chartConfig[activeChart].unit}
            color="#FF5E5E"
          />
        </div>
      </div>

      {/* All Metrics Overview */}
      <div className="bg-[#223354] rounded-3xl p-6 border border-white/5">
        <h3 className="text-white text-xl mb-6">All Metrics Overview</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {(Object.keys(chartConfig) as ChartType[]).map((key) => {
            const data = chartData[key];
            const current = data[data.length - 1].value;
            const previous = data[data.length - 2].value;
            const change = current - previous;
            
            return (
              <div key={key} className="bg-[#0E1523]/40 rounded-xl p-4">
                <p className="text-[#A9B4C9] text-sm mb-2">{chartConfig[key].label}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-white text-2xl">{current.toFixed(1)}</span>
                  <span className="text-[#A9B4C9] text-sm">{chartConfig[key].unit}</span>
                </div>
                <div className={`flex items-center gap-1 mt-2 ${change >= 0 ? 'text-[#4CFFB3]' : 'text-[#FF5E5E]'}`}>
                  {change >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  <span className="text-xs">{Math.abs(change).toFixed(1)} vs last reading</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, unit, color }: { label: string; value: string; unit: string; color: string }) {
  return (
    <div className="bg-[#223354] rounded-2xl p-5 border border-white/5">
      <p className="text-[#A9B4C9] text-sm mb-2">{label}</p>
      <div className="flex items-baseline gap-2">
        <span className="text-white text-3xl" style={{ color }}>{value}</span>
        <span className="text-[#A9B4C9]">{unit}</span>
      </div>
    </div>
  );
}
