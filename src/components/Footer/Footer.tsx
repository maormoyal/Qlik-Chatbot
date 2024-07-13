import React, { useState, useRef } from 'react';
import { useChatContext } from '../Chat/ChatContext';
import styles from './Footer.module.scss';

import showSidebarIcon from '../../assets/show_sideba.svg';
import hideSidebarIcon from '../../assets/hide_sidebar.svg';

const Footer: React.FC = () => {
  const [message, setMessage] = useState('');
  const { sendMessage, isTypingReceivedMessage, showSidebar, setShowSidebar } =
    useChatContext();

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const SidebarIcon = showSidebar ? hideSidebarIcon : showSidebarIcon;

  const handleSendMessage = () => {
    if (!message.trim()) return;
    sendMessage(message);
    setMessage('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
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
      handleSendMessage();
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
      <button
        className={styles.switchBtn}
        onClick={() => setShowSidebar(!showSidebar)}
      >
        <img src={SidebarIcon} alt='SideBar' />
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
          onClick={handleSendMessage}
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
