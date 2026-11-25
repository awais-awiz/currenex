import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Currenex brand heading and navigation tabs', () => {
  render(<App />);
  const brandTitles = screen.getAllByText(/Currenex/i);
  expect(brandTitles.length).toBeGreaterThan(0);

  const converterTab = screen.getByRole('tab', { name: /converter/i });
  expect(converterTab).toBeInTheDocument();
});
