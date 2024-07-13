import React from 'react';
import styles from './SideBar.module.scss';
import { useChatContext } from '../Chat/ChatContext';

const SideBar: React.FC = () => {
  const { messages, resendMessage, deleteMessage } = useChatContext();
  const latestMessages = messages.slice().reverse();

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
                    className={styles.resend}
                    onClick={() => resendMessage(msg.id)}
                  >
                    Resend
                  </span>
                  <span
                    className={styles.delete}
                    onClick={() => deleteMessage(msg.id)}
                  >
                    Delete
                  </span>
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
