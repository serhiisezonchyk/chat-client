import React from 'react';
import { RiAccountCircleLine, RiSettings4Line } from 'react-icons/ri';
import { SiRocketdotchat } from 'react-icons/si';
import {BiLogOut} from 'react-icons/bi';
import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs';
import './ChatListFooter.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  authActions,
  selectColorTheme,
} from '../../../store/slices/auth.slice';
import NotificationLable from './NotificationLable';
const ChatListFooter = () => {
  const dispatch = useDispatch();
  const color_theme = useSelector(selectColorTheme);
  const handleOnClickLogout = async () => {
    dispatch(authActions.logout());
  };
  const handleOnClickMode = async()=>{
    dispatch(authActions.changeColorTheme());
  };

  return (
    <div className='footer-chat'>
      <div className='footer-chat-item'>
        <BiLogOut onClick={handleOnClickLogout} />
        <p>Log out</p>
      </div>
      <div className='footer-chat-item active'>
        <SiRocketdotchat />
        <NotificationLable />
        <p>Chats</p>
      </div>
      <div className='footer-chat-item' onClick={handleOnClickMode}>
        {color_theme === 'dark' ? <BsFillMoonFill /> : <BsFillSunFill />}
        <p>Mode</p>
      </div>
    </div>
  );
};

export default React.memo(ChatListFooter);
