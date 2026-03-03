import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { IconMenu, IconX, IconUser, IconMoon, IconSun, IconBell } from '@tabler/icons-react';

const Navbar = ({ mobileMenuOpen, setMobileMenuOpen }) => {
    const { theme, toggleTheme } = useTheme();
    const location = useLocation();
    const [notificationsOpen, setNotificationsOpen] = useState(false);

    const mockNotifications = [
        { id: 1, title: 'Report Ready', message: 'Your recent blood work results are ready to view.', time: '2m ago', unread: true },
        { id: 2, title: 'Scan Complete', message: 'No anomalies found in your chest X-ray.', time: '1h ago', unread: true },
        { id: 3, title: 'Profile Setup', message: 'Please complete your health profile setup.', time: '1d ago', unread: false }
    ];

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'ScanSense AI', path: '/scanner' },
        { name: 'Reports', path: '/reports' },
        { name: 'Chatbot', path: '/chat' },
    ];

    // Pseudo-login state check (just for visual representation matching the mock)
    const isLoggedIn = localStorage.getItem('medicare_token') !== null;

    return (
        <nav className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 fixed w-full top-0 z-50 transition-colors duration-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo Section */}
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                                M
                            </div>
                            <span className="text-xl font-bold text-slate-900 dark:text-white">
                                MediCare
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation Links */}
                    <div className="hidden lg:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.name}
                                to={link.path}
                                className={({ isActive }) =>
                                    `text-sm font-medium transition-colors ${isActive && location.pathname !== '/' // Home might always be active otherwise
                                        ? 'text-blue-600 dark:text-blue-400'
                                        : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                                    }`
                                }
                            >
                                {link.name}
                            </NavLink>
                        ))}
                    </div>

                    {/* Right Action Section */}
                    <div className="hidden lg:flex items-center space-x-4">
                        <button
                            onClick={toggleTheme}
                            className="flex items-center px-3 py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-full text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors"
                        >
                            {theme === 'dark' ? <IconSun size={16} /> : <IconMoon size={16} />}
                        </button>

                        {!isLoggedIn ? (
                            <Link
                                to="/login"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-semibold transition-colors"
                            >
                                Login
                            </Link>
                        ) : (
                            <div className="flex items-center space-x-3">
                                {/* Notifications Dropdown */}
                                <div className="relative">
                                    <button
                                        onClick={() => setNotificationsOpen(!notificationsOpen)}
                                        className="relative p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors focus:outline-none"
                                    >
                                        <IconBell size={24} />
                                        {mockNotifications.some(n => n.unread) && (
                                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
                                        )}
                                    </button>

                                    {notificationsOpen && (
                                        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-800 rounded-xl shadow-lg shadow-slate-200/50 dark:shadow-black/50 border border-slate-100 dark:border-slate-700 overflow-hidden z-50">
                                            <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
                                                <h3 className="font-semibold text-slate-900 dark:text-white">Notifications</h3>
                                                <button className="text-xs text-blue-600 dark:text-blue-400 hover:underline">Mark all read</button>
                                            </div>
                                            <div className="max-h-96 overflow-y-auto">
                                                {mockNotifications.map(notification => (
                                                    <div key={notification.id} className={`px-4 py-3 border-b border-slate-50 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors ${notification.unread ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''}`}>
                                                        <div className="flex justify-between items-start mb-1">
                                                            <span className={`text-sm font-semibold ${notification.unread ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300'}`}>{notification.title}</span>
                                                            <span className="text-xs text-slate-500 dark:text-slate-500">{notification.time}</span>
                                                        </div>
                                                        <p className="text-sm text-slate-600 dark:text-slate-400">{notification.message}</p>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="px-4 py-3 text-center border-t border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80">
                                                <button className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">View all notifications</button>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <Link to="/profile" className="w-9 h-9 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden flex items-center justify-center border-2 border-white dark:border-slate-800 shadow-sm transition-transform hover:scale-105">
                                    <IconUser size={18} className="text-slate-500 dark:text-slate-400" />
                                </Link>
                            </div>
                        )}

                        {/* Quick action logout for testing */}
                        {isLoggedIn && (
                            <button
                                onClick={() => { localStorage.removeItem('medicare_token'); window.location.reload() }}
                                className="bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40 text-red-600 border border-red-100 dark:border-red-900/40 px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors ml-2"
                            >
                                Logout
                            </button>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex items-center lg:hidden space-x-2">
                        <button
                            onClick={toggleTheme}
                            className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
                        >
                            {theme === 'dark' ? <IconSun size={24} /> : <IconMoon size={24} />}
                        </button>
                        <button
                            onClick={() => setNotificationsOpen(!notificationsOpen)}
                            className="relative p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
                        >
                            <IconBell size={24} />
                            {mockNotifications.some(n => n.unread) && (
                                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
                            )}
                        </button>
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white focus:outline-none"
                        >
                            {mobileMenuOpen ? <IconX size={24} /> : <IconMenu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {mobileMenuOpen && (
                <div className="lg:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-lg absolute w-full left-0">
                    <div className="px-4 pt-2 pb-6 space-y-1">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.name}
                                to={link.path}
                                onClick={() => setMobileMenuOpen(false)}
                                className={({ isActive }) =>
                                    `block px-3 py-3 rounded-lg text-base font-medium ${isActive
                                        ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                                        : 'text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800'
                                    }`
                                }
                            >
                                {link.name}
                            </NavLink>
                        ))}
                        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col space-y-3 px-3">
                            {!isLoggedIn ? (
                                <Link
                                    to="/login"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white text-center px-4 py-3 rounded-xl font-semibold transition-colors"
                                >
                                    Login
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        to="/profile"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="w-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white text-center px-4 py-3 rounded-xl font-semibold transition-colors mb-2 block"
                                    >
                                        My Profile
                                    </Link>
                                    <button
                                        onClick={() => { localStorage.removeItem('medicare_token'); window.location.reload() }}
                                        className="w-full bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40 text-red-600 border border-red-100 dark:border-red-900/40 text-center px-4 py-3 rounded-xl font-semibold transition-colors"
                                    >
                                        Logout
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
