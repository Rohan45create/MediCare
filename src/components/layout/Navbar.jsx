import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { IconMenu2, IconX, IconUser, IconMoon, IconSun, IconBell } from '@tabler/icons-react';
import { notificationAPI } from '../../services/api';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsAuthenticated, loginSuccess } from '../../store/slices/authSlice';
import { logout } from '../../store/slices/authSlice';
import { profileAPI } from '../../services/api';

const Navbar = ({ mobileMenuOpen, setMobileMenuOpen }) => {
    const { theme, toggleTheme } = useTheme();
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [notificationsOpen, setNotificationsOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const { user: authUser, token } = useSelector((state) => state.auth);

    const [user, setUser] = useState({
        avatar: authUser?.profileImage ? `data:image/jpeg;base64,${authUser.profileImage}` : null
    });

    // Use Redux state for authentication
    const isLoggedIn = useSelector(selectIsAuthenticated);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await profileAPI.getProfile();
                const fetchedUser = res.data;
                setUser({
                    avatar: fetchedUser.profileImage ? `data:image/jpeg;base64,${fetchedUser.profileImage}` : null
                });
                dispatch(loginSuccess({ user: fetchedUser, token }));
            } catch (err) {
                console.error("Failed to fetch user profile", err);
            }
        };
        if (isLoggedIn) {
            fetchUserData();
            fetchNotifications();
        }
    }, [isLoggedIn, dispatch, token]);

    const fetchNotifications = async () => {
        try {
            const res = await notificationAPI.getAll();
            setNotifications(res.data);
        } catch (err) {
            console.error("Failed to fetch notifications", err);
        }
    };

    const handleMarkAllRead = async () => {
        if (notifications.length === 0 || !notifications.some(n => !n.isRead)) return;
        try {
            await notificationAPI.markRead();
            setNotifications(notifications.map(n => ({ ...n, isRead: true })));
        } catch (err) {
            console.error("Failed to mark notifications read", err);
        }
    };

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'ScanSense AI', path: '/scanner' },
        { name: 'Reports', path: '/reports' },
        { name: 'Chatbot', path: '/chat' },
    ];

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
                                        {notifications.some(n => !n.isRead) && (
                                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
                                        )}
                                    </button>

                                    {notificationsOpen && (
                                        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-800 rounded-xl shadow-lg shadow-slate-200/50 dark:shadow-black/50 border border-slate-100 dark:border-slate-700 overflow-hidden z-50">
                                            <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
                                                <h3 className="font-semibold text-slate-900 dark:text-white">Notifications</h3>
                                                {notifications.some(n => !n.isRead) && (
                                                    <button onClick={handleMarkAllRead} className="text-xs text-blue-600 dark:text-blue-400 hover:underline">Mark all read</button>
                                                )}
                                            </div>
                                            <div className="max-h-96 overflow-y-auto">
                                                {notifications.length === 0 ? (
                                                    <div className="p-4 text-center text-sm text-slate-500">No new notifications</div>
                                                ) : (
                                                    notifications.map(notification => (
                                                        <div
                                                            key={notification.id}
                                                            className={`px-4 py-3 border-b border-slate-50 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer ${!notification.isRead ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''}`}
                                                            onClick={() => {
                                                                if (notification.type === 'REPORT' && notification.referenceId) navigate(`/report-results/${notification.referenceId}`);
                                                                else if (notification.type === 'SCAN' && notification.referenceId) navigate(`/scan-results/${notification.referenceId}`);
                                                                setNotificationsOpen(false);
                                                            }}
                                                        >
                                                            <div className="flex justify-between items-start mb-1">
                                                                <span className={`text-sm font-semibold ${!notification.isRead ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300'}`}>{notification.title}</span>
                                                                <span className="text-xs text-slate-500 dark:text-slate-500">{notification.time}</span>
                                                            </div>
                                                            <p className="text-sm text-slate-600 dark:text-slate-400">{notification.message}</p>
                                                        </div>
                                                    ))
                                                )}
                                            </div>
                                            <div className="px-4 py-3 text-center border-t border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80">
                                                <button className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">View all notifications</button>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <Link to="/profile" className="w-9 h-9 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden flex items-center justify-center border-2 border-white dark:border-slate-800 shadow-sm transition-transform hover:scale-105">
                                    {user.avatar ? (
                                        <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        <IconUser size={18} className="text-slate-500 dark:text-slate-400" />
                                    )}

                                </Link>
                            </div>
                        )}

                        {/* Quick action logout for testing */}
                        {isLoggedIn && (
                            <button
                                onClick={() => { dispatch(logout()); }}
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
                            {notifications.some(n => !n.isRead) && (
                                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
                            )}
                        </button>
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white focus:outline-none"
                        >
                            {mobileMenuOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
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
                                        onClick={() => { dispatch(logout()); setMobileMenuOpen(false); }}
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
