import { createAsyncThunk } from '@reduxjs/toolkit';
import { $host } from '.';

export const createChat = async (values) => {
  try {
    const { data } = await $host.post('api/chat', values);
    return data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const getUsersChats = createAsyncThunk('chat/getUsersChats',async (user_id) => {
    try {
      const { data } = await $host.get('api/chat/'+user_id);
      return data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  });
  
  export const getChat = async (first_id, second_id) => {
    try {
      const { data } = await $host.post('api/chat/find/'+first_id+'/'+second_id);
      return data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  };
  