import { createSlice } from '@reduxjs/toolkit';
import { check, login, registerUser } from '../services/user.service';
import jwt_decode from 'jwt-decode';

const initialState = {
  token: null,
  data:null,
  status: 'loading',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.status = 'loading';
      state.data = null,
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.token = null;
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.token;
        if (action.payload?.token)
          localStorage.setItem('token', action.payload.token);
        state.data = action.payload.user;
        state.status = 'loaded';
      })
      .addCase(login.rejected, (state) => {
        state.token = null;
        state.status = 'error';
      })
      .addCase(check.pending, (state) => {
        state.token = null;
        state.status = 'loading';
      })
      .addCase(check.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.data = action.payload.user;
        state.status = 'loaded';
      })
      .addCase(check.rejected, (state) => {
        state.token = null;
        state.status = 'error';
      })
      .addCase(registerUser.pending, (state) => {
        state.token = null;
        state.status = 'loading';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.token = action.payload.token;
        if (action.payload?.token)
          localStorage.setItem('token', action.payload.token);
          state.data = action.payload.user;
          state.status = 'loaded';
      })
      .addCase(registerUser.rejected, (state) => {
        state.token = null;
        state.status = 'error';
      });
  },
});

export const selectIsAuth = (state) => Boolean(state.auth.token);
export const selectAuthData = (state) => state.auth.data;
export const { reducer: authReducer, actions: authActions } = authSlice;
