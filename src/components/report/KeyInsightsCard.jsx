import React from 'react';
import { IconAlertCircle } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { useTranslateContent } from '../../hooks/useTranslateContent';

const KeyInsightsCard = ({ insights }) => {
    const { t } = useTranslation('report');
    const stringsToTranslate = insights ? insights.flatMap(i => [i.test, i.insight]) : [];
    const translatedStrings = useTranslateContent(stringsToTranslate) || [];

    if (!insights || insights.length === 0) return null;

    return (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{t('sections.keyInsights')}</h3>
            <div className="space-y-3">
                {insights.map((insight, idx) => {
                    const isLow = insight.status?.toUpperCase() === 'LOW';
                    const isHigh = insight.status?.toUpperCase() === 'HIGH';
                    
                    let bgClass = 'bg-slate-50 dark:bg-slate-900/50';
                    let textClass = 'text-slate-800 dark:text-slate-200';
                    let icon = 'ℹ️';

                    if (isLow) {
                        bgClass = 'bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30';
                        textClass = 'text-red-900 dark:text-red-400';
                        icon = '🔻';
                    } else if (isHigh) {
                        bgClass = 'bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-900/30';
                        textClass = 'text-orange-900 dark:text-orange-400';
                        icon = '🔺';
                    }

                    return (
                        <div key={idx} className={`p-4 rounded-2xl flex items-start gap-3 ${bgClass}`}>
                            <span className="text-xl mt-0.5" role="img" aria-label="insight status">{icon}</span>
                            <div>
                                <h4 className={`font-bold text-sm ${textClass}`}>
                                    {insight.status} {translatedStrings[idx * 2] || insight.test}
                                </h4>
                                <p className={`text-sm mt-1 opacity-90 ${textClass}`}>
                                    {translatedStrings[idx * 2 + 1] || insight.insight}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default KeyInsightsCard;
