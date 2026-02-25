import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CartProduct } from './CartProduct';
import { ProductsContext } from '@/presentation/common/stores/ProductContext';

const mockProduct = {
  id: 1,
  title: 'Test Cart Item',
  price: 50.0,
  category: 'Test Category',
  image: '/icons/card.svg',
};

const mockSetCartProducts = vi.fn();

const renderCartProduct = (cartProducts = [mockProduct]) => {
  return render(
    <ProductsContext.Provider
      value={{
        products: [],
        loading: false,
        error: null,
        filterData: [],
        getProducts: vi.fn(),
        setFilterData: vi.fn(),
        cartProducts,
        setCartProducts: mockSetCartProducts,
      }}
    >
      <CartProduct />
    </ProductsContext.Provider>,
  );
};

describe('CartProduct Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders empty state when cart is empty', () => {
    renderCartProduct([]);
    expect(screen.getByText('Tu carro')).toBeInTheDocument();
    expect(screen.getByText('Ningún producto añadido')).toBeInTheDocument();
  });

  it('renders products when cart has items', () => {
    renderCartProduct();
    expect(screen.getByText('Test Cart Item')).toBeInTheDocument();
    expect(screen.getAllByText('$50.00').length).toBeGreaterThan(0);
  });

  it('deletes item when trash icon is clicked', () => {
    renderCartProduct();
    const deleteButton = screen.getByRole('button', { name: /eliminar test cart item del carrito/i });

    fireEvent.click(deleteButton);

    expect(mockSetCartProducts).toHaveBeenCalledTimes(1);
    expect(mockSetCartProducts).toHaveBeenCalledWith([]);
  });

  it('calculates the total correctly', () => {
    const mockProduct2 = { ...mockProduct, id: 2, price: 100.0 };
    renderCartProduct([mockProduct, mockProduct2]);

    expect(screen.getByText('$150.00')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /proceder a pagar 2 artículos por un total de \$150.00/i })).toBeInTheDocument();
  });
});
