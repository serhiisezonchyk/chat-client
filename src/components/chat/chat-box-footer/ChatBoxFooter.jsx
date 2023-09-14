import React from 'react';
import './ChatBoxFooter.scss';
import { MdSend } from 'react-icons/md';
import InputEmoji from 'react-input-emoji';
import { useDispatch, useSelector } from 'react-redux';
import { createMessage } from '../../../store/services/message.service';
import { selectAuthData } from '../../../store/slices/auth.slice';
import { chatActions, selectCurentChat } from '../../../store/slices/chat.slice';
import { createChat } from '../../../store/services/chat.service';
const ChatBoxFooter = () => {
  const dispatch = useDispatch();

  const user = useSelector(selectAuthData);
  const current_chat = useSelector(selectCurentChat);

  const [text, setText] = React.useState('');
  const handleSend = async () => {
    let newChat;
    if (!current_chat?.id) {
      const values = {
        sender_id: user?._id,
        recipient_id: current_chat?.members[0]?.user.id,
      };
      newChat = await dispatch(createChat(values));
    }
    if (text.trim() !== '') {
      const values = {
        chat_id: !newChat ? current_chat.id : newChat.payload.id,
        sender_id: user._id,
        text: text,
      };
      const message =  await dispatch(createMessage(values));
      dispatch(chatActions.updateUserLastMessage(message.payload))
    }
  };
  React.useEffect(() => {
    setText('');
  }, [current_chat]);

  return (
    <div className='chat-box-footer'>
      <div className='chat-box-footer-item'>
        <InputEmoji
          value={text}
          onChange={setText}
          cleanOnEnter
          onEnter={handleSend}
        />
        <MdSend className='send-button' onClick={handleSend} />
      </div>
    </div>
  );
};

export default ChatBoxFooter;
