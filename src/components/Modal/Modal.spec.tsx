import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Modal from './Modal';

describe('Modal Component', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  test('renders the modal when show is true', () => {
    render(
      <Modal show={true} onClose={mockOnClose}>
        <p>Modal Content</p>
      </Modal>
    );

    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });

  test('does not render the modal when show is false', () => {
    render(
      <Modal show={false} onClose={mockOnClose}>
        <p>Modal Content</p>
      </Modal>
    );

    expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();
  });

  test('calls onClose when the close button is clicked', () => {
    render(
      <Modal show={true} onClose={mockOnClose}>
        <p>Modal Content</p>
      </Modal>
    );

    fireEvent.click(screen.getByText('×'));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('calls onClose when clicking on the overlay', () => {
    render(
      <Modal show={true} onClose={mockOnClose}>
        <p>Modal Content</p>
      </Modal>
    );

    fireEvent.click(screen.getByTestId('modal-overlay'));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('does not call onClose when clicking inside the modal content', () => {
    render(
      <Modal show={true} onClose={mockOnClose}>
        <p>Modal Content</p>
      </Modal>
    );

    fireEvent.click(screen.getByText('Modal Content'));
    expect(mockOnClose).not.toHaveBeenCalled();
  });
});
