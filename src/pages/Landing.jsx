import React from 'react';
import { Link } from 'react-router-dom';
import { IconActivity, IconShieldCheck, IconFileText, IconLayoutDashboard, IconSearch } from '@tabler/icons-react';

const Landing = () => {
    return (
        <div className="w-full bg-slate-50 dark:bg-[#0b1121] min-h-screen font-sans">

            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 lg:pt-24 flex flex-col lg:flex-row items-center justify-between">
                <div className="w-full lg:w-1/2 lg:pr-12 text-center lg:text-left mb-12 lg:mb-0">
                    <div className="inline-flex items-center space-x-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-xs font-bold tracking-wider mb-6">
                        <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400"></span>
                        <span>AI-POWERED HEALTHCARE</span>
                    </div>

                    <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-6">
                        Your AI <span className="text-blue-600">Health</span><br />Guardian
                    </h1>

                    <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-lg mx-auto lg:mx-0">
                        Professional healthcare assistant for medicine scanning, report analysis, and health tracking. Designed for clarity and ease of use for all ages.
                    </p>

                    <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 justify-center lg:justify-start">
                        <Link
                            to="/scanner"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-xl font-bold transition-transform transform hover:-translate-y-0.5 shadow-lg shadow-blue-500/30"
                        >
                            Try ScanSense AI
                        </Link>
                        <Link
                            to="/login"
                            className="bg-white dark:bg-slate-800 text-slate-800 dark:text-white border-2 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 px-8 py-3.5 rounded-xl font-bold transition-colors"
                        >
                            Login
                        </Link>
                    </div>
                </div>

                {/* Hero Image Group */}
                <div className="w-full lg:w-1/2 relative flex justify-center lg:justify-end">
                    <div className="relative w-full max-w-md h-auto rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 z-10">
                        <img src="https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=1000&auto=format&fit=crop" alt="Doctor holding tablet" className="w-full h-full object-cover aspect-[4/5]" />
                    </div>

                    {/* Floating Badges */}
                    <div className="absolute top-12 -left-6 lg:left-0 bg-white dark:bg-slate-800 rounded-xl shadow-xl p-3 flex items-center space-x-3 z-20 border border-slate-100 dark:border-slate-700">
                        <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                            <IconSearch size={16} />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Analyzed</p>
                            <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight">Aspirin 50mg</p>
                            <p className="text-xs text-emerald-500 font-semibold">Verified Safe</p>
                        </div>
                    </div>

                    <div className="absolute bottom-12 -right-6 lg:right-4 bg-white dark:bg-slate-800 rounded-xl shadow-xl p-3 flex items-center space-x-3 z-20 border border-slate-100 dark:border-slate-700">
                        <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center text-red-600">
                            <IconActivity size={16} />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Vitals</p>
                            <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight">Heart Rate: 72 BPM</p>
                            <p className="text-xs text-blue-500 font-semibold">Normal Range</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Statistics Section */}
            <section className="bg-slate-50 dark:bg-[#0b1121] border-b border-t border-slate-200 dark:border-slate-800 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-slate-800">
                    <div className="pt-4 pb-10 md:pt-0">
                        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">Active Users</p>
                        <h3 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-1">50,000+</h3>
                        <p className="text-sm text-emerald-500 font-semibold">↗ +12% this month</p>
                    </div>
                    <div className="pt-4 pb-10 md:pt-0">
                        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">Accuracy Rate</p>
                        <h3 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-1">99.9%</h3>
                        <p className="text-sm text-emerald-500 font-semibold flex items-center justify-center">
                            <IconShieldCheck size={14} className="mr-1" /> Clinical Grade AI
                        </p>
                    </div>
                    <div className="pt-8 pb-10 md:pt-0">
                        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">Drugs Scanned</p>
                        <h3 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-1">1.2M+</h3>
                        <p className="text-sm text-emerald-500 font-semibold">Global Database</p>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pb-24">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h4 className="text-sm font-bold text-blue-600 mb-3 tracking-widest uppercase">Intelligent Features</h4>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-6">Advanced Care for Everyone, Simplified.</h2>
                    <p className="text-slate-600 dark:text-slate-400">
                        Empowering you with AI-driven tools to manage your health safely and effectively, without the medical jargon.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
                            <IconSearch size={24} />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Medicine Scanner</h3>
                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">Instantly identify pills, check dosages, and see potential side effects using ScanSense AI.</p>
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
                            <IconFileText size={24} />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Report Analysis</h3>
                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">Upload complex medical reports and get simplified, easy-to-read summaries in seconds.</p>
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
                            <IconLayoutDashboard size={24} />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Health Dashboard</h3>
                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">Track your vitals, medication history, and appointments in one clean, large-font interface.</p>
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
                            <IconShieldCheck size={24} />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Fake Drug Detection</h3>
                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">Verify the authenticity of your medication with our global database and security checks.</p>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="bg-white dark:bg-[#111827] py-20 border-t border-slate-100 dark:border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row lg:items-stretch gap-8 lg:gap-12">

                    {/* Header Block (Static on all devices) */}
                    <div className="w-full lg:w-1/3 flex flex-col justify-center shrink-0">
                        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-4">What our users are saying</h2>
                        <p className="text-slate-600 dark:text-slate-400 mb-8">Join thousands of people who trust MediCare for their daily health management.</p>
                        <div className="flex -space-x-4">
                            <div className="w-12 h-12 rounded-full border-2 border-white dark:border-slate-900 bg-slate-300"></div>
                            <div className="w-12 h-12 rounded-full border-2 border-white dark:border-slate-900 bg-slate-400"></div>
                            <div className="w-12 h-12 rounded-full border-2 border-white dark:border-slate-900 bg-slate-500"></div>
                            <div className="w-12 h-12 rounded-full border-2 border-white dark:border-slate-900 bg-blue-600 flex items-center justify-center text-white text-xs font-bold">+10k</div>
                        </div>
                    </div>

                    {/* Reviews Container (Horizontally Scrollable on Mobile, Grid on Desktop) */}
                    <div className="w-full lg:w-2/3 flex overflow-x-auto pb-8 -mx-4 px-4 sm:mx-0 sm:px-0 lg:pb-0 lg:grid lg:grid-cols-2 gap-6 snap-x snap-mandatory hide-scroll-bar">

                        {/* Review 1 */}
                        <div className="min-w-[85vw] sm:min-w-[400px] w-fit lg:min-w-0 snap-center shrink-0 bg-slate-50 dark:bg-slate-800/50 p-8 rounded-3xl border border-slate-100 dark:border-slate-700 flex flex-col">
                            <div className="flex text-yellow-400 mb-4">
                                ★★★★★
                            </div>
                            <p className="text-slate-700 dark:text-slate-300 italic mb-6 flex-1">"As an elderly person, I used to struggle with all the different pills. The scanner is a life-saver, literally! Everything is so clear and easy to read."</p>
                            <div className="flex items-center mt-auto">
                                <div className="w-10 h-10 rounded-full bg-slate-300 mr-4 shrink-0"></div>
                                <div>
                                    <p className="font-bold text-slate-900 dark:text-white text-sm">Robert Chen</p>
                                    <p className="text-xs text-slate-500">Retired Teacher, 68</p>
                                </div>
                            </div>
                        </div>

                        {/* Review 2 */}
                        <div className="min-w-[85vw] sm:min-w-[400px] w-fit lg:min-w-0 snap-center shrink-0 bg-slate-50 dark:bg-slate-800/50 p-8 rounded-3xl border border-slate-100 dark:border-slate-700 flex flex-col">
                            <div className="flex text-yellow-400 mb-4">
                                ★★★★★
                            </div>
                            <p className="text-slate-700 dark:text-slate-300 italic mb-6 flex-1">"The report analysis tool helped me understand my lab results before I even talked to my doctor. It made me feel much more in control of my health."</p>
                            <div className="flex items-center mt-auto">
                                <div className="w-10 h-10 rounded-full bg-slate-300 mr-4 shrink-0"></div>
                                <div>
                                    <p className="font-bold text-slate-900 dark:text-white text-sm">Sarah Miller</p>
                                    <p className="text-xs text-slate-500">Freelance Designer, 34</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="bg-blue-600 rounded-[2.5rem] p-10 md:p-16 text-center text-white shadow-2xl flex flex-col items-center">
                    <h2 className="text-3xl md:text-5xl font-extrabold mb-6">Ready to take control<br className="hidden md:block" /> of your health?</h2>
                    <p className="text-blue-100 mb-10 max-w-xl text-lg">
                        Start your 14-day free trial today. No credit card required. Experience the future of personalized AI healthcare.
                    </p>
                    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
                        <Link to="/register" className="bg-white text-blue-600 px-8 py-3.5 rounded-xl font-bold hover:bg-slate-50 transition-colors w-full sm:w-auto">
                            Get Started Now
                        </Link>
                        <Link to="/contact" className="bg-blue-700 text-white border border-blue-500 hover:bg-blue-800 px-8 py-3.5 rounded-xl font-bold transition-colors w-full sm:w-auto">
                            Book a Demo
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Landing;
