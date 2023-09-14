import { createAsyncThunk } from '@reduxjs/toolkit';
import { $authHost } from '.';
export const createMessage = createAsyncThunk(
  'message/createMessage',
  async (values, { getState }) => {
    try {
      const { data } = await $authHost.post('api/messages', values);
      const current_chat = getState().chat.current_chat;
      const socket = getState().auth.socket;
      socket.emit('sendMessage', {
        message: { ...data },
        recipientId: current_chat.members[0].user.id,
      });
      return data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  }
);
export const getChatMessages = createAsyncThunk(
  'message/getChatMessages',
  async (chat_id) => {
    try {
      const { data } = await $authHost.get('api/messages/' + chat_id);
      return data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  }
);
