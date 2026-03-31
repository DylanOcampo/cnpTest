import { render, screen } from '@testing-library/react';
import App from './App';

test('renders cube demo title', () => {
  render(<App />);
  const titleElement = screen.getByText(/demo cubo 3d/i);
  expect(titleElement).toBeInTheDocument();
});
