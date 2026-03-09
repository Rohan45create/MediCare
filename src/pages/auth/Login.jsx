import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IconBrandGoogle } from '@tabler/icons-react';
import { useDispatch } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../../store/slices/authSlice';
import { authAPI } from '../../services/api';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            setError('Please fill all fields');
            return;
        }
        setError('');
        setLoading(true);
        dispatch(loginStart());
        try {
            const res = await authAPI.login(formData.email, formData.password);
            dispatch(loginSuccess(res.data));
            navigate(res.data.profileCompleted ? '/dashboard' : '/profile-setup');
        } catch (err) {
            const errorMessage = err.response?.data?.error || 'Login failed. Please check your credentials.';
            setError(errorMessage);
            dispatch(loginFailure(errorMessage));
        } finally {
            setLoading(false);
        }
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
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 shadow-md hover:shadow-lg text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 transform hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    {loading ? 'Signing in...' : 'Sign in'}
                </button>

                <div className="relative flex items-center justify-center mt-6 mb-6">
                    <span className="absolute bg-white dark:bg-slate-900 px-3 text-sm text-slate-500 dark:text-slate-400 z-10">or</span>
                    <div className="w-full border-t border-slate-200 dark:border-slate-800"></div>
                </div>

                <button
                    type="button"
                    onClick={() => window.location.href = 'http://localhost:8080/oauth2/authorization/google'}
                    className="w-full flex items-center justify-center space-x-2 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 font-medium py-3 px-4 rounded-xl transition-all duration-200"
                >
                    <IconBrandGoogle size={20} className="text-red-500" />
                    <span>Continue with Google</span>
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
