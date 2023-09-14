import React from 'react';
import './ChatItem.scss';
import { useDispatch } from 'react-redux';
import { chatActions } from '../../../store/slices/chat.slice';
const GlobalChatItem = ({ item, setSearchLine }) => {
  const dispatch = useDispatch();
  const handleOnClickItem = async()=>{
    setSearchLine('');
    dispatch(chatActions.setChosenChatForCreate(item));
  }
  return (
    <div className='chat-item-container' onClick={handleOnClickItem}>
      <div className='chat-item-user-info'>
        <div className='image'>{item?.name[0]}</div>
        <div className='chat-item-text-wrapper'>
          <p>{item?.name}</p>
          <p className='grey-text'>{item?.email}</p>
        </div>
      </div>
    </div>
  );
};

export default GlobalChatItem;
