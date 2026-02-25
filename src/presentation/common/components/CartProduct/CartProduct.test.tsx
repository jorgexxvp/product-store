import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CartProduct } from './CartProduct';
import { ProductsContext } from '@/presentation/common/stores/ProductContext';

const mockProducto = {
  id: 1,
  title: 'Producto de Prueba',
  price: 50.0,
  category: 'Categoría de Prueba',
  image: '/icons/card.svg',
};

const mockSetCartProducts = vi.fn();

const renderizarCarrito = (cartProducts = [mockProducto]) => {
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

describe('Componente CartProduct', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renderiza el estado vacío cuando el carrito no tiene productos', () => {
    renderizarCarrito([]);

    expect(screen.getByText('Tu carro')).toBeInTheDocument();
    expect(screen.getByText('Ningún producto añadido')).toBeInTheDocument();
  });

  it('renderiza los productos cuando el carrito tiene elementos', () => {
    renderizarCarrito();

    expect(screen.getByText('Producto de Prueba')).toBeInTheDocument();
    expect(screen.getAllByText(/\$50\.00/).length).toBeGreaterThan(0);
  });

  it('elimina un producto cuando se hace clic en el icono de basura', () => {
    renderizarCarrito();

    const botonEliminar = screen.getByRole('button', {
      name: /eliminar producto de prueba del carrito/i,
    });

    fireEvent.click(botonEliminar);

    expect(mockSetCartProducts).toHaveBeenCalledTimes(1);
    expect(mockSetCartProducts).toHaveBeenCalledWith([]);
  });

  it('calcula el total correctamente', () => {
    const mockProducto2 = { ...mockProducto, id: 2, price: 100.0, title: 'Segundo Producto' };
    renderizarCarrito([mockProducto, mockProducto2]);

    expect(screen.getByText(/\$150\.00/)).toBeInTheDocument();

    expect(
      screen.getByRole('button', {
        name: /proceder a pagar 2 artículos por un total de \$150\.00/i,
      }),
    ).toBeInTheDocument();
  });
});
