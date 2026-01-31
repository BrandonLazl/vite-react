import { useState } from 'react'
import './App.css'
import Ventas from './Ventas'
import Usuarios from './Usuarios'
import Productos from './Productos'
import DetalleVenta from './DetalleVenta'

function App() {
  // Estado para saber qué tabla mostrar. 'null' significa que no hay ninguna seleccionada.
  const [vistaActiva, setVistaActiva] = useState<string | null>(null);

  // Configuración de nuestras tarjetas
  const menu = [
    { id: 'usuarios', nombre: 'Usuarios', componente: <Usuarios /> },
    { id: 'productos', nombre: 'Productos', componente: <Productos /> },
    { id: 'ventas', nombre: 'Ventas', componente: <Ventas /> },
    { id: 'detalles', nombre: 'Detalle de Ventas', componente: <DetalleVenta /> },
  ];

  return (
    <div className="container">
      <h1>Panel de Control (Supabase)</h1>

      {/* --- SECCIÓN DE TARJETAS --- */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        {menu.map((item) => (
          <div 
            key={item.id}
            onClick={() => setVistaActiva(item.id)}
            style={{
              padding: '1.5rem',
              border: vistaActiva === item.id ? '2px solid #646cff' : '1px solid #ccc',
              borderRadius: '12px',
              cursor: 'pointer',
              backgroundColor: vistaActiva === item.id ? '#1a1a1a' : 'transparent',
              transition: 'all 0.3s ease'
            }}
          >
            <h3>{item.nombre}</h3>
            <p>Ver registros de {item.nombre.toLowerCase()}</p>
          </div>
        ))}
      </div>

      <hr />

      {/* --- RENDERIZADO CONDICIONAL --- */}
      <section style={{ marginTop: '2rem' }}>
        {!vistaActiva && <p>Selecciona una tarjeta para ver los datos.</p>}
        
        {/* Buscamos el componente que coincida con el ID activo */}
        {menu.find(m => m.id === vistaActiva)?.componente}
      </section>
      
      {vistaActiva && (
        <button 
          onClick={() => setVistaActiva(null)} 
          style={{ marginTop: '1rem', background: '#ff4747' }}
        >
          Cerrar tabla
        </button>
      )}
    </div>
  )
}

export default App