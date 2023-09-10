import React from 'react';
import './Message.scss';
import { useSelector } from 'react-redux';
import { selectAuthData } from '../../../store/slices/auth.slice';
import moment from 'moment/moment';
const Message = ({ message }) => {
  const user = useSelector(selectAuthData);

  const self = message.sender_id === user._id;
  return (
    <div className='message-container'>
      <div className={`message-wrapper ${self ? 'self' : 'non-self'}`}>
        <div className='message'>
          <p>{message.text}</p>
          <span>{moment(message.created_at).calendar()}</span>
        </div>
      </div>
    </div>
  );
};

export default Message;
