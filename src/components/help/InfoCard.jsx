import React from 'react';
import SeverityBanner from './SeverityBanner';
import StepGuide from './StepGuide';
import DoDontSection from './DoDontSection';
import EmergencyVideoSection from './EmergencyVideoSection';

const InfoCard = ({ topic }) => {
  if (!topic) return null;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* 1. Severity Banner */}
      <div className="p-4 sm:p-6 pb-0">
        <SeverityBanner severity={topic.severity} message={topic.severityMessage} />
      </div>

      {/* 2. Header */}
      <div className="px-4 sm:px-6 py-8 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center space-x-5 mb-4">
          <div className="w-20 h-20 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-4xl shadow-inner group">
            <span aria-hidden="true" className="group-hover:scale-110 transition-transform duration-300">{topic.icon}</span>
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">{topic.title}</h2>
          </div>
        </div>
        <p className="text-slate-600 dark:text-slate-300 text-lg md:text-xl font-medium leading-relaxed max-w-4xl">{topic.summary}</p>
      </div>

      <div className="p-4 sm:p-8 bg-slate-50/30 dark:bg-[#0b1121]/30">
        {/* 3. Steps */}
        <StepGuide steps={topic.steps} />

        {/* 4. Do/Don't */}
        <DoDontSection dos={topic.dos} donts={topic.donts} />

        {/* 5. Emergency Action Box */}
        <div className="mt-10 bg-red-50 dark:bg-red-950/40 border-l-4 border-red-600 rounded-r-2xl p-6 shadow-sm">
          <h4 className="text-red-600 dark:text-red-400 font-black uppercase tracking-widest text-xs mb-3">Immediate Action Required</h4>
          <p className="text-red-900 dark:text-red-100 font-bold text-xl leading-relaxed mb-6">{topic.emergencyAction}</p>
          <a
            href="tel:108"
            className="inline-flex items-center justify-center bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-2xl font-black transition-all active:scale-95 shadow-lg shadow-red-500/30 text-lg group"
          >
            <svg className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Call 108 Now
          </a>
        </div>

        {/* 6. Video */}
        <EmergencyVideoSection video={topic.video} />
      </div>
    </div>
  );
};

export default InfoCard;
