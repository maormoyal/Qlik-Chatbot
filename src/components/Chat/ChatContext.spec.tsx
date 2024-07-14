import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ChatProvider, useChatContext } from './ChatContext';
import '@testing-library/jest-dom'; // Ensure this is imported

const TestComponent = () => {
  const {
    messages,
    user,
    isTypingReceivedMessage,
    showSidebar,
    sendMessage,
    resendMessage,
    deleteMessage,
    setUser,
    setShowSidebar,
  } = useChatContext();

  return (
    <div>
      <div data-testid='user'>{user.name}</div>
      <div data-testid='sidebar'>
        {showSidebar ? 'Sidebar Visible' : 'Sidebar Hidden'}
      </div>
      <button onClick={() => sendMessage('Hello!')}>Send Message</button>
      <button onClick={() => resendMessage(messages[0]?.id)}>
        Resend First Message
      </button>
      <button onClick={() => deleteMessage(messages[0]?.id)}>
        Delete First Message
      </button>
      <button onClick={() => setUser({ name: 'John Doe', avatar: '' })}>
        Set User
      </button>
      <button onClick={() => setShowSidebar(!showSidebar)}>
        Toggle Sidebar
      </button>
      <div data-testid='messages'>
        {messages.map((msg) => (
          <div key={msg.id}>
            {msg.text} - {msg.type}
          </div>
        ))}
      </div>
      <div data-testid='typing'>
        {isTypingReceivedMessage ? 'Typing...' : 'Not Typing'}
      </div>
    </div>
  );
};

describe('ChatContext', () => {
  it('renders user and toggles sidebar', () => {
    render(
      <ChatProvider>
        <TestComponent />
      </ChatProvider>
    );

    expect(screen.getByTestId('user')).toHaveTextContent('Maor Moyal');
    expect(screen.getByTestId('sidebar')).toHaveTextContent('Sidebar Visible');

    fireEvent.click(screen.getByText('Set User'));
    expect(screen.getByTestId('user')).toHaveTextContent('John Doe');

    fireEvent.click(screen.getByText('Toggle Sidebar'));
    expect(screen.getByTestId('sidebar')).toHaveTextContent('Sidebar Hidden');
  });

  it('sends a message and handles typing state', async () => {
    render(
      <ChatProvider>
        <TestComponent />
      </ChatProvider>
    );

    fireEvent.click(screen.getByText('Send Message'));
    expect(screen.getByTestId('typing')).toHaveTextContent('Typing...');

    await waitFor(
      () =>
        expect(screen.getByTestId('typing')).toHaveTextContent('Not Typing'),
      { timeout: 5000 }
    );
    expect(screen.getByTestId('messages')).toHaveTextContent('Hello! - sent');
    expect(screen.getByTestId('messages')).toHaveTextContent(
      'The chatbot answer is Hello! - received'
    );
  });

  it('resends a message', async () => {
    render(
      <ChatProvider>
        <TestComponent />
      </ChatProvider>
    );

    fireEvent.click(screen.getByText('Send Message'));
    await waitFor(
      () =>
        expect(screen.getByTestId('typing')).toHaveTextContent('Not Typing'),
      { timeout: 5000 }
    );

    fireEvent.click(screen.getByText('Resend First Message'));
    expect(screen.getByTestId('typing')).toHaveTextContent('Typing...');

    await waitFor(
      () =>
        expect(screen.getByTestId('typing')).toHaveTextContent('Not Typing'),
      { timeout: 5000 }
    );
    expect(screen.getByTestId('messages')).toHaveTextContent('Hello! - sent');
    expect(screen.getByTestId('messages')).toHaveTextContent(
      'The chatbot answer is Hello! - received'
    );
  });

  //   it('deletes a message', async () => {
  //     render(
  //       <ChatProvider>
  //         <TestComponent />
  //       </ChatProvider>
  //     );

  //     fireEvent.click(screen.getByText('Send Message'));
  //     await waitFor(
  //       () =>
  //         expect(screen.getByTestId('typing')).toHaveTextContent('Not Typing'),
  //       { timeout: 5000 }
  //     );

  //     fireEvent.click(screen.getByText('Delete First Message'));

  //     // Increase the timeout here to give enough time for the operation to complete
  //     await waitFor(
  //       () => {
  //         expect(screen.getByTestId('messages')).not.toHaveTextContent(
  //           'Hello! - sent'
  //         );
  //         expect(screen.getByTestId('messages')).not.toHaveTextContent(
  //           'The chatbot answer is Hello! - received'
  //         );
  //       },
  //       { timeout: 10000 } // Adjust the timeout as needed
  //     );
  //   }, 10000); // Adjust the timeout as needed
});
