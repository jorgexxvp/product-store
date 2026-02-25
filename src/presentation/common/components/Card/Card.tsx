import { useEffect, useState, type FC } from 'react';
import AddShoppingIcon from '../../../../image/icons/add.svg';
import { useProducts, type IProduct } from '../../stores';

interface ICardProps {
  product: IProduct;
}

export const Card: FC<ICardProps> = ({ product }) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const { setCartProducts } = useProducts();

  const handleAddToCart = () => {
    const existingCart = JSON.parse(localStorage.getItem('productStore') || '[]') as IProduct[];
    const isProductInCart = existingCart.some((item) => item.id === product.id);

    if (isProductInCart) {
      return;
    }

    const updatedCart = [...existingCart, product];
    localStorage.setItem('productStore', JSON.stringify(updatedCart));
    setCartProducts(updatedCart);
  };

  useEffect(() => {
    const loadImage = async () => {
      try {
        const image = await import(`../../../../image${product.image}`);
        setImageSrc(image.default);
      } catch (err) {
        console.error('No se pudo cargar la imagen dinámica:', err);
      }
    };

    if (product.image) {
      loadImage();
    }
  }, [product.image]);

  return (
    <div className="group relative flex items-center justify-between border border-gray-100 rounded-2xl shadow-sm p-4 bg-white hover:shadow-md transition-all duration-300 cursor-pointer">
      <div className="flex flex-col gap-1">
        <p className="text-gray-800 font-semibold text-base leading-tight">{product.title}</p>
        <span className="text-green-600 text-sm font-medium">${product.price.toFixed(2)}</span>
        <span className="text-xs text-gray-400 uppercase tracking-wider mt-1">{product.category}</span>
      </div>

      <div className="flex items-center justify-center w-20 h-20 bg-gray-50 rounded-xl overflow-hidden shrink-0 ml-4">
        {imageSrc ? (
          <img src={imageSrc} alt={product.title} className="w-full h-full object-cover" />
        ) : (
          <div className="text-gray-200">
            <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
        )}
      </div>

      <button
        onClick={handleAddToCart}
        className="absolute top-3 right-3 p-1.5 bg-gray-50 rounded-full text-gray-400 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:text-blue-600 hover:bg-blue-50"
      >
        <img src={AddShoppingIcon} alt="Add to cart" className="w-5 h-5" />
      </button>
    </div>
  );
};
