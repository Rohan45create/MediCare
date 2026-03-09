import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../store/slices/authSlice';

const GoogleCallback = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const token = searchParams.get('token');
        const email = searchParams.get('email');
        const name = searchParams.get('name');
        const profileCompleted = searchParams.get('profileCompleted') === 'true';

        if (token && email && name) {
            const userData = {
                token,
                user: {
                    email,
                    name,
                    profileCompleted
                }
            };
            
            dispatch(loginSuccess(userData));
            
            // Redirect based on profile completion
            if (profileCompleted) {
                navigate('/dashboard');
            } else {
                navigate('/profile-setup');
            }
        } else {
            // Handle error case
            navigate('/login?error=google_auth_failed');
        }
    }, [navigate, dispatch, searchParams]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
                <p className="text-slate-600 dark:text-slate-400">Completing Google sign in...</p>
            </div>
        </div>
    );
};

export default GoogleCallback;
