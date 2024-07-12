import React from 'react';
import { render } from '@testing-library/react';
import Chat from './Chat';

describe('Chat', () => {
  it('renders without crashing', () => {
    render(<Chat />);
  });
});
