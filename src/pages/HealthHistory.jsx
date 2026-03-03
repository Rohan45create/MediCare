import React, { useState, useMemo } from 'react';
import {
    IconHistory,
    IconDownload,
    IconLayoutList,
    IconFileText,
    IconMicroscope,
    IconMessageCircle,
    IconChevronDown,
    IconCheck,
    IconAlertTriangle,
    IconInfoCircle,
    IconArrowRight,
    IconFileTypePdf,
    IconFileAnalytics
} from '@tabler/icons-react';

const HealthHistory = () => {
    const [activeFilter, setActiveFilter] = useState('All Records');
    const [dateRange, setDateRange] = useState('Last 12 Months');
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const filters = [
        { name: 'All Records', icon: <IconLayoutList size={16} /> },
        { name: 'Reports', icon: <IconFileText size={16} /> },
        { name: 'Scans & Labs', icon: <IconMicroscope size={16} /> },
        { name: 'Consultations', icon: <IconMessageCircle size={16} /> }
    ];

    const dateOptions = ['Past 30 Days', 'Past 6 Months', 'Last 12 Months', 'All Time'];

    // Mock Timeline Data
    const mockTimelineData = [
        {
            id: 1,
            type: 'Reports',
            tag: 'ROUTINE',
            date: 'Oct 24, 2023 • 10:30 AM',
            title: 'Annual Physical Examination',
            status: 'Healthy Status',
            statusColor: 'green',
            doctor: 'Dr. Sarah Mitchell',
            description: 'Comprehensive wellness check including vitals, BMI, and physical mobility assessment. Patient shows excellent heart rate recovery and stable blood pressure.',
            icon: IconFileText,
            nodeColor: 'bg-blue-500',
            attachments: [
                { name: 'Physical_Report.pdf', type: 'pdf' },
                { name: 'Vitals_Summary.csv', type: 'csv' }
            ]
        },
        {
            id: 2,
            type: 'Scans & Labs',
            tag: 'IMAGING',
            date: 'Oct 12, 2023 • 02:15 PM',
            title: 'Brain MRI Scan (Contrast)',
            status: 'Normal Findings',
            statusColor: 'slate',
            doctor: 'Radiology: St. Lukes Center',
            description: 'Neurological assessment following reports of mild dizziness. High-resolution imaging of cranial structures performed.',
            icon: IconMicroscope,
            nodeColor: 'bg-indigo-500',
            imaging: {
                diagnosis: 'No anomalies found',
                details: 'The scan indicates normal brain volume and no signs of vascular obstruction.'
            }
        },
        {
            id: 3,
            type: 'Consultations',
            tag: 'CHAT',
            date: 'Sep 15, 2023 • 09:45 AM',
            title: 'Telehealth Consultation',
            status: 'Follow-up Recommended',
            statusColor: 'blue',
            doctor: 'Dr. James Wilson',
            icon: IconMessageCircle,
            nodeColor: 'bg-cyan-500',
            transcriptPreview: "Hello, I've been feeling some stiffness in my knee during morning walks..."
        },
        {
            id: 4,
            type: 'Scans & Labs',
            tag: 'LABS',
            date: 'Aug 30, 2023 • 08:00 AM',
            title: 'Lipid Panel & CBC',
            status: 'Action Required',
            statusColor: 'red',
            doctor: 'Lab: HealthFirst Diagnostic',
            description: 'Routine blood work for cholesterol and complete blood count assessment.',
            icon: IconFileAnalytics, // Updated generic icon since SVG was hardcoded before
            nodeColor: 'bg-amber-500',
            labs: [
                { name: 'LDL Cholesterol', value: '165 mg/dL', status: 'High', isAbnormal: true },
                { name: 'Hemoglobin', value: '14.2 g/dL', status: 'Normal', isAbnormal: false }
            ]
        }
    ];

    // Filter Logic
    const filteredTimeline = useMemo(() => {
        return mockTimelineData.filter(item => {
            if (activeFilter === 'All Records') return true;
            return item.type === activeFilter;
        });
    }, [activeFilter]);

    // Helper function to render status badges
    const renderStatusBadge = (status, colorName) => {
        const colorMaps = {
            green: 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-100 dark:border-green-800/30',
            slate: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700',
            blue: 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-800/50',
            red: 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border-red-100 dark:border-red-900/30'
        };

        const iconMap = {
            green: <IconCheck size={16} />,
            slate: <IconInfoCircle size={16} />,
            blue: <IconArrowRight size={16} />,
            red: <IconAlertTriangle size={16} />
        };

        return (
            <div className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-sm font-semibold border ${colorMaps[colorName]}`}>
                {iconMap[colorName]}
                <span>{status}</span>
            </div>
        );
    };

    // Helper function to render tag badges
    const renderTagBadge = (tag) => {
        const tagMap = {
            'ROUTINE': 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300',
            'IMAGING': 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400',
            'CHAT': 'bg-cyan-50 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400',
            'LABS': 'bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-500'
        };

        return (
            <span className={`text-[10px] sm:text-xs font-bold px-2 py-1 rounded tracking-wider ${tagMap[tag]}`}>
                {tag}
            </span>
        );
    };

    return (
        <div className="w-full bg-slate-50 dark:bg-[#0b1121] min-h-[calc(100vh-64px)] font-sans pb-24 lg:pb-12 text-slate-900 dark:text-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="max-w-5xl mx-auto">

                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-slate-200 dark:border-slate-800">
                        <div>
                            <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-500 font-bold text-xs tracking-wider uppercase mb-2">
                                <IconHistory size={16} />
                                <span>Patient Timeline</span>
                            </div>
                            <h1 className="text-3xl md:text-4xl font-extrabold mb-2">Medical History</h1>
                            <p className="text-slate-500 dark:text-slate-400">Detailed chronological record of your healthcare journey.</p>
                        </div>
                        <button className="mt-4 md:mt-0 w-full md:w-auto flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors shadow-sm shadow-blue-600/20">
                            <IconDownload size={20} />
                            <span>Export All Data</span>
                        </button>
                    </div>

                    {/* Filter Bar */}
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-10 space-y-4 lg:space-y-0 relative z-20 bg-slate-50 dark:bg-[#0b1121]">
                        <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                            <span className="text-sm font-semibold text-slate-500 tracking-wide uppercase">Filter By:</span>
                            <div className="flex flex-wrap gap-2">
                                {filters.map(filter => (
                                    <button
                                        key={filter.name}
                                        onClick={() => setActiveFilter(filter.name)}
                                        className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-semibold transition-colors border ${activeFilter === filter.name
                                                ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800/50'
                                                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
                                            }`}
                                    >
                                        {filter.icon}
                                        <span>{filter.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="relative">
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="flex items-center justify-between w-full lg:w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                            >
                                <IconHistory size={18} className="text-slate-400 mr-2" />
                                <span className="flex-1 text-left">{dateRange}</span>
                                <IconChevronDown size={18} className="text-slate-400 ml-2" />
                            </button>

                            {dropdownOpen && (
                                <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg z-50 overflow-hidden">
                                    {dateOptions.map(option => (
                                        <button
                                            key={option}
                                            onClick={() => {
                                                setDateRange(option);
                                                setDropdownOpen(false);
                                            }}
                                            className={`w-full text-left px-4 py-3 text-sm transition-colors ${dateRange === option
                                                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-semibold'
                                                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                                                }`}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Timeline Container */}
                    <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-4 md:ml-8 pl-8 md:pl-12 space-y-12">

                        {filteredTimeline.length === 0 ? (
                            <div className="py-12 text-center text-slate-500 dark:text-slate-400">
                                No records found for the selected filter.
                            </div>
                        ) : (
                            filteredTimeline.map((item) => {
                                const NodeIcon = item.icon;

                                return (
                                    <div key={item.id} className="relative">
                                        {/* Timeline Node */}
                                        <div className={`absolute -left-[41px] md:-left-[57px] top-4 w-8 md:w-10 h-8 md:h-10 rounded-full text-white flex items-center justify-center shadow-sm ring-4 ring-slate-50 dark:ring-[#0b1121] ${item.nodeColor}`}>
                                            <NodeIcon size={20} />
                                        </div>

                                        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 dark:border-slate-800 relative group hover:shadow-md transition-shadow">

                                            {/* Card Header row */}
                                            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                                                <div>
                                                    <div className="flex flex-wrap items-center gap-2 mb-2">
                                                        {renderTagBadge(item.tag)}
                                                        <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">{item.date}</span>
                                                    </div>
                                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{item.title}</h3>
                                                </div>
                                                <div className="mt-3 md:mt-0 flex flex-col items-start md:items-end">
                                                    {renderStatusBadge(item.status, item.statusColor)}
                                                    <span className="text-xs text-slate-500 mt-2 font-medium">{item.doctor}</span>
                                                </div>
                                            </div>

                                            {/* Description (Shared) */}
                                            {item.description && (
                                                <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed mb-6">
                                                    {item.description}
                                                </p>
                                            )}

                                            {/* Block: Attachments (Routine) */}
                                            {item.attachments && (
                                                <div className="flex flex-wrap gap-3">
                                                    {item.attachments.map(att => (
                                                        <button key={att.name} className="flex items-center space-x-2 px-4 py-2.5 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl border border-slate-200 dark:border-slate-700 transition-colors text-sm font-medium">
                                                            {att.type === 'pdf' ? <IconFileTypePdf size={20} className="text-red-500" /> : <IconFileAnalytics size={20} className="text-blue-500" />}
                                                            <span>{att.name}</span>
                                                        </button>
                                                    ))}
                                                </div>
                                            )}

                                            {/* Block: Imaging */}
                                            {item.imaging && (
                                                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 flex flex-col sm:flex-row items-center sm:items-start gap-4 border border-slate-100 dark:border-slate-800">
                                                    <div className="w-24 h-24 sm:w-20 sm:h-20 bg-slate-900 rounded-xl shrink-0 flex items-center justify-center overflow-hidden relative">
                                                        <div className="w-12 h-16 bg-blue-500/20 blur-xl rounded-full absolute"></div>
                                                        <IconMicroscope size={32} className="text-slate-700 translate-y-2 opacity-50 relative z-10" />
                                                    </div>
                                                    <div className="flex-1 text-center sm:text-left">
                                                        <h4 className="font-bold text-slate-900 dark:text-white mb-1">Diagnosis: {item.imaging.diagnosis}</h4>
                                                        <p className="text-sm text-slate-600 dark:text-slate-400">{item.imaging.details}</p>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Block: Chat Transcript */}
                                            {item.transcriptPreview && (
                                                <>
                                                    <div className="ml-4 pl-4 border-l-[3px] border-blue-200 dark:border-blue-800 text-slate-600 dark:text-slate-400 italic text-base md:text-lg mb-4 py-1">
                                                        "{item.transcriptPreview}"
                                                    </div>
                                                    <button className="text-blue-600 dark:text-blue-500 font-semibold text-sm flex items-center hover:underline">
                                                        View Full Transcript <IconArrowRight size={16} className="ml-1" />
                                                    </button>
                                                </>
                                            )}

                                            {/* Block: Lab Results */}
                                            {item.labs && (
                                                <div className="space-y-3">
                                                    {item.labs.map(lab => (
                                                        <div key={lab.name} className={`border rounded-xl p-4 flex justify-between items-center ${lab.isAbnormal
                                                                ? 'bg-red-50 dark:bg-red-900/10 border-red-100 dark:border-red-900/30'
                                                                : 'bg-green-50 dark:bg-green-900/10 border-green-100 dark:border-green-900/30'
                                                            }`}>
                                                            <div className="flex items-center space-x-3">
                                                                {lab.isAbnormal
                                                                    ? <IconAlertTriangle size={20} className="text-red-500" />
                                                                    : <IconCheck size={20} className="text-green-600 dark:text-green-500" />
                                                                }
                                                                <span className="font-semibold text-slate-900 dark:text-white">{lab.name}</span>
                                                            </div>
                                                            <div className="text-right">
                                                                <div className={`font-bold text-lg ${lab.isAbnormal ? 'text-red-600 dark:text-red-400' : 'text-green-700 dark:text-green-400'}`}>
                                                                    {lab.value}
                                                                </div>
                                                                <div className={`text-[10px] font-bold uppercase tracking-widest ${lab.isAbnormal ? 'text-red-500' : 'text-green-600'}`}>
                                                                    {lab.status}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}

                                        </div>
                                    </div>
                                );
                            })
                        )}

                    </div>

                    {/* Load More Button */}
                    {filteredTimeline.length > 0 && (
                        <div className="mt-12 text-center">
                            <button className="inline-flex items-center justify-center space-x-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white px-6 py-3 rounded-full font-semibold transition-colors shadow-sm">
                                <span>Load Older Records</span>
                                <IconChevronDown size={20} />
                            </button>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default HealthHistory;
