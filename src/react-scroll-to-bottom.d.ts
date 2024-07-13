// src/react-scroll-to-bottom.d.ts
declare module 'react-scroll-to-bottom' {
  import * as React from 'react';

  interface ScrollToBottomProps {
    className?: string;
    followButtonClassName?: string;
    initialScrollBehavior?: 'auto' | 'smooth';
    children?: React.ReactNode; // Add children here
  }

  const ScrollToBottom: React.FC<ScrollToBottomProps>;
  export default ScrollToBottom;
}
