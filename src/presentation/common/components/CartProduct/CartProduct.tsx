import { type FC } from 'react';
import { useProducts, type IProduct } from '../../stores';
import TrashIcon from '../../../../image/icons/delete.svg';
import ShoppingCartIcon from '../../../../image/icons/shoppingCart.svg';
import AccountIcon from '../../../../image/icons/account.svg';
import LoangIcon from '../../../../image/icons/loan.svg';
import CardIcon from '../../../../image/icons/card.svg';

interface IProductProps {
  product: IProduct;
  handleDelete: (id: number) => void;
}

const ProductComponent: FC<IProductProps> = ({ product, handleDelete }) => {
  const iconMap: Record<string, string> = {
    '/icons/account.svg': AccountIcon,
    '/icons/loan.svg': LoangIcon,
    '/icons/card.svg': CardIcon,
  };

  return (
    <div key={product.id} className="flex items-center gap-4 group">
      <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 shrink-0">
        {iconMap[product.image] && <img src={iconMap[product.image]} alt={product.title} className="w-full h-full object-cover" />}
      </div>

      <div className="flex-1">
        <h3 className="text-gray-800 font-semibold leading-tight">{product.title}</h3>
        <p className="text-gray-400 text-sm mt-1">${product.price.toFixed(2)}</p>
      </div>

      <button className="text-red-400 hover:text-red-600 p-2 transition-colors" onClick={() => handleDelete(product.id)}>
        <img src={TrashIcon} alt="Delete" className="w-5 h-5" />
      </button>
    </div>
  );
};

export const CartProduct: FC = () => {
  const { setCartProducts, cartProducts: productData } = useProducts();

  const total = productData?.reduce((acc, item) => acc + item.price, 0);

  const handleDelete = (id: number) => {
    const updatedCart = productData.filter((product) => product.id !== id);
    setCartProducts(updatedCart);
    localStorage.setItem('productStore', JSON.stringify(updatedCart));
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-3xl border min-w-80 border-gray-100 shadow-xl overflow-hidden font-sans">
      <div className="flex items-center justify-between p-6">
        <div className="flex items-center gap-3">
          <img src={ShoppingCartIcon} alt="Cart" className="w-6 h-6" />
          <h2 className="text-xl font-bold text-gray-800">Tu carro</h2>
        </div>
        <span className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-sm font-semibold">{productData?.length} items</span>
      </div>

      <hr className="border-gray-50" />

      <div className="p-6 flex flex-col gap-6">
        {productData.map((product) => (
          <ProductComponent key={product.id} product={product} handleDelete={handleDelete} />
        ))}
      </div>

      <hr className="border-gray-50 mt-4" />

      <div className="p-6 pt-8">
        <div className="flex justify-between items-center mb-6">
          <span className="text-gray-400 text-lg font-medium">Total</span>
          <span className="text-2xl font-black text-gray-900">${total.toFixed(2)}</span>
        </div>

        <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-indigo-200">
          Pagar
        </button>
      </div>
    </div>
  );
};
