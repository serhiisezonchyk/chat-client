import { createSlice } from '@reduxjs/toolkit';
import { createChat, getUsersChats } from '../services/chat.service';

const initialState = {
  data: [],
  current_chat: null,
  online_users: [],
  notifications: [],
  status: 'loading',
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChosenChat: (state, action) => {
      state.current_chat = action.payload;
    },
    setChosenChatForCreate: (state, action) => {
      state.current_chat = {
        members: [{ ...{ user: { ...action.payload } } }],
        messages: [],
      };
    },
    clearChosenChat: (state) => {
      state.current_chat = null;
    },
    clearChosenChat: (state) => {
      state.current_chat = null;
    },
    setOnlineUsers: (state, action) => {
      state.online_users = action.payload;
    },
    setNotifications: (state, action) => {
      state.notifications.push(action.payload);
    },
    updateNotifications: (state, action) => {
      state.notifications = action.payload;
    },
    updateUserLastMessage: (state, action) => {
      const chatIdToUpdate = action.payload.chat_id;
      const updatedMessage = action.payload;

      const chatToUpdate = state.data.find(
        (chat) => chat.id === chatIdToUpdate
      );
      if (chatToUpdate) {
        chatToUpdate.messages[0] = updatedMessage;
      }
    },
    setNewChat: (state, action) => {
      state.data.push(action.payload);
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
      })
      .addCase(createChat.fulfilled, (state, action) => {
        state.data.push(action.payload);
        state.current_chat = action.payload;
      });
  },
});

export const selectIsChatLoading = (state) =>
  state.chat.status === 'loading' ? true : false;
export const selectChatData = (state) => state.chat.data;
export const selectCurentChat = (state) => state.chat.current_chat;
export const selectOnlineUsers = (state) => state.chat.online_users;
export const selectNotifications = (state) => state.chat.notifications;
export const { reducer: chatReducer, actions: chatActions } = chatSlice;
