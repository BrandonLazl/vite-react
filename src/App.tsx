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
      description: 'Listado de todos los usuarios registrados en el sistema.',
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
      description: 'Información completa de cada venta, incluyendo productos y cantidades.',
      component: <DetalleVenta />
    }
  ]

  const handleCardClick = (id: string) => {
    setOpenCard(prev => (prev === id ? null : id))
  }

  return (
    <div style={{ padding: '2rem', backgroundColor: '#fff', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <h1 style={{ marginBottom: '2rem' }}>Bienvenido</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        {cards.map(card => (
          <div
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            style={{
              border: '1px solid #ccc',
              padding: '1rem',
              borderRadius: '8px',
              cursor: 'pointer',
              backgroundColor: '#fff',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
              transition: 'transform 0.2s, box-shadow 0.2s',
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
            <h2 style={{ margin: '0 0 0.5rem 0' }}>{card.title}</h2>
            <p style={{ margin: 0, fontSize: '0.9rem', color: '#555' }}>{card.description}</p>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '2rem', overflow: 'hidden', transition: 'all 0.4s ease' }}>
        {cards.map(card =>
          openCard === card.id ? (
            <div key={card.id} style={{ animation: 'fadeIn 0.5s' }}>
              {card.component}
            </div>
          ) : null
        )}
      </div>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  )
}

export default App

