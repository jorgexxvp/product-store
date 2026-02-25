import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Portal } from './Portal';
import { ProductsContext, type IProduct } from '@/presentation/common/stores/ProductContext';
import { BrowserRouter } from 'react-router-dom';

const renderPortal = (loading = false, filterData: IProduct[] = []) => {
  return render(
    <BrowserRouter>
      <ProductsContext.Provider
        value={{
          products: [],
          loading,
          error: null,
          filterData,
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

describe('Portal Component', () => {
  it('shows loading indicator when loading is true', () => {
    renderPortal(true);

    expect(screen.getByText('Cargando...')).toBeInTheDocument();
  });

  it('shows empty state message when no products are found', () => {
    renderPortal(false, []);
    expect(screen.getByText('No se encontraron productos coincidentes.')).toBeInTheDocument();
  });

  it('renders a list of ProductCards when products match the filter', () => {
    const mockProducts = [
      { id: 1, title: 'Product 1', price: 10, category: 'cat1', image: '' },
      { id: 2, title: 'Product 2', price: 20, category: 'cat2', image: '' },
    ];

    renderPortal(false, mockProducts);

    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
  });
});
