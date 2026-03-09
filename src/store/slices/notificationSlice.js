import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notifications: [],
  unreadCount: 0,
  loading: false,
  error: null,
};

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    fetchNotificationsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchNotificationsSuccess: (state, action) => {
      state.loading = false;
      state.notifications = action.payload;
      state.unreadCount = action.payload.filter(n => !n.isRead).length;
    },
    fetchNotificationsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    markReadStart: (state) => {
      // Optimistic update
      state.notifications.forEach(n => n.isRead = true);
      state.unreadCount = 0;
    },
    markReadSuccess: (state) => {
      // Backend confirmation, state already updated optimistically
    },
    markReadFailure: (state, action) => {
      state.error = action.payload;
      // We could revert optimistic update here if we kept previous state
    },
    clearNotifications: (state) => {
      state.notifications = [];
      state.unreadCount = 0;
    }
  },
});

export const {
  fetchNotificationsStart, fetchNotificationsSuccess, fetchNotificationsFailure,
  markReadStart, markReadSuccess, markReadFailure, clearNotifications
} = notificationSlice.actions;

export const selectNotifications = (state) => state.notifications;
export const selectUnreadCount = (state) => state.notifications.unreadCount;

export default notificationSlice.reducer;
