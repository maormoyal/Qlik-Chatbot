import React, { useEffect } from 'react';
import Chat from './Chat/Chat';
import { useChat } from './Chat/ChatContext';
import userAvatar from '../assets/maor-avatar.jpeg';

const App: React.FC = () => {
  const { setUser } = useChat();

  useEffect(() => {
    console.log('Setting user'); // Add this line
    setUser({
      name: 'John Doe',
      avatar: userAvatar,
    });
  }, [setUser]);

  return <Chat />;
};

export default App;
