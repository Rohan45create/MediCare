import axios from 'axios';
import { logout } from '../store/slices/authSlice';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// We'll configure interceptors dynamically using the store
export const setupInterceptors = (store) => {
  api.interceptors.request.use(
    (config) => {
      // Get token from Redux state instead of localStorage
      const token = store.getState().auth.token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        // Dispatch logout to clear state and redirect
        store.dispatch(logout());
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );
};

// ── Auth ──────────────────────────────────────────────
export const authAPI = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  register: (email, password, name) => api.post('/auth/register', { email, password, name }),
  googleLogin: (token) => api.post('/auth/google-login', { token }),
};

// ── Profile ───────────────────────────────────────────
export const profileAPI = {
  getProfile: () => api.get('/profile/me'),
  update: (data) => api.put('/profile/update', data),
  uploadImage: (formData) => api.post('/profile/upload-image', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  sendOtp: (data) => api.post('/profile/send-otp', data),
  verifyOtp: (data) => api.post('/profile/verify-otp', data)
};

// ── Reports ───────────────────────────────────────────
export const reportAPI = {
  upload: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/reports/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  getById: (id) => api.get(`/reports/${id}`),
  getMine: () => api.get('/reports/my'),
};

// ── Scans ─────────────────────────────────────────────
export const scanAPI = {
  scanBarcode: (barcode) => api.get(`/scans/barcode/${barcode}`),
  getHistory: () => api.get('/scans/history'),
  getById: (id) => api.get(`/scans/${id}`),
};

// ── Chat ──────────────────────────────────────────────
export const chatAPI = {
  query: (message, language = 'en') =>
    api.post('/chat/query', { message, language }),
};

// ── Dashboard ─────────────────────────────────────────
export const dashboardAPI = {
  getSummary: () => api.get('/dashboard/summary'),
};

// ── Notifications ─────────────────────────────────────
export const notificationAPI = {
  getAll: () => api.get('/notifications'),
  markRead: () => api.post('/notifications/mark-read'),
};

export default api;
