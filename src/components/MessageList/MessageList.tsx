import React, { useEffect, useRef } from 'react';
import Message from '../Message/Message';
import styles from './MessageList.module.scss';
import { useChat } from '../Chat/ChatContext';

const MessageList: React.FC = () => {
  const { messages } = useChat();
  const messageListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTo({
        top: messageListRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  const scrollToBottom = () => {
    if (messageListRef.current) {
      messageListRef.current.scrollTo({
        top: messageListRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <div className={styles.messageList} ref={messageListRef}>
        {messages.map((message) => (
          <Message key={message.id} {...message} />
        ))}
      </div>
      <button className={styles.scrollButton} onClick={scrollToBottom}>
        &#10515;
      </button>
    </>
  );
};

export default MessageList;
