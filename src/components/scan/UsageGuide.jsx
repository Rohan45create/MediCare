import React from 'react';
import { IconClock, IconMeat, IconCalendarEvent } from '@tabler/icons-react';

const UsageGuide = ({ guide }) => {
    if (!guide) return null;

    return (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center">
                <IconClock size={20} className="text-indigo-500 mr-2" />
                Usage Guide
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {guide.whenToTake && (
                    <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-700/50">
                        <div className="flex items-center text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                            <IconClock size={14} className="mr-1.5" /> Frequency
                        </div>
                        <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{guide.whenToTake}</p>
                    </div>
                )}
                {guide.food && (
                    <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-700/50">
                        <div className="flex items-center text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                            <IconMeat size={14} className="mr-1.5" /> Food
                        </div>
                        <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{guide.food}</p>
                    </div>
                )}
                {guide.duration && (
                    <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-700/50">
                        <div className="flex items-center text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                            <IconCalendarEvent size={14} className="mr-1.5" /> Duration
                        </div>
                        <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{guide.duration}</p>
                    </div>
                )}
            </div>
            {guide.info && (
                <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">{guide.info}</p>
            )}
        </div>
    );
};

export default UsageGuide;
