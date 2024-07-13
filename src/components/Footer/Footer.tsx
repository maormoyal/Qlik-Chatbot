import React, { useState, useRef } from 'react';
import { useChat } from '../Chat/ChatContext';
import styles from './Footer.module.scss';
import { v4 as uuidv4 } from 'uuid';

type FooterProps = {
  toggleSidebar: () => void;
};

const Footer: React.FC<FooterProps> = ({ toggleSidebar }) => {
  const [message, setMessage] = useState('');
  const { addMessage, isTypingReceivedMessage, setIsTypingReceivedMessage } =
    useChat();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const sendMessage = () => {
    if (!message.trim()) return;
    setIsTypingReceivedMessage(true);
    const now = new Date().toLocaleString();
    const newId = uuidv4();

    addMessage({
      id: `${newId}-sent`,
      time: now,
      text: message,
      type: 'sent',
    });

    setMessage('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    setTimeout(() => {
      addMessage({
        id: `${newId}-received`,
        time: now,
        text: `The chatbot answer is ${message}`,
        type: 'received',
      });
      setIsTypingReceivedMessage(false);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && e.shiftKey) {
      e.preventDefault();
      const { selectionStart, selectionEnd, value } = textareaRef.current!;
      const newValue =
        value.slice(0, selectionStart) + '\n' + value.slice(selectionEnd);

      setMessage(newValue);
      setTimeout(() => {
        textareaRef.current!.selectionStart =
          textareaRef.current!.selectionEnd = selectionStart + 1;
        handleInput();
      }, 0);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleInput = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  return (
    <div className={styles.footer}>
      <button className={styles.switchBtn} onClick={toggleSidebar}>
        Show/Hide Sidebar
      </button>
      <div className={styles.promptWrapper}>
        <textarea
          className={styles.textarea}
          placeholder='Type your message...'
          value={message}
          ref={textareaRef}
          onChange={(e) => setMessage(e.target.value)}
          onInput={handleInput}
          onKeyDown={handleKeyDown}
          disabled={isTypingReceivedMessage}
        />
        <button
          className={styles.sendBtn}
          onClick={sendMessage}
          disabled={isTypingReceivedMessage}
        >
          {isTypingReceivedMessage ? (
            <span className={styles.loadingSpinner}></span>
          ) : (
            'Send'
          )}
        </button>
      </div>
    </div>
  );
};

export default Footer;
