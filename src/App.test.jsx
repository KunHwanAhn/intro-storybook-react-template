import { render, screen } from '@testing-library/react';
import App from './App';

test('renders taskbox', () => {
  render(<App />);
  const titleElement = screen.getByText(/taskbox/i);
  expect(titleElement).toBeInTheDocument();
});
