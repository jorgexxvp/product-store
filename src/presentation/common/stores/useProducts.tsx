import { useEffect, useState, useMemo, useCallback, type ReactNode } from 'react';
import { clientProductApi } from '@/core';
import { ProductsContext, type IProduct } from './ProductContext';

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [filterData, setFilterData] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cartProducts, setCartProducts] = useState<IProduct[]>(
    localStorage.getItem('productStore') ? JSON.parse(localStorage.getItem('productStore') || '[]') : [],
  );

  const getProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await clientProductApi.GetProducts();
      setProducts(response.list);
      setFilterData(response.list);
      setError(null);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Fallo al traer los productos. Por favor, inténtalo más tarde.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getProducts();
  }, []);

  const value = useMemo(
    () => ({
      products,
      loading,
      error,
      filterData,
      getProducts,
      setFilterData,
      cartProducts,
      setCartProducts,
    }),
    [products, loading, error, filterData, getProducts, cartProducts]
  );

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
