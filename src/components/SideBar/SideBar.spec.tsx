import React from 'react';
import { render } from '@testing-library/react';
import SideBar from './SideBar';

describe('SideBar', () => {
  it('renders without crashing', () => {
    render(<SideBar />);
  });
});
