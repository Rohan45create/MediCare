import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import profileReducer from './slices/profileSlice';
import reportReducer from './slices/reportSlice';
import scannerReducer from './slices/scannerSlice';
import chatReducer from './slices/chatSlice';
import notificationReducer from './slices/notificationSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    report: reportReducer,
    scanner: scannerReducer,
    chat: chatReducer,
    notifications: notificationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types for non-serializable payload checks (e.g. File objects in reports)
        ignoredActions: ['report/uploadReport/pending', 'report/uploadReport/fulfilled'],
      },
    }),
});

export default store;
