import React from 'react';
import { IconAlertTriangle, IconActivityHeartbeat } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';

const ScanWarnings = ({ contraindications, interactions, crossAnalysis }) => {
    const { t } = useTranslation('scanResult');
    const hasContra = contraindications && contraindications.length > 0;
    const hasInteracts = interactions && interactions.length > 0;
    const hasCross = crossAnalysis && crossAnalysis.length > 0;

    if (!hasContra && !hasInteracts && !hasCross) return null;

    return (
        <div className="space-y-6">
            {/* Cross Analysis Warnings */}
            {hasCross && (
               <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/40 rounded-3xl p-6 shadow-sm">
                   <h3 className="text-lg font-bold text-red-900 dark:text-red-500 mb-4 flex items-center">
                       <IconActivityHeartbeat size={20} className="mr-2" />
                       Personal Health Warning
                   </h3>
                   <div className="space-y-3">
                       {crossAnalysis.map((w, i) => (
                           <div key={i} className="flex items-start bg-red-100 dark:bg-red-900/20 p-3 rounded-xl border border-red-200 dark:border-red-900/50">
                               <IconAlertTriangle size={18} className="text-red-600 dark:text-red-400 mr-3 mt-0.5 shrink-0" />
                               <p className="text-sm font-semibold text-red-900 dark:text-red-300 leading-relaxed">{w}</p>
                           </div>
                       ))}
                   </div>
               </div> 
            )}

            {/* General Contraindications & Interactions */}
            {(hasContra || hasInteracts) && (
                <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center">
                        <IconAlertTriangle size={20} className="text-amber-500 mr-2" />
                        {t('warnings.title')}
                    </h3>
                    
                    {hasContra && (
                        <div className="mb-6">
                            <h4 className="text-sm font-bold text-amber-900 dark:text-amber-500 mb-2 uppercase tracking-wide">{t('warnings.doNotTake')}</h4>
                            <ul className="space-y-2">
                                {contraindications.map((c, i) => (
                                    <li key={i} className="flex items-start text-sm text-slate-700 dark:text-slate-300">
                                        <span className="mr-2 text-amber-500 font-bold">×</span> {c}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    
                    {hasInteracts && (
                        <div>
                            <h4 className="text-sm font-bold text-amber-900 dark:text-amber-500 mb-2 uppercase tracking-wide">{t('warnings.interactsWith')}</h4>
                            <ul className="space-y-2">
                                {interactions.map((inter, i) => (
                                    <li key={i} className="flex items-start text-sm text-slate-700 dark:text-slate-300">
                                        <span className="mr-2 text-amber-500">↔</span> {inter}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ScanWarnings;
