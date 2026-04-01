import React from 'react';

const SeverityBanner = ({ severity, message }) => {
  const configs = {
    critical: {
      bg: 'bg-red-50 dark:bg-red-900/40',
      border: 'border-red-500/50',
      text: 'text-red-900 dark:text-white',
      label: 'Critical',
      icon: '🚨'
    },
    urgent: {
      bg: 'bg-amber-50 dark:bg-amber-900/40',
      border: 'border-amber-500/50',
      text: 'text-amber-900 dark:text-amber-100',
      label: 'Urgent',
      icon: '⚠️'
    },
    monitor: {
      bg: 'bg-green-50 dark:bg-green-900/40',
      border: 'border-green-500/50',
      text: 'text-green-900 dark:text-green-100',
      label: 'Monitor',
      icon: 'ℹ️'
    }
  };

  const config = configs[severity] || configs.monitor;

  return (
    <div className={`w-full ${config.bg} border-l-4 ${config.border} p-4 rounded-xl flex items-center justify-between shadow-sm animate-in fade-in duration-300`}>
      <div className="flex items-center space-x-4">
        <span className="text-3xl filter drop-shadow-sm" aria-hidden="true">{config.icon}</span>
        <div>
          <span className={`text-[10px] font-black uppercase tracking-widest opacity-60 block -mb-0.5 ${config.text}`}>
            {config.label} Priority
          </span>
          <p className={`font-black ${config.text} text-sm sm:text-base leading-tight tracking-tight`}>{message}</p>
        </div>
      </div>
      <a 
        href="tel:108"
        className="shrink-0 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl font-black text-xs sm:text-sm text-center shadow-lg shadow-red-500/30 transition-all active:scale-95 flex items-center"
      >
        <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
        Call 108
      </a>
    </div>
  );
};

export default SeverityBanner;
