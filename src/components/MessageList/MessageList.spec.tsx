import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import MessageList from './MessageList';
import { ChatProvider } from '../Chat/ChatContext';

jest.mock('react-scroll-to-bottom', () => {
  return ({ children }: { children: React.ReactNode }) => (
    <div className='scrollToBottom'>{children}</div>
  );
});

describe('MessageList', () => {
  it('renders without crashing', () => {
    render(
      <ChatProvider>
        <MessageList />
      </ChatProvider>
    );
  });

  it('should call ScrollToBottom', () => {
    const { container } = render(
      <ChatProvider>
        <MessageList />
      </ChatProvider>
    );

    expect(container.querySelector('.scrollToBottom')).toBeInTheDocument();
  });
});
