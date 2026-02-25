import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Layout } from './Layout';

vi.mock('@/presentation/common/components/Header', () => ({
  Header: () => <header data-testid="mock-header">HeaderMock</header>,
}));

describe('Componente Layout', () => {
  it('debe renderizar el Header y los elementos hijos (children) correctamente', () => {
    render(
      <Layout>
        <div data-testid="mock-children">Contenido de Prueba</div>
      </Layout>,
    );

    expect(screen.getByTestId('mock-header')).toBeInTheDocument();
    expect(screen.getByTestId('mock-children')).toBeInTheDocument();
    expect(screen.getByText('Contenido de Prueba')).toBeInTheDocument();
  });

  it('debe envolver los elementos hijos en una etiqueta <main> con atributos de accesibilidad', () => {
    render(
      <Layout>
        <div>Contenido</div>
      </Layout>,
    );

    const main = screen.getByRole('main');

    expect(main).toHaveAttribute('id', 'main-content');
    expect(main).toHaveAttribute('tabIndex', '-1');
  });
});
