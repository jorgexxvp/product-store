import React from 'react';

export const Loading: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-dvh flex-col gap-2">
      <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin" role="status">
        <span className="sr-only"></span>
      </div>
      <p>Cargando...</p>
    </div>
  );
};
