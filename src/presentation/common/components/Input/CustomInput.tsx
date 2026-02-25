import type { FC } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: string;
  label?: string;
}

export const CustomInput: FC<InputProps> = ({ icon, label, id, ...props }) => {
  return (
    <div className="relative">
      {label && id && (
        <label htmlFor={id} className="sr-only">
          {label}
        </label>
      )}
      <input id={id} {...props} />
      {icon && (
        <img
          src={icon}
          aria-hidden="true"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500"
        />
      )}
    </div>
  );
};