import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './slices/auth.slice';
import { chatReducer } from './slices/chat.slice';
import { messageReducer } from './slices/message.slice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
    message: messageReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export default store;
