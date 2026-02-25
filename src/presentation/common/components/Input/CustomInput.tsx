import type { FC } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: string;
}

export const CustomInput: FC<InputProps> = ({ icon, ...props }) => {
  return (
    <div className="relative">
      <input {...props} />
      {icon && <img src={icon} className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />}
    </div>
  );
};