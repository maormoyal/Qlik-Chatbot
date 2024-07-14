import React, { createContext, useContext, useState, ReactNode } from 'react';
import { mockMessages } from './Chat.data.spec';
import { User } from './Chat.types';
import userAvatar from '../../assets/maor-avatar.jpeg';
import { v4 as uuidv4 } from 'uuid';
import { reformatDate } from '../../utils/reformatDate';

interface Message {
  id: string;
  text: string;
  type: 'sent' | 'received';
  time: string;
}

type Theme = 'light' | 'dark';

interface ChatContextProps {
  user: User;
  setUser: (user: User) => void;
  messages: Message[];
  addMessage: (message: Message) => void;
  sendMessage: (text: string) => void;
  resendMessage: (id: string) => void;
  deleteMessage: (id: string) => void;
  showSidebar: boolean;
  setShowSidebar: (showSidebar: boolean) => void;
  isTypingReceivedMessage: boolean;
  setIsTypingReceivedMessage: (isTyping: boolean) => void;
  theme: Theme;
  toggleTheme: () => void;
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

  const [isTypingReceivedMessage, setIsTypingReceivedMessage] =
    useState<boolean>(false);

  const [showSidebar, setShowSidebar] = useState<boolean>(true);

  const [theme, setTheme] = useState<Theme>('light');
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const addMessage = (message: Message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const sendMessage = (text: string) => {
    const now = reformatDate(new Date());
    const newId = uuidv4();

    addMessage({
      id: `${newId}-sent`,
      time: now,
      text,
      type: 'sent',
    });

    setIsTypingReceivedMessage(true);
    setTimeout(() => {
      addMessage({
        id: `${newId}-received`,
        time: now,
        text: `The chatbot answer is ${text}`,
        type: 'received',
      });
      setIsTypingReceivedMessage(false);
    }, 1000);
  };

  const resendMessage = (id: string) => {
    const messageToResend = messages.find((msg) => msg.id === id);
    if (messageToResend) {
      sendMessage(messageToResend.text);
    }
  };

  const deleteMessage = (id: string) => {
    const messageToDelete = messages.find((msg) => msg.id === id);
    if (messageToDelete) {
      const relatedMessageId =
        messageToDelete.type === 'sent'
          ? id.replace('sent', 'received')
          : id.replace('received', 'sent');
      setMessages(
        messages.filter((msg) => msg.id !== id && msg.id !== relatedMessageId)
      );
    }
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        addMessage,
        user,
        setUser,
        isTypingReceivedMessage,
        setIsTypingReceivedMessage,
        sendMessage,
        resendMessage,
        deleteMessage,
        showSidebar,
        setShowSidebar,
        theme,
        toggleTheme,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
};
