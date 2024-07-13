import { render } from '@testing-library/react';
import Message from './Message';
import { ChatProvider } from '../Chat/ChatContext';

const mockMessage = {
  id: '1',
  text: 'Hello, this is a test message',
  type: 'received' as 'received' | 'sent',
  time: '12:00 PM',
};

describe('Message', () => {
  it('renders without crashing', () => {
    render(
      <ChatProvider>
        <Message {...mockMessage} />
      </ChatProvider>
    );
  });
});
