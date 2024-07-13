import React, { useEffect, useRef, useState } from 'react';
import styles from './Message.module.scss';
import { useChat } from '../Chat/ChatContext';
import chatbotAvatar from '../../assets/react.svg';

type MessageProps = {
  id: string;
  text: string;
  type: 'sent' | 'received';
  time: string;
};

const Message: React.FC<MessageProps> = ({ id, text, type, time }) => {
  const { user, messages } = useChat();
  const avatar = type === 'sent' ? user.avatar : chatbotAvatar;
  const isLastMessage = messages[messages.length - 1]?.id === id;
  const [isTyping, setIsTyping] = useState(
    isLastMessage && type === 'received'
  );
  const [done, setDone] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (isTyping) {
      const timer = setTimeout(() => {
        setDone(true);
        setIsTyping(false);
      }, 1000); // duration of the typing animation

      return () => clearTimeout(timer);
    }
  }, [isTyping]);

  useEffect(() => {
    if (done && textRef.current) {
      textRef.current.classList.add('done');
    }
  }, [done]);

  return (
    <div className={`${styles.messageWrapper} ${styles[type]}`}>
      <img className={styles[type]} src={avatar} alt='Avatar' />
      <div
        className={`${styles.message} ${isTyping ? styles.typing : ''} ${
          done ? styles.done : ''
        } ${styles[type]}`}
      >
        <p ref={textRef}>{text}</p>
        <span>{time}</span>
      </div>
    </div>
  );
};

export default Message;
