import { createAsyncThunk } from '@reduxjs/toolkit';
import { $authHost, $host } from '.';
import jwt_decode from 'jwt-decode';

export const login = createAsyncThunk('auth/login', async (values) => {
  try {
    const { data } = await $host.post('api/user/login', values);
    const decoded = jwt_decode(data.token);
    return { user: decoded, token: data.token };
  } catch (error) {
    throw new Error(error.response.data.error);
  }
});

export const check = createAsyncThunk('auth/check', async () => {
  const { data } = await $authHost.get('api/user/auth');
  const decoded = jwt_decode(data.token);
  return { user: decoded, token: data.token };
});

export const registerUser = createAsyncThunk('auth/register', async (values) => {
  try {
    const { data } = await $host.post('api/user/register', values);
    const decoded = jwt_decode(data.token);
    return { user: decoded, token: data.token };
  } catch (error) {
    throw new Error(error.response.data.error);
  }
});

export const fetchOneUser = async(user_id)=>{
  const {data} = await $host.get('api/user/get/'+user_id);
  return data;
}

export const fetchUsers = async(values)=>{
  const {data} = await $host.get('api/user/', {
    params: { search_line: values.search_line },
  });
  return data;
}