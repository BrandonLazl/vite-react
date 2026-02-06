import { useEffect, useState } from 'react'
import { supabase } from './supabase'

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
      const { data, error } = await supabase
        .from('ventas')
        .select(`
          id,
          usuario_id, 
          total,
          fecha,
          usuarios (
            nombre
          ),
          detalle_venta (
            cantidad,
            precio_unitario,
            producto (
              tipo,
              peso
            )
          )
        `)
        .order('fecha', { ascending: false })

      if (error) {
        console.error(error)
      } else {
        setVentas(data as unknown as Venta[])
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