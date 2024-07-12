import React from 'react';
import { render } from '@testing-library/react';
import Message from './Message';

describe('Message', () => {
  it('renders without crashing', () => {
    render(<Message />);
  });
});
