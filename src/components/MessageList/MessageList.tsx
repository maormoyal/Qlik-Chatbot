import React from 'react';
import Message from '../Message/Message';
import { useChatContext } from '../Chat/ChatContext';
import ScrollToBottom from 'react-scroll-to-bottom';

import styles from './MessageList.module.scss';
import clsx from 'clsx';

const MessageList: React.FC = () => {
  const { messages, theme } = useChatContext();

  const messageListClasses = clsx(
    styles.messageList,
    theme === 'dark' && styles.darkTheme,
    'scrollToBottom'
  );

  return (
    <ScrollToBottom
      className={messageListClasses}
      followButtonClassName='scrollToBottom__followButton'
    >
      {messages.map((message) => (
        <Message key={message.id} {...message} />
      ))}
    </ScrollToBottom>
  );
};

export default MessageList;
