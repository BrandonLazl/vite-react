import { useEffect, useState } from 'react'

type Venta = {
  id: string
  usuario_id: string 
  total: number
  fecha: string
  usuarios: {
    nombre: string
  } 
  detalle_venta: {
    cantidad: number
    precio_unitario: number
    producto: {
      tipo: string
      peso: number
    }
  }[]
}

export default function Ventas() {
  const [ventas, setVentas] = useState<Venta[]>([])
  
useEffect(() => {
  const fetchVentas = async () => {
    try {
      const res = await fetch('https://backend-aranza.vercel.app/api/ventas')
      const data = await res.json()
      setVentas(data)
    } catch (err) {
      console.error(err)
    }
  }

  fetchVentas()
}, [])

  return (
    <table border={1} cellPadding={8} style={{ width: '100%', borderCollapse: 'collapse', color: '#000' }}>
      <thead>
        <tr style={{ backgroundColor: '#eeeeee' }}>
          <th>ID Usuario (UUID)</th>
          <th>Nombre Cliente</th>
          <th>Total</th>
          <th>Fecha</th>
        </tr>
      </thead>
      <tbody>
        {ventas.map(v => (
          <tr key={v.id}>
            <td style={{ fontSize: '0.75rem', fontFamily: 'monospace' }}>{v.usuario_id}</td>
            <td>{v.usuarios?.nombre || 'Desconocido'}</td>
            
            <td style={{ fontWeight: 'bold' }}>${v.total.toFixed(2)}</td>
            
            <td>{new Date(v.fecha).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}