import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../Pagination';
import '@testing-library/jest-dom';

test('renders correct number of page buttons', () => {
  render(<Pagination currentPage={1} totalPages={5} onPageChange={jest.fn()} />);
  expect(screen.getByText('1')).toBeInTheDocument();
  expect(screen.getByText('2')).toBeInTheDocument();
  expect(screen.getByText('5')).toBeInTheDocument();
  expect(screen.queryByText('6')).toBeNull(); // 6 olmamalı
});

test('calls onPageChange with correct page number when a page button is clicked', () => {
  const mockOnPageChange = jest.fn();
  render(<Pagination currentPage={1} totalPages={5} onPageChange={mockOnPageChange} />);

  fireEvent.click(screen.getByText('3'));
  expect(mockOnPageChange).toHaveBeenCalledTimes(1);
  expect(mockOnPageChange).toHaveBeenCalledWith(3);
});

test('disables previous button on first page', () => {
  render(<Pagination currentPage={1} totalPages={5} onPageChange={jest.fn()} />);
  expect(screen.getByText('Previous')).toBeDisabled();
});

test('disables next button on last page', () => {
  render(<Pagination currentPage={5} totalPages={5} onPageChange={jest.fn()} />);
  expect(screen.getByText('Next')).toBeDisabled();
});

test('highlights the current page button', () => {
   render(<Pagination currentPage={3} totalPages={5} onPageChange={jest.fn()} />);
    const currentPageButton = screen.getByText('3');
    expect(currentPageButton).toHaveStyle('background-color: #2196f3'); // Örnek stil kontrolü

     //farklı sayfa
     render(<Pagination currentPage={1} totalPages={5} onPageChange={jest.fn()} />);
     const firstPageButton = screen.getByText('1');
     expect(firstPageButton).toHaveStyle('background-color: #2196f3');
});