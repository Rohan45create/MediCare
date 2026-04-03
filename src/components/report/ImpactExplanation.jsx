import React from 'react';
import { IconHeartbeat, IconListCheck } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';

export const ImpactExplanation = ({ explanation }) => {
    const { t } = useTranslation('report');
    if (!explanation) return null;

    return (
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-3xl p-6 border border-blue-100 dark:border-blue-900/30">
            <h3 className="text-lg font-bold text-blue-900 dark:text-blue-400 mb-3 flex items-center">
                <IconHeartbeat size={20} className="mr-2" /> {t('sections.dailyLifeImpact')}
            </h3>
            <p className="text-sm text-blue-800/90 dark:text-blue-300/90 leading-relaxed whitespace-pre-wrap">
                {explanation}
            </p>
        </div>
    );
};

export const ActionableSteps = ({ steps }) => {
    const { t } = useTranslation('report');
    if (!steps || steps.length === 0) return null;

    return (
        <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-3xl p-6 border border-emerald-100 dark:border-emerald-900/30">
            <h3 className="text-lg font-bold text-emerald-900 dark:text-emerald-400 mb-4 flex items-center">
                <IconListCheck size={20} className="mr-2" /> {t('sections.actionableSteps')}
            </h3>
            <ul className="space-y-3">
                {steps.map((step, i) => (
                    <li key={i} className="flex items-start text-sm text-emerald-800 dark:text-emerald-300">
                        <span className="mr-3 mt-0.5 text-emerald-500">•</span>
                        <span className="leading-relaxed">{step.replace(/^-\s*/, '')}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};
