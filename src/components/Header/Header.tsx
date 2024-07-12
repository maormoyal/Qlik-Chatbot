import React from 'react';
import styles from './Header.module.scss';
import qlikLogo from '../../assets/logo-qlik.svg';
import { useChat } from '../Chat/ChatContext';

const Header: React.FC = () => {
  const { user } = useChat();
  return (
    <div className={styles.header}>
      <div>
        <img src={qlikLogo} alt='Qlik Logo' width={'70px'} />
        <span>Chatbot</span>
      </div>
      <div className={styles.userWrapper}>
        <img className={styles.avatar} src={user.avatar} alt='Avatar' />
        <span>{user.name}</span>
      </div>
    </div>
  );
};

export default Header;
