import { useEffect, useState } from 'react'
import { supabase } from './supabase'

type Venta = {
  id: string
  total: number
  fecha: string
  usuarios: {
    nombre: string
  }[]
  detalle_venta: {
    cantidad: number
    precio_unitario: number
    producto: {
      tipo: string
      peso: number
    }[]
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

      if (error) console.error(error)
      else setVentas(data as Venta[])
    }

    fetchVentas()
  }, [])

  return (
  <table border={1} cellPadding={8}>
    <thead>
      <tr>
        <th>Usuario</th>
        <th>Total</th>
        <th>Fecha</th>
      </tr>
    </thead>
    <tbody>
      {ventas.map(v => (
        <>
          <tr key={v.id}>
            <td>{v.usuarios[0]?.nombre}</td>
            <td>${v.total.toFixed(2)}</td>
            <td>{new Date(v.fecha).toLocaleString()}</td>
          </tr>

          <tr>
            <td colSpan={3}>
              <ul>
                {v.detalle_venta.map((d, i) => (
                  <li key={i}>
                    {d.producto[0]?.tipo} ({d.producto[0]?.peso}kg) —{' '}
                    {d.cantidad} × ${d.precio_unitario}
                  </li>
                ))}
              </ul>
            </td>
          </tr>
        </>
      ))}
    </tbody>
  </table>
)
}
