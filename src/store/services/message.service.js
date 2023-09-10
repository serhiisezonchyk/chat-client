import { createAsyncThunk } from '@reduxjs/toolkit';
import { $host } from '.';

export const createMessage = createAsyncThunk(
  'message/createMessage', async (values) => {
  try {
    const { data } = await $host.post('api/messages', values);
    return data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
});

export const getChatMessages = createAsyncThunk(
  'message/getChatMessages',
  async (chat_id) => {
    try {
      const { data } = await $host.get('api/messages/' + chat_id);
      return data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  }
);
