import React from 'react';
import './Chat.scss';
import ChatList from '../../components/chat/chat-list/ChatList';
import ChatBox from '../../components/chat/chat-box/ChatBox';
import { useDispatch, useSelector } from 'react-redux';
import {
  authActions,
  selectAuthData,
  selectAuthSocket,
} from '../../store/slices/auth.slice';
import { io } from 'socket.io-client';
import { chatActions, selectCurentChat } from '../../store/slices/chat.slice';
const Chat = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectAuthData);
  const socket = useSelector(selectAuthSocket);

  React.useEffect(() => {
    const newSocket = io(import.meta.env.VITE_APP_API_URL);
    dispatch(authActions.createSocket(newSocket));
    return () => {
      newSocket.disconnect();
    };
  }, [user]);

  React.useEffect(() => { 
    if (socket === null) return;
    socket.emit('addNewUser', user?._id);
    socket.on('getOnlineUsers', (res) => {
      dispatch(chatActions.setOnlineUsers(res));
    });
    return () => {
      socket.off('getOnlineUsers');
    };
  }, [socket]);

  return (
    <div className='main-container'>
      <ChatList />
      <ChatBox />
    </div>
  );
};

export default Chat;
