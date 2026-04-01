import React from 'react';
import { QUICK_CHIPS } from '../../data/emergencyData';

const QuickTopicChips = ({ onSelect, activeId }) => {
  return (
    <div className="w-full mt-6 pb-2 overflow-x-auto scrollbar-hide">
      <div className="flex space-x-3 w-max px-1">
        {QUICK_CHIPS.map((chip) => {
          const isActive = activeId === chip.id;
          return (
            <button
              key={chip.id}
              onClick={() => onSelect(isActive ? null : chip.id)} // Toggle off if clicked again
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-full whitespace-nowrap text-sm font-bold transition-all shadow-sm active:scale-95
                ${isActive 
                  ? 'bg-red-600 text-white shadow-lg shadow-red-500/30' 
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-red-600 dark:hover:text-white border border-slate-200 dark:border-slate-700'
                }`}
            >
              <span aria-hidden="true">{chip.icon}</span>
              <span>{chip.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickTopicChips;
