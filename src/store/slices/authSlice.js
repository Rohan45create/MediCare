import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: localStorage.getItem('medicare_token') || null,
  user: JSON.parse(localStorage.getItem('medicare_user')) || null,
  isAuthenticated: !!localStorage.getItem('medicare_token'),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = {
        name: action.payload.name,
        email: action.payload.email,
        profileCompleted: action.payload.profileCompleted
      };
      // Keep localStorage sync strictly for persistence across reloads
      localStorage.setItem('medicare_token', action.payload.token);
      localStorage.setItem('medicare_user', JSON.stringify(state.user));
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      localStorage.removeItem('medicare_token');
      localStorage.removeItem('medicare_user');
    },
    updateProfileCompletion: (state, action) => {
      if (state.user) {
        state.user.profileCompleted = action.payload;
        localStorage.setItem('medicare_user', JSON.stringify(state.user));
      }
    }
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, updateProfileCompletion } = authSlice.actions;

// Selectors
export const selectAuth = (state) => state.auth;
export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;

export default authSlice.reducer;
