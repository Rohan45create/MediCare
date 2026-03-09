import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    IconArrowLeft, IconDownload, IconCircleCheckFilled, IconAlertTriangle,
    IconCircleX, IconCalendar, IconBrain, IconActivity, IconRefresh
} from '@tabler/icons-react';
import { reportAPI } from '../services/api';
import MarkdownRenderer from '../components/MarkdownRenderer';

const riskColors = {
    LOW: { bg: 'bg-emerald-100 dark:bg-emerald-900/30', text: 'text-emerald-600 dark:text-emerald-400', icon: IconCircleCheckFilled },
    MEDIUM: { bg: 'bg-amber-100 dark:bg-amber-900/30', text: 'text-amber-600 dark:text-amber-500', icon: IconAlertTriangle },
    HIGH: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-600 dark:text-red-500', icon: IconCircleX },
};

const ReportResults = () => {
    const { reportId } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [polling, setPolling] = useState(false);

    const fetchReport = async () => {
        try {
            const res = await reportAPI.getById(reportId);
            setData(res.data);

            // If still processing, poll every 5 seconds
            if (res.data.status === 'PROCESSING') {
                setPolling(true);
            } else {
                setPolling(false);
                setLoading(false);
            }
        } catch (err) {
            setError('Could not load report. It may still be processing.');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReport();
    }, [reportId]);

    // Poll every 5s if still processing
    useEffect(() => {
        if (!polling) return;
        const interval = setInterval(fetchReport, 5000);
        return () => clearInterval(interval);
    }, [polling]);

    const result = data?.result;
    const riskLevel = result?.riskLevel || 'LOW';
    const RiskStyle = riskColors[riskLevel] || riskColors.LOW;
    const RiskIcon = RiskStyle.icon;

    // Parse test values from JSON string
    let testValues = [];
    if (result?.testValues) {
        try { testValues = JSON.parse(result.testValues); } catch { }
    }

    if (loading || (data?.status === 'PROCESSING' && !result?.aiExplanation)) {
        return (
            <div className="w-full bg-slate-50 dark:bg-[#0b1121] min-h-[calc(100vh-64px)] font-sans flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Analyzing Your Report</h2>
                    <p className="text-slate-500 dark:text-slate-400">Our AI is reading and extracting insights from your report...</p>
                    <p className="text-xs text-slate-400 mt-2">This may take 20-60 seconds</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full bg-slate-50 dark:bg-[#0b1121] min-h-[calc(100vh-64px)] font-sans flex items-center justify-center">
                <div className="text-center">
                    <IconCircleX size={48} className="text-red-500 mx-auto mb-4" />
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Error Loading Report</h2>
                    <p className="text-slate-500 dark:text-slate-400 mb-4">{error}</p>
                    <button onClick={fetchReport} className="flex items-center space-x-2 bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold mx-auto">
                        <IconRefresh size={18} /> <span>Retry</span>
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full bg-slate-50 dark:bg-[#0b1121] min-h-[calc(100vh-64px)] font-sans pb-24 lg:pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* Header */}
                <div className="flex flex-col mb-8">
                    <div className="flex items-center space-x-4 mb-4">
                        <button onClick={() => navigate('/reports')} className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-50 transition">
                            <IconArrowLeft size={20} />
                        </button>
                        <div>
                            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Report Analysis</h1>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                                {data?.fileName} &nbsp;·&nbsp;
                                <span className="flex items-center inline-flex gap-1">
                                    <IconCalendar size={12} /> {data?.uploadedAt ? new Date(data.uploadedAt).toLocaleDateString() : ''}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Left: Risk Level + AI Explanation */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Risk Level Card */}
                        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Overall Risk Assessment</p>
                            <div className="flex items-center space-x-4 mb-4">
                                <div className={`w-16 h-16 ${RiskStyle.bg} rounded-full flex items-center justify-center shrink-0`}>
                                    <RiskIcon size={32} className={RiskStyle.text} />
                                </div>
                                <div>
                                    <h3 className={`text-4xl font-extrabold ${RiskStyle.text}`}>{riskLevel}</h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">Risk Level</p>
                                </div>
                            </div>
                        </div>

                        {/* AI Explanation */}
                        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center">
                                <IconBrain size={20} className="text-blue-600 mr-2" /> AI Explanation
                            </h3>
                            <div className="text-sm text-slate-600 dark:text-slate-300">
                                <MarkdownRenderer content={result?.aiExplanation || 'No explanation available.'} />
                            </div>
                        </div>

                        {/* Test Values */}
                        {testValues.length > 0 && (
                            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center">
                                    <IconActivity size={20} className="text-emerald-600 mr-2" /> Extracted Test Values
                                </h3>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="border-b border-slate-100 dark:border-slate-700">
                                                <th className="text-left py-2 px-3 text-slate-500 font-semibold">Test</th>
                                                <th className="text-left py-2 px-3 text-slate-500 font-semibold">Value</th>
                                                <th className="text-left py-2 px-3 text-slate-500 font-semibold">Normal Range</th>
                                                <th className="text-left py-2 px-3 text-slate-500 font-semibold">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                                            {testValues.map((tv, i) => {
                                                const statusColor = tv.status === 'High' ? 'text-red-500' :
                                                    tv.status === 'Low' ? 'text-amber-500' : 'text-emerald-500';
                                                return (
                                                    <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-700/30">
                                                        <td className="py-3 px-3 font-medium text-slate-900 dark:text-white">{tv.name}</td>
                                                        <td className="py-3 px-3 text-slate-600 dark:text-slate-300">{tv.value}</td>
                                                        <td className="py-3 px-3 text-slate-500">{tv.normalRange}</td>
                                                        <td className={`py-3 px-3 font-bold ${statusColor}`}>{tv.status}</td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right: Recommendations + Follow-up */}
                    <div className="space-y-6">

                        {/* Recommendations */}
                        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
                            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Recommended Actions</h3>
                            <div className="text-sm text-slate-600 dark:text-slate-300">
                                <MarkdownRenderer content={result?.recommendations || 'No specific recommendations at this time.'} />
                            </div>
                        </div>

                        {/* Follow-up */}
                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-3xl p-6 border border-blue-100 dark:border-blue-900/50">
                            <h3 className="text-sm font-bold text-blue-900 dark:text-blue-400 mb-4">Follow-up Schedule</h3>
                            <p className="text-sm text-blue-800/80 dark:text-blue-300/80 leading-relaxed whitespace-pre-wrap">
                                {result?.followUpSchedule || 'Consult your doctor for a follow-up schedule.'}
                            </p>
                        </div>

                        {/* Actions */}
                        <button
                            onClick={() => navigate('/chat')}
                            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-colors text-sm"
                        >
                            Ask AI About This Report
                        </button>
                        <button
                            onClick={() => navigate('/reports')}
                            className="w-full py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 font-bold transition-colors text-sm"
                        >
                            Upload Another Report
                        </button>
                    </div>
                </div>

                <div className="mt-12 text-center border-t border-slate-200 dark:border-slate-800 pt-8 opacity-70">
                    <p className="text-[10px] text-slate-500 max-w-2xl mx-auto">
                        Disclaimer: This analysis is generated by AI and is for informational purposes only. Always consult a qualified healthcare professional before making medical decisions.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ReportResults;
