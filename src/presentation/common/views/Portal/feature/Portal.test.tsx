import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Portal } from './Portal';
import { ProductsContext, type IProduct } from '@/presentation/common/stores/ProductContext';
import { BrowserRouter } from 'react-router-dom';

const renderizarPortal = (estaCargando = false, datosFiltrados: IProduct[] = []) => {
  return render(
    <BrowserRouter>
      <ProductsContext.Provider
        value={{
          products: [],
          loading: estaCargando,
          error: null,
          filterData: datosFiltrados,
          getProducts: vi.fn(),
          setFilterData: vi.fn(),
          cartProducts: [],
          setCartProducts: vi.fn(),
        }}
      >
        <Portal />
      </ProductsContext.Provider>
    </BrowserRouter>,
  );
};

describe('Componente Portal', () => {
  it('debe mostrar el indicador de carga cuando el estado loading es verdadero', () => {
    renderizarPortal(true);

    expect(screen.getByText('Cargando...')).toBeInTheDocument();
  });

  it('debe mostrar el mensaje de estado vacío cuando no se encuentran productos', () => {
    renderizarPortal(false, []);

    expect(screen.getByText('No se encontraron productos coincidentes.')).toBeInTheDocument();
  });

  it('debe renderizar una lista de tarjetas de producto cuando existen coincidencias', () => {
    const productosSimulados = [
      { id: 1, title: 'Producto 1', price: 10, category: 'cat1', image: '' },
      { id: 2, title: 'Producto 2', price: 20, category: 'cat2', image: '' },
    ];

    renderizarPortal(false, productosSimulados);

    expect(screen.getByText('Producto 1')).toBeInTheDocument();
    expect(screen.getByText('Producto 2')).toBeInTheDocument();
  });
});
