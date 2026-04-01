import React from 'react';

const StepGuide = ({ steps }) => {
  if (!steps || steps.length === 0) return null;

  return (
    <div className="mt-8 mb-10 relative animate-in fade-in slide-in-from-left-4 duration-500 delay-150">
      <h3 className="text-xl font-black text-slate-900 dark:text-white mb-8 flex items-center">
        Step-by-Step Guide
      </h3>
      <div className="space-y-8">
        {steps.map((step, index) => (
          <div key={index} className="flex relative group">
            {/* Timeline Line */}
            {index !== steps.length - 1 && (
              <div 
                className="absolute w-0.5 bg-slate-200 dark:bg-slate-700 group-hover:bg-red-500/30 transition-colors" 
                style={{ top: '32px', bottom: '-32px', left: '15px' }}
                aria-hidden="true"
              ></div>
            )}
            
            {/* Number Circle */}
            <div className="shrink-0 w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-black text-sm shadow-lg shadow-red-500/30 z-10 group-hover:scale-110 transition-transform">
              {index + 1}
            </div>
            
            {/* Step text */}
            <div className="ml-5 pt-0.5">
              <p className="text-slate-700 dark:text-slate-300 font-bold text-base md:text-lg leading-relaxed group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                {step}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepGuide;
