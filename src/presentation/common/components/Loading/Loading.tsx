import React from 'react';

export const Loading: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-dvh flex-col gap-2" role="status" aria-live="assertive">
      <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin" aria-hidden="true" />
      <p className="text-gray-600 font-medium font-sans">Cargando...</p>
      <span className="sr-only">Cargando productos</span>
    </div>
  );
};
