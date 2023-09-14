import React from 'react';
import './ChatItem.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  chatActions,
  selectNotifications,
  selectOnlineUsers,
} from '../../../store/slices/chat.slice';
import {
  getUserUnreadNotifications,
  readUserNotifications,
} from '../../../utils/notifications';
import moment from 'moment';

const ChatItem = ({ item,setSearchLine}) => {
  const dispatch = useDispatch();
  const online_users = useSelector(selectOnlineUsers);
  const notification = useSelector(selectNotifications);

  const recipientUser = item.members[0].user;
  const thisUserNotification = getUserUnreadNotifications(
    notification,
    recipientUser
  );
  const handleOnChatClick = async () => {
    setSearchLine('')
    if (thisUserNotification?.length !== 0) {
      const newNotifications = await readUserNotifications(
        notification,
        recipientUser
      );
      dispatch(chatActions.updateNotifications(newNotifications));
    }
    dispatch(chatActions.setChosenChat(item));
  };
  return (
    <div className='chat-item-container' onClick={handleOnChatClick}>
      <div className='chat-item-user-info'>
        <div className='image'>
          {recipientUser?.name[0]}
          {online_users?.some((user) => user?.userId === recipientUser?.id) && (
            <span></span>
          )}
        </div>
        <div className='chat-item-text-wrapper'>
          <p>{recipientUser?.name}</p>
          <p className='grey-text'>
            {item?.messages[0]?.sender_id !== recipientUser?.id && 'me: '}
            {item?.messages[0]?.text || 'Start chatting...'}{' '}
          </p>
        </div>
      </div>

      <div className='chat-item-date-info'>
        <p className='grey-text'>
          {item?.messages[0]?.created_at &&
            moment(item?.messages[0]?.created_at).calendar()}
        </p>
        {thisUserNotification.length > 0 && (
          <span>{thisUserNotification.length}</span>
        )}
      </div>
    </div>
  );
};

export default ChatItem;
