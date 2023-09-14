import { createSlice } from '@reduxjs/toolkit';
import { createMessage, getChatMessages } from '../services/message.service';

const initialState = {
  data: null,
  status: 'loading',
};

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setMessage: (state, action) => {
      state.data.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getChatMessages.pending, (state) => {
        state.data = null;
        state.status = 'loading';
      })
      .addCase(getChatMessages.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = 'loaded';
      })
      .addCase(getChatMessages.rejected, (state) => {
        state.data = null;
        state.status = 'error';
      })
      .addCase(createMessage.fulfilled, (state, action) => {
        state.data.push(action.payload);
      });
  },
});

export const selectIsMessagesLoading = (state) =>
  state.message.status === 'loading' ? true : false;
export const selectMessageData = (state) => state.message.data;
export const { reducer: messageReducer, actions: messageActions } =
  messageSlice;
