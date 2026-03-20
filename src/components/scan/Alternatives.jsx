import React from 'react';
import { IconPill } from '@tabler/icons-react';

const Alternatives = ({ alternatives }) => {
    if (!alternatives || alternatives.length === 0) return null;

    return (
        <div className="bg-emerald-50 dark:bg-emerald-900/10 rounded-3xl p-6 border border-emerald-100 dark:border-emerald-900/30">
            <h3 className="text-lg font-bold text-emerald-900 dark:text-emerald-500 mb-4 flex items-center">
                <IconPill size={20} className="mr-2" /> Alternative Medicines
            </h3>
            <ul className="space-y-3">
                {alternatives.map((alt, i) => (
                    <li key={i} className="flex items-start text-sm text-emerald-800 dark:text-emerald-400">
                        <span className="mr-3 text-emerald-500">•</span>
                        <span className="leading-relaxed">{alt}</span>
                    </li>
                ))}
            </ul>
            <p className="mt-4 text-xs font-semibold text-emerald-700/70 dark:text-emerald-500/70">
                Always consult your healthcare provider before switching medications.
            </p>
        </div>
    );
};

export default Alternatives;
