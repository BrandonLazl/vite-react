import { useEffect, useState } from 'react'
import { supabase } from './supabase'

type Producto = {
  id: number
  tipo: string
  peso: number
  precio: number
  cantidad: number
}

export default function Productos() {
  const [productos, setProductos] = useState<Producto[]>([])

  useEffect(() => {
    const fetchProductos = async () => {
      const { data, error } = await supabase
        .from('producto')
        .select('*')
        .order('id')

      if (error) console.error(error)
      else setProductos(data as Producto[])
    }

    fetchProductos()
  }, [])

  return (
    <table border={1} cellPadding={8}>
      <thead>
        <tr>
          <th>Tipo</th>
          <th>Peso</th>
          <th>Precio</th>
          <th>Stock</th>
        </tr>
      </thead>
      <tbody>
        {productos.map(p => (
          <tr key={p.id}>
            <td>{p.tipo}</td>
            <td>{p.peso}</td>
            <td>${p.precio}</td>
            <td>{p.cantidad}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
