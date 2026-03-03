import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
    IconTrophy,
    IconSettings,
    IconCirclesRelation,
    IconShieldCheck,
    IconLock,
    IconChevronRight,
    IconUserCircle,
    IconHistory,
    IconChartBarPopular,
    IconEdit,
    IconCamera,
    IconCheck,
    IconMail,
    IconPhone,
    IconCalendar
} from '@tabler/icons-react';

const Profile = () => {
    // Editable user state
    const [user, setUser] = useState({
        name: 'Hello-Michael',
        email: 'michael_1508@world.com',
        phone: '+1 234 567 8900',
        dob: '1990-05-15',
        avatar: 'https://i.pravatar.cc/150?img=11'
    });

    const [editingField, setEditingField] = useState(null);
    const [tempValue, setTempValue] = useState('');
    const fileInputRef = useRef(null);

    const handleEditClick = (field, value) => {
        setEditingField(field);
        setTempValue(value);
    };

    const handleSaveClick = (field) => {
        setUser({ ...user, [field]: tempValue });
        setEditingField(null);
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUser({ ...user, avatar: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const triggerFileSelect = () => {
        fileInputRef.current?.click();
    };

    const renderEditableField = (icon, label, field, type = 'text') => {
        const isEditing = editingField === field;

        return (
            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                <div className="flex items-center space-x-4 flex-1 mr-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                        {icon}
                    </div>
                    <div className="flex-1">
                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-0.5">{label}</p>
                        {isEditing ? (
                            <input
                                type={type}
                                value={tempValue}
                                onChange={(e) => setTempValue(e.target.value)}
                                className="w-full bg-white dark:bg-slate-900 border border-blue-500 rounded px-2 py-1 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/50"
                                autoFocus
                            />
                        ) : (
                            <p className="font-semibold text-slate-900 dark:text-white text-sm sm:text-base break-all">{user[field] || 'Not set'}</p>
                        )}
                    </div>
                </div>
                {isEditing ? (
                    <button
                        onClick={() => handleSaveClick(field)}
                        className="p-2 bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-lg hover:bg-emerald-200 transition-colors"
                    >
                        <IconCheck size={18} />
                    </button>
                ) : (
                    <button
                        onClick={() => handleEditClick(field, user[field])}
                        className="p-2 bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                    >
                        <IconEdit size={18} />
                    </button>
                )}
            </div>
        );
    };

    return (
        <div className="w-full bg-slate-50 dark:bg-[#0b1121] min-h-[calc(100vh-64px)] font-sans pb-24 lg:pb-12">
            <div className="max-w-6xl mx-auto pt-6 px-4">

                {/* Desktop Grid Layout Container */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">

                    {/* LEFT COLUMN: Profile Info & Editable Fields */}
                    <div className="lg:col-span-5 flex flex-col space-y-6">
                        {/* Header & Avatar Card */}
                        <div className="flex flex-col items-center bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 shadow-sm border border-slate-100 dark:border-slate-800 relative">

                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleImageUpload}
                                accept="image/*"
                                className="hidden"
                            />

                            <div className="relative group mb-4">
                                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center transition-transform group-hover:scale-105">
                                    {user.avatar ? (
                                        <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        <IconUserCircle size={64} className="text-slate-400" />
                                    )}
                                </div>
                                {/* Edit Avatar Overlay Button */}
                                <button
                                    onClick={triggerFileSelect}
                                    className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center shadow-lg transition-colors border-2 border-white dark:border-slate-900"
                                >
                                    <IconCamera size={20} />
                                </button>
                            </div>

                            {/* Name Editing inline */}
                            {editingField === 'name' ? (
                                <div className="flex items-center space-x-2 mb-2 w-full max-w-xs">
                                    <input
                                        type="text"
                                        value={tempValue}
                                        onChange={(e) => setTempValue(e.target.value)}
                                        className="flex-1 bg-slate-50 dark:bg-slate-800 border border-blue-500 rounded-lg px-3 py-2 text-center text-lg font-bold text-slate-900 dark:text-white outline-none"
                                        autoFocus
                                    />
                                    <button onClick={() => handleSaveClick('name')} className="p-2 bg-emerald-100 text-emerald-600 rounded-lg"><IconCheck size={20} /></button>
                                </div>
                            ) : (
                                <div className="flex items-center space-x-2 mb-2 group cursor-pointer" onClick={() => handleEditClick('name', user.name)}>
                                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">{user.name}</h1>
                                    <IconEdit size={18} className="text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                            )}

                            <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400">Patient Member</p>
                        </div>

                        {/* Personal Details Editable Cards */}
                        <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 shadow-sm border border-slate-100 dark:border-slate-800 space-y-3">
                            <h3 className="font-bold text-slate-900 dark:text-white mb-4 ml-2">Personal Details</h3>
                            {renderEditableField(<IconMail size={20} />, "Email Address", "email", "email")}
                            {renderEditableField(<IconPhone size={20} />, "Mobile Phone", "phone", "tel")}
                            {renderEditableField(<IconCalendar size={20} />, "Date of Birth", "dob", "date")}
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Navigation & Actions */}
                    <div className="lg:col-span-7 flex flex-col space-y-6">

                        {/* Progress/Competition Card */}
                        <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 flex items-center justify-between shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md transition-shadow">
                            <div className="flex items-center space-x-4 sm:space-x-5">
                                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center shrink-0 border border-amber-100 dark:border-amber-900/30">
                                    <IconChartBarPopular size={24} className="text-amber-500 sm:w-7 sm:h-7" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Check Progress</h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">View your health metrics and daily goals</p>
                                </div>
                            </div>
                            <Link to="/dashboard">
                                <button className="px-5 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl text-sm font-semibold text-slate-900 dark:text-white transition-colors">
                                    View
                                </button>
                            </Link>
                        </div>

                        {/* Navigation List Grid for Desktop */}
                        <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-4 shadow-sm border border-slate-100 dark:border-slate-800 flex-1">
                            <h3 className="font-bold text-slate-900 dark:text-white mb-2 ml-4 mt-2">Preferences & Settings</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">

                                <Link to="/settings" className="flex items-center justify-between p-4 bg-transparent hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-2xl transition-colors group border border-transparent hover:border-slate-100 dark:hover:border-slate-800">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
                                            <IconSettings size={20} />
                                        </div>
                                        <span className="font-semibold text-slate-900 dark:text-white">App settings</span>
                                    </div>
                                    <IconChevronRight size={20} className="text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200 transition-colors" />
                                </Link>

                                <Link to="/profile-setup" className="flex items-center justify-between p-4 bg-transparent hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-2xl transition-colors group border border-transparent hover:border-slate-100 dark:hover:border-slate-800">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
                                            <IconCirclesRelation size={20} />
                                        </div>
                                        <div>
                                            <span className="font-semibold text-slate-900 dark:text-white block">Profile setup</span>
                                            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide mt-0.5 block">Needs Update</span>
                                        </div>
                                    </div>
                                    <IconChevronRight size={20} className="text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200 transition-colors" />
                                </Link>

                                <Link to="/history" className="flex items-center justify-between p-4 bg-transparent hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-2xl transition-colors group border border-transparent hover:border-slate-100 dark:hover:border-slate-800">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-10 h-10 rounded-full bg-cyan-100 dark:bg-cyan-900/40 flex items-center justify-center text-cyan-600 dark:text-cyan-400 group-hover:scale-110 transition-transform">
                                            <IconHistory size={20} />
                                        </div>
                                        <span className="font-semibold text-slate-900 dark:text-white">Medical History</span>
                                    </div>
                                    <IconChevronRight size={20} className="text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200 transition-colors" />
                                </Link>

                                <Link to="#" className="flex items-center justify-between p-4 bg-transparent hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-2xl transition-colors group border border-transparent hover:border-slate-100 dark:hover:border-slate-800">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform">
                                            <IconLock size={20} />
                                        </div>
                                        <span className="font-semibold text-slate-900 dark:text-white">App permissions</span>
                                    </div>
                                    <IconChevronRight size={20} className="text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200 transition-colors" />
                                </Link>

                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default Profile;
