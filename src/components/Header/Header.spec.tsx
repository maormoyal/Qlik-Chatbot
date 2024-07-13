import { render } from '@testing-library/react';
import Header from './Header';
import { ChatProvider } from '../Chat/ChatContext';

describe('Header', () => {
  it('renders without crashing', () => {
    render(
      <ChatProvider>
        <Header />
      </ChatProvider>
    );
  });
});
