import { render } from '@testing-library/react';
import Chat from './Chat';
import { ChatProvider } from './ChatContext';
import userAvatar from '../../assets/maor-avatar.jpeg'; // Assuming the avatar path is correct

describe('Chat', () => {
  it('renders without crashing', () => {
    const user = {
      name: 'Maor Moyal',
      avatar: userAvatar,
    };

    render(
      <ChatProvider>
        <Chat user={user} />
      </ChatProvider>
    );
  });
});
