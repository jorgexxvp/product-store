import { useEffect, useRef, useState, useCallback } from 'react';
import { useProducts } from '@/presentation/common/stores';

export const useHeader = () => {
  const [openId, setOpenId] = useState<number | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const cartContainerRef = useRef<HTMLDivElement>(null);
  const cartButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  const { products, cartProducts, setFilterData } = useProducts();

  const handleMouseEnter = useCallback((id: number) => {
    setOpenId(id);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setOpenId(null);
  }, []);

  const handleToggle = useCallback((id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  }, []);

  const handleCloseTab = useCallback(() => {
    setOpenId(null);
  }, []);

  const handleSubTitleClick = useCallback(
    (subTitle: string) => {
      if (subTitle === 'Todas') {
        setFilterData(products);
      } else {
        setFilterData(
          products.filter(
            (product) => product.category.toLocaleLowerCase() === subTitle.toLowerCase(),
          ),
        );
      }
      setOpenId(null);
      setIsMobileMenuOpen(false);
    },
    [products, setFilterData],
  );

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
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
    },
    [products, setFilterData],
  );

  const handleToggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const handleToggleCart = useCallback(() => {
    setIsCartOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCartOpen) {
        setIsCartOpen(false);
        cartButtonRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isCartOpen]);

  useEffect(() => {
    if (isCartOpen && cartContainerRef.current) {
      const firstFocusable = cartContainerRef.current.querySelector<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      firstFocusable?.focus();
    }
  }, [isCartOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isCartOpen &&
        cartContainerRef.current &&
        !cartContainerRef.current.contains(event.target as Node)
      ) {
        setIsCartOpen(false);
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
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isCartOpen, isMobileMenuOpen]);

  return {
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
  };
};
