import React from 'react';
import './ChatItem.scss';
import { useFetchRecipient } from '../../../hooks/useFetchRecipient';
import { useDispatch } from 'react-redux';
import { chatActions } from '../../../store/slices/chat.slice';

const ChatItem = ({ item, search_line }) => {
  const dispatch = useDispatch();
  const recipientUser = item.members[0].user;

  const doesStringContainSearchLine = (str) => {
    return str.toLowerCase().includes(search_line.toLowerCase());
  };

  const containsSearchLine =
    recipientUser &&
    (doesStringContainSearchLine(recipientUser.name) ||
      doesStringContainSearchLine(recipientUser.login) ||
      doesStringContainSearchLine(recipientUser.email));

  const handleOnChatClick = async () => {
    dispatch(chatActions.setChosenChat(item));
  };
  if (containsSearchLine)
    return (
      <div className='chat-item-container' onClick={handleOnChatClick}>
        <div className='chat-item-user-info'>
          <div className='image'>
            {recipientUser?.name[0]}
            <span></span>
          </div>
          <div className='chat-item-text-wrapper'>
            <p>{recipientUser?.name}</p>
            <p className='grey-text'>
              TextText kwjrioqwj jr qwrioqw jqwrj q pqr wfgwefgw wqer qert 2r
            </p>
          </div>
        </div>

        <div className='chat-item-date-info'>
          <p className='grey-text'>06/09/2023</p>
          <span>2</span>
        </div>
      </div>
    );
};

export default ChatItem;
