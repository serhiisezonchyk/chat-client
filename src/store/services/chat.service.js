import { createAsyncThunk } from '@reduxjs/toolkit';
import { $authHost } from '.';

export const createChat = createAsyncThunk('chat/createChat', async (values,{getState}) => {
  try {
    const { data } = await $authHost.post('api/chat', {first_id:values.sender_id, second_id:values.recipient_id});
    const socket = getState().auth.socket;

    socket.emit('createChat', {
      sender_id: values.sender_id,
      recipient_id: values.recipient_id,
    });
    return data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
});

export const getUsersChats = createAsyncThunk(
  'chat/getUsersChats',
  async (user_id) => {
    try {
      const { data } = await $authHost.get('api/chat/' + user_id);
      return data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  }
);

export const getChat = async (sender_id, recipient_id) => {
  try {
    const { data } = await $authHost.get(
      'api/chat/find/' + sender_id + '/' + recipient_id
    );
    return data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};
