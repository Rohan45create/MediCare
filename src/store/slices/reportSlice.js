import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  reports: [],
  currentReport: null,
  loading: false,
  error: null,
};

const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {
    fetchReportsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchReportsSuccess: (state, action) => {
      state.loading = false;
      state.reports = action.payload;
    },
    fetchReportsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchSingleReportStart: (state) => {
      state.loading = true;
      state.error = null;
      state.currentReport = null;
    },
    fetchSingleReportSuccess: (state, action) => {
      state.loading = false;
      state.currentReport = action.payload;
    },
    fetchSingleReportFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    uploadReportStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    uploadReportSuccess: (state, action) => {
      state.loading = false;
      state.reports.unshift(action.payload); // Add to beginning of list
      state.currentReport = action.payload;
    },
    uploadReportFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearReportsData: (state) => {
      state.reports = [];
      state.currentReport = null;
    }
  },
});

export const {
  fetchReportsStart, fetchReportsSuccess, fetchReportsFailure,
  fetchSingleReportStart, fetchSingleReportSuccess, fetchSingleReportFailure,
  uploadReportStart, uploadReportSuccess, uploadReportFailure,
  clearReportsData
} = reportSlice.actions;

export const selectReports = (state) => state.report;
export const selectCurrentReport = (state) => state.report.currentReport;

export default reportSlice.reducer;
