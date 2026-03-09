import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  scanHistory: [],
  currentScanResult: null,
  loading: false,
  error: null,
};

const scannerSlice = createSlice({
  name: 'scanner',
  initialState,
  reducers: {
    fetchScanHistoryStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchScanHistorySuccess: (state, action) => {
      state.loading = false;
      state.scanHistory = action.payload;
    },
    fetchScanHistoryFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    scanBarcodeStart: (state) => {
      state.loading = true;
      state.error = null;
      state.currentScanResult = null;
    },
    scanBarcodeSuccess: (state, action) => {
      state.loading = false;
      state.currentScanResult = action.payload;
      // If it's a successful scan, we might want to refresh history, or simply add a placeholder to history
    },
    scanBarcodeFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearScanResult: (state) => {
      state.currentScanResult = null;
    },
    clearScannerData: (state) => {
      state.scanHistory = [];
      state.currentScanResult = null;
    }
  },
});

export const {
  fetchScanHistoryStart, fetchScanHistorySuccess, fetchScanHistoryFailure,
  scanBarcodeStart, scanBarcodeSuccess, scanBarcodeFailure,
  clearScanResult, clearScannerData
} = scannerSlice.actions;

export const selectScanner = (state) => state.scanner;
export const selectCurrentScan = (state) => state.scanner.currentScanResult;

export default scannerSlice.reducer;
