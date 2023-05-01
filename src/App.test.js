import { render, screen } from '@testing-library/react';
import App from './App';

test('renders dog card', () => {
  render(<App />);
  const dog = screen.getByText(/Saul/i);
  expect(dog).toBeVisible();
});
