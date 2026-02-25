import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Card } from './Card';
import { ProductsContext } from '@/presentation/common/stores/ProductContext';

const mockProducto = {
  id: 1,
  title: 'Producto de Prueba',
  price: 99.99,
  category: 'Categoría de Prueba',
  image: '/icons/account.svg',
};

const mockSetCartProducts = vi.fn();

const renderizarTarjeta = () => {
  return render(
    <ProductsContext.Provider
      value={{
        products: [],
        loading: false,
        error: null,
        filterData: [],
        getProducts: vi.fn(),
        setFilterData: vi.fn(),
        cartProducts: [],
        setCartProducts: mockSetCartProducts,
      }}
    >
      <Card product={mockProducto} />
    </ProductsContext.Provider>,
  );
};

describe('Componente Card', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('debe renderizar la información del producto correctamente', () => {
    renderizarTarjeta();

    expect(screen.getByText('Producto de Prueba')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
    expect(screen.getByText('Categoría de Prueba')).toBeInTheDocument();
  });

  it('debe ser un elemento article con tabIndex=0 y ser focusable por teclado', () => {
    renderizarTarjeta();

    const article = screen.getByRole('article');
    expect(article).toBeInTheDocument();
    expect(article).toHaveAttribute('tabindex', '0');
  });

  it('debe añadir el producto al carrito cuando se presiona Enter sobre la tarjeta', () => {
    renderizarTarjeta();

    const article = screen.getByRole('article');
    fireEvent.keyDown(article, { key: 'Enter', code: 'Enter' });

    expect(mockSetCartProducts).toHaveBeenCalledTimes(1);
    expect(mockSetCartProducts).toHaveBeenCalledWith([mockProducto]);
  });

  it('debe añadir el producto al carrito cuando se presiona Space sobre la tarjeta', () => {
    renderizarTarjeta();

    const article = screen.getByRole('article');
    fireEvent.keyDown(article, { key: ' ', code: 'Space' });

    expect(mockSetCartProducts).toHaveBeenCalledTimes(1);
    expect(mockSetCartProducts).toHaveBeenCalledWith([mockProducto]);
  });

  it('debe añadir el producto al carrito cuando se hace clic en el botón', () => {
    renderizarTarjeta();

    const botonAñadir = screen.getByRole('button', {
      name: /añadir producto de prueba al carrito/i,
    });

    fireEvent.click(botonAñadir);

    expect(mockSetCartProducts).toHaveBeenCalledTimes(1);
    expect(mockSetCartProducts).toHaveBeenCalledWith([mockProducto]);

    const carritoGuardado = JSON.parse(localStorage.getItem('productStore') || '[]');
    expect(carritoGuardado).toHaveLength(1);
    expect(carritoGuardado[0].id).toBe(1);
  });

  it('no debe añadir el producto al carrito si ya existe en él', () => {
    localStorage.setItem('productStore', JSON.stringify([mockProducto]));

    renderizarTarjeta();

    const botonAñadir = screen.getByRole('button', {
      name: /añadir producto de prueba al carrito/i,
    });

    fireEvent.click(botonAñadir);

    expect(mockSetCartProducts).not.toHaveBeenCalled();
  });

  it('no debe añadir duplicados al presionar Enter si el producto ya está en el carrito', () => {
    localStorage.setItem('productStore', JSON.stringify([mockProducto]));
    renderizarTarjeta();

    const article = screen.getByRole('article');
    fireEvent.keyDown(article, { key: 'Enter', code: 'Enter' });

    expect(mockSetCartProducts).not.toHaveBeenCalled();
  });
});
