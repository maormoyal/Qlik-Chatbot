import React, { useState } from 'react';
import { useChat } from '../Chat/ChatContext';
import styles from './Footer.module.scss';

import { v4 as uuidv4 } from 'uuid';

type FooterProps = {
  toggleSidebar: () => void;
};

const Footer: React.FC<FooterProps> = ({ toggleSidebar }) => {
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const { addMessage } = useChat();

  const sendMessage = () => {
    if (!message.trim()) return;
    setIsSending(true);
    const now = new Date().toLocaleString();
    setTimeout(() => {
      const newId = uuidv4();
      addMessage({
        id: `${newId}-sent`,
        time: now,
        text: message,
        type: 'sent',
      });
      addMessage({
        id: `${newId}-received`,
        time: now,
        text: `The chatbot answer is ${message}`,
        type: 'received',
      });
      setIsSending(false);
      setMessage('');
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className={styles.footer}>
      <button onClick={toggleSidebar}>Show/Hide Sidebar</button>
      <input
        placeholder='Type your message...'
        type='text'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <button
        className={styles.sendBtn}
        onClick={sendMessage}
        disabled={isSending}
      >
        {isSending ? 'Sending...' : 'Send'}
      </button>
    </div>
  );
};

export default Footer;
