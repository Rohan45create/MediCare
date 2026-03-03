import React, { useState } from 'react';
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
import { IconDownload, IconAlertTriangle, IconCircleCheckFilled, IconCircle, IconVideo, IconPhone, IconActivity, IconBrain, IconHeartbeat } from '@tabler/icons-react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend, Filler);

const Dashboard = () => {
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

    // 1. Line Chart Data (HbA1c)
    const lineData = {
        labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL'],
        datasets: [
            {
                label: 'HbA1c',
                data: [5.8, 6.1, 6.3, 6.0, 5.8, 5.9, 5.7],
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
            y: { display: false, min: 5.0, max: 6.5 }
        }
    };

    // 2. Bar Chart Data (Blood Pressure)
    const barData = {
        labels: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
        datasets: [
            {
                label: 'Systolic',
                data: [115, 125, 120, 130, 122, 118, 120], // Last is target 120 for SUN
                backgroundColor: (context) => {
                    const idx = context.dataIndex;
                    // Emphasize Wednesday and Saturday with a darker blue
                    if (idx === 2 || idx === 5) return '#2563eb'; // blue-600
                    return '#bfdbfe'; // blue-200
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

    // 3. Doughnut Chart (Cholesterol)
    const doughnutData = {
        labels: ['Completed', 'Remaining'],
        datasets: [{
            data: [75, 25],
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

    return (
        <div className="w-full bg-slate-50 dark:bg-[#0b1121] min-h-[calc(100vh-64px)] font-sans pb-24 lg:pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* Header */}
                <div className="flex flex-col mb-8">
                    <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center tracking-tight">
                        Health Overview
                    </h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                        Good morning, Robert. Your vitals are stable today.
                    </p>
                </div>

                {/* Top Health Metrics Cards (3 cols) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

                    {/* HbA1c Card */}
                    <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col h-64">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">HbA1c Levels</span>
                            <span className="px-2 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold rounded-full">-0.2%</span>
                        </div>
                        <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-auto">5.7%</h2>
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

                    {/* Cholesterol Card */}
                    <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col h-64 relative">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">Cholesterol</span>
                            <span className="px-2 py-1 bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-500 text-xs font-bold rounded-full">+5%</span>
                        </div>
                        <h2 className="text-4xl font-extrabold text-amber-600 dark:text-amber-500 mb-2">185 <span className="text-sm font-bold text-slate-400">mg/dL</span></h2>

                        <div className="relative h-24 w-full flex items-center justify-center mt-auto">
                            <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
                                <span className="text-xs font-bold text-slate-900 dark:text-white">Q3 Target</span>
                            </div>
                            <Doughnut data={doughnutData} options={doughnutOptions} />
                        </div>
                        <p className="text-center text-xs text-slate-400 font-medium mt-4">Next check-up in 12 days</p>
                    </div>

                </div>

                {/* Bottom Section (2 cols Desktop / 1 col Mobile) */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column: Recent Scans */}
                    <div className="lg:col-span-2 flex flex-col">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Recent Scans</h3>
                            <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 transition-colors">View all</button>
                        </div>

                        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
                            {/* Table Header Wrapper (Hidden on mobile) */}
                            <div className="hidden sm:grid grid-cols-12 gap-4 p-4 border-b border-slate-100 dark:border-slate-700 text-xs font-bold text-slate-500 uppercase tracking-widest bg-slate-50/50 dark:bg-slate-900/50">
                                <div className="col-span-5">Scan Type</div>
                                <div className="col-span-3">Date</div>
                                <div className="col-span-3">Doctor</div>
                                <div className="col-span-1 text-center">Action</div>
                            </div>

                            {/* List items */}
                            <div className="divide-y divide-slate-100 dark:divide-slate-700/50">
                                {/* Item 1 */}
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

                                {/* Item 2 */}
                                <div className="p-4 sm:p-6 flex flex-col sm:grid sm:grid-cols-12 sm:gap-4 sm:items-center hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                    <div className="col-span-5 flex items-center space-x-4 mb-3 sm:mb-0">
                                        <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center shrink-0">
                                            <IconBrain className="text-purple-600 dark:text-purple-400" size={20} />
                                        </div>
                                        <span className="font-bold text-slate-900 dark:text-white">Brain MRI</span>
                                    </div>
                                    <div className="col-span-3 text-sm text-slate-600 dark:text-slate-400 mb-1 sm:mb-0 pl-16 sm:pl-0 font-medium">Sep 28, 2023</div>
                                    <div className="col-span-3 text-sm text-slate-600 dark:text-slate-400 mb-3 sm:mb-0 pl-16 sm:pl-0 font-medium">Dr. James Wilson</div>
                                    <div className="col-span-1 flex justify-end sm:justify-center pr-2 sm:pr-0 mt-[-40px] sm:mt-0">
                                        <button className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                                            <IconDownload size={20} />
                                        </button>
                                    </div>
                                </div>

                                {/* Item 3 */}
                                <div className="p-4 sm:p-6 flex flex-col sm:grid sm:grid-cols-12 sm:gap-4 sm:items-center hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                    <div className="col-span-5 flex items-center space-x-4 mb-3 sm:mb-0">
                                        <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center shrink-0">
                                            <IconHeartbeat className="text-rose-600 dark:text-rose-400" size={20} />
                                        </div>
                                        <span className="font-bold text-slate-900 dark:text-white">Echo Cardiogram</span>
                                    </div>
                                    <div className="col-span-3 text-sm text-slate-600 dark:text-slate-400 mb-1 sm:mb-0 pl-16 sm:pl-0 font-medium">Aug 15, 2023</div>
                                    <div className="col-span-3 text-sm text-slate-600 dark:text-slate-400 mb-3 sm:mb-0 pl-16 sm:pl-0 font-medium">Dr. Elena Rodriguez</div>
                                    <div className="col-span-1 flex justify-end sm:justify-center pr-2 sm:pr-0 mt-[-40px] sm:mt-0">
                                        <button className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                                            <IconDownload size={20} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Right Column: Alerts & Actions */}
                    <div className="lg:col-span-1 space-y-6">

                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Health Alerts</h3>

                        {/* Vaccination Alert */}
                        <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30 rounded-3xl p-6">
                            <div className="flex items-start space-x-4">
                                <IconAlertTriangle size={24} className="text-amber-600 dark:text-amber-500 shrink-0 mt-1" />
                                <div>
                                    <h4 className="font-bold text-amber-900 dark:text-amber-500 mb-1 text-sm">Upcoming Vaccination</h4>
                                    <p className="text-xs text-amber-800 dark:text-amber-600/80 leading-relaxed mb-3">
                                        Flu shot due by Oct 30. Please schedule an appointment.
                                    </p>
                                    <button className="text-sm font-bold text-amber-700 dark:text-amber-500 underline decoration-2 underline-offset-4 hover:text-amber-800 transition-colors">
                                        Schedule Now
                                    </button>
                                </div>
                            </div>
                        </div>

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
                            <IconPhone className="animate-pulse" size={20} />
                            <span>Emergency Call</span>
                        </button>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default Dashboard;
