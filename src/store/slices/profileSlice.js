import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profileData: null,
  healthData: null,
  loading: false,
  error: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    fetchProfileStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchProfileSuccess: (state, action) => {
      state.loading = false;
      state.profileData = action.payload.user;
      state.healthData = action.payload.healthProfile;
    },
    fetchProfileFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateProfileStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateProfileSuccess: (state, action) => {
      state.loading = false;
      if (action.payload.user) state.profileData = action.payload.user;
      if (action.payload.healthProfile) state.healthData = action.payload.healthProfile;
    },
    updateProfileFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearProfile: (state) => {
      state.profileData = null;
      state.healthData = null;
    }
  },
});

export const { 
  fetchProfileStart, fetchProfileSuccess, fetchProfileFailure,
  updateProfileStart, updateProfileSuccess, updateProfileFailure,
  clearProfile
} = profileSlice.actions;

export const selectProfile = (state) => state.profile;

export default profileSlice.reducer;
