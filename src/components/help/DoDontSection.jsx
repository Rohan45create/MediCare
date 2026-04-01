import React from 'react';

const DoDontSection = ({ dos, donts }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
      {/* DOs Column */}
      {dos && dos.length > 0 && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-500/30 rounded-3xl p-6 shadow-sm group">
          <h4 className="flex items-center text-green-600 dark:text-green-400 font-black mb-5 text-xl tracking-tight">
            <svg className="w-7 h-7 mr-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
            What to Do
          </h4>
          <ul className="space-y-4">
            {dos.map((item, i) => (
              <li key={i} className="flex items-start text-slate-700 dark:text-green-100 font-bold text-base md:text-lg leading-relaxed">
                <span className="text-green-500 dark:text-green-400 mr-2 mt-1.5 shrink-0">●</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* DONTs Column */}
      {donts && donts.length > 0 && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-500/30 rounded-3xl p-6 shadow-sm group">
          <h4 className="flex items-center text-red-600 dark:text-red-500 font-black mb-5 text-xl tracking-tight">
            <svg className="w-7 h-7 mr-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
            </svg>
            What to Avoid
          </h4>
          <ul className="space-y-4">
            {donts.map((item, i) => (
              <li key={i} className="flex items-start text-slate-700 dark:text-red-100 font-bold text-base md:text-lg leading-relaxed">
                <span className="text-red-500 dark:text-red-400 mr-2 mt-1.5 shrink-0">●</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DoDontSection;
