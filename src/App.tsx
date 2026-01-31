import { useState } from 'react'
import './App.css'
import Ventas from './Ventas'
import Usuarios from './Usuarios'
import Productos from './Productos'
import DetalleVenta from './DetalleVenta'

function App() {
  const [vistaActiva, setVistaActiva] = useState<string | null>(null);

  const menu = [
    { id: 'usuarios', nombre: 'Usuarios'},
    { id: 'productos', nombre: 'Productos'},
    { id: 'ventas', nombre: 'Ventas'},
    { id: 'detalles', nombre: 'Detalle de Ventas'},
  ];

  const renderizarTabla = () => {
    switch (vistaActiva) {
      case 'usuarios': return <Usuarios />;
      case 'productos': return <Productos />;
      case 'ventas': return <Ventas />;
      case 'detalles': return <DetalleVenta />;
      default: return null;
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#ffffff', 
      color: '#000000',           
      fontFamily: 'system-ui, sans-serif',
      padding: '2rem' 
    }}>
      
      <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#000000', marginBottom: '0.5rem' }}>
          Bienvenido
        </h1>
        <p style={{ color: '#333333' }}>Equipo 1</p>
      </header>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
        gap: '1.5rem', 
        maxWidth: '1100px',
        margin: '0 auto 3rem auto'
      }}>
        {menu.map((item) => (
          <div 
            key={item.id}
            onClick={() => setVistaActiva(item.id)}
            style={{
              padding: '2rem',
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              cursor: 'pointer',
              textAlign: 'center',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)', 
              border: vistaActiva === item.id ? '2px solid #000000' : '1px solid #eeeeee',
              transition: 'all 0.3s ease',
              transform: vistaActiva === item.id ? 'scale(1.02)' : 'scale(1)'
            }}
          >
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}></div>
            <h3 style={{ margin: 0, color: '#000000' }}>{item.nombre}</h3>
          </div>
        ))}
      </div>

      <main style={{ 
        maxWidth: '1100px', 
        margin: '0 auto',
        backgroundColor: '#ffffff',
        color: '#000000', 
      }}>
        {!vistaActiva ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#666666' }}>
            <p style={{ fontSize: '1.2rem' }}>Selecciona una tarjeta para ver la información.</p>
          </div>
        ) : (
          <div>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              marginBottom: '2rem',
              borderBottom: '1px solid #eee',
              paddingBottom: '1rem'
            }}>
              <h2 style={{ textTransform: 'capitalize', margin: 0, color: '#000000' }}>
                Registros: {vistaActiva}
              </h2>
              <button 
                onClick={() => setVistaActiva(null)}
                style={{
                  backgroundColor: '#333333',
                  color: '#ffffff',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                Volver
              </button>
            </div>
            
            <div style={{ overflowX: 'auto', color: '#000000' }}>
              {renderizarTabla()}
            </div>
          </div>
        )}
      </main>

    </div>
  )
}

export default App