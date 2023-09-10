import React from 'react';
import './ChatBox.scss';
import ChatBoxHeader from '../chat-box-header/ChatBoxHeader';
import ChatBoxFooter from '../chat-box-footer/ChatBoxFooter';
import ChatItem from '../chat-item/ChatItem';
import Message from '../message/Message';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurentChat } from '../../../store/slices/chat.slice';
import { getChatMessages } from '../../../store/services/message.service';
import {
  selectIsMessagesLoading,
  selectMessageData,
} from '../../../store/slices/message.slice';
const ChatBox = () => {
  const dispatch = useDispatch(); 

  const current_chat = useSelector(selectCurentChat);
  const isLoading = useSelector(selectIsMessagesLoading);
  const messages = useSelector(selectMessageData);

  const chatBoxBodyRef = React.useRef(null);

  React.useEffect(() => {
    if (current_chat) dispatch(getChatMessages(current_chat.id));
  }, [current_chat]);

  React.useEffect(() => {
    if (chatBoxBodyRef.current) {
      const lastChildElement = chatBoxBodyRef.current?.lastElementChild;
      lastChildElement?.scrollIntoView();
    }
  }, [messages]);

  return (
    <div className={`chat-box-container ${current_chat ? 'chat-is-selected' : ''}`}>
      {!current_chat ? (
        <div className='selection-message'>
          <h1>Select a chat to start messaging...</h1>
        </div>
      ) : (
        <>
          <ChatBoxHeader />
          <div>
            <div className='chat-box-body' ref={chatBoxBodyRef}>
              {isLoading ? (
                <h1>Messages are loading...</h1>
              ) : (
                messages.length !==0?
                messages?.map((message, index) => {
                  return <Message key={index} message={message} />;
                }):<h1>No messages here yet...</h1>
              )}
            </div>
            <ChatBoxFooter />
          </div>
        </>
      )}
    </div>
  );
};

export default ChatBox;
