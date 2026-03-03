import React, { useState } from 'react';
import { IconSearch, IconFilter, IconScan, IconFileText, IconCircleCheck, IconAlertTriangle } from '@tabler/icons-react';

const HealthHistory = () => {
    const [filter, setFilter] = useState('all'); // all, scans, reports

    const historyItems = [
        { id: 1, type: 'scan', title: 'Paracetamol 500mg', date: 'Oct 24, 2026', status: 'safe', icon: <IconScan size={20} /> },
        { id: 2, type: 'report', title: 'Complete Blood Count (CBC)', date: 'Oct 15, 2026', status: 'info', icon: <IconFileText size={20} /> },
        { id: 3, type: 'scan', title: 'Ibuprofen', date: 'Sep 28, 2026', status: 'warning', icon: <IconScan size={20} /> },
        { id: 4, type: 'report', title: 'Lipid Profile', date: 'Aug 10, 2026', status: 'danger', icon: <IconFileText size={20} /> },
    ];

    const filteredItems = filter === 'all'
        ? historyItems
        : historyItems.filter(item => item.type === filter);

    const getStatusBadge = (status) => {
        switch (status) {
            case 'safe':
                return <span className="flex items-center text-xs font-medium px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400"><IconCircleCheck size={12} className="mr-1" /> Safe</span>;
            case 'warning':
                return <span className="flex items-center text-xs font-medium px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"><IconAlertTriangle size={12} className="mr-1" /> Warning</span>;
            case 'danger':
                return <span className="flex items-center text-xs font-medium px-2.5 py-1 rounded-full bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400"><IconAlertTriangle size={12} className="mr-1" /> Abnormal Result</span>;
            default:
                return <span className="flex items-center text-xs font-medium px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">Analyzed</span>;
        }
    };

    return (
        <div className="w-full bg-slate-50 dark:bg-[#0b1121] min-h-[calc(100vh-64px)] font-sans pb-24 lg:pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="max-w-4xl mx-auto space-y-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Health History</h1>
                            <p className="text-slate-500 dark:text-slate-400">View past medical scans and uploaded reports.</p>
                        </div>
                    </div>

                    {/* Filters and Search */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <IconSearch size={18} className="text-slate-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search history..."
                                className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:text-white transition-all shadow-sm"
                            />
                        </div>
                        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl shrink-0 border border-slate-200 dark:border-slate-700">
                            <button
                                onClick={() => setFilter('all')}
                                className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-colors ${filter === 'all' ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
                            >
                                All
                            </button>
                            <button
                                onClick={() => setFilter('scans')}
                                className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-colors ${filter === 'scans' ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
                            >
                                Scans
                            </button>
                            <button
                                onClick={() => setFilter('reports')}
                                className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-colors ${filter === 'reports' ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
                            >
                                Reports
                            </button>
                        </div>
                    </div>

                    {/* History List */}
                    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                        <ul className="divide-y divide-slate-100 dark:divide-slate-800">
                            {filteredItems.map(item => (
                                <li key={item.id} className="p-4 sm:p-6 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            <div className={`p-3 rounded-xl flex items-center justify-center shrink-0 ${item.type === 'scan' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'}`}>
                                                {item.icon}
                                            </div>
                                            <div>
                                                <h4 className="text-slate-900 dark:text-white font-semibold group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">{item.title}</h4>
                                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{item.date}</p>
                                            </div>
                                        </div>
                                        <div>
                                            {getStatusBadge(item.status)}
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HealthHistory;
