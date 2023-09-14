import React from 'react';
import './ChatListFooter.scss';
import { useSelector } from 'react-redux';
import { selectNotifications } from '../../../store/slices/chat.slice';
import { getAllUnreadNotifications } from '../../../utils/notifications';

const NotificationLable = () => {
  const notification = useSelector(selectNotifications);

  const unreadNotifications = getAllUnreadNotifications(notification);

  if (unreadNotifications.length > 0)
    return (
      <span className='notification-lable'>{unreadNotifications.length}</span>
    );
};

export default React.memo(NotificationLable);
