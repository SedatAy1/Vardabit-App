import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Filter from '../Filter';
import '@testing-library/jest-dom';

const mockFilters = {
  brands: ['Apple', 'Samsung', 'Huawei'],
  models: ['11', '12 Pro', '13 Pro Max'],
};

const mockSelectedFilters = {
  sort: 'lowToHigh',
  brands: ['Apple', 'Huawei'],
  models: ['12 Pro'],
};

const mockOnFilterChange = jest.fn();

test('renders filter options correctly', () => {
  render(<Filter filters={mockFilters} selectedFilters={mockSelectedFilters} onFilterChange={mockOnFilterChange} />);

  expect(screen.getByText('Old to new')).toBeInTheDocument();
  expect(screen.getByText('Price low to High')).toBeInTheDocument();

  expect(screen.getByText('Apple')).toBeInTheDocument();
  expect(screen.getByText('Samsung')).toBeInTheDocument();
  expect(screen.getByText('13 Pro Max')).toBeInTheDocument();
});

test('calls onFilterChange with correct arguments when sort option is changed', () => {
  render(<Filter filters={mockFilters} selectedFilters={mockSelectedFilters} onFilterChange={mockOnFilterChange} />);
    const newToOldRadio = screen.getByLabelText('New to old');
    fireEvent.click(newToOldRadio);
    expect(mockOnFilterChange).toHaveBeenCalledWith('sort', 'newToOld');

});

test('calls onFilterChange when brand checkbox is clicked', () => {
     render(<Filter filters={mockFilters} selectedFilters={mockSelectedFilters} onFilterChange={mockOnFilterChange} />);
    const samsungCheckbox = screen.getByLabelText('Samsung');
    fireEvent.click(samsungCheckbox); // İlk tıklama: Seç
    expect(mockOnFilterChange).toHaveBeenCalledWith('brands', 'Samsung');

});

test('calls onFilterChange when model checkbox is clicked', () => {
  render(<Filter filters={mockFilters} selectedFilters={mockSelectedFilters} onFilterChange={mockOnFilterChange} />);
  const model11Checkbox = screen.getByLabelText('11');
    fireEvent.click(model11Checkbox); // İlk tıklama: Seç
    expect(mockOnFilterChange).toHaveBeenCalledWith('models', '11');
});

test('renders with no selected filters', () => {
     const initialSelectedFilters = { sort: '', brands: [], models: [] };
     render(<Filter filters={mockFilters} selectedFilters={initialSelectedFilters} onFilterChange={mockOnFilterChange}/>)

     expect(screen.getByLabelText('Old to new').checked).toBe(false); // Seçili olmamalı
     expect(screen.getByLabelText('Apple').checked).toBe(false);
});