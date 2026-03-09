import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IconArrowLeft, IconDownload, IconCircleCheckFilled, IconAlertTriangle, IconCircleX, IconCalendar, IconMapPin, IconSun, IconMoon, IconMessage, IconInfoCircle, IconPill, IconListDetails, IconShieldCheck, IconClock } from '@tabler/icons-react';
import { scanAPI } from '../services/api';
import MarkdownRenderer from '../components/MarkdownRenderer';

const ScanResult = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const scannedData = location.state?.scannedData || 'Unknown code';
    const [scanResult, setScanResult] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchScanData = async () => {
            try {
                const res = await scanAPI.scanBarcode(scannedData);
                setScanResult(res.data);
            } catch (err) {
                console.error('Scan API error:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchScanData();
    }, [scannedData]);

    const medicineName = scanResult?.brand || 'Unknown Medicine';
    const genericName = scanResult?.generic || scannedData;
    const aiExplanation = scanResult?.aiExplanation || '';
    const safetyWarnings = scanResult?.safetyWarnings || [];
    const hasNsqAlert = scanResult?.nsqAlert || false;
    const description = scanResult?.description || 'A commonly used prescription medication.';

    // Helper to extract sections from AI Markdown based on headers
    const extractSection = (text, headerKeyword) => {
        if (!text) return null;
        const regex = new RegExp(`(?:##?|\\*\\*)\\s*.*?${headerKeyword}.*?(?:\\*\\*|\\n)([\\s\\S]*?)(?=(?:##?|\\*\\*)\\s*.*?\\w|$)`, 'i');
        const match = text.match(regex);
        return match && match[1] ? match[1].trim() : null;
    };

    const parsedUsage = extractSection(aiExplanation, 'Usage') || extractSection(aiExplanation, 'Instructions');
    const parsedAlternatives = extractSection(aiExplanation, 'Alternative') || extractSection(aiExplanation, 'Substitute');
    const parsedSchedule = extractSection(aiExplanation, 'Schedule') || extractSection(aiExplanation, 'Timing');
    const parsedSafety = extractSection(aiExplanation, 'Risk') || extractSection(aiExplanation, 'Safety') || extractSection(aiExplanation, 'Side Effect');

    // Default fallback if parsing fails (meaning the AI didn't use the expected headers)
    const showRawExplanation = !parsedUsage && !parsedAlternatives && !parsedSafety;

    return (
        <div className="w-full bg-slate-50 dark:bg-[#0b1121] min-h-[calc(100vh-64px)] font-sans pb-24 lg:pb-8">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* Breadcrumb & Header */}
                <div className="flex flex-col mb-8">
                    <div className="text-xs font-semibold text-slate-500 tracking-wider uppercase mb-2">
                        HOME / SCAN RESULTS / <span className="text-blue-600">{medicineName.toUpperCase()}</span>
                    </div>
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center">
                                Scan Result Details
                            </h1>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Detailed analysis of your scanned medication and safety profile.</p>
                        </div>
                        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                            <button
                                onClick={() => navigate('/chat')}
                                className="hidden sm:flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                            >
                                <IconMessage size={18} />
                                <span>Chat with AI</span>
                            </button>
                            <button className="flex items-center justify-center p-2 rounded-lg bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition">
                                <IconDownload size={20} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Loading overlay */}
                {loading && (
                    <div className="text-center py-12">
                        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                        <p className="text-slate-500 dark:text-slate-400">Looking up medicine details...</p>
                    </div>
                )}

                {!loading && (
                    <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6">

                        {/* == MOBILE 1 | DESKTOP LEFT == Primary Medicine Card */}
                        <div className="order-1 lg:col-span-2">
                            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col sm:flex-row sm:items-start gap-6 h-full">
                                <div className="w-32 h-40 bg-emerald-100 dark:bg-emerald-900/20 rounded-2xl flex items-center justify-center shrink-0 mx-auto sm:mx-0 shadow-inner">
                                    <div className="w-16 h-24 bg-emerald-500 rounded-[2rem] shadow-md border-b-4 border-emerald-600 opacity-90"></div>
                                </div>
                                <div className="flex-1 flex flex-col h-full">
                                    <div className="mb-auto">
                                        <div className="flex items-center space-x-2 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full w-max mb-3">
                                            {scanResult?.drugClass || 'PRESCRIPTION'}
                                            <span className="ml-2 text-slate-400 font-medium tracking-normal text-[10px]">Ref: #SCAN-{Math.floor(Math.random() * 90000) + 10000}</span>
                                        </div>
                                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{medicineName}</h2>
                                        <p className="text-slate-500 dark:text-slate-400 text-sm mb-1 font-medium">Generic: {genericName}</p>
                                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">
                                            {description}
                                        </p>
                                        {showRawExplanation && aiExplanation && (
                                            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 mt-2">
                                                <div className="flex items-center space-x-2 mb-2">
                                                    <IconInfoCircle size={18} className="text-blue-600 dark:text-blue-400" />
                                                    <p className="text-xs font-bold text-blue-700 dark:text-blue-400">AI Analysis Overview</p>
                                                </div>
                                                <MarkdownRenderer content={aiExplanation} />
                                            </div>
                                        )}
                                    </div>
                                    <div className="space-y-2 mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
                                        <div className="flex items-center text-xs text-slate-500 font-medium">
                                            <IconCalendar size={14} className="mr-2 opacity-70" />
                                            Scanned on {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} • {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                        <div className="flex items-center text-xs text-slate-500 font-medium">
                                            <IconMapPin size={14} className="mr-2 opacity-70" />
                                            Barcode: {scannedData}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* == MOBILE 2 | DESKTOP RIGHT TOP == Safety Card */}
                        <div className="order-2 lg:col-span-1 lg:col-start-3">
                            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col h-full">
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Safety Status</p>

                                <div className="flex items-center space-x-4 mb-6">
                                    <div className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 ${hasNsqAlert ? 'bg-red-100 dark:bg-red-900/30 text-red-500' : 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-500'}`}>
                                        {hasNsqAlert ? <IconCircleX size={32} /> : <IconCircleCheckFilled size={32} />}
                                    </div>
                                    <div>
                                        <h3 className={`text-3xl font-extrabold leading-tight ${hasNsqAlert ? 'text-red-500' : 'text-emerald-500'}`}>
                                            {hasNsqAlert ? 'ALERT' : 'SAFE'}
                                        </h3>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">
                                            {hasNsqAlert ? `${safetyWarnings.length} NSQ alert(s) found` : 'No critical profile clashes.'}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-auto">
                                    <div className="flex justify-between text-xs font-semibold text-slate-500 mb-2">
                                        <span>FDA Data: {scanResult?.fdaSafetyData !== 'FDA safety data temporarily unavailable.' ? 'Available' : 'Unavailable'}</span>
                                    </div>
                                    <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2">
                                        <div className={`h-2 rounded-full ${hasNsqAlert ? 'bg-red-500 w-[40%]' : 'bg-emerald-500 w-[92%]'}`}></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* == MOBILE 3 | DESKTOP LEFT BOTTOM == Warnings */}
                        <div className="order-3 lg:col-span-2 lg:col-start-1 lg:row-start-2 space-y-6">

                            {safetyWarnings.length > 0 && (
                                <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center">
                                        <IconAlertTriangle size={20} className="text-amber-500 mr-2" />
                                        Safety Warnings ({safetyWarnings.length})
                                    </h3>
                                    <div className="space-y-4">
                                        {safetyWarnings.map((w, i) => (
                                            <div key={i} className={`rounded-2xl p-4 flex items-start space-x-3 ${w.severity === 'High' ? 'bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30' : 'bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30'}`}>
                                                <IconInfoCircle size={20} className={w.severity === 'High' ? 'text-red-600 mt-0.5 shrink-0' : 'text-amber-600 mt-0.5 shrink-0'} />
                                                <div>
                                                    <h4 className={`font-bold mb-1 text-sm ${w.severity === 'High' ? 'text-red-900 dark:text-red-500' : 'text-amber-900 dark:text-amber-500'}`}>{w.type}</h4>
                                                    <p className={`text-xs leading-relaxed ${w.severity === 'High' ? 'text-red-800 dark:text-red-600/80' : 'text-amber-800 dark:text-amber-600/80'}`}>{w.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {safetyWarnings.length === 0 && !hasNsqAlert && (
                                <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center">
                                        <IconAlertTriangle size={20} className="text-amber-500 mr-2" />
                                        Interaction Warnings
                                    </h3>
                                    <div className="bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/30 rounded-2xl p-4 flex items-center space-x-3">
                                        <IconCircleCheckFilled size={20} className="text-emerald-600 shrink-0" />
                                        <p className="text-sm text-emerald-800 dark:text-emerald-400">No NSQ safety alerts found for this medicine.</p>
                                    </div>
                                </div>
                            )}

                            {/* == NEW PARSED CARDS FROM AI EXPLANATION == */}
                            {parsedUsage && (
                                <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center">
                                        <IconListDetails size={20} className="text-blue-500 mr-2" />
                                        Usage Instructions
                                    </h3>
                                    <div className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                                        <MarkdownRenderer content={parsedUsage} />
                                    </div>
                                </div>
                            )}

                            {parsedSafety && (
                                <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-red-100 dark:border-red-900/50">
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center">
                                        <IconShieldCheck size={20} className="text-red-500 mr-2" />
                                        Safety & Side Effects
                                    </h3>
                                    <div className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                                        <MarkdownRenderer content={parsedSafety} />
                                    </div>
                                </div>
                            )}

                            {parsedAlternatives && (
                                <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-emerald-100 dark:border-emerald-900/50">
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center">
                                        <IconPill size={20} className="text-emerald-500 mr-2" />
                                        Alternative Medicines
                                    </h3>
                                    <div className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                                        <MarkdownRenderer content={parsedAlternatives} />
                                    </div>
                                </div>
                            )}

                        </div>

                        {/* == MOBILE 4 | DESKTOP RIGHT BOTTOM == Schedule & Help */}
                        <div className="order-4 lg:col-span-1 lg:col-start-3 lg:row-start-2 space-y-6">

                            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
                                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center">
                                    <IconClock size={18} className="text-indigo-500 mr-2" />
                                    Medication Schedule
                                </h3>

                                {parsedSchedule && (
                                    <div className="mb-4 bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-2xl border border-indigo-100 dark:border-indigo-900/40 text-sm text-indigo-900 dark:text-indigo-300">
                                        <MarkdownRenderer content={parsedSchedule} />
                                    </div>
                                )}
                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-900/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                                        <div className="flex items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                                            <IconSun size={16} className="text-amber-500 mr-2" /> Morning
                                        </div>
                                        <div className="text-sm text-slate-500 font-mono">08:00 AM</div>
                                    </div>
                                    <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-900/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800 opacity-60">
                                        <div className="flex items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                                            <IconMoon size={16} className="text-indigo-400 mr-2" /> Evening
                                        </div>
                                        <div className="text-sm text-slate-400 font-mono">N/A</div>
                                    </div>
                                </div>
                                <button className="w-full py-3 rounded-xl border-2 border-blue-100 text-blue-600 dark:border-blue-900 dark:text-blue-400 dark:hover:bg-blue-900/20 hover:bg-blue-50 font-bold transition-colors text-sm">
                                    Set Reminders
                                </button>
                            </div>

                            <div className="hidden lg:block bg-blue-50 dark:bg-blue-900/20 rounded-3xl p-6 border border-blue-100 dark:border-blue-900/50">
                                <h3 className="text-sm font-bold text-blue-900 dark:text-blue-400 mb-2">Need Help?</h3>
                                <p className="text-xs text-blue-800/80 dark:text-blue-300/80 mb-6 leading-relaxed">
                                    Our AI healthcare assistant can answer specific questions about this medication's side effects or dosages.
                                </p>
                                <button onClick={() => navigate('/chat')} className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-colors text-sm flex items-center justify-center space-x-2">
                                    <IconMessage size={16} />
                                    <span>Ask AI Assistant</span>
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <div className="mt-12 text-center border-t border-slate-200 dark:border-slate-800 pt-8 opacity-70">
                    <p className="text-[10px] text-slate-500 max-w-2xl mx-auto leading-relaxed">
                        Disclaimer: This analysis is for informational purposes only. Always consult with a qualified healthcare professional before making any changes to your medication regimen.
                    </p>
                    <p className="text-[10px] text-slate-500 mt-2">
                        © {new Date().getFullYear()} MediCare Health Systems. All rights reserved.
                    </p>
                </div>
            </div>

            {/* Floating Action Button for Mobile Chat */}
            <div className="lg:hidden fixed bottom-6 left-1/2 transform -translate-x-1/2 w-[calc(100%-2rem)] max-w-sm z-50">
                <button onClick={() => navigate('/chat')} className="w-full py-4 rounded-2xl bg-blue-600 shadow-xl shadow-blue-600/30 text-white font-bold text-sm flex items-center justify-center space-x-2">
                    <IconMessage size={18} />
                    <span>Ask AI Assistant</span>
                </button>
            </div>
        </div>
    );
};

export default ScanResult;
