import React from 'react';
import './ChatBox.scss';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurentChat } from '../../../store/slices/chat.slice';
import { getChatMessages } from '../../../store/services/message.service';
import MessagesBox from './messages-box/MessagesBox';
const ChatBox = () => {
  const dispatch = useDispatch();

  const current_chat = useSelector(selectCurentChat);

  React.useEffect(() => {
    if (current_chat) dispatch(getChatMessages(current_chat.id));
  }, [current_chat]);

  return (
    <div
      className={`chat-box-container ${current_chat ? 'chat-is-selected' : ''}`}
    >
      {!current_chat ? (
        <div className='selection-message'>
          <h1>Select a chat to start messaging...</h1>
        </div>
      ) : (
        <MessagesBox />
      )}
      
    </div>
  );
};

export default ChatBox;
