import type { FC, ReactNode } from 'react';
import { Header } from '@/presentation/common/components/Header';
import { Footer } from '@/presentation/common/components/Footer';
import { ProductsProvider } from '../stores/useProducts';

interface ILayoutProps {
  children: ReactNode;
}

export const Layout: FC<ILayoutProps> = ({ children }) => {
  return (
    <div>
      <ProductsProvider>
        <div className="flex flex-col gap-4 p-5 bg-gray-50 h-dvh">
          <Header />
          <div>{children}</div>
          <Footer />
        </div>
      </ProductsProvider>
    </div>
  );
};
