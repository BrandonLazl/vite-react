import { useEffect, useState } from 'react'
import { supabase } from './supabase'

type DetalleVentaType = {
  id: number
  venta_id: string 
  cantidad: number
  precio_unitario: number
  ventas: {
    fecha: string
    usuarios: {
      nombre: string
    }
  } 
  producto: {
    tipo: string
    peso: number
  }
}

export default function DetalleVenta() {
  const [detalles, setDetalles] = useState<DetalleVentaType[]>([])

  useEffect(() => {
    const fetchDetalle = async () => {
      const { data, error } = await supabase
        .from('detalle_venta')
        .select(`
          id,
          venta_id, 
          cantidad,
          precio_unitario,
          ventas (
            fecha,
            usuarios (
              nombre
            )
          ),
          producto (
            tipo,
            peso
          )
        `)
        .order('id')

      if (error) {
        console.error("Error de Supabase:", error)
      } else {
        setDetalles(data as unknown as DetalleVentaType[])
      }
    }

    fetchDetalle()
  }, [])

  return (
    <table border={1} cellPadding={8} style={{ width: '100%', borderCollapse: 'collapse', color: '#000' }}>
      <thead>
        <tr style={{ backgroundColor: '#eeeeee' }}>
          <th>UUID Venta</th>
          <th>Cliente</th>
          <th>Producto</th>
          <th>Cantidad</th>
          <th>Precio Unitario</th>
          <th>Total</th>
          <th>Fecha</th>
        </tr>
      </thead>
      <tbody>
        {detalles.map(d => (
          <tr key={d.id}>
            <td style={{ fontSize: '0.75rem', fontFamily: 'monospace' }}>{d.venta_id}</td>
            <td>{d.ventas?.usuarios?.nombre || 'N/A'}</td>
            
            <td>
              {d.producto?.tipo} ({d.producto?.peso}kg)
            </td>
            
            <td>{d.cantidad}</td>
            <td>${d.precio_unitario?.toFixed(2)}</td>
            <td>${(d.cantidad * d.precio_unitario).toFixed(2)}</td>
            
            <td>{d.ventas?.fecha ? new Date(d.ventas.fecha).toLocaleDateString() : '---'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}