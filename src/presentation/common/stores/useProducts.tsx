import { useEffect, useState, type ReactNode } from 'react';
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

  const getProducts = async () => {
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
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        products,
        loading,
        error,
        filterData,
        getProducts,
        setFilterData,
        cartProducts,
        setCartProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
