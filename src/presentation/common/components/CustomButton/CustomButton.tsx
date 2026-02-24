import type { FC } from 'react';

interface ICustomButtonProps {
  handleSubmit: () => void;
  text: string;
  disabled?: boolean;
}

export const CustomButton: FC<ICustomButtonProps> = ({ handleSubmit, text, disabled = false }) => {
  return (
    <button disabled={disabled} onClick={handleSubmit}>
      {text}
    </button>
  );
};
