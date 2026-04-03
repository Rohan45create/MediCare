import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { IconMoon, IconSun, IconBell, IconWorld, IconShield, IconLogout } from '@tabler/icons-react';
import LanguageSelector from '../components/LanguageSelector';
import { useTranslation } from 'react-i18next';

const Settings = () => {
    const { t } = useTranslation('settings');
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="w-full bg-slate-50 dark:bg-[#0b1121] min-h-[calc(100vh-64px)] font-sans pb-24 lg:pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="max-w-3xl mx-auto space-y-6">
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{t('settings_page.header.title')}</h1>
                        <p className="text-slate-500 dark:text-slate-400">{t('settings_page.header.subtitle')}</p>
                    </div>

                    <div className="space-y-4">
                        {/* Appearance Section */}
                        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                                <h3 className="font-semibold text-slate-900 dark:text-white">{t('settings_page.sections.appearance_and_language.heading')}</h3>
                            </div>
                            <div className="divide-y divide-slate-100 dark:divide-slate-800">
                                <div className="px-6 py-4 flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-lg">
                                            {theme === 'dark' ? <IconMoon size={20} /> : <IconSun size={20} />}
                                        </div>
                                        <div>
                                            <p className="font-medium text-slate-900 dark:text-white">{t('settings_page.sections.appearance_and_language.dark_mode.label')}</p>
                                            <p className="text-sm text-slate-500 dark:text-slate-400">{t('settings_page.sections.appearance_and_language.dark_mode.description')}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={toggleTheme}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 ${theme === 'dark' ? 'bg-emerald-600' : 'bg-slate-200 dark:bg-slate-700'}`}
                                    >
                                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${theme === 'dark' ? 'translate-x-6' : 'translate-x-1'}`} />
                                    </button>
                                </div>

                                <div className="px-6 py-4 flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
                                            <IconWorld size={20} />
                                        </div>
                                        <div>
                                            <p className="font-medium text-slate-900 dark:text-white">{t('settings_page.sections.appearance_and_language.language_selection.label')}</p>
                                            <p className="text-sm text-slate-500 dark:text-slate-400">{t('settings_page.sections.appearance_and_language.language_selection.description')}</p>
                                        </div>
                                    </div>
                                    <LanguageSelector />
                                </div>
                            </div>
                        </div>

                        {/* Notifications */}
                        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                                <h3 className="font-semibold text-slate-900 dark:text-white">{t('settings_page.sections.notifications.heading')}</h3>
                            </div>
                            <div className="divide-y divide-slate-100 dark:divide-slate-800">
                                <div className="px-6 py-4 flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="p-2 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-lg">
                                            <IconBell size={20} />
                                        </div>
                                        <div>
                                            <p className="font-medium text-slate-900 dark:text-white">{t('settings_page.sections.notifications.push_notifications.label')}</p>
                                            <p className="text-sm text-slate-500 dark:text-slate-400">{t('settings_page.sections.notifications.push_notifications.description')}</p>
                                        </div>
                                    </div>
                                    <button
                                        className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 bg-emerald-600"
                                    >
                                        <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Account Security */}
                        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                                <h3 className="font-semibold text-slate-900 dark:text-white">{t('settings_page.sections.account_security.heading')}</h3>
                            </div>
                            <div className="p-6">
                                <button className="flex items-center justify-center w-full sm:w-auto px-6 py-2.5 border border-red-200 dark:border-red-800/50 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl font-medium transition-colors">
                                    <IconLogout size={18} className="mr-2" />
                                    {t('settings_page.sections.account_security.action.label')}
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
