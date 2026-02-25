import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Footer } from './Footer';

describe('Footer Component', () => {
  it('debe renderizar todos los títulos de las secciones', () => {
    render(<Footer />);

    expect(screen.getByText(/Compañía/i)).toBeInTheDocument();
    expect(screen.getByText(/Ayuda/i)).toBeInTheDocument();
    expect(screen.getByText(/Tienda/i)).toBeInTheDocument();
  });

  it('debe renderizar la cantidad correcta de enlaces por sección', () => {
    render(<Footer />);

    const linkNosotros = screen.getByRole('link', { name: /nosotros/i });
    const linkPagos = screen.getByRole('link', { name: /pago/i });
    const linkCuentas = screen.getByRole('link', { name: /cuentas/i });

    expect(linkNosotros).toBeInTheDocument();
    expect(linkPagos).toBeInTheDocument();
    expect(linkCuentas).toBeInTheDocument();
  });

  it('debe tener los atributos de accesibilidad y rutas correctas (href)', () => {
    render(<Footer />);
    const links = screen.getAllByRole('link');

    links.forEach((link) => {
      expect(link).toHaveAttribute('href', '#');
    });
  });

  it('debe aplicar las clases de estilo base al contenedor', () => {
    const { container } = render(<Footer />);
    const mainDiv = container.firstChild;

    expect(mainDiv).toHaveClass('bg-[#24262b]');
  });
});
