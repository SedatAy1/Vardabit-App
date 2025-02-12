import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Cart from '../Cart';
import '@testing-library/jest-dom';

const mockCartItems = [
  { id: '1', name: 'Product 1', price: 10, quantity: 2 },
  { id: '2', name: 'Product 2', price: 20, quantity: 1 },
];

const mockIncreaseQuantity = jest.fn();
const mockDecreaseQuantity = jest.fn();

test('renders empty cart message when cart is empty', () => {
  render(<Cart cartItems={[]} onIncreaseQuantity={mockIncreaseQuantity} onDecreaseQuantity={mockDecreaseQuantity} />);
  expect(screen.getByText('Your cart is empty.')).toBeInTheDocument();
});

test('renders cart items and total price correctly', () => {
  render(<Cart cartItems={mockCartItems} onIncreaseQuantity={mockIncreaseQuantity} onDecreaseQuantity={mockDecreaseQuantity} />);

  expect(screen.getByText('Product 1')).toBeInTheDocument();
  expect(screen.getByText('Product 2')).toBeInTheDocument();
  expect(screen.getByText('Total Price: 40.00 €')).toBeInTheDocument(); // (10 * 2) + (20 * 1) = 40
});

test('calls onIncreaseQuantity when increase button is clicked', () => {
  render(<Cart cartItems={mockCartItems} onIncreaseQuantity={mockIncreaseQuantity} onDecreaseQuantity={mockDecreaseQuantity} />);
  fireEvent.click(screen.getAllByText('+')[0]); // İlk "+" butonuna tıkla
  expect(mockIncreaseQuantity).toHaveBeenCalledTimes(1);
  expect(mockIncreaseQuantity).toHaveBeenCalledWith(mockCartItems[0]);
});

test('calls onDecreaseQuantity when decrease button is clicked', () => {
  render(<Cart cartItems={mockCartItems} onIncreaseQuantity={mockIncreaseQuantity} onDecreaseQuantity={mockDecreaseQuantity} />);
  fireEvent.click(screen.getAllByText('-')[0]); // İlk "-" butonuna tıkla
  expect(mockDecreaseQuantity).toHaveBeenCalledTimes(1);
  expect(mockDecreaseQuantity).toHaveBeenCalledWith(mockCartItems[0]);
});

test('renders cart items with correct quantity and price', () => {
    render(<Cart cartItems={mockCartItems} onIncreaseQuantity={mockIncreaseQuantity} onDecreaseQuantity={mockDecreaseQuantity} />);

    // Ürün 1 için miktar ve fiyat kontrolü
    expect(screen.getByText(/Product 1/)).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument(); // Miktar kontrolü
    expect(screen.getByText('20.00 €')).toBeInTheDocument(); // (10 * 2 = 20)

    // Ürün 2 için miktar ve fiyat kontrolü
    expect(screen.getByText(/Product 2/)).toBeInTheDocument();
    expect(screen.getByText('1')).toBeVisible();      // Miktar kontrolü
    expect(screen.getByText('20.00 €')).toBeVisible(); // (20 * 1 = 20)
});

//Checkout Button
test('checkout button renders and is clickable', () => {
    render(<Cart cartItems={mockCartItems} onIncreaseQuantity={mockIncreaseQuantity} onDecreaseQuantity={mockDecreaseQuantity}/>);
    const checkoutButton = screen.getByText('Checkout');
    expect(checkoutButton).toBeInTheDocument();
    fireEvent.click(checkoutButton); // Tıklama testi (şu an için bir mock fonksiyon yok)
});