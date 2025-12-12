import { AlertCircle, CheckCircle, AlertTriangle } from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  severity: 'normal' | 'warning' | 'critical';
}

const notifications: Notification[] = [
  {
    id: '1',
    title: 'Turbidity Level Rising',
    message: 'Turbidity has increased to 12.4 NTU. Consider water change.',
    timestamp: '5 min ago',
    severity: 'warning',
  },
  {
    id: '2',
    title: 'pH Level Optimal',
    message: 'pH stabilized at 7.2. Water quality is good.',
    timestamp: '1 hour ago',
    severity: 'normal',
  },
  {
    id: '3',
    title: 'Temperature Alert',
    message: 'Water temperature reached 30°C. Aeration activated.',
    timestamp: '3 hours ago',
    severity: 'critical',
  },
  {
    id: '4',
    title: 'Feeding Reminder',
    message: 'Time for scheduled feeding (2:00 PM).',
    timestamp: '5 hours ago',
    severity: 'normal',
  },
  {
    id: '5',
    title: 'Water Level Low',
    message: 'Water level at 85%. Refill recommended.',
    timestamp: '8 hours ago',
    severity: 'warning',
  },
  {
    id: '6',
    title: 'System Online',
    message: 'All sensors connected and reporting normally.',
    timestamp: '12 hours ago',
    severity: 'normal',
  },
];

export function Notifications() {
  const getIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <AlertCircle className="w-5 h-5" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5" />;
      default:
        return <CheckCircle className="w-5 h-5" />;
    }
  };

  const getColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return '#FF5E5E';
      case 'warning':
        return '#FFED87';
      default:
        return '#4CFFB3';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h2 className="text-white text-3xl">Notifications Center</h2>
          <p className="text-[#A9B4C9]">{notifications.length} total alerts and updates</p>
        </div>
        <div className="flex gap-3">
          <button className="h-11 px-6 rounded-xl bg-[#223354] text-[#A9B4C9] hover:text-white transition-colors">
            Filter
          </button>
          <button className="h-11 px-6 rounded-xl text-[#4DA3FF] hover:text-[#3D93EF] transition-colors">
            Mark All Read
          </button>
          <button className="h-11 px-6 rounded-xl border-2 border-[#FF5E5E] text-[#FF5E5E] hover:bg-[#FF5E5E]/10 transition-colors">
            Clear All
          </button>
        </div>
      </div>

      {/* Notifications Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="relative bg-[#223354] rounded-2xl p-5 border border-white/5 overflow-hidden hover:border-[#4DA3FF]/20 transition-all"
          >
            {/* Severity Bar */}
            <div
              className="absolute left-0 top-0 bottom-0 w-1.5"
              style={{ backgroundColor: getColor(notification.severity) }}
            ></div>

            <div className="flex gap-4 pl-3">
              {/* Icon */}
              <div 
                className="pt-1"
                style={{ color: getColor(notification.severity) }}
              >
                {getIcon(notification.severity)}
              </div>

              {/* Content */}
              <div className="flex-1 space-y-1">
                <h3 className="text-white">{notification.title}</h3>
                <p className="text-[#A9B4C9] text-sm leading-relaxed">
                  {notification.message}
                </p>
                <p className="text-[#A9B4C9]/60 text-xs pt-1">
                  {notification.timestamp}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Notification Settings */}
      <div className="bg-[#223354]/60 backdrop-blur-sm rounded-3xl p-6 border border-white/5">
        <h3 className="text-white text-xl mb-6">Notification Preferences</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="flex items-center justify-between">
            <span className="text-[#A9B4C9]">Push Notifications</span>
            <Toggle enabled={true} />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#A9B4C9]">SMS Alerts</span>
            <Toggle enabled={true} />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#A9B4C9]">Email Reports</span>
            <Toggle enabled={false} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Toggle({ enabled }: { enabled: boolean }) {
  return (
    <div
      className={`w-12 h-6 rounded-full relative transition-colors ${
        enabled ? 'bg-[#4DA3FF]' : 'bg-[#A9B4C9]/20'
      }`}
    >
      <div
        className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
          enabled ? 'translate-x-7' : 'translate-x-1'
        }`}
      ></div>
    </div>
  );
}