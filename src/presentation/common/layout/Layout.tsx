import type { FC, ReactNode } from 'react';
import { Header } from '@/presentation/common/components/Header';
import { Footer } from '@/presentation/common/components/Footer';

interface ILayoutProps {
  children: ReactNode;
}

export const Layout: FC<ILayoutProps> = ({ children }) => {
  return (
    <div>
      <div className="flex flex-col gap-4 p-5">
        <Header />
        <div>{children}</div>
        <Footer />
      </div>
    </div>
  );
};
