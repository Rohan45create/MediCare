import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../store/slices/authSlice';
import { dashboardAPI } from '../services/api';
import { useNavigate } from 'react-router-dom';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { IconDownload, IconAlertTriangle, IconCircleCheckFilled, IconCircle, IconVideo, IconPhone, IconActivity, IconBrain, IconHeartbeat, IconArrowRight } from '@tabler/icons-react';
import HealthMetricCard from '../components/HealthMetricCard';
import TrendGraph from '../components/TrendGraph';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend, Filler);

const Dashboard = () => {
    const user = useSelector(selectUser);
    const navigate = useNavigate();
    const [summaryData, setSummaryData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const res = await dashboardAPI.getSummary();
                setSummaryData(res.data);
            } catch (err) {
                console.error("Failed to fetch dashboard", err);
            } finally {
                setLoading(false);
            }
        };
        fetchSummary();
    }, []);

    // Interactive Checklist State
    const [checklist, setChecklist] = useState([
        { id: 1, text: 'Morning Blood Pressure Reading', completed: true },
        { id: 2, text: 'Insulin Dose (15 units)', completed: true },
        { id: 3, text: 'Evening Fasting Measurement', completed: false },
        { id: 4, text: '30-minute Moderate Walking', completed: false }
    ]);

    const toggleChecklistItem = (id) => {
        setChecklist(checklist.map(item =>
            item.id === id ? { ...item, completed: !item.completed } : item
        ));
    };

    // Prepare Dynamic Data
    const dynamicSummary = summaryData?.dynamicSummary;
    
    // Group trends
    const groupedTrends = {};
    if (dynamicSummary?.trends) {
        dynamicSummary.trends.forEach(t => {
            if (!groupedTrends[t.testName]) {
                groupedTrends[t.testName] = [];
            }
            groupedTrends[t.testName].push(t);
        });
    }
    const qualifyingTrends = Object.entries(groupedTrends).filter(([name, data]) => data.length >= 2);

    // 1. Line Chart Data (Health Trends / Risk Levels over time)
    const trendLabels = summaryData?.healthTrends?.map(t => t.month) || ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL'];
    const riskScores = summaryData?.healthTrends?.map(t => t.score / 10.0) || [5.8, 6.1, 6.3, 6.0, 5.8, 5.9, 5.7];

    const lineData = {
        labels: trendLabels,
        datasets: [
            {
                label: 'Risk Trend',
                data: riskScores,
                borderColor: '#2563eb', // blue-600
                backgroundColor: 'transparent',
                borderWidth: 3,
                tension: 0.4,
                pointRadius: 0,
            }
        ]
    };
    const lineOptions = {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { enabled: false } },
        scales: {
            x: { grid: { display: false, drawBorder: false }, ticks: { font: { size: 10, weight: 'bold' }, color: '#94a3b8' } },
            y: { display: false, min: 2.0, max: 10.0 }
        }
    };

    // 2. Bar Chart Data (Blood Pressure)
    const barData = {
        labels: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
        datasets: [
            {
                label: 'Systolic',
                data: [115, 125, 120, 130, 122, 118, 120], 
                backgroundColor: (context) => {
                    const idx = context.dataIndex;
                    if (idx === 2 || idx === 5) return '#2563eb';
                    return '#bfdbfe';
                },
                borderRadius: 4,
                barThickness: 16,
            }
        ]
    };
    const barOptions = {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { enabled: false } },
        scales: {
            x: { grid: { display: false, drawBorder: false }, ticks: { font: { size: 10, weight: 'bold' }, color: '#94a3b8' } },
            y: { display: false, min: 100, max: 150 }
        }
    };

    // 3. Doughnut Chart (Health Score)
    const score = summaryData?.healthScore || 70;
    const doughnutData = {
        labels: ['Score', 'Remaining'],
        datasets: [{
            data: [score, 100 - score],
            backgroundColor: ['#2563eb', '#e2e8f0'],
            borderWidth: 0,
            circumference: 270,
            rotation: 225,
            cutout: '80%',
        }]
    };
    const doughnutOptions = {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { enabled: false } }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[calc(100vh-64px)] w-full bg-slate-50 dark:bg-[#0b1121]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="w-full bg-slate-50 dark:bg-[#0b1121] min-h-[calc(100vh-64px)] font-sans pb-24 lg:pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* Header */}
                <div className="flex flex-col mb-8">
                    <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center tracking-tight">
                        Health Overview
                    </h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                        {user?.name || summaryData?.userName ? `Good morning, ${user?.name || summaryData?.userName}. Here is your health overview.` : 'Good morning. Your vitals are stable today.'}
                    </p>
                </div>

                {/* =========================================
                    DYNAMIC SECTIONS (NEW) 
                    ========================================= */}
                
                {dynamicSummary && dynamicSummary.reportDate ? (
                    <>
                        {/* Section 1: Summary row at top */}
                        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-6 mb-8 flex flex-col md:flex-row items-start md:items-center gap-6">
                            <div className="flex flex-col">
                                <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-1">Risk Level</span>
                                <span className={`px-4 py-1.5 rounded-full text-sm font-bold w-max ${
                                    dynamicSummary.riskLevel === 'HIGH' ? 'bg-red-100 text-red-800' :
                                    dynamicSummary.riskLevel === 'MEDIUM' ? 'bg-amber-100 text-amber-800' :
                                    'bg-emerald-100 text-emerald-800'
                                }`}>
                                    {dynamicSummary.riskLevel}
                                </span>
                            </div>
                            <div className="hidden md:block w-px h-12 bg-slate-200 dark:bg-slate-700"></div>
                            <div className="flex flex-col">
                                <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-1">Health Score</span>
                                <div className="flex items-end gap-1">
                                    <span className="text-4xl font-extrabold text-slate-900 dark:text-white leading-none">{dynamicSummary.healthScore}</span>
                                    <span className="text-lg font-bold text-slate-400 pb-0.5">/100</span>
                                </div>
                            </div>
                            <div className="hidden md:block w-px h-12 bg-slate-200 dark:bg-slate-700"></div>
                            <div className="flex flex-col">
                                <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-1">Based on report dated</span>
                                <span className="text-lg font-bold text-slate-900 dark:text-slate-200">
                                    {dynamicSummary.reportDate}
                                </span>
                            </div>
                        </div>

                        {/* Section 2: Your Health Metrics */}
                        {dynamicSummary.metrics && dynamicSummary.metrics.length > 0 && (
                            <div className="mb-10">
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Your Health Metrics</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                    {dynamicSummary.metrics.map((metric, idx) => (
                                        <HealthMetricCard key={idx} metric={metric} />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Section 3: Trends Over Time */}
                        <div className="mb-12">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Trends Over Time</h2>
                            {qualifyingTrends.length > 0 ? (
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                                    {qualifyingTrends.map(([testName, trendsData]) => (
                                        <TrendGraph key={testName} testName={testName} data={trendsData} />
                                    ))}
                                </div>
                            ) : (
                                <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl p-8 text-center text-slate-500 dark:text-slate-400">
                                    Upload more reports to see your trends
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    /* Empty State for Dynamic Content */
                    <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/50 rounded-2xl p-8 text-center mb-12">
                        <IconActivity className="mx-auto text-indigo-400 mb-4" size={48} />
                        <h3 className="text-xl font-bold text-indigo-900 dark:text-indigo-100 mb-2">No Reports Analyzed Yet</h3>
                        <p className="text-indigo-600 dark:text-indigo-300 mb-6 max-w-md mx-auto">
                            Upload your medical reports and wait for AI analysis to see dynamic health cards and health trends here.
                        </p>
                        <button 
                            onClick={() => navigate('/reports')}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-xl transition-colors"
                        >
                            Upload a Report
                        </button>
                    </div>
                )}


                {/* =========================================
                    EXISTING SECTIONS 
                    ========================================= */}

                {/* Top Health Metrics Cards (3 cols) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 mt-12 bg-slate-50 dark:bg-[#0b1121] pt-6 border-t border-slate-200 dark:border-slate-800">

                    {/* Recent Trends Card */}
                    <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col h-64">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">Activity & Reports</span>
                            <span className="px-2 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold rounded-full">{summaryData?.totalReports || 0} files</span>
                        </div>
                        <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-auto">{summaryData?.totalScans || 0} <span className="text-lg text-slate-400">Scans</span></h2>
                        <div className="h-24 w-full mt-4 -ml-2">
                            <Line data={lineData} options={lineOptions} />
                        </div>
                    </div>

                    {/* Blood Pressure Card */}
                    <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col h-64">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">Blood Pressure</span>
                            <span className="px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold rounded-full shadow-sm">Stable</span>
                        </div>
                        <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-auto">120<span className="text-2xl text-slate-400">/80</span></h2>
                        <div className="h-24 w-full mt-4">
                            <Bar data={barData} options={barOptions} />
                        </div>
                    </div>

                    {/* Health Score Card */}
                    <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col h-64 relative">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">Overall Health Score</span>
                            <span className="px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-500 text-xs font-bold rounded-full">AI Rated</span>
                        </div>
                        <h2 className="text-4xl font-extrabold text-blue-600 dark:text-blue-500 mb-2">{score} <span className="text-sm font-bold text-slate-400">/100</span></h2>

                        <div className="relative h-24 w-full flex items-center justify-center mt-auto">
                            <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
                                <span className="text-xs font-bold text-slate-900 dark:text-white">Fair</span>
                            </div>
                            <Doughnut data={doughnutData} options={doughnutOptions} />
                        </div>
                        <p className="text-center text-xs text-slate-400 font-medium mt-4">Calculated from recent activity</p>
                    </div>

                </div>

                {/* Bottom Section (2 cols Desktop / 1 col Mobile) */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column: Recent Activities */}
                    <div className="lg:col-span-2 flex flex-col">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Recent Activities</h3>
                            <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 transition-colors">View all</button>
                        </div>

                        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
                            {/* Table Header Wrapper (Hidden on mobile) */}
                            <div className="hidden sm:grid grid-cols-12 gap-4 p-4 border-b border-slate-100 dark:border-slate-700 text-xs font-bold text-slate-500 uppercase tracking-widest bg-slate-50/50 dark:bg-slate-900/50">
                                <div className="col-span-5">Activity</div>
                                <div className="col-span-3">Date</div>
                                <div className="col-span-3">Doctor</div>
                                <div className="col-span-1 text-center">Action</div>
                            </div>

                            {/* List items */}
                            <div className="divide-y divide-slate-100 dark:divide-slate-700/50">
                                {summaryData && summaryData.recentActivities && summaryData.recentActivities.length > 0 ? (
                                    summaryData.recentActivities.map((activity, idx) => (
                                        <div
                                            key={idx}
                                            onClick={() => {
                                                if (activity.type === 'SCAN') navigate(`/scan-results/${activity.id}`);
                                                else if (activity.type === 'REPORT') navigate(`/report-results/${activity.id}`);
                                            }}
                                            className="p-4 sm:p-6 flex flex-col sm:grid sm:grid-cols-12 sm:gap-4 sm:items-center hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
                                        >
                                            <div className="col-span-5 flex items-center space-x-4 mb-3 sm:mb-0">
                                                <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                                                    <IconActivity className="text-blue-600 dark:text-blue-400" size={20} />
                                                </div>
                                                <span className="font-bold text-slate-900 dark:text-white">{activity.title}</span>
                                            </div>
                                            <div className="col-span-3 text-sm text-slate-600 dark:text-slate-400 mb-1 sm:mb-0 pl-16 sm:pl-0 font-medium">
                                                {new Date(activity.date).toLocaleDateString()}
                                            </div>
                                            <div className="col-span-3 text-sm text-slate-600 dark:text-slate-400 mb-3 sm:mb-0 pl-16 sm:pl-0 font-medium">
                                                {activity.source}
                                            </div>
                                            <div className="col-span-1 flex justify-end sm:justify-center pr-2 sm:pr-0 mt-[-40px] sm:mt-0">
                                                <button className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                                                    <IconArrowRight size={20} />
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <>
                                        {/* Fallback Items */}
                                        <div className="p-4 sm:p-6 flex flex-col sm:grid sm:grid-cols-12 sm:gap-4 sm:items-center hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                            <div className="col-span-5 flex items-center space-x-4 mb-3 sm:mb-0">
                                                <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                                                    <IconActivity className="text-blue-600 dark:text-blue-400" size={20} />
                                                </div>
                                                <span className="font-bold text-slate-900 dark:text-white">Chest X-Ray</span>
                                            </div>
                                            <div className="col-span-3 text-sm text-slate-600 dark:text-slate-400 mb-1 sm:mb-0 pl-16 sm:pl-0 font-medium">Oct 12, 2023</div>
                                            <div className="col-span-3 text-sm text-slate-600 dark:text-slate-400 mb-3 sm:mb-0 pl-16 sm:pl-0 font-medium">Dr. Sarah Chen</div>
                                            <div className="col-span-1 flex justify-end sm:justify-center pr-2 sm:pr-0 mt-[-40px] sm:mt-0">
                                                <button className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                                                    <IconDownload size={20} />
                                                </button>
                                            </div>
                                        </div>
                                        {/* other items omitted for brevity */}
                                    </>
                                )}
                            </div>
                        </div>

                    </div>

                    {/* Right Column: Alerts & Actions */}
                    <div className="lg:col-span-1 space-y-6">

                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Health Alerts</h3>

                        {/* Dynamic Latest Report Alert */}
                        {summaryData?.latestReport ? (
                            <div className={`rounded-3xl p-6 border shadow-sm ${
                                summaryData.latestReport.riskLevel === 'HIGH' ? 'bg-red-50 border-red-100 dark:bg-red-900/10 dark:border-red-900/30' :
                                summaryData.latestReport.riskLevel === 'MEDIUM' ? 'bg-amber-50 border-amber-100 dark:bg-amber-900/10 dark:border-amber-900/30' :
                                'bg-emerald-50 border-emerald-100 dark:bg-emerald-900/10 dark:border-emerald-900/30'
                            }`}>
                                <div className="flex items-start space-x-4">
                                    <IconAlertTriangle size={24} className={`shrink-0 mt-1 ${
                                        summaryData.latestReport.riskLevel === 'HIGH' ? 'text-red-500' :
                                        summaryData.latestReport.riskLevel === 'MEDIUM' ? 'text-amber-500' :
                                        'text-emerald-500'
                                    }`} />
                                    <div>
                                        <h4 className={`font-bold text-sm mb-1 ${
                                            summaryData.latestReport.riskLevel === 'HIGH' ? 'text-red-900 dark:text-red-400' :
                                            summaryData.latestReport.riskLevel === 'MEDIUM' ? 'text-amber-900 dark:text-amber-400' :
                                            'text-emerald-900 dark:text-emerald-400'
                                        }`}>Latest Report: {summaryData.latestReport.riskLevel} Risk Assessment</h4>
                                        <p className={`text-xs leading-relaxed mb-3 font-medium ${
                                            summaryData.latestReport.riskLevel === 'HIGH' ? 'text-red-800 dark:text-red-300' :
                                            summaryData.latestReport.riskLevel === 'MEDIUM' ? 'text-amber-800 dark:text-amber-300' :
                                            'text-emerald-800 dark:text-emerald-300'
                                        }`}>
                                            {summaryData.latestReport.abnormalValues?.length > 0 
                                                ? `Abnormal values detected: ${summaryData.latestReport.abnormalValues.join(', ')}.`
                                                : "All tested values are within normal healthy ranges. Keep it up!"}
                                        </p>
                                        <button onClick={() => navigate(`/report-results/${summaryData.latestReport.id}`)} className={`text-sm font-bold underline decoration-2 underline-offset-4 transition-colors ${
                                            summaryData.latestReport.riskLevel === 'HIGH' ? 'text-red-700 dark:text-red-500 hover:text-red-800' :
                                            summaryData.latestReport.riskLevel === 'MEDIUM' ? 'text-amber-700 dark:text-amber-500 hover:text-amber-800' :
                                            'text-emerald-700 dark:text-emerald-500 hover:text-emerald-800'
                                        }`}>
                                            View Report Summary
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-3xl p-6 shadow-sm">
                                <div className="flex items-start space-x-4">
                                    <IconAlertTriangle size={24} className="text-slate-400 shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-bold text-slate-700 dark:text-slate-300 mb-1 text-sm">No Recent Reports</h4>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-3">
                                            Upload your first medical report to see personalized health alerts here.
                                        </p>
                                        <button onClick={() => navigate('/reports')} className="text-sm font-bold text-blue-600 dark:text-blue-400 underline decoration-2 underline-offset-4 hover:text-blue-700 transition-colors">
                                            Upload Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Daily Checklist */}
                        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
                            <h4 className="font-bold text-slate-900 dark:text-white mb-4">Daily Checklist</h4>

                            <div className="space-y-4">
                                {checklist.map((item) => (
                                    <div
                                        key={item.id}
                                        onClick={() => toggleChecklistItem(item.id)}
                                        className="flex items-center space-x-3 cursor-pointer group"
                                    >
                                        <div className={`w-5 h-5 rounded flex items-center justify-center shrink-0 transition-colors ${item.completed
                                            ? 'bg-blue-600 border border-blue-600 text-white'
                                            : 'border-2 border-slate-200 dark:border-slate-600 bg-transparent'
                                            }`}>
                                            {item.completed && <IconCircleCheckFilled size={16} className="text-white" />}
                                        </div>
                                        <span className={`text-sm font-medium transition-colors ${item.completed
                                            ? 'text-slate-400 dark:text-slate-500 line-through'
                                            : 'text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white'
                                            }`}>
                                            {item.text}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* CTA Cards */}
                        <div className="bg-blue-600 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
                            {/* Decorative Background Blob */}
                            <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>

                            <div className="flex justify-between items-start mb-2 relative z-10">
                                <h4 className="font-bold text-lg leading-tight">Need a Specialist?</h4>
                                <IconVideo size={24} className="text-blue-200" />
                            </div>
                            <p className="text-xs text-blue-100 mb-6 leading-relaxed relative z-10">
                                Connect with top-rated medical experts via video call in under 5 minutes.
                            </p>
                            <button className="w-full bg-white text-blue-600 hover:bg-slate-50 font-bold py-3 rounded-xl transition-colors text-sm relative z-10">
                                Book Consultation
                            </button>
                        </div>

                        {/* Emergency CTA */}
                        <button className="w-full bg-rose-500 hover:bg-rose-600 text-white rounded-2xl p-4 font-bold transition-colors shadow-md shadow-rose-500/20 flex justify-center items-center space-x-2">
                            <IconPhone className="animate-Pulse" size={20} />
                            <span>Emergency Call</span>
                        </button>

                    </div>
                </div>

            </div>
        </div >
    );
};

export default Dashboard;
