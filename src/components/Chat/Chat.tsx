import React, { useState } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MessageList from '../MessageList/MessageList';
import SideBar from '../SideBar/SideBar';
import styles from './Chat.module.scss';

// import { ChatProvider } from './ChatContext';

const Chat: React.FC = () => {
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    // <ChatProvider>
    <div className={styles.chatContainer}>
      <Header />
      <div className={styles.chatContent}>
        {showSidebar && <SideBar />}
        <MessageList />
      </div>
      <Footer toggleSidebar={() => setShowSidebar(!showSidebar)} />
    </div>
    // </ChatProvider>
  );
};

export default Chat;
