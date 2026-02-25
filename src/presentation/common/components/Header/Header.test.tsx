import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Header } from './Header';
import { ProductsContext } from '@/presentation/common/stores/ProductContext';

const productosSimulados = [
  { id: 1, title: 'Prueba 1', category: 'cuenta', price: 10, image: '' },
  { id: 2, title: 'Prueba 2', category: 'tarjeta', price: 20, image: '' },
];

const mockSetFilterData = vi.fn();

const renderizarHeader = (cartProducts = []) => {
  return render(
    <ProductsContext.Provider
      value={{
        products: productosSimulados,
        loading: false,
        error: null,
        filterData: productosSimulados,
        getProducts: vi.fn(),
        setFilterData: mockSetFilterData,
        cartProducts,
        setCartProducts: vi.fn(),
      }}
    >
      <Header />
    </ProductsContext.Provider>,
  );
};

describe('Componente Header', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('se renderiza correctamente con categorías y el campo de búsqueda', () => {
    renderizarHeader();

    expect(screen.getByText('Categorias')).toBeInTheDocument();
    expect(screen.getByText('Ofertas')).toBeInTheDocument();
    expect(screen.getAllByPlaceholderText('Buscar productos o servicios...').length).toBeGreaterThan(0);
  });

  it('filtra los productos correctamente al escribir en la barra de búsqueda', async () => {
    renderizarHeader();

    const inputsBusqueda = screen.getAllByPlaceholderText('Buscar productos o servicios...');
    expect(inputsBusqueda.length).toBeGreaterThan(0);
    const inputEscritorio = inputsBusqueda[0];

    mockSetFilterData.mockClear();

    fireEvent.change(inputEscritorio, { target: { value: 'prueba' } });

    expect(mockSetFilterData).toHaveBeenCalled();
  });

  it('abre y cierra el menú móvil cuando se hace clic en la hamburguesa', () => {
    renderizarHeader();

    const botonMenu = screen.getByRole('button', { name: /abrir menú principal/i });

    fireEvent.click(botonMenu);
    expect(screen.getByLabelText(/cerrar menú principal/i)).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText(/cerrar menú principal/i));
    expect(screen.getByLabelText(/abrir menú principal/i)).toBeInTheDocument();
  });

  it('abre y cierra el carrito cuando se hace clic en el botón del carrito', () => {
    renderizarHeader();

    const botonCarrito = screen.getByRole('button', {
      name: /carrito de compras con 0 artículos/i,
    });

    fireEvent.click(botonCarrito);

    expect(screen.getByText('Tu carro')).toBeInTheDocument();
  });

  it('abre el submenú de Categorias al presionar Enter sobre el botón', () => {
    renderizarHeader();

    const botonCategorias = screen.getByRole('button', { name: /categorias/i });
    fireEvent.keyDown(botonCategorias, { key: 'Enter', code: 'Enter' });

    expect(screen.getByRole('menu')).toBeInTheDocument();
    expect(screen.getByText('Todas')).toBeInTheDocument();
  });

  it('abre el submenú de Categorias al presionar Space sobre el botón', () => {
    renderizarHeader();

    const botonCategorias = screen.getByRole('button', { name: /categorias/i });
    fireEvent.keyDown(botonCategorias, { key: ' ', code: 'Space' });

    expect(screen.getByRole('menu')).toBeInTheDocument();
  });

  it('cierra el submenú al presionar Escape', () => {
    renderizarHeader();

    const botonCategorias = screen.getByRole('button', { name: /categorias/i });

    fireEvent.keyDown(botonCategorias, { key: 'Enter', code: 'Enter' });
    expect(screen.getByRole('menu')).toBeInTheDocument();

    fireEvent.keyDown(botonCategorias, { key: 'Escape', code: 'Escape' });
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('el carrito tiene role="dialog" y aria-modal cuando está abierto', () => {
    renderizarHeader();

    const botonCarrito = screen.getByRole('button', {
      name: /carrito de compras con 0 artículos/i,
    });

    fireEvent.click(botonCarrito);

    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveAttribute('aria-modal', 'true');
  });

  it('el input de búsqueda tiene un label accesible asociado', () => {
    renderizarHeader();

    const label = screen.getAllByText('Buscar productos o servicios');
    expect(label.length).toBeGreaterThan(0);
  });
});
