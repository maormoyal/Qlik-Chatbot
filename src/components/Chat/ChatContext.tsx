import React, { createContext, useContext, useState, ReactNode } from 'react';
import { mockMessages } from './Chat.data.spec';
import { User } from './Chat.types';
import userAvatar from '../../assets/maor-avatar.jpeg';

interface Message {
  id: string;
  text: string;
  type: 'sent' | 'received';
  time: string;
}

interface ChatContextProps {
  messages: Message[];
  addMessage: (message: Message) => void;
  user: User;
  setUser: (user: User) => void;
}

const ChatContext = createContext<ChatContextProps | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [messages, setMessages] = useState<Message[]>(
    mockMessages as Message[]
  );

  const [user, setUser] = useState<User>({
    name: 'Maor Moyal',
    avatar: userAvatar,
  });

  const addMessage = (message: Message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  return (
    <ChatContext.Provider value={{ messages, addMessage, user, setUser }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
