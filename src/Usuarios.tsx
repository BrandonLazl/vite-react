import { useEffect, useState } from 'react'
import { supabase } from './supabase'

type Usuario = {
  id: string
  nombre: string
  email: string
  creado_en: string
}

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([])

  useEffect(() => {
    const fetchUsuarios = async () => {
      const { data, error } = await supabase
        .from('usuarios')
        .select('*')
        .order('creado_en', { ascending: false })

      if (error) {
        console.error(error)
      } else {
        setUsuarios(data as Usuario[])
      }
    }

    fetchUsuarios()
  }, [])

  return (
    <table border={1} cellPadding={8}>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Email</th>
          <th>Creado</th>
        </tr>
      </thead>
      <tbody>
        {usuarios.map(u => (
          <tr key={u.id}>
            <td>{u.nombre}</td>
            <td>{u.email}</td>
            <td>{new Date(u.creado_en).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
