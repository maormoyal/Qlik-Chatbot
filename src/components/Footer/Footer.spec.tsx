import { render } from '@testing-library/react';
import Footer from './Footer';
import { ChatProvider } from '../Chat/ChatContext';

describe('Footer', () => {
  it('renders without crashing', () => {
    render(
      <ChatProvider>
        <Footer />
      </ChatProvider>
    );
  });
});
