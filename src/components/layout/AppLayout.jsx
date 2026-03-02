import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const AppLayout = () => {
    const location = useLocation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Do not show navbar/footer on specific standalone auth pages
    const isAuthPage = ['/login', '/register'].includes(location.pathname);

    if (isAuthPage) {
        return (
            <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950">
                <main className="flex-grow flex flex-col items-center justify-center p-4">
                    <Outlet />
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-200">
            <Navbar mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

            <main className="flex-1 w-full pt-16">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
};

export default AppLayout;
