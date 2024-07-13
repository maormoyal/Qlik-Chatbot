import React, { useEffect } from 'react';
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
  const {
    user,
    messages,
    isTypingReceivedMessage,
    setIsTypingReceivedMessage,
  } = useChat();

  const avatar = type === 'sent' ? user.avatar : chatbotAvatar;
  const isLastMessage = messages[messages.length - 1]?.id === id;

  useEffect(() => {
    if (isLastMessage && type === 'received') {
      setIsTypingReceivedMessage(true);
      const timer = setTimeout(() => {
        setIsTypingReceivedMessage(false);
      }, text.length * 10);
      return () => clearTimeout(timer);
    }
  }, [isLastMessage, type, text.length, setIsTypingReceivedMessage]);

  return (
    <div className={`${styles.messageWrapper} ${styles[type]}`}>
      <img className={styles[type]} src={avatar} alt='Avatar' />
      <div
        className={`${styles.message} ${
          isTypingReceivedMessage ? '' : styles.done
        } ${styles[type]}`}
      >
        <p>
          {isTypingReceivedMessage && isLastMessage && type === 'received' ? (
            <Typewriter
              words={[text]}
              loop={1}
              cursor
              cursorStyle='|'
              typeSpeed={10}
              deleteSpeed={0}
              delaySpeed={50}
              onLoopDone={() => setIsTypingReceivedMessage(false)}
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
