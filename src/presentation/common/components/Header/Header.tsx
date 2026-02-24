import type { ITitle } from '@/presentation/toolbox/interface/Product';
import { useState } from 'react';
import type { FC } from 'react';

interface ITabProps {
  data: ITitle;
  isOpen?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const Tab: FC<ITabProps> = ({ data, isOpen, onMouseEnter, onMouseLeave }) => {
  const { title, subTitle } = data;

  return (
    <div key={data.id} className="relative" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <button className="flex flex-row items-center justify-center h-5 w-fit cursor-pointer hover:text-blue-600">{title}</button>
      {isOpen && subTitle && (
        <div className="absolute top-full left-0 mt-0 bg-white rounded-b-lg shadow-lg z-10 p-3 min-w-3xs">
          {subTitle?.map((sub, index) => (
            <button key={index} className="flex flex-row w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors">
              {sub}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export const Header: FC = () => {
  const [openId, setOpenId] = useState<number | null>(null);
  const title = [{ id: 1, title: 'Categorias', subTitle: ['Cuenta', 'Crédito', 'Tarjeta'] }];

  const handleMouseEnter = (id: number) => {
    setOpenId(id);
  };

  const handleMouseLeave = () => {
    setOpenId(null);
  };

  return (
    <div className="flex flex-col w-full bg-gray-200">
      <div className="flex flex-row items-center h-16 w-full gap-4 px-4">
        {title.map((item) => (
          <Tab key={item.id} data={item} isOpen={openId === item.id} onMouseEnter={() => handleMouseEnter(item.id)} onMouseLeave={handleMouseLeave} />
        ))}
      </div>
    </div>
  );
};
