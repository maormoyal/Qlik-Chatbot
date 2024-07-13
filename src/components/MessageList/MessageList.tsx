import React from 'react';
import Message from '../Message/Message';
import styles from './MessageList.module.scss';
import { useChat } from '../Chat/ChatContext';
import ScrollToBottom from 'react-scroll-to-bottom';

const MessageList: React.FC = () => {
  const { messages } = useChat();

  return (
    <ScrollToBottom
      className={`${styles.messageList} scrollToBottom`}
      followButtonClassName='scrollToBottom__followButton'
    >
      {messages.map((message) => (
        <Message key={message.id} {...message} />
      ))}
    </ScrollToBottom>
  );
};

export default MessageList;
