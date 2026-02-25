import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { NotFound } from './NotFound';
import { BrowserRouter } from 'react-router-dom';

const mockNavegacion = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavegacion,
  };
});

describe('Componente NotFound', () => {
  it('renderiza el mensaje de error 404 correctamente', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>,
    );

    expect(screen.getByText('Página No Encontrada')).toBeInTheDocument();
    expect(screen.getByText('Lo sentimos, la página que buscas no existe.')).toBeInTheDocument();
  });

  it('navega hacia el inicio cuando se hace clic en el botón', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>,
    );

    const boton = screen.getByRole('button', { name: /volver al inicio/i });
    fireEvent.click(boton);

    expect(mockNavegacion).toHaveBeenCalledTimes(1);
    expect(mockNavegacion).toHaveBeenCalledWith('/');
  });
});
