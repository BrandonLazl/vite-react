import { useState } from 'react'
import './App.css'
import Ventas from './Ventas'
import Usuarios from './Usuarios'
import Productos from './Productos'
import DetalleVenta from './DetalleVenta'

type Card = {
  id: string
  title: string
  description: string
  component: JSX.Element
}

function App() {
  const [openCard, setOpenCard] = useState<string | null>(null)

  const cards: Card[] = [
    {
      id: 'usuarios',
      title: 'Usuarios',
      description: 'Listado de todos los usuarios registrados.',
      component: <Usuarios />
    },
    {
      id: 'productos',
      title: 'Productos',
      description: 'Lista de productos disponibles y sus detalles.',
      component: <Productos />
    },
    {
      id: 'ventas',
      title: 'Ventas',
      description: 'Registro de todas las ventas realizadas.',
      component: <Ventas />
    },
    {
      id: 'detalle-venta',
      title: 'Detalle de Ventas',
      description: 'Información completa de cada venta con productos y cantidades.',
      component: <DetalleVenta />
    }
  ]

  const handleCardClick = (id: string) => {
    setOpenCard(prev => (prev === id ? null : id))
  }

  return (
    <div
      style={{
        backgroundColor: '#fff',
        minHeight: '100vh',
        fontFamily: 'sans-serif',
        padding: '2rem'
      }}
    >
      {/* Bienvenido arriba */}
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Bienvenido</h1>

      {/* Tarjetas */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem'
        }}
      >
        {cards.map(card => (
          <div
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '1rem',
              backgroundColor: '#fff',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={e => {
              const el = e.currentTarget
              el.style.transform = 'translateY(-3px)'
              el.style.boxShadow = '0 4px 10px rgba(0,0,0,0.15)'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget
              el.style.transform = 'translateY(0)'
              el.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)'
            }}
          >
            <h2 style={{ margin: '0 0 0.5rem 0', fontSize: '1.2rem' }}>
              {card.title}
            </h2>
            <p style={{ margin: 0, fontSize: '0.9rem', color: '#555' }}>
              {card.description}
            </p>
          </div>
        ))}
      </div>

      {/* Contenido de la tarjeta seleccionada */}
      <div style={{ transition: 'all 0.4s ease' }}>
        {cards.map(card =>
          openCard === card.id ? (
            <div
              key={card.id}
              style={{
                animation: 'fadeIn 0.4s',
                paddingTop: '1rem'
              }}
            >
              {card.component}
            </div>
          ) : null
        )}
      </div>

      {/* Animación fadeIn */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          body, html, #root {
            background-color: #fff;
            margin: 0;
            padding: 0;
          }
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th, td {
            padding: 8px;
            border: 1px solid #ccc;
          }
        `}
      </style>
    </div>
  )
}

export default App


