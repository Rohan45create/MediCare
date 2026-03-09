import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
  loading: false,
  error: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    sendMessageStart: (state, action) => {
      state.loading = true;
      state.error = null;
      // Optimistically add user message
      state.messages.push({
        sender: 'user',
        text: action.payload.message
      });
    },
    sendMessageSuccess: (state, action) => {
      state.loading = false;
      // Add AI response
      state.messages.push({
        sender: 'ai',
        text: action.payload.response
      });
    },
    sendMessageFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearChat: (state) => {
      state.messages = [];
      state.error = null;
    }
  },
});

export const {
  sendMessageStart, sendMessageSuccess, sendMessageFailure, clearChat
} = chatSlice.actions;

export const selectChat = (state) => state.chat;
export const selectMessages = (state) => state.chat.messages;

export default chatSlice.reducer;
