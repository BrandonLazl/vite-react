import { useEffect, useState } from 'react'
import { supabase } from './supabase'

type Venta = {
  id: string
  total: number
  fecha: string
  usuarios: {
    nombre: string
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
          <tr key={v.id}>
            <td>{v.usuarios[0]?.nombre}</td>
            <td>${v.total}</td>
            <td>{new Date(v.fecha).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
