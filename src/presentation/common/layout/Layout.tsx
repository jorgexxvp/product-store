import type { FC, ReactNode } from 'react';
import { Header } from '@/presentation/common/components/Header';
import { ProductsProvider } from '@/presentation/common/stores/useProducts';

interface ILayoutProps {
  children: ReactNode;
}

export const Layout: FC<ILayoutProps> = ({ children }) => {
  return (
    <div>
      <ProductsProvider>
        <div className="flex flex-col gap-4 p-5 bg-gray-50 h-dvh">
          <Header />
          <main className="flex-1 overflow-auto focus:outline-none" tabIndex={-1} id="main-content">
            {children}
          </main>
        </div>
      </ProductsProvider>
    </div>
  );
};
