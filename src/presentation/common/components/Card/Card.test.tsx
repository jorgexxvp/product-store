import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Card } from './Card';
import { ProductsContext } from '@/presentation/common/stores/ProductContext';

const mockProduct = {
  id: 1,
  title: 'Test Product',
  price: 99.99,
  category: 'Test Category',
  image: '/icons/account.svg',
};

const mockSetCartProducts = vi.fn();

const renderCard = () => {
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
      <Card product={mockProduct} />
    </ProductsContext.Provider>,
  );
};

describe('Card Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('renders product information correctly', () => {
    renderCard();
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
    expect(screen.getByText('Test Category')).toBeInTheDocument();
  });

  it('adds product to cart when button is clicked', () => {
    renderCard();
    const addButton = screen.getByRole('button', { name: /añadir test product al carrito/i });

    fireEvent.click(addButton);

    expect(mockSetCartProducts).toHaveBeenCalledTimes(1);
    expect(mockSetCartProducts).toHaveBeenCalledWith([mockProduct]);

    const storedCart = JSON.parse(localStorage.getItem('productStore') || '[]');
    expect(storedCart).toHaveLength(1);
    expect(storedCart[0].id).toBe(1);
  });

  it('does not add product to cart if it already exists', () => {
    localStorage.setItem('productStore', JSON.stringify([mockProduct]));

    renderCard();
    const addButton = screen.getByRole('button', { name: /añadir test product al carrito/i });

    fireEvent.click(addButton);

    expect(mockSetCartProducts).not.toHaveBeenCalled();
  });
});
