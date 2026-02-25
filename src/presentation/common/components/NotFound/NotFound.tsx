import { useNavigate } from 'react-router-dom';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-6">
      <h2 className="text-2xl font-semibold my-5">Página No Encontrada</h2>

      <p className="text-base text-gray-600 my-5">Lo sentimos, la página que buscas no existe.</p>

      <button
        onClick={() => navigate('/')}
        className="px-5 py-2.5 text-base bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700 transition-colors duration-200"
      >
        Volver al Inicio
      </button>
    </div>
  );
};
