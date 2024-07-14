import { useEffect } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MessageList from '../MessageList/MessageList';
import SideBar from '../SideBar/SideBar';
import styles from './Chat.module.scss';
import { useChatContext } from './ChatContext';
import { User } from './Chat.types';
import clsx from 'clsx';

interface UserProps {
  user: User;
}

const Chat: React.FC<UserProps> = ({ user }) => {
  const { showSidebar, setUser, theme } = useChatContext();

  useEffect(() => {
    setUser({
      name: user.name,
      avatar: user.avatar,
    });
  }, [setUser, user.avatar, user.name]);

  const chatContainerClasses = clsx(
    styles.chatContainer,
    theme === 'dark' && styles.darkTheme
  );

  return (
    <div className={chatContainerClasses}>
      <Header />
      <div className={styles.chatContent}>
        {showSidebar && <SideBar />}
        <MessageList />
      </div>
      <Footer />
    </div>
  );
};

export default Chat;
