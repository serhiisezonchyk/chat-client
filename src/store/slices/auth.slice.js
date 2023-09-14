import { createSlice } from '@reduxjs/toolkit';
import { check, login, registerUser } from '../services/user.service';
import jwt_decode from 'jwt-decode';

const initialState = {
  token: null,
  data: null,
  socket: null,
  status: 'loading',
  color_theme:
    window.localStorage.getItem('color_theme')?window.localStorage.getItem('color_theme'):
    window.matchMedia('(prefers-color-sceme: dark)').matches
      ? 'dark'
      : 'light',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.socket.emit('logout');
      state.token = null;
      state.status = 'loading';
      state.socket = null;
      state.data = null;
      localStorage.removeItem('token');
    },
    createSocket: (state, action) => {
      state.socket = action.payload;
    },
    initColorTheme: (state) => {
      if (state.color_theme === 'dark')
        document.documentElement.classList.add('dark');
      else document.documentElement.classList.remove('dark');
      localStorage.setItem('color_theme', state.color_theme);
    },
    changeColorTheme: (state) => {
      const current_theme = state.color_theme;
      state.color_theme = current_theme === 'light' ? 'dark' : 'light';
      if (state.color_theme === 'dark')
        document.documentElement.classList.add('dark');
      else document.documentElement.classList.remove('dark');
      localStorage.setItem('color_theme', state.color_theme);
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
export const selectAuthSocket = (state) => state.auth.socket;
export const selectColorTheme = (state) => state.auth.color_theme;
export const { reducer: authReducer, actions: authActions } = authSlice;
