import React, { useState } from 'react';
import { IconShieldCheck } from '@tabler/icons-react';

const SideEffectsPanel = ({ effects }) => {
    const [tab, setTab] = useState('mild');

    if (!effects || (!effects.mild && !effects.serious)) return null;

    const mildList = effects.mild || [];
    const seriousList = effects.serious || [];

    return (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center">
                <IconShieldCheck size={20} className="text-red-500 mr-2" />
                Side Effects
            </h3>
            
            <div className="flex space-x-2 mb-4">
                <button 
                    onClick={() => setTab('mild')}
                    className={`flex-1 py-2 text-sm font-bold rounded-xl transition ${tab === 'mild' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400' : 'bg-slate-50 text-slate-500 dark:bg-slate-900/50 dark:text-slate-400'}`}
                >
                    Mild ({mildList.length})
                </button>
                <button 
                    onClick={() => setTab('serious')}
                    className={`flex-1 py-2 text-sm font-bold rounded-xl transition ${tab === 'serious' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' : 'bg-slate-50 text-slate-500 dark:bg-slate-900/50 dark:text-slate-400'}`}
                >
                    Serious ({seriousList.length})
                </button>
            </div>

            <ul className="space-y-3">
                {(tab === 'mild' ? mildList : seriousList).map((effect, i) => (
                    <li key={i} className="flex items-start text-sm">
                        <span className={`mr-3 mt-0.5 ${tab === 'mild' ? 'text-amber-500' : 'text-red-500'}`}>•</span>
                        <span className={`leading-relaxed ${tab === 'mild' ? 'text-amber-900 dark:text-amber-300' : 'text-red-900 dark:text-red-300'}`}>{effect}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SideEffectsPanel;
