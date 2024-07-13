import React, { useEffect, useState } from 'react';
import { Typewriter } from 'react-simple-typewriter';
import styles from './Message.module.scss';
import { useChat } from '../Chat/ChatContext';
import chatbotAvatar from '../../assets/logo-qlik.svg';

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

  useEffect(() => {
    if (isTyping) {
      const timer = setTimeout(() => {
        setDone(true);
        setIsTyping(false);
      }, text.length * 10);
      return () => clearTimeout(timer);
    }
  }, [isTyping, text.length]);

  return (
    <div className={`${styles.messageWrapper} ${styles[type]}`}>
      <img className={styles[type]} src={avatar} alt='Avatar' />
      <div
        className={`${styles.message} ${done ? styles.done : ''} ${
          styles[type]
        }`}
      >
        <p>
          {isTyping ? (
            <Typewriter
              words={[text]}
              loop={1}
              cursor
              cursorStyle='|'
              typeSpeed={5}
              deleteSpeed={0}
              delaySpeed={0}
              onLoopDone={() => setDone(true)}
            />
          ) : (
            text
          )}
        </p>
        <span className={styles.timeStamp}>{time}</span>
      </div>
    </div>
  );
};

export default Message;
