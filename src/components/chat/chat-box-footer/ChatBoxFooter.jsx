import React from 'react';
import './ChatBoxFooter.scss';
import { MdOutlineEmojiEmotions, MdSend } from 'react-icons/md';
import InputEmoji from 'react-input-emoji';
import { useDispatch, useSelector } from 'react-redux';
import { createMessage } from '../../../store/services/message.service';
import { selectAuthData } from '../../../store/slices/auth.slice';
import { selectCurentChat } from '../../../store/slices/chat.slice';
const ChatBoxFooter = () => {
  const dispatch = useDispatch();

  const user = useSelector(selectAuthData);
  const current_chat = useSelector(selectCurentChat);

  const [text, setText] = React.useState('');
  const handleSend = async () => {
    const values = {
      chat_id: current_chat.id,
      sender_id: user._id,
      text: text,
    };
    dispatch(createMessage(values));
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
