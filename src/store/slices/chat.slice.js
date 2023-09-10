import { createSlice } from '@reduxjs/toolkit';
import { getUsersChats } from '../services/chat.service';

const initialState = {
  data: null,
  current_chat: null,
  status: 'loading',
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChosenChat: (state, action) => {
      state.current_chat = action.payload;
    },
    clearChosenChat: (state) => {
      state.current_chat = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsersChats.pending, (state) => {
        state.data = null;
        state.status = 'loading';
      })
      .addCase(getUsersChats.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = 'loaded';
      })
      .addCase(getUsersChats.rejected, (state) => {
        state.data = null;
        state.status = 'error';
      });
  },
});

export const selectIsChatLoading = (state) =>
  state.chat.status === 'loading' ? true : false;
export const selectChatData = (state) => state.chat.data;
export const selectCurentChat = (state) => state.chat.current_chat;
export const { reducer: chatReducer, actions: chatActions } = chatSlice;
