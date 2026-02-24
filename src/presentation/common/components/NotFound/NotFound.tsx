import { useNavigate } from 'react-router-dom';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h2 style={{ fontSize: '24px', margin: '20px 0' }}>Página No Encontrada</h2>
      <p style={{ fontSize: '16px', color: '#666', margin: '20px 0' }}>Lo sentimos, la página que buscas no existe.</p>
      <button
        onClick={() => navigate('/')}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Volver al Inicio
      </button>
    </div>
  );
};
