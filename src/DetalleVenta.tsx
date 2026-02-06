import { useEffect, useState } from 'react'
import { supabase } from './supabase'

type DetalleVentaType = {
  id: number
  cantidad: number
  precio_unitario: number
  ventas: {
    fecha: string
    usuarios: {
      nombre: string
    }[]
  }[]
  producto: {
    tipo: string
    peso: number
  }[]
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

      if (error) console.error(error)
      else setDetalles(data as DetalleVentaType[])
    }

    fetchDetalle()
  }, [])

  return (
    <table border={1} cellPadding={8}>
      <thead>
        <tr>
          <th>Venta</th>
          <th>Producto</th>
          <th>Cantidad</th>
          <th>Precio Unitario</th>
        </tr>
      </thead>
      <tbody>
        {detalles.map(d => (
          <tr key={d.id}>
            <td>{d.ventas[0]?.usuarios[0]?.nombre}</td>
            <td>
              {d.producto[0]?.tipo} ({d.producto[0]?.peso}kg)
            </td>
            <td>{d.cantidad}</td>
            <td>${d.precio_unitario.toFixed(2)}</td>
            <td>${(d.cantidad * d.precio_unitario).toFixed(2)}</td>
            <td>{new Date(d.ventas[0]?.fecha).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
