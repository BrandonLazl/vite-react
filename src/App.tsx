import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Ventas from './Ventas'
import Usuarios from './Usuarios'
import Productos from './Productos'
import DetalleVenta from './DetalleVenta'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <h1>Vite + React Dashboard</h1>

      {/* Tarjetas de navegación */}
      <div style={{ display: 'flex', gap: '1rem', margin: '2rem 0' }}>
        <Link to="/usuarios" style={{ textDecoration: 'none' }}>
          <div style={{
            border: '1px solid #ccc',
            padding: '1rem',
            width: '150px',
            textAlign: 'center',
            cursor: 'pointer'
          }}>
            <img src="/usuario.png" alt="Usuarios" width={80} />
            <p>Usuarios</p>
          </div>
        </Link>

        <Link to="/productos" style={{ textDecoration: 'none' }}>
          <div style={{
            border: '1px solid #ccc',
            padding: '1rem',
            width: '150px',
            textAlign: 'center',
            cursor: 'pointer'
          }}>
            <img src="/producto.png" alt="Productos" width={80} />
            <p>Productos</p>
          </div>
        </Link>

        <Link to="/ventas" style={{ textDecoration: 'none' }}>
          <div style={{
            border: '1px solid #ccc',
            padding: '1rem',
            width: '150px',
            textAlign: 'center',
            cursor: 'pointer'
          }}>
            <img src="/ventas.png" alt="Ventas" width={80} />
            <p>Ventas</p>
          </div>
        </Link>

        <Link to="/detalle-venta" style={{ textDecoration: 'none' }}>
          <div style={{
            border: '1px solid #ccc',
            padding: '1rem',
            width: '150px',
            textAlign: 'center',
            cursor: 'pointer'
          }}>
            <img src="/detalle.png" alt="Detalle Venta" width={80} />
            <p>Detalle Venta</p>
          </div>
        </Link>
      </div>

      {/* Rutas */}
      <Routes>
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/ventas" element={<Ventas />} />
        <Route path="/detalle-venta" element={<DetalleVenta />} />
        <Route path="/" element={
          <div>
            <p>Selecciona una tarjeta para ver los datos.</p>
          </div>
        } />
      </Routes>

      {/* Contador opcional */}
      <div className="card" style={{ marginTop: '2rem' }}>
        <button onClick={() => setCount(count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </Router>
  )
}

export default App
