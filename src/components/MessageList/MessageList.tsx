import React from 'react';
import Message from '../Message/Message';
import styles from './MessageList.module.scss';
import { useChat } from '../Chat/ChatContext';

const MessageList: React.FC = () => {
  const { messages } = useChat();

  return (
    <div className={styles.messageList}>
      {messages.map((message) => (
        <Message key={message.id} {...message} />
      ))}
    </div>
  );
};

export default MessageList;
