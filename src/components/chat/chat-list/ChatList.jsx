import React from 'react';
import './ChatList.scss';
import ChatItem from '../chat-item/ChatItem';
import ChatListFooter from '../chat-list-footer/ChatListFooter';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthData } from '../../../store/slices/auth.slice';
import { getUsersChats } from '../../../store/services/chat.service';
import {
  selectChatData,
  selectCurentChat,
  selectIsChatLoading,
} from '../../../store/slices/chat.slice';
import { fetchUsers } from '../../../store/services/user.service';
import GlobalChatItem from '../chat-item/GlobalChatItem';

const ChatList = () => {
  const dispatch = useDispatch();

  const [minWidth, maxWidth, defaultWidth] = [300, 600, 350];

  const [width, setWidth] = React.useState(defaultWidth);
  const [search_line, setSearchLine] = React.useState('');

  const [isGlobalSearchResultsLoading, setIsGlobalSearchResultsLoading] =
    React.useState(true);
  const [globalSearchResults, setGlobalSearchResults] = React.useState([]);
  const isResized = React.useRef(false);

  const user = useSelector(selectAuthData);
  const isChatLoading = useSelector(selectIsChatLoading);
  const chats = useSelector(selectChatData);
  const current_chat = useSelector(selectCurentChat);

  React.useEffect(() => {
    dispatch(getUsersChats(user._id));
    window.addEventListener('mousemove', (e) => {
      if (!isResized.current) {
        return;
      }
      setWidth((previousWidth) => {
        const newWidth = previousWidth + e.movementX / 2;
        const isWidthInRange = newWidth >= minWidth && newWidth <= maxWidth;
        return isWidthInRange ? newWidth : previousWidth;
      });
    });
    window.addEventListener('mouseup', () => {
      isResized.current = false;
    });
  }, []);

  React.useEffect(() => {
    if (search_line.length >= 3) {
      setIsGlobalSearchResultsLoading(true);
      fetchUsers({ search_line }).then((data) => {
        setIsGlobalSearchResultsLoading(false);
        setGlobalSearchResults(data);
      });
    } else {
      setGlobalSearchResults([]);
    }
  }, [search_line]);

  const filteredChats = React.useMemo(() => {
    if (!chats) return [];
    return chats.filter((chat) => {
      const member = chat.members[0].user;
      return (
        member.name.toLowerCase().includes(search_line.toLowerCase()) ||
        member.login.toLowerCase().includes(search_line.toLowerCase()) ||
        member.email.toLowerCase().includes(search_line.toLowerCase())
      );
    });
  }, [chats, search_line]);

  const filteredGlobalSearchResult = React.useMemo(() => {
    if (!globalSearchResults) return [];
    return globalSearchResults.filter((chat) => chat.id !== user._id);
  }, [globalSearchResults, user]);

  return (
    <div className={`chat-list-container ${current_chat?'chat-is-selected':''}`}>
      <div
        className={`chat-list-wrapper chat-list-width`}
        style={{ '--dynamic-width': `${width / 16}rem` }}
      >
        <div className='search-input'>
          <input
            placeholder='Search...'
            value={search_line}
            onChange={(e) => setSearchLine(e.target.value)}
          />
        </div>

        <div className='chat-list'>
          {isChatLoading ? (
            <h2>Loading...</h2>
          ) : (
            <div>
              {!!filteredChats.length && (
                <>
                  <h2>Chats</h2>
                  {filteredChats.map((chat, index) => (
                    <ChatItem
                      key={index}
                      item={chat}
                      search_line={search_line}
                    />
                  ))}
                </>
              )}
            </div>
          )}
          {search_line.length >= 3 && (
            <>
              {isGlobalSearchResultsLoading ? (
                <h2>Loading...</h2>
              ) : (
                !!filteredGlobalSearchResult.length && (
                  <>
                    <h2>Global search</h2>
                    {filteredGlobalSearchResult.map((item, index) => (
                      <GlobalChatItem key={index} item={item}/>
                    ))}
                  </>
                )
              )}
            </>
          )}
          {search_line.length >= 3 &&
            filteredChats.length === 0 &&
            filteredGlobalSearchResult.length === 0 && (
              <h2>
                There were no results for "{search_line}
                <br />
                Try a new search.
              </h2>
            )}
        </div>
        <ChatListFooter />
      </div>
      <div
        className='drag-line'
        onMouseDown={() => {
          isResized.current = true;
        }}
      />
    </div>
  );
};

export default ChatList;
