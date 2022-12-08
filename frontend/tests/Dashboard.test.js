import { render, screen } from '@testing-library/react';
import Dashboard from '../src/components/Dashboard';

test('renders the landing page', () => {
  render(<Dashboard />);
});