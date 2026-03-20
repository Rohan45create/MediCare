import React from 'react';
import { IconBottle } from '@tabler/icons-react';

const DosageSafety = ({ dosage }) => {
    if (!dosage) return null;

    return (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center">
                <IconBottle size={20} className="text-blue-500 mr-2" />
                Dosage & Safety Limits
            </h3>
            <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-700">
                    <span className="text-sm font-semibold text-slate-500">Current Strength</span>
                    <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{dosage.currentUsage}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-700">
                    <span className="text-sm font-semibold text-slate-500">Max Safe Dose</span>
                    <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{dosage.maxSafeDose}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-slate-500">Dosage Status</span>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${dosage.status === 'SAFE' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'}`}>
                        {dosage.status}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default DosageSafety;
