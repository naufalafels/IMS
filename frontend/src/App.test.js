import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders inventory system', () => {
  render(<App />);
  const linkElement = screen.getByText(/Inventory System/i);
  expect(linkElement).toBeInTheDocument();
});

test('adds a product', () => {
  render(<App />);
  fireEvent.change(screen.getByPlaceholderText(/Arrival Date/i), { target: { value: '2025-03-26' } });
  fireEvent.change(screen.getByPlaceholderText(/Item Description/i), { target: { value: 'Screws' } });
  fireEvent.change(screen.getByPlaceholderText(/Quantity/i), { target: { value: '100' } });
  fireEvent.click(screen.getByText(/Add Product/i));
  // Add assertions to verify the product was added
});