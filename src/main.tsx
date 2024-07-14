import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { ChatProvider } from './components/Chat/ChatContext';

import userAvatar from './assets/maor-avatar.jpeg';
import Chat from './components/Chat/Chat';

const user = {
  name: 'Maor Moyal',
  avatar: userAvatar,
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChatProvider>
      <Chat user={user} />
    </ChatProvider>
  </React.StrictMode>
);
