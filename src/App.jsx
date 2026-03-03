import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import AppLayout from './components/layout/AppLayout';

// Importing Pages
import Landing from './pages/Landing';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ProfileSetup from './pages/ProfileSetup';
import Dashboard from './pages/Dashboard';
import Scanner from './pages/Scanner';
import ScanResult from './pages/ScanResult';
import ReportUpload from './pages/ReportUpload';
import Chatbot from './pages/Chatbot';
import HealthHistory from './pages/HealthHistory';
import Settings from './pages/Settings';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            {/* Public Routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}
            <Route path="/profile-setup" element={<ProfileSetup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/scanner" element={<Scanner />} />
            <Route path="/scan-result" element={<ScanResult />} />
            <Route path="/reports" element={<ReportUpload />} />
            <Route path="/chat" element={<Chatbot />} />
            <Route path="/history" element={<HealthHistory />} />
            <Route path="/settings" element={<Settings />} />

            {/* Fallback routing */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
