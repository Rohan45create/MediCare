import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Footer = () => {
    const { t } = useTranslation('common');
    return (
        <footer className="bg-white dark:bg-[#0b1121] border-t border-slate-200 dark:border-slate-800 py-12 lg:py-16 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
                <div className="md:col-span-1 border-b md:border-b-0 border-slate-100 dark:border-slate-800 pb-8 md:pb-0">
                    <Link to="/" className="flex items-center space-x-2 mb-4">
                        <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-sm">
                            M
                        </div>
                        <span className="text-xl font-bold text-slate-900 dark:text-white">
                            MediCare
                        </span>
                    </Link>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                        {t('footer.brand.description')}
                    </p>
                    <div className="flex space-x-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400">🌐</div>
                        <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400">✉️</div>
                        <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400">🔗</div>
                    </div>
                </div>

                <div className="pt-2 md:pt-0">
                    <h4 className="font-bold text-slate-900 dark:text-white mb-4 text-sm">{t('footer.product.heading')}</h4>
                    <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                        <li><Link to="/scanner" className="hover:text-blue-600 transition-colors">{t('footer.product.link_1')}</Link></li>
                        <li><Link to="/reports" className="hover:text-blue-600 transition-colors">{t('footer.product.link_2')}</Link></li>
                        <li><Link to="/dashboard" className="hover:text-blue-600 transition-colors">{t('footer.product.link_3')}</Link></li>
                        <li><span className="hover:text-blue-600 cursor-pointer transition-colors">{t('footer.product.link_4')}</span></li>
                    </ul>
                </div>

                <div className="pt-2 md:pt-0">
                    <h4 className="font-bold text-slate-900 dark:text-white mb-4 text-sm">{t('footer.company.heading')}</h4>
                    <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                        <li><span className="hover:text-blue-600 cursor-pointer transition-colors">{t('footer.company.link_1')}</span></li>
                        <li><span className="hover:text-blue-600 cursor-pointer transition-colors">{t('footer.company.link_2')}</span></li>
                        <li><span className="hover:text-blue-600 cursor-pointer transition-colors">{t('footer.company.link_3')}</span></li>
                        <li><span className="hover:text-blue-600 cursor-pointer transition-colors">{t('footer.company.link_4')}</span></li>
                    </ul>
                </div>

                <div className="md:col-span-1 pt-2 md:pt-0">
                    <h4 className="font-bold text-slate-900 dark:text-white mb-4 text-sm">{t('footer.newsletter.heading')}</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
                        {t('footer.newsletter.text')}
                    </p>
                    <div className="flex items-center w-full">
                        <input
                            type="email"
                            placeholder={t('footer.newsletter.input_placeholder')}
                            className="w-full bg-slate-100 dark:bg-slate-800 border bg-transparent border-slate-200 dark:border-slate-700 rounded-l-lg py-2.5 px-4 text-sm focus:ring-2 focus:ring-blue-500 outline-none dark:text-white"
                        />
                        <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-r-lg px-4 py-2.5 transition-colors border max-h-[42px] border-blue-600 dark:border-blue-700">
                            ➔
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 sm:mb-0">
                    © {new Date().getFullYear()} MediCare Inc. All rights reserved.
                </p>
                <div className="flex flex-wrap justify-center space-x-4 sm:space-x-6 text-xs text-slate-500 dark:text-slate-400">
                    <span className="hover:text-slate-900 dark:hover:text-white cursor-pointer">Privacy Policy</span>
                    <span className="hover:text-slate-900 dark:hover:text-white cursor-pointer">Terms of Service</span>
                    <span className="hover:text-slate-900 dark:hover:text-white cursor-pointer">Cookie Settings</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
