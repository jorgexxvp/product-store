import type { ITitle } from '@/presentation/toolbox/interface/Product';
import { useEffect, useRef } from 'react';
import type { FC, KeyboardEvent } from 'react';
import { CustomInput } from '@/presentation/common/components/Input';
import SearchIcon from '@/image/icons/search.svg';
import ShoppingCartIcon from '@/image/icons/shoppingCart.svg';
import ArrowIcon from '@/image/icons/arrowUp.svg';
import CloseIcon from '@/image/icons/close.svg';
import MenuIcon from '@/image/icons/menu.svg';
import { CartProduct } from '@/presentation/common/components/CartProduct';
import { useHeader } from './header.hook';

interface ITabProps {
  data: ITitle;
  isOpen?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onSubTitleClick?: (subTitle: string) => void;
  onToggle?: () => void;
  onClose?: () => void;
}

const Tab: FC<ITabProps> = ({
  data,
  isOpen,
  onMouseEnter,
  onMouseLeave,
  onSubTitleClick,
  onToggle,
  onClose,
}) => {
  const { title, subTitle } = data;
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const shouldFocusFirst = useRef(false);

  const getFocusableItems = () =>
    Array.from(
      menuRef.current?.querySelectorAll<HTMLButtonElement>('[role="menuitem"]') ?? [],
    );

  useEffect(() => {
    if (isOpen && shouldFocusFirst.current) {
      shouldFocusFirst.current = false;
      getFocusableItems()[0]?.focus();
    }
  }, [isOpen]);

  const handleTriggerKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onToggle?.();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose?.();
    } else if (e.key === 'ArrowDown' && subTitle) {
      e.preventDefault();
      if (!isOpen) {
        shouldFocusFirst.current = true;
        onToggle?.();
      } else {
        getFocusableItems()[0]?.focus();
      }
    } else if (e.key === 'ArrowUp' && subTitle && isOpen) {
      e.preventDefault();
      const items = getFocusableItems();
      items[items.length - 1]?.focus();
    }
  };

  const handleMenuKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const items = getFocusableItems();
    const idx = items.findIndex((el) => el === document.activeElement);

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      items[(idx + 1) % items.length]?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (idx === 0) {
        triggerRef.current?.focus();
      } else {
        items[idx - 1]?.focus();
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose?.();
      triggerRef.current?.focus();
    } else if (e.key === 'Tab') {
      onClose?.();
    }
  };

  return (
    <div className="relative py-2" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={isOpen}
        aria-haspopup={subTitle ? 'menu' : false}
        onKeyDown={handleTriggerKeyDown}
        onClick={onToggle}
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
          ref={menuRef}
          role="menu"
          aria-label={`Submenú de ${title}`}
          onKeyDown={handleMenuKeyDown}
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

const NAV_ITEMS = [
  { id: 1, title: 'Categorias', subTitle: ['Todas', 'Cuenta', 'Crédito', 'Tarjeta'] },
  { id: 2, title: 'Ofertas' },
  { id: 3, title: 'Novedades' },
];

export const Header: FC = () => {
  const {
    openId,
    isCartOpen,
    isMobileMenuOpen,
    cartProducts,
    cartContainerRef,
    cartButtonRef,
    mobileMenuRef,
    hamburgerRef,
    handleMouseEnter,
    handleMouseLeave,
    handleToggle,
    handleCloseTab,
    handleSubTitleClick,
    handleSearchChange,
    handleToggleCart,
    handleToggleMobileMenu,
  } = useHeader();

  return (
    <header className="w-full border-b border-gray-300">
      <div className="flex flex-row w-full justify-between items-center px-4 md:px-6 py-4 h-16 md:h-auto">
        <nav aria-label="Navegación principal" className="hidden md:flex flex-row items-center h-16 w-full gap-4">
          {NAV_ITEMS.map((item) => (
            <Tab
              key={item.id}
              data={item}
              isOpen={openId === item.id}
              onMouseEnter={() => handleMouseEnter(item.id)}
              onMouseLeave={handleMouseLeave}
              onSubTitleClick={handleSubTitleClick}
              onToggle={() => handleToggle(item.id)}
              onClose={handleCloseTab}
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
          onClick={handleToggleMobileMenu}
        >
          <img src={isMobileMenuOpen ? CloseIcon : MenuIcon} alt="" aria-hidden="true" className="w-6 h-6" />
        </button>

        <div className="flex items-center gap-2 md:gap-4">
          <div className="hidden md:block relative group" role="search">
            <CustomInput
              id="search-desktop"
              label="Buscar productos o servicios"
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
              aria-expanded={isCartOpen}
              aria-haspopup="dialog"
              aria-label={`Carrito de compras con ${cartProducts.length} artículos`}
              onClick={handleToggleCart}
              className="relative p-3 rounded-2xl min-w-12 bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-all active:scale-95 focus-visible:ring-2 focus-visible:ring-blue-500 focus:outline-none"
            >
              <img src={ShoppingCartIcon} alt="" aria-hidden="true" className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white border-2 border-white">
                {cartProducts.length}
              </span>
            </button>

            {isCartOpen && (
              <div
                ref={cartContainerRef}
                role="dialog"
                aria-modal="true"
                aria-label="Carrito de compras"
                className="absolute top-full right-0 mt-4 z-10 shadow-2xl animate-in fade-in slide-in-from-top-2"
              >
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
              id="search-mobile"
              label="Buscar productos o servicios"
              icon={SearchIcon}
              onChange={handleSearchChange}
              placeholder="Buscar productos o servicios..."
              className="bg-white border-none rounded-2xl pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-100 transition-all w-full"
            />
          </div>
          <nav aria-label="Navegación móvil" className="flex flex-row gap-2 flex-wrap">
            {NAV_ITEMS.map((item) => (
              <Tab
                key={item.id}
                data={item}
                isOpen={openId === item.id}
                onMouseEnter={() => handleMouseEnter(item.id)}
                onMouseLeave={handleMouseLeave}
                onSubTitleClick={handleSubTitleClick}
                onToggle={() => handleToggle(item.id)}
                onClose={handleCloseTab}
              />
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
