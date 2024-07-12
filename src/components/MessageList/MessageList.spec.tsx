import React from 'react';
import { render } from '@testing-library/react';
import MessageList from './MessageList';

describe('MessageList', () => {
  it('renders without crashing', () => {
    render(<MessageList />);
  });
});
