import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IconArrowLeft, IconDownload, IconCircleCheckFilled, IconAlertTriangle, IconCircleX, IconCalendar, IconMapPin, IconSun, IconMoon, IconMessage, IconInfoCircle } from '@tabler/icons-react';

const ScanResult = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const scannedData = location.state?.scannedData || 'Unknown code';

    return (
        <div className="w-full bg-slate-50 dark:bg-[#0b1121] min-h-[calc(100vh-64px)] font-sans pb-24 lg:pb-8">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* Breadcrumb & Header */}
                <div className="flex flex-col mb-8">
                    <div className="text-xs font-semibold text-slate-500 tracking-wider uppercase mb-2">
                        HOME / SCAN RESULTS / <span className="text-blue-600">LISINOPRIL 10MG</span>
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

                {/* CSS Grid with defined Orders for Mobile Stacking */}
                <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6">

                    {/* == MOBILE 1 | DESKTOP LEFT == */}
                    {/* Primary Medicine Card */}
                    <div className="order-1 lg:col-span-2">
                        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col sm:flex-row sm:items-start gap-6 h-full">
                            <div className="w-32 h-40 bg-emerald-100 dark:bg-emerald-900/20 rounded-2xl flex items-center justify-center shrink-0 mx-auto sm:mx-0 shadow-inner">
                                <div className="w-16 h-24 bg-emerald-500 rounded-[2rem] shadow-md border-b-4 border-emerald-600 opacity-90"></div>
                            </div>
                            <div className="flex-1 flex flex-col h-full">
                                <div className="mb-auto">
                                    <div className="flex items-center space-x-2 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full w-max mb-3">
                                        PRESCRIPTION <span className="ml-2 text-slate-400 font-medium tracking-normal text-[10px]">Ref: #SCAN-{Math.floor(Math.random() * 90000) + 10000}</span>
                                    </div>
                                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Lisinopril 10mg</h2>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">
                                        Commonly used to treat high blood pressure and heart failure. Belongs to the ACE inhibitor class of drugs.
                                    </p>
                                </div>

                                <div className="space-y-2 mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
                                    <div className="flex items-center text-xs text-slate-500 font-medium">
                                        <IconCalendar size={14} className="mr-2 opacity-70" />
                                        Scanned on {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} • {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                    <div className="flex items-center text-xs text-slate-500 font-medium">
                                        <IconMapPin size={14} className="mr-2 opacity-70" />
                                        Home Pharmacy Cabinet
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* == MOBILE 2 | DESKTOP RIGHT TOP == */}
                    {/* Safety Card */}
                    <div className="order-2 lg:col-span-1 lg:col-start-3">
                        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col h-full">
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Safety Status</p>

                            <div className="flex items-center space-x-4 mb-6">
                                <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center text-emerald-500 shrink-0">
                                    <IconCircleCheckFilled size={32} />
                                </div>
                                <div>
                                    <h3 className="text-3xl font-extrabold text-emerald-500 leading-tight">SAFE</h3>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">No critical profile clashes.</p>
                                </div>
                            </div>

                            <div className="mt-auto">
                                <div className="flex justify-between text-xs font-semibold text-slate-500 mb-2">
                                    <span>Confidence Score: 92% based on your profile</span>
                                </div>
                                <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2">
                                    <div className="bg-emerald-500 h-2 rounded-full w-[92%]"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* == MOBILE 3 | DESKTOP LEFT BOTTOM == */}
                    {/* Interaction Warnings & Home Remedies */}
                    <div className="order-3 lg:col-span-2 lg:col-start-1 lg:row-start-2 space-y-6">

                        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center">
                                <IconAlertTriangle size={20} className="text-amber-500 mr-2" />
                                Interaction Warnings
                            </h3>

                            <div className="space-y-4">
                                <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30 rounded-2xl p-4 flex items-start space-x-3">
                                    <IconInfoCircle size={20} className="text-amber-600 dark:text-amber-500 mt-0.5 shrink-0" />
                                    <div>
                                        <h4 className="font-bold text-amber-900 dark:text-amber-500 mb-1 text-sm">Avoid Potassium Supplements</h4>
                                        <p className="text-xs text-amber-800 dark:text-amber-600/80 leading-relaxed">
                                            Lisinopril can increase potassium levels in your blood. Consult your doctor before using salt substitutes or potassium supplements.
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-2xl p-4 flex items-start space-x-3">
                                    <IconCircleX size={20} className="text-red-600 dark:text-red-500 mt-0.5 shrink-0" />
                                    <div>
                                        <h4 className="font-bold text-red-900 dark:text-red-500 mb-1 text-sm">NSAID Interaction (Ibuprofen)</h4>
                                        <p className="text-xs text-red-800 dark:text-red-600/80 leading-relaxed">
                                            Taking NSAIDs like Advil or Motrin with Lisinopril may reduce the effectiveness of your blood pressure medication and increase risk to kidneys.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center">
                                <span className="text-blue-600 mr-2 text-xl leading-none">🍃</span>
                                Home Remedies & Lifestyle Tips
                            </h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="border border-slate-100 dark:border-slate-700 rounded-2xl p-4 bg-slate-50 dark:bg-slate-800/50">
                                    <h5 className="font-bold text-slate-900 dark:text-white text-sm mb-1">DASH Diet</h5>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">Focus on fruits, vegetables, and whole grains to naturally manage BP.</p>
                                </div>
                                <div className="border border-slate-100 dark:border-slate-700 rounded-2xl p-4 bg-slate-50 dark:bg-slate-800/50">
                                    <h5 className="font-bold text-slate-900 dark:text-white text-sm mb-1">Reduce Sodium</h5>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">Aim for less than 2,300mg of sodium per day for better results.</p>
                                </div>
                                <div className="border border-slate-100 dark:border-slate-700 rounded-2xl p-4 bg-slate-50 dark:bg-slate-800/50">
                                    <h5 className="font-bold text-slate-900 dark:text-white text-sm mb-1">Stay Hydrated</h5>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">Drink plenty of water, but avoid excessive caffeine which raises BP.</p>
                                </div>
                                <div className="border border-slate-100 dark:border-slate-700 rounded-2xl p-4 bg-slate-50 dark:bg-slate-800/50">
                                    <h5 className="font-bold text-slate-900 dark:text-white text-sm mb-1">Mindfulness</h5>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">10 minutes of deep breathing daily can complement medication effects.</p>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* == MOBILE 4 | DESKTOP RIGHT BOTTOM == */}
                    {/* Schedule & Help Callout */}
                    <div className="order-4 lg:col-span-1 lg:col-start-3 lg:row-start-2 space-y-6">

                        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
                            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Medication Schedule</h3>

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
                            <button
                                onClick={() => navigate('/chat')}
                                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-colors text-sm flex items-center justify-center space-x-2"
                            >
                                <IconMessage size={16} />
                                <span>Ask AI Assistant</span>
                            </button>
                        </div>

                    </div>

                </div>

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
                <button
                    onClick={() => navigate('/chat')}
                    className="w-full py-4 rounded-2xl bg-blue-600 shadow-xl shadow-blue-600/30 text-white font-bold text-sm flex items-center justify-center space-x-2"
                >
                    <IconMessage size={18} />
                    <span>Ask AI Assistant</span>
                </button>
            </div>

        </div>
    );
};

export default ScanResult;
