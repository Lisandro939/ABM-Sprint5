import { ChangeEvent, useEffect, useState } from 'react'
import Form from './Form'

export default function Table() {

  const [form, setForm] = useState('hidden')
  const [guardando, setGuardando] = useState(false)
  const [texto, setTexto] = useState('')
  const [token, setToken] = useState('')
  const [mode, setMode] = useState('new')

  type Product = {
    nombre: string,
    rubro: string,
    precioDeCosto: number,
    tiempoEnCocina: number,
    stockMinimo: number,
    stockActual: number,
    unidadDeMedida: string,
    nivelDeStock: string,
    estado: string
  }

  const [producto, setProducto] = useState<Product>({
    nombre: '',
    rubro: '',
    precioDeCosto: 0,
    tiempoEnCocina: 0,
    stockMinimo: 0,
    stockActual: 0,
    unidadDeMedida: '',
    nivelDeStock: '',
    estado: ''
  })

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === 'precioDeCosto' || name === 'tiempoEnCocina' || name === 'stockMinimo' || name === 'stockActual') {
      if (parseInt(value) >= 0) {
        setProducto({
          ...producto,
          [name]: parseInt(value),
        });
      }
      
    } else {
      setProducto({
        ...producto,
        [name]: value,
      });
    }
  };


  const [data, setData] = useState<Product[]>([])

  useEffect(() => {
    fetch("https://el-buen-sabor.zeabur.app/auth/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "username": "Lisandro939",
        "password": "lisandro123"
      })
    })
    .then((res) => res.json())
    .then((res) => {
      localStorage.setItem('token', res.token)
      setToken(res.token)

      fetch("https://el-buen-sabor.zeabur.app/api/v1/articulosManufacturados/listaProductos",
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      })
      .then(res => res.json())
      .then(res => setData(res))
    })


    
    
  }, [])

  function postProduct() {
    setGuardando(true)
    fetch("https://el-buen-sabor.zeabur.app/api/v1/articulosManufacturados/addProduct", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(producto)
    })
    .then(() => {
      setGuardando(false)
      setTexto('Guardado')
    })
  }

  function putProduct() {
    setGuardando(true)
    fetch("https://el-buen-sabor.zeabur.app/api/v1/articulosManufacturados/modifyProduct", {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(producto)
    })
    .then(() => {
      setGuardando(false)
      setTexto('Guardado')
    })
  }

  function handleEdit(product: Product) {
    setProducto(product)
  }

  return (
    <>
    <div className='flex flex-row justify-between items-center px-10 py-4'>
        <div className='flex flex-row gap-4'>
          <button className='bg-yellow-300 rounded-lg shadow-md shadow-gray-400 px-2 py-1 hover:shadow-white font-semibold'>
            Registrar compra
          </button>
          <button 
          className='bg-green-300 rounded-lg shadow-md shadow-gray-400 px-2 py-1 hover:shadow-white font-semibold'
          onClick={() => setForm("flex")}>
            Nuevo
          </button>
        </div>
        <div className='flex flex-row gap-2 items-center'>
          <label className='font-semibold'>Nivel de stock:</label>
          <select 
          className='bg-gray-300 px-2 py-1 rounded-lg'>
            <option>Stock</option>
            <option>Stock bajo</option>
            <option>Stock alto</option>
          </select>
        </div>
        <div className='flex flex-row gap-2'>
          <input className='border-[1px] border-gray-400 rounded-md shadow-md shadow-gray-400' type="text" />
          <img className='object-contain' src='/lupa.png' width={20} height={20}/>
        </div>
    </div>
    <div className='px-10 w-screen'>
      <table className='w-full'>
        <thead className='w-full bg-gray-300'>
          <tr>
            <th>Producto</th>
            <th>Rubro</th>
            <th>Precio de costo</th>
            <th>Tiempo en cocina</th>
            <th>Stock min</th>
            <th>Stock act</th>
            <th>Unidad medida</th>
            <th>Nivel de stock</th>
            <th>Estado</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody className='w-full'>
          {
            data.length > 0 ? 
            data.map((product) => {
              return (
                <tr key={product.nombre} className='w-full'>
                  <td className='text-center'>{product.nombre}</td>
                  <td className='text-center'>{product.rubro}</td>
                  <td className='text-center'>${product.precioDeCosto}</td>
                  <td className='text-center'>{product.tiempoEnCocina} min</td>
                  <td className='text-center'>{product.stockMinimo}</td>
                  <td className='text-center'>{product.stockActual}</td>
                  <td className='text-center'>{product.unidadDeMedida}</td>
                  <td className='text-center'>{product.nivelDeStock}</td>
                  <td className='text-center'>{product.estado}</td>
                  <td className='text-center'>
                    <button 
                    onClick={() => {
                      handleEdit(product)
                      setForm('flex')
                      setMode('edit')
                    }}
                    className='bg-yellow-300 rounded-lg shadow-md shadow-gray-400 px-2 py-1 hover:shadow-white font-semibold'>
                      Editar
                    </button>
                   
                  </td>

                </tr>
              )
            })
            : <tr><td className='text-center' colSpan={10}>Cargando...</td></tr>
          }
        </tbody>
      </table>
    </div>
    <div className={'fixed top-0 w-screen h-screen flex items-center justify-center ' + form}>
      <Form 
      producto={producto}
      handleInputChange={handleInputChange}
      mode={mode}
      setForm={setForm}
      postProduct={postProduct}
      putProduct={putProduct}
      guardando={guardando}
      texto={texto}
      />
    </div>
    </>
  )
}
