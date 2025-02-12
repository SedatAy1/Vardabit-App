import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../Header';
import '@testing-library/jest-dom';

test('calls onSearch with input value when search input changes', () => {
  const mockOnSearch = jest.fn();
  render(<Header onSearch={mockOnSearch} />);
  const input = screen.getByPlaceholderText('Search...');

  fireEvent.change(input, { target: { value: 'test query' } });
  expect(mockOnSearch).toHaveBeenCalledTimes(1);
  expect(mockOnSearch).toHaveBeenCalledWith('test query');

    //boş değer
    fireEvent.change(input, { target: { value: '' } });
    expect(mockOnSearch).toHaveBeenCalledTimes(2); // Toplamda 2 kez çağrılmalı
    expect(mockOnSearch).toHaveBeenCalledWith('');
});

 test('renders the logo correctly', () => {
    const mockOnSearch = jest.fn();
    render(<Header onSearch={mockOnSearch} />);
    expect(screen.getByText('Vardabit')).toBeInTheDocument();
  });