import React from 'react';
import styles from './SideBar.module.scss';
import { useChat } from '../Chat/ChatContext';

const SideBar: React.FC = () => {
  const { messages } = useChat();
  const latestMessages = messages.slice().reverse();

  return (
    <div className={styles.sideBar}>
      <ul>
        {latestMessages.map((msg) => {
          if (msg.type === 'sent') {
            return (
              <li key={msg.id}>
                <img src='' alt='' />
                <p>{msg.text}</p>
                <span>{msg.time}</span>
                <div className={styles.actions}>
                  <span>Resend</span>
                  <span>Delete</span>
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
