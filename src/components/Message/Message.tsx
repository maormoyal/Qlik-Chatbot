import React from 'react';
import styles from './Message.module.scss';
import { useChat } from '../Chat/ChatContext';

import chatbotAvatar from '../../assets/react.svg';

type MessageProps = {
  text: string;
  type: 'sent' | 'received';
  time: string;
};

const Message: React.FC<MessageProps> = ({ text, type, time }) => {
  const { user } = useChat();
  const avatar = type === 'sent' ? user.avatar : chatbotAvatar;

  return (
    <div className={`${styles.messageWrapper} ${styles[type]}`}>
      <img className={styles[type]} src={avatar} alt='Avatar' />
      <div className={`${styles.message} ${styles[type]}`}>
        <p>{text}</p>
        <span>{time}</span>
      </div>
    </div>
  );
};

export default Message;
