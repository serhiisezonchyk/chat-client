import React from 'react';
import { FiMoreHorizontal, FiArrowLeft } from 'react-icons/fi';
import './ChatBoxHeader.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  chatActions,
  selectCurentChat,
} from '../../../store/slices/chat.slice';
const ChatBoxHeader = () => {
  const dispatch = useDispatch();
  const current_chat = useSelector(selectCurentChat);
  const user = current_chat.members[0].user;

  const handleBackOnClick = async () => {
    dispatch(chatActions.clearChosenChat());
  };
  return (
    <div className='chat-box-header'>
      <div
        className='chat-box-header-item back-button'
        onClick={handleBackOnClick}
      >
        <FiArrowLeft />
      </div>
      <div className='chat-box-header-item'>
        <div className='image'>{user?.name[0]}</div>
        <div className='chat-box-text-wrapper'>
          <p>{user?.name}</p>
          <span>waiting for network...</span>
        </div>
      </div>
      <div className='chat-box-header-item'>
        <FiMoreHorizontal />
      </div>
    </div>
  );
};

export default ChatBoxHeader;
