import { createContext, useContext } from 'react';

export interface IProduct {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
}

export interface ProductsContextType {
  products: IProduct[];
  loading: boolean;
  error: string | null;
  getProducts: () => Promise<void>;
  filterData: IProduct[];
  cartProducts: IProduct[];
  setCartProducts: React.Dispatch<React.SetStateAction<IProduct[]>>;
  setFilterData: React.Dispatch<React.SetStateAction<IProduct[]>>;
}

export const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export const useProducts = () => {
  const context = useContext(ProductsContext);

  if (!context) {
    throw new Error('useProducts debe usarse dentro de ProductsProvider');
  }

  return context;
};
