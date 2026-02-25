import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Loading } from './Loading';

describe('Componente Loading', () => {
  it('renderiza los elementos de carga correctamente', () => {
    render(<Loading />);

    expect(screen.getByText('Cargando...')).toBeInTheDocument();

    const textoSR = screen.getByText('Cargando productos');
    expect(textoSR).toBeInTheDocument();
    expect(textoSR).toHaveClass('sr-only');
  });

  it('contiene los atributos ARIA correctos para accesibilidad', () => {
    const { container } = render(<Loading />);

    const contenedorEstado = screen.getByRole('status');
    expect(contenedorEstado).toHaveAttribute('aria-live', 'assertive');

    const spinner = container.querySelector('.animate-spin');
    expect(spinner).toHaveAttribute('aria-hidden', 'true');
  });
});
