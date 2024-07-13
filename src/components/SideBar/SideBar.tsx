import React, { useState, useEffect, useRef } from 'react';
import styles from './SideBar.module.scss';
import { useChatContext } from '../Chat/ChatContext';

const SideBar: React.FC = () => {
  const { messages, resendMessage, deleteMessage, isTypingReceivedMessage } =
    useChatContext();
  const latestMessages = messages.slice().reverse();

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleDropdownToggle = (id: string) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setOpenDropdown(null);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.sideBar}>
      <ul>
        {latestMessages.map((msg) => {
          if (msg.type === 'sent') {
            return (
              <li key={msg.id}>
                <p>{msg.text}</p>
                <span>{msg.time}</span>
                <div className={styles.actions}>
                  <span
                    className={styles.dropdownToggle}
                    onClick={() => handleDropdownToggle(msg.id)}
                  >
                    ...
                  </span>
                  {openDropdown === msg.id && (
                    <div className={styles.dropdownMenu} ref={dropdownRef}>
                      <button
                        className={styles.resend}
                        disabled={isTypingReceivedMessage}
                        onClick={() => {
                          resendMessage(msg.id);
                          setOpenDropdown(null);
                        }}
                      >
                        Resend
                      </button>
                      <button
                        className={styles.delete}
                        disabled={isTypingReceivedMessage}
                        onClick={() => {
                          deleteMessage(msg.id);
                          setOpenDropdown(null);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </li>
            );
          }
          return null;
        })}
      </ul>
    </div>
  );
};

export default SideBar;
