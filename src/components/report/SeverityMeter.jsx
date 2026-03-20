import React from 'react';
import { IconCircleCheckFilled, IconAlertTriangle, IconCircleX } from '@tabler/icons-react';

const riskColors = {
    LOW: { bg: 'bg-emerald-100 dark:bg-emerald-900/30', text: 'text-emerald-600 dark:text-emerald-400', icon: IconCircleCheckFilled },
    MEDIUM: { bg: 'bg-amber-100 dark:bg-amber-900/30', text: 'text-amber-600 dark:text-amber-500', icon: IconAlertTriangle },
    HIGH: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-600 dark:text-red-500', icon: IconCircleX },
};

const SeverityMeter = ({ level }) => {
    const riskLevel = level?.toUpperCase() || 'LOW';
    const RiskStyle = riskColors[riskLevel] || riskColors.LOW;
    const RiskIcon = RiskStyle.icon;

    return (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Overall Severity</p>
            <div className="flex items-center space-x-4 mb-2">
                <div className={`w-16 h-16 ${RiskStyle.bg} rounded-full flex items-center justify-center shrink-0`}>
                    <RiskIcon size={32} className={RiskStyle.text} />
                </div>
                <div>
                    <h3 className={`text-4xl font-extrabold ${RiskStyle.text}`}>{riskLevel}</h3>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Risk Assessment</p>
                </div>
            </div>
            
            {/* Visual Meter Bar */}
            <div className="mt-6">
                <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 px-1">
                    <span>Low</span>
                    <span>Med</span>
                    <span>High</span>
                </div>
                <div className="h-2 w-full flex rounded-full overflow-hidden bg-slate-100 dark:bg-slate-700">
                    <div className={`h-full bg-emerald-500 transition-all duration-500 ${riskLevel === 'LOW' ? 'w-full' : 'w-1/3 border-r-2 border-white dark:border-slate-800'}`}></div>
                    <div className={`h-full bg-amber-500 transition-all duration-500 ${(riskLevel === 'MEDIUM' || riskLevel === 'HIGH') ? 'w-1/3 border-r-2 border-white dark:border-slate-800' : 'w-0'}`}></div>
                    <div className={`h-full bg-red-500 transition-all duration-500 ${riskLevel === 'HIGH' ? 'w-1/3' : 'w-0'}`}></div>
                </div>
            </div>
        </div>
    );
};

export default SeverityMeter;
