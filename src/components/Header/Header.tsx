import React, { useState } from 'react';
import styles from './Header.module.scss';
import qlikLogo from '../../assets/logo-qlik.svg';
import { useChatContext } from '../Chat/ChatContext';
import clsx from 'clsx';
import Modal from '../Modal/Modal';

const Header: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const { user, theme } = useChatContext();

  const headerClasses = clsx(
    styles.header,
    theme === 'dark' && styles.darkTheme
  );

  return (
    <>
      <div className={headerClasses}>
        <div>
          <img src={qlikLogo} alt='Qlik Logo' width={'70px'} />
          <span>Chatbot</span>
        </div>
        <div className={styles.userWrapper}>
          <img
            className={styles.avatar}
            src={user.avatar}
            alt='Avatar'
            onClick={() => setShowModal(true)}
          />
          <span>{user.name}</span>
        </div>
      </div>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <img src={user.avatar} alt='user avatar' style={{ width: '300px' }} />
      </Modal>
    </>
  );
};

export default Header;
