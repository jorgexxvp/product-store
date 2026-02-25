import type { ITitle } from '@/presentation/toolbox/interface/Product';
import { useEffect, useRef, useState } from 'react';
import type { FC } from 'react';
import { CustomInput } from '@/presentation/common/components/Input';
import SearchIcon from '@/image/icons/search.svg';
import { useProducts } from '@/presentation/common/stores';
import ShoppingCartIcon from '@/image/icons/shoppingCart.svg';
import ArrowIcon from '@/image/icons/arrowUp.svg';
import CloseIcon from '@/image/icons/close.svg';
import MenuIcon from '@/image/icons/menu.svg';
import { CartProduct } from '@/presentation/common/components/CartProduct';

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
        type="button"
        aria-expanded={isOpen}
        aria-haspopup={subTitle ? 'menu' : false}
        className={`
          flex items-center justify-center h-10 px-5 cursor-pointer font-medium text-sm transition-all duration-200
          rounded-xl border border-transparent focus-visible:ring-2 focus-visible:ring-blue-500 focus:outline-none
          ${isOpen ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-900'}
        `}
      >
        {title}
        {subTitle && (
          <img
            src={ArrowIcon}
            alt="Arrow"
            aria-hidden="true"
            className={`ml-2 w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          />
        )}
      </button>

      {isOpen && subTitle && onSubTitleClick && (
        <div
          role="menu"
          aria-label={`Submenú de ${title}`}
          className="absolute top-full left-0 min-w-52 bg-white rounded-2xl shadow-2xl z-50 p-2 border border-gray-100 animate-in fade-in zoom-in-95 duration-200"
        >
          <div className="py-1">
            {subTitle.map((sub, index) => (
              <button
                key={index}
                role="menuitem"
                onClick={() => onSubTitleClick(sub)}
                className="flex items-center w-full text-left px-4 py-2.5 text-sm text-gray-600 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus:outline-none"
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cartContainerRef = useRef<HTMLDivElement>(null);
  const cartButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

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
    setIsMobileMenuOpen(false);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && cartContainerRef.current && !cartContainerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, isMobileMenuOpen]);

  return (
    <header className="w-full border-b border-gray-300">
      <div className="flex flex-row w-full justify-between items-center px-4 md:px-6 py-4 h-16 md:h-auto">
        <nav aria-label="Navegación principal" className="hidden md:flex flex-row items-center h-16 w-full gap-4">
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
        </nav>

        <button
          ref={hamburgerRef}
          type="button"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMobileMenuOpen ? 'Cerrar menú principal' : 'Abrir menú principal'}
          className="md:hidden p-2 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <img src={isMobileMenuOpen ? CloseIcon : MenuIcon} alt="" aria-hidden="true" className="w-6 h-6" />
        </button>

        <div className="flex items-center gap-2 md:gap-4">
          <div className="hidden md:block relative group" role="search">
            <CustomInput
              icon={SearchIcon}
              onChange={handleSearchChange}
              placeholder="Buscar productos o servicios..."
              className="bg-white border-none rounded-2xl pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-100 transition-all w-64"
            />
          </div>

          <div className="relative">
            <button
              ref={cartButtonRef}
              type="button"
              aria-expanded={isOpen}
              aria-haspopup="dialog"
              aria-label={`Carrito de compras con ${cartProducts.length} artículos`}
              onClick={() => setIsOpen(!isOpen)}
              className="relative p-3 rounded-2xl min-w-12 bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-all active:scale-95 focus-visible:ring-2 focus-visible:ring-blue-500 focus:outline-none"
            >
              <img src={ShoppingCartIcon} alt="" aria-hidden="true" className="w-6 h-6" />
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

      {isMobileMenuOpen && (
        <div id="mobile-menu" ref={mobileMenuRef} className="md:hidden px-4 pb-4 flex flex-col gap-1 border-t border-gray-100">
          <div className="pt-3 pb-1" role="search">
            <CustomInput
              icon={SearchIcon}
              onChange={handleSearchChange}
              placeholder="Buscar productos o servicios..."
              className="bg-white border-none rounded-2xl pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-100 transition-all w-full"
            />
          </div>
          <nav aria-label="Navegación móvil" className="flex flex-row gap-2 flex-wrap">
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
          </nav>
        </div>
      )}
    </header>
  );
};
