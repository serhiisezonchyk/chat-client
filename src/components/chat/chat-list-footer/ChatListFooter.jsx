import React from 'react';
import { RiAccountCircleLine, RiSettings4Line } from 'react-icons/ri';
import { SiRocketdotchat } from 'react-icons/si';
import './ChatListFooter.scss';
import { useDispatch } from 'react-redux';
import { authActions } from '../../../store/slices/auth.slice';
const ChatListFooter = () => {
  const dispatch = useDispatch();
  const handleOnClickLogout = async () => {
    dispatch(authActions.logout());
  };
  return (
    <div className='footer-chat'>
      <div className='footer-chat-item'>
        <RiAccountCircleLine onClick={handleOnClickLogout} />
        <p>Account</p>
      </div>
      <div className='footer-chat-item active'>
        <SiRocketdotchat />
        <p>Chats</p>
      </div>
      <div className='footer-chat-item'>
        <RiSettings4Line />
        <p>Settings</p>
      </div>
    </div>
  );
};

export default React.memo(ChatListFooter);
