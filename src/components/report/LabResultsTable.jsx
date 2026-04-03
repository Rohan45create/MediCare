import React, { useState } from 'react';
import { IconInfoCircle } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';

const LabResultsTable = ({ tests }) => {
    const { t } = useTranslation('report');
    const [hoveredTest, setHoveredTest] = useState(null);

    if (!tests || tests.length === 0) return null;

    return (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">{t('sections.labBreakdown')}</h3>
            <div className="overflow-x-auto overflow-y-visible">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-slate-100 dark:border-slate-700 text-left text-slate-500 text-xs tracking-wider uppercase">
                            <th className="py-3 px-4 font-semibold">{t('table.testName')}</th>
                            <th className="py-3 px-4 font-semibold">{t('table.value')}</th>
                            <th className="py-3 px-4 font-semibold">{t('table.unit')}</th>
                            <th className="py-3 px-4 font-semibold">{t('table.referenceRange')}</th>
                            <th className="py-3 px-4 font-semibold text-center">{t('table.status')}</th>
                            <th className="py-3 px-4 font-semibold">{t('table.meaning')}</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                        {tests.map((tv, i) => {
                            const statusKey = tv.status ? tv.status.toUpperCase() : 'UNKNOWN';
                            const isAbnormal = statusKey === 'HIGH' || statusKey === 'LOW';
                            
                            let statusColor = 'text-slate-500 bg-slate-100 dark:bg-slate-800';
                            let iconColor = 'text-slate-400';
                            
                            if (statusKey === 'HIGH') {
                                statusColor = 'text-orange-700 bg-orange-100 dark:text-orange-400 dark:bg-orange-900/30 ring-1 ring-orange-400/20';
                                iconColor = 'text-orange-500';
                            } else if (statusKey === 'LOW') {
                                statusColor = 'text-red-700 bg-red-100 dark:text-red-400 dark:bg-red-900/30 ring-1 ring-red-400/20';
                                iconColor = 'text-red-500';
                            } else if (statusKey === 'NORMAL') {
                                statusColor = 'text-emerald-700 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-900/30 ring-1 ring-emerald-400/20';
                                iconColor = 'text-emerald-500';
                            }

                            return (
                                <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors group relative">
                                    <td className="py-4 px-4 font-bold text-slate-900 dark:text-white">{tv.testName || tv.name}</td>
                                    <td className={`py-4 px-4 font-extrabold text-lg ${isAbnormal ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-300'}`}>
                                        {tv.value}
                                    </td>
                                    <td className="py-4 px-4 text-slate-500">{tv.unit || '-'}</td>
                                    <td className="py-4 px-4 text-slate-500 whitespace-nowrap text-xs">{tv.referenceRange || tv.normalRange}</td>
                                    
                                    <td className="py-4 px-4 text-center relative">
                                        <span 
                                            className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-bold tracking-widest ${statusColor} cursor-help`}
                                            onMouseEnter={() => setHoveredTest(i)}
                                            onMouseLeave={() => setHoveredTest(null)}
                                        >
                                            {statusKey}
                                            <IconInfoCircle size={14} className={`ml-1.5 ${iconColor}`} />
                                        </span>
                                        
                                        {hoveredTest === i && tv.meaning && (
                                            <div className="absolute z-50 left-1/2 -translate-x-1/2 bottom-full mb-2 w-64 bg-slate-900 text-white text-xs rounded-xl p-3 shadow-xl tooltip-arrow">
                                                {tv.meaning}
                                            </div>
                                        )}
                                    </td>
                                    
                                    <td className="py-4 px-4 text-slate-600 dark:text-slate-400 text-sm max-w-xs truncate">
                                        {tv.meaning || t('table.standardRange')}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LabResultsTable;
