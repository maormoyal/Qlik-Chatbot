import { render } from '@testing-library/react';
import Chat from './Chat';
import { ChatProvider } from './ChatContext';

describe('Chat', () => {
  it('renders without crashing', () => {
    render(
      <ChatProvider>
        <Chat />
      </ChatProvider>
    );
  });
});
