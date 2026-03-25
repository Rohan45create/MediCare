import React, { useState } from 'react';

const HealthMetricCard = ({ metric }) => {
    const [showTooltip, setShowTooltip] = useState(false);

    const {
        testName,
        value,
        unit,
        status,
        minRange,
        maxRange,
        meaning,
        lowMeaning,
        highMeaning
    } = metric;

    // Determine colors based on status
    const isNormal = status === 'NORMAL';
    const isHigh = status === 'HIGH';
    const isLow = status === 'LOW';

    let statusColor = 'bg-gray-100 text-gray-800 dark:bg-slate-700 dark:text-slate-200';
    let trackFillColor = 'bg-gray-400 dark:bg-slate-500';
    
    if (isNormal) {
        statusColor = 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-400';
        trackFillColor = 'bg-[#1D9E75]'; // green
    } else if (isHigh) {
        statusColor = 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-400';
        trackFillColor = 'bg-[#BA7517]'; // amber
    } else if (isLow) {
        statusColor = 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-400';
        trackFillColor = 'bg-[#E8593C]'; // red
    }

    // Calculate percentage for the range bar
    let percent = 0;
    if (maxRange > minRange) {
        percent = ((value - minRange) / (maxRange - minRange)) * 100;
        // Clamp between 0 and 100
        percent = Math.max(0, Math.min(100, percent));
    } else {
        percent = 50; // fallback if no valid range
    }

    return (
        <div className="relative bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-slate-700 flex flex-col h-full hover:shadow-md transition-shadow">
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
                <h3 className="font-semibold text-gray-800 dark:text-slate-200 line-clamp-1 pr-2" title={testName}>
                    {testName}
                </h3>
                
                {/* Tooltip Wrapper */}
                <div 
                    className="relative flex-shrink-0 cursor-help"
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                >
                    <div className="text-gray-400 hover:text-indigo-500 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                        </svg>
                    </div>

                    {/* Tooltip Content */}
                    {showTooltip && (
                        <div className="absolute right-0 top-6 w-64 bg-gray-800 text-white text-sm rounded-lg p-3 shadow-lg z-10 animate-fade-in">
                            <h4 className="font-bold border-b border-gray-700 pb-1 mb-2">{testName}</h4>
                            <p className="text-gray-200 mb-2">{meaning || 'No description available.'}</p>
                            
                            {!isNormal && (isLow || isHigh) && (
                                <p className="text-red-300 font-medium mb-2">
                                    {isLow ? lowMeaning : highMeaning}
                                </p>
                            )}
                            
                            {(minRange > 0 || maxRange > 0) && (
                                <p className="text-xs text-gray-400 mt-2 pt-2 border-t border-gray-700">
                                    Normal range: {minRange} - {maxRange} {unit}
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Value & Status */}
            <div className="flex items-baseline gap-2 mb-4">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">{value}</span>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400 mr-auto">{unit}</span>
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold tracking-wide ${statusColor}`}>
                    {status || 'UNKNOWN'}
                </span>
            </div>

            {/* Spacer to push range bar to bottom if needed */}
            <div className="flex-grow"></div>

            {/* Range Bar */}
            <div className="mt-2">
                <div className="relative h-2 w-full bg-gray-100 dark:bg-slate-700 rounded-full mt-4">
                    <div 
                        className={`absolute top-0 left-0 h-full rounded-full ${trackFillColor}`}
                        style={{ width: `${percent}%` }}
                    ></div>
                    {/* Marker */}
                    <div 
                        className={`absolute top-1/2 -mt-1.5 w-3 h-3 rounded-full border-2 border-white dark:border-slate-800 shadow shadow-sm ${trackFillColor}`}
                        style={{ left: `calc(${percent}% - 6px)` }}
                    ></div>
                </div>
                
                {/* Min/Max Labels */}
                {(minRange > 0 || maxRange > 0) && (
                    <div className="flex justify-between text-[11px] font-medium text-gray-400 mt-2">
                        <span>{minRange}</span>
                        <span>{maxRange}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HealthMetricCard;
