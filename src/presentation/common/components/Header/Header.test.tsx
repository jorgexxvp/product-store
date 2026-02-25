import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Header } from './Header';
import { ProductsContext } from '@/presentation/common/stores/ProductContext';

const mockProducts = [
  { id: 1, title: 'Test 1', category: 'cuenta', price: 10, image: '' },
  { id: 2, title: 'Test 2', category: 'tarjeta', price: 20, image: '' },
];
const mockSetFilterData = vi.fn();

const renderHeader = (cartProducts = []) => {
  return render(
    <ProductsContext.Provider
      value={{
        products: mockProducts,
        loading: false,
        error: null,
        filterData: mockProducts,
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

describe('Header Component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders correctly with categories and search input', () => {
    renderHeader();
    expect(screen.getByText('Categorias')).toBeInTheDocument();
    expect(screen.getByText('Ofertas')).toBeInTheDocument();
    expect(screen.getAllByPlaceholderText('Buscar productos o servicios...').length).toBeGreaterThan(0);
  });

  it('filters products correctly when typing in search bar', async () => {
    renderHeader();

    const searchInputs = screen.getAllByPlaceholderText('Buscar productos o servicios...');
    expect(searchInputs.length).toBeGreaterThan(0);
    const desktopInput = searchInputs[0];

    mockSetFilterData.mockClear();

    fireEvent.change(desktopInput, { target: { value: 'test' } });

    expect(mockSetFilterData).toHaveBeenCalled();
  });

  it('opens and closes mobile menu when hamburger is clicked', () => {
    renderHeader();
    const menuButton = screen.getByRole('button', { name: /abrir menú principal/i });

    fireEvent.click(menuButton);
    expect(screen.getByLabelText(/cerrar menú principal/i)).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText(/cerrar menú principal/i));
    expect(screen.getByLabelText(/abrir menú principal/i)).toBeInTheDocument();
  });

  it('opens and closes cart when cart button is clicked', () => {
    renderHeader();
    const cartButton = screen.getByRole('button', { name: /carrito de compras con 0 artículos/i });

    fireEvent.click(cartButton);
    expect(screen.getByText('Tu carro')).toBeInTheDocument();
  });
});
