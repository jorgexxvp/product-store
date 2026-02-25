import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Loading } from './Loading';

describe('Loading Component', () => {
  it('renders loading elements gracefully', () => {
    render(<Loading />);
    expect(screen.getByText('Cargando...')).toBeInTheDocument();

    const srText = screen.getByText('Cargando productos');
    expect(srText).toBeInTheDocument();
    expect(srText).toHaveClass('sr-only');
  });

  it('contains the correct ARIA attributes', () => {
    const { container } = render(<Loading />);
    const statusContainer = screen.getByRole('status');
    expect(statusContainer).toHaveAttribute('aria-live', 'assertive');

    const spinner = container.querySelector('.animate-spin');
    expect(spinner).toHaveAttribute('aria-hidden', 'true');
  });
});
