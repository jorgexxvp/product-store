import type { ITitle } from '@/presentation/toolbox/interface/Product';
import { useEffect, useRef, useState } from 'react';
import type { FC } from 'react';
import { CustomInput } from '../Input';
import SearchIcon from '../../../../image/icons/search.svg';
import { useProducts } from '@/presentation/common/stores';
import ShoppingCartIcon from '../../../../image/icons/shoppingCart.svg';
import { CartProduct } from '../CartProduct';

interface ITabProps {
  data: ITitle;
  isOpen?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onSubTitleClick?: (subTitle: string) => void;
}

const Tab: FC<ITabProps> = ({ data, isOpen, onMouseEnter, onMouseLeave, onSubTitleClick }) => {
  const { title, subTitle } = data;

  return (
    <div className="relative py-2" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <button
        className={`
          flex items-center justify-center h-10 px-5 cursor-pointer font-medium text-sm transition-all duration-200
          rounded-xl border border-transparent
          ${isOpen ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-900'}
        `}
      >
        {title}
        {subTitle && (
          <svg
            className={`ml-2 w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </button>

      {isOpen && subTitle && onSubTitleClick && (
        <div className="absolute top-full left-0 min-w-52 bg-white rounded-2xl shadow-2xl z-50 p-2 border border-gray-100 animate-in fade-in zoom-in-95 duration-200">
          <div className="py-1">
            {subTitle.map((sub, index) => (
              <button
                key={index}
                onClick={() => onSubTitleClick(sub)}
                className="flex items-center w-full text-left px-4 py-2.5 text-sm text-gray-600 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                {sub}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export const Header: FC = () => {
  const [openId, setOpenId] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const cartContainerRef = useRef<HTMLDivElement>(null);

  const title = [
    { id: 1, title: 'Categorias', subTitle: ['Todas', 'Cuenta', 'Crédito', 'Tarjeta'] },
    { id: 2, title: 'Ofertas' },
    { id: 3, title: 'Novedades' },
  ];
  const { products, cartProducts, setFilterData } = useProducts();

  const handleMouseEnter = (id: number) => {
    setOpenId(id);
  };

  const handleMouseLeave = () => {
    setOpenId(null);
  };

  const handleSubTitleClick = (subTitle: string) => {
    if (subTitle === 'Todas') {
      setFilterData(products);
    } else {
      setFilterData(products.filter((product) => product.category.toLocaleLowerCase() === subTitle.toLowerCase()));
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && cartContainerRef.current && !cartContainerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="flex flex-row w-full justify-between items-center px-6 border-b border-gray-300 py-4">
      <div className="flex flex-row items-center h-16 w-full gap-4">
        {title.map((item) => (
          <Tab
            key={item.id}
            data={item}
            onSubTitleClick={handleSubTitleClick}
            isOpen={openId === item.id}
            onMouseEnter={() => handleMouseEnter(item.id)}
            onMouseLeave={handleMouseLeave}
          />
        ))}
      </div>

      <div className="flex items-center gap-4">
        <div className="relative group">
          <CustomInput
            icon={SearchIcon}
            onChange={(e) => {
              const searchTerm = e.target.value
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .toLowerCase();

              const filtered = products.filter((product) => {
                const productTitle = product.title
                  .normalize('NFD')
                  .replace(/[\u0300-\u036f]/g, '')
                  .toLowerCase();

                return productTitle.includes(searchTerm);
              });

              setFilterData(filtered);
            }}
            placeholder="Buscar productos o servicios..."
            className="bg-white border-none rounded-2xl pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-100 transition-all w-64"
          />
        </div>

        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative p-3 rounded-2xl min-w-12 bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-all active:scale-95"
          >
            <img src={ShoppingCartIcon} alt="Cart" className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white border-2 border-white">
              {cartProducts.length}
            </span>
          </button>

          {isOpen && (
            <div ref={cartContainerRef} className="absolute top-full right-0 mt-4 z-10 shadow-2xl animate-in fade-in slide-in-from-top-2">
              <CartProduct />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
