import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { NotFound } from './NotFound';
import { BrowserRouter } from 'react-router-dom';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('NotFound Component', () => {
  it('renders the 404 message correctly', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );

    expect(screen.getByText('Página No Encontrada')).toBeInTheDocument();
    expect(screen.getByText('Lo sentimos, la página que buscas no existe.')).toBeInTheDocument();
  });

  it('navigates to home when the button is clicked', () => {
    render(
        <NotFound />
    );

    const button = screen.getByRole('button', { name: /volver al inicio/i });
    fireEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
