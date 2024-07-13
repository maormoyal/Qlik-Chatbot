import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MessageList from '../MessageList/MessageList';
import SideBar from '../SideBar/SideBar';
import styles from './Chat.module.scss';
import { useChatContext } from './ChatContext';

const Chat: React.FC = () => {
  const { showSidebar } = useChatContext();

  return (
    <div className={styles.chatContainer}>
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
