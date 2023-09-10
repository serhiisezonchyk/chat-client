import React from 'react';
import './Chat.scss';
import ChatList from '../../components/chat/chat-list/ChatList';
import ChatBox from '../../components/chat/chat-box/ChatBox';

const Chat = () => {
  return (
    <div className="main-container">
      <ChatList />
      <ChatBox/>
    </div>
  );
};

export default Chat;
