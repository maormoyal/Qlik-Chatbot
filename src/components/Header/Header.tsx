import React from 'react';
import styles from './Header.module.scss';
import qlikLogo from '../../assets/logo-qlik.svg';
import { useChatContext } from '../Chat/ChatContext';
import clsx from 'clsx';

const Header: React.FC = () => {
  const { user, theme } = useChatContext();

  const headerClasses = clsx(
    styles.header,
    theme === 'dark' && styles.darkTheme
  );

  return (
    <div className={headerClasses}>
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
