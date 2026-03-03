import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            setError('Please fill all fields');
            return;
        }
        setError('');
        // Mock login success
        localStorage.setItem('medicare_token', 'mock-jwt-token');
        navigate('/dashboard');
    };

    return (
        <div className="w-full max-w-md bg-white dark:bg-slate-900 shadow-xl border border-slate-100 dark:border-slate-800 rounded-3xl p-8 transform transition-all duration-300">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">Welcome Back</h2>
                <p className="text-slate-500 dark:text-slate-400">Sign in to your MediCare account</p>
            </div>

            {error && <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl text-sm border border-red-200 dark:border-red-800">{error}</div>}

            <form onSubmit={handleLogin} className="space-y-5">
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email address</label>
                    <input
                        type="email"
                        name="email"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors dark:text-white"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Password</label>
                    <input
                        type="password"
                        name="password"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors dark:text-white"
                        placeholder="********"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <input type="checkbox" className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-slate-300 rounded" />
                        <label className="ml-2 block text-sm text-slate-600 dark:text-slate-400">Remember me</label>
                    </div>
                    <a href="#" className="text-sm font-medium text-emerald-600 hover:text-emerald-500 dark:text-emerald-400">Forgot password?</a>
                </div>

                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 shadow-md hover:shadow-lg text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 transform hover:-translate-y-0.5"
                >
                    Sign in
                </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
                Don't have an account?{' '}
                <Link to="/register" className="font-semibold text-emerald-600 hover:text-emerald-500 dark:text-emerald-400 hover:underline">
                    Create account
                </Link>
            </p>
        </div>
    );
};

export default Login;
