import React from 'react';
import { IconStethoscope, IconPercentage } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { useTranslateContent } from '../../hooks/useTranslateContent';

export const PossibleCauses = ({ causes }) => {
    const { t } = useTranslation('report');
    if (!causes || causes.length === 0) return null;

    return (
        <div className="bg-amber-50 dark:bg-amber-900/10 rounded-3xl p-6 border border-amber-100 dark:border-amber-900/30">
            <h3 className="text-lg font-bold text-amber-900 dark:text-amber-500 mb-4 flex items-center">
                <IconStethoscope size={20} className="mr-2" /> {t('sections.possibleCauses')}
            </h3>
            <ul className="space-y-3">
                {causes.map((cause, i) => (
                    <li key={i} className="flex items-start text-sm text-amber-800 dark:text-amber-400">
                        <span className="mr-3 text-amber-500">•</span>
                        <span className="leading-relaxed">{cause}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export const ConfidenceBreakdown = ({ confidence }) => {
    const { t } = useTranslation('report');
    if (!confidence) return null;
    
    // Fallback parsing if confidence is string JSON instead of object (e.g. from backend)
    let confData = confidence;
    if (typeof confidence === 'string') {
        try { confData = JSON.parse(confidence); } catch { confData = { score: confidence }; }
    }

    const scoreStr = confData.score?.replace('%', '') || '90';
    let score = parseInt(scoreStr, 10);
    
    // Fallback if AI returned NaN or invalid number
    if (isNaN(score)) {
        const text = String(confData.explanation || confData.score || '').toLowerCase();
        if (text.includes('high')) score = 90;
        else if (text.includes('low')) score = 40;
        else score = 75; // Medium/default
    }

    // Determine fallback explanation if confidence is just a string
    let explanationToTranslate = confData.explanation;
    if (!explanationToTranslate && typeof confData.score === 'string' && isNaN(parseInt(confData.score.replace('%', ''), 10))) {
        // If we only have score and it's a long string instead of a percent, it's likely the explanation
        explanationToTranslate = confData.score;
    }
    
    const translatedExplanation = useTranslateContent(explanationToTranslate);
    
    return (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center">
                <IconPercentage size={18} className="text-indigo-500 mr-2 border border-indigo-200 dark:border-indigo-800 rounded-full p-0.5" /> 
                {t('sections.extractionConfidence')}
            </h3>
            <div className="flex items-center space-x-4 mb-3">
                <div className="flex-1 w-full bg-slate-100 dark:bg-slate-700 rounded-full h-3 max-w-xs">
                    <div 
                        className={`h-3 rounded-full ${score > 85 ? 'bg-emerald-500' : score > 60 ? 'bg-amber-500' : 'bg-red-500'}`}
                        style={{ width: `${Math.min(score, 100)}%` }}
                    ></div>
                </div>
                <span className="text-2xl font-black text-slate-800 dark:text-slate-200">{score}%</span>
            </div>
            {translatedExplanation && (
                <p className="text-xs text-slate-500 dark:text-slate-400 opacity-90 leading-relaxed">
                    {translatedExplanation}
                </p>
            )}
        </div>
    );
};
