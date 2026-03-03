import React from 'react';
import { NavLink } from 'react-router-dom';
import { IconLayoutDashboard, IconScan, IconFileText, IconMessage, IconClock, IconSettings, IconUserCircle } from '@tabler/icons-react';

const Sidebar = ({ isOpen, closeSidebar }) => {
    const navItems = [
        { name: 'Dashboard', path: '/dashboard', icon: <IconLayoutDashboard size={20} /> },
        { name: 'ScanSense AI', path: '/scanner', icon: <IconScan size={20} /> },
        { name: 'Report Upload', path: '/reports', icon: <IconFileText size={20} /> },
        { name: 'Health Chatbot', path: '/chat', icon: <IconMessage size={20} /> },
        { name: 'Health History', path: '/history', icon: <IconClock size={20} /> },
        { name: 'Profile Setup', path: '/profile-setup', icon: <IconUserCircle size={20} /> },
        { name: 'Settings', path: '/settings', icon: <IconSettings size={20} /> },
    ];

    return (
        <>
            {/* Mobile overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-slate-900/50 lg:hidden backdrop-blur-sm transition-opacity"
                    onClick={closeSidebar}
                />
            )}

            {/* Sidebar navigation */}
            <aside
                className={`fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transform transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="h-16 flex items-center px-6 lg:hidden border-b border-slate-200 dark:border-slate-800">
                    <span className="text-2xl font-bold bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
                        MediCare
                    </span>
                </div>

                <div className="flex flex-col h-[calc(100vh-4rem)] lg:h-[calc(100vh-4rem)] overflow-y-auto pt-6 pb-4">
                    <nav className="flex-1 px-4 space-y-1">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.name}
                                to={item.path}
                                onClick={() => {
                                    if (window.innerWidth < 1024) closeSidebar();
                                }}
                                className={({ isActive }) =>
                                    `flex items-center px-3 py-3 rounded-xl transition-all duration-200 ${isActive
                                        ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 font-medium'
                                        : 'text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200'
                                    }`
                                }
                            >
                                <span className="mr-3">{item.icon}</span>
                                {item.name}
                            </NavLink>
                        ))}
                    </nav>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
