import { render, screen } from '@testing-library/react';
import App from './App';

test('renders tittle', () => {
  render(<App />);
  const appTittle = screen.getByText(/Personal Project Dogs/i);
  expect(appTittle).toBeInTheDocument();
});

test('renders button', () => {
  render(<App />);
  const button = screen.getByText(/Continue/i);
  expect(button).toBeInTheDocument();
});