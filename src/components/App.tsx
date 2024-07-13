import React, { useEffect } from 'react';
import Chat from './Chat/Chat';
import { useChatContext } from './Chat/ChatContext';
import userAvatar from '../assets/maor-avatar.jpeg';

const App: React.FC = () => {
  const { setUser } = useChatContext();

  useEffect(() => {
    setUser({
      name: 'Maor Moyal',
      avatar: userAvatar,
    });
  }, [setUser]);

  return <Chat />;
};

export default App;
