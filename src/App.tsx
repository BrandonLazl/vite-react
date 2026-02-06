import { useState } from 'react'
import './App.css'
import Ventas from './Ventas'
import Usuarios from './Usuarios'
import Productos from './Productos'
import DetalleVenta from './DetalleVenta'

function App() {
  const [vistaActiva, setVistaActiva] = useState<string | null>(null);

  const menu = [
    { id: 'usuarios', nombre: 'Usuarios', icono: '👥' },
    { id: 'productos', nombre: 'Productos', icono: '📦' },
    { id: 'ventas', nombre: 'Ventas', icono: '💰' },
    { id: 'detalles', nombre: 'Detalle de Ventas', icono: '📋' },
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
      backgroundColor: '#001f3f', 
      color: '#ffffff',           
      fontFamily: 'system-ui, sans-serif',
      padding: '2rem' 
    }}>
      
      <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#ffffff', marginBottom: '0.5rem' }}>
          Gestión de Inventario
        </h1>
        <p style={{ color: '#cbd5e0' }}>Conectado a Supabase API</p>
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
              boxShadow: vistaActiva === item.id ? '0 0 20px rgba(255,255,255,0.3)' : '0 4px 12px rgba(0,0,0,0.2)',
              border: vistaActiva === item.id ? '3px solid #646cff' : '1px solid transparent',
              transition: 'all 0.3s ease',
              transform: vistaActiva === item.id ? 'scale(1.05)' : 'scale(1)'
            }}
          >
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{item.icono}</div>
            <h3 style={{ margin: 0, color: '#001f3f' }}>{item.nombre}</h3>
          </div>
        ))}
      </div>
      <main style={{ 
        maxWidth: '1100px', 
        margin: '0 auto',
        backgroundColor: '#ffffff', 
        color: '#000000',           
        borderRadius: '12px',
        padding: vistaActiva ? '2rem' : '0',
        minHeight: vistaActiva ? '200px' : '0'
      }}>
        {!vistaActiva ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#ffffff' }}>
            <p style={{ fontSize: '1.2rem' }}>Selecciona una tarjeta para gestionar los datos.</p>
          </div>
        ) : (
          <div>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              marginBottom: '2rem',
              borderBottom: '1px solid #eeeeee',
              paddingBottom: '1rem'
            }}>
              <h2 style={{ margin: 0, color: '#001f3f' }}>Listado de {vistaActiva}</h2>
              <button 
                onClick={() => setVistaActiva(null)}
                style={{
                  backgroundColor: '#333333', 
                  color: '#ffffff',
                  border: 'none',
                  padding: '10px 25px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                Volver
              </button>
            </div>
            
            <div style={{ overflowX: 'auto' }}>
              {renderizarTabla()}
            </div>
          </div>
        )}
      </main>

    </div>
  )
}

export default App