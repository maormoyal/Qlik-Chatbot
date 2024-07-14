import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SideBar from './SideBar';
import { ChatProvider } from '../Chat/ChatContext';
import { mockMessages } from '../Chat/Chat.data.spec';

describe('SideBar', () => {
  it('renders without crashing', () => {
    render(
      <ChatProvider>
        <SideBar />
      </ChatProvider>
    );
  });

  it('renders messages correctly', () => {
    render(
      <ChatProvider>
        <SideBar />
      </ChatProvider>
    );

    mockMessages
      .filter((msg) => msg.type === 'sent')
      .forEach((msg) => {
        expect(screen.getByText(msg.text)).toBeInTheDocument();
        expect(screen.getByText(msg.time)).toBeInTheDocument();
      });
  });

  it('toggles dropdown menu when clicking the ellipsis button', () => {
    render(
      <ChatProvider>
        <SideBar />
      </ChatProvider>
    );

    const toggleButton = screen.getAllByText('...')[0];

    fireEvent.click(toggleButton);
    expect(screen.getByText('Resend')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();

    fireEvent.click(toggleButton);
    expect(screen.queryByText('Resend')).not.toBeInTheDocument();
    expect(screen.queryByText('Delete')).not.toBeInTheDocument();
  });

  it('closes the dropdown menu when clicking outside', () => {
    render(
      <ChatProvider>
        <SideBar />
      </ChatProvider>
    );

    const toggleButton = screen.getAllByText('...')[0];

    fireEvent.click(toggleButton);
    expect(screen.getByText('Resend')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();

    fireEvent.mouseDown(document);
    expect(screen.queryByText('Resend')).not.toBeInTheDocument();
    expect(screen.queryByText('Delete')).not.toBeInTheDocument();
  });
});
