import React from 'react';
import Message from '../../message/Message';
import ChatBoxHeader from '../../chat-box-header/ChatBoxHeader';
import ChatBoxFooter from '../../chat-box-footer/ChatBoxFooter';
import { useSelector } from 'react-redux';
import { selectIsMessagesLoading, selectMessageData } from '../../../../store/slices/message.slice';

const MessagesBox = ({}) => {
  const isLoading = useSelector(selectIsMessagesLoading);
  const messages = useSelector(selectMessageData);

  const chatBoxBodyRef = React.useRef(null);
  React.useEffect(() => {
    if (chatBoxBodyRef.current) {
      const lastChildElement = chatBoxBodyRef.current?.lastElementChild;
      lastChildElement?.scrollIntoView();
    }
  }, [messages]);

  return (
    <>
      <ChatBoxHeader />
      <div>
        <div className='chat-box-body' ref={chatBoxBodyRef}>
          {isLoading ? (
            <h1>Messages are loading...</h1>
          ) : messages.length !== 0 ? (
            messages?.map((message, index) => {
              return <Message key={index} message={message} />;
            })
          ) : (
            <h1>No messages here yet...</h1>
          )}
        </div>
        <ChatBoxFooter />
      </div>
    </>
  );
};

export default MessagesBox;
