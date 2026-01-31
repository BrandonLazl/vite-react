import { useState } from 'react'
import './App.css'
import Ventas from './Ventas'
import Usuarios from './Usuarios'
import Productos from './Productos'
import DetalleVenta from './DetalleVenta'

function App() {
  const [vistaActiva, setVistaActiva] = useState<string | null>(null);

  const menu = [
    { id: 'usuarios', nombre: 'Usuarios', componente: <Usuarios /> },
    { id: 'productos', nombre: 'Productos', componente: <Productos /> },
    { id: 'ventas', nombre: 'Ventas', componente: <Ventas /> },
    { id: 'detalles', nombre: 'Detalle de Ventas', componente: <DetalleVenta /> },
  ];

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', color: '#333', padding: '2rem' }}>
      <h1 style={{ color: '#000' }}>Panel de Control</h1>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '1rem', 
        marginBottom: '2rem' 
      }}>
        {menu.map((item) => (
          <div 
            key={item.id}
            onClick={() => setVistaActiva(item.id)}
            style={{
              padding: '1.5rem',       
              backgroundColor: '#fff',
              border: vistaActiva === item.id ? '2px solid #007bff' : '1px solid #ddd',
              borderRadius: '12px',
              cursor: 'pointer',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              transition: 'all 0.2s ease',
              textAlign: 'center'
            }}
          >
            <h3 style={{ margin: 0, color: vistaActiva === item.id ? '#007bff' : '#333' }}>
              {item.nombre}
            </h3>
          </div>
        ))}
      </div>

      <hr style={{ border: '0.5px solid #eee' }} />

      <section style={{ marginTop: '2rem', backgroundColor: '#f9f9f9', padding: '1rem', borderRadius: '8px' }}>
        {!vistaActiva ? (
          <p style={{ color: '#666' }}>Selecciona una categoría para ver los datos de Supabase.</p>
        ) : (
          <div>
             <button 
              onClick={() => setVistaActiva(null)} 
              style={{ marginBottom: '1rem', backgroundColor: '#666', color: 'white' }}
            >
              ← Volver
            </button>
            {menu.find(m => m.id === vistaActiva)?.componente}
          </div>
        )}
      </section>
    </div>
  )
}
export default App
