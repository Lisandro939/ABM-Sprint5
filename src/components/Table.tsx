import { ChangeEvent, useEffect, useState } from 'react'

export default function Table() {

  const [form, setForm] = useState('hidden')

  const [guardando, setGuardando] = useState(false)
  const [texto, setTexto] = useState('')

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
    fetch("https://el-buen-sabor.zeabur.app/api/v1/articulosManufacturados/listaProductos")
    .then(res => res.json())
    .then(res => setData(res))
  }, [])

  function postProduct() {
    setGuardando(true)
    fetch("https://el-buen-sabor.zeabur.app/api/v1/articulosManufacturados/addProducto", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(producto)
    })
    .then((res) => {
      console.log(res.json())
    })
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
                    <button className='bg-yellow-300 rounded-lg shadow-md shadow-gray-400 px-2 py-1 hover:shadow-white font-semibold'>
                      Editar
                    </button>
                    <button className='bg-red-300 rounded-lg shadow-md shadow-gray-400 px-2 py-1 hover:shadow-white font-semibold'>
                      Eliminar
                    </button>
                  </td>

                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
    <div className={'fixed top-0 w-screen h-screen flex items-center justify-center ' + form}>
      <div className='flex flex-col justify-between w-2/3 h-2/3 bg-white border-[1px] border-gray-500 rounded-md shadow-xl shadow-gray-500'>
        <div className='flex flex-row justify-between items-center px-10 py-4'>
          <h1 className='font-semibold text-xl'>Nuevo producto</h1>
          <button 
          className='bg-red-300 rounded-lg shadow-md shadow-gray-400 px-2 py-1 hover:shadow-white font-semibold'
          onClick={() => setForm("hidden")}>
            Cerrar
          </button>
        </div>
        <div className='px-10 py-4'>
          <form className='grid grid-cols-2 gap-4'>
              <div className='flex flex-col gap-2'>
                <label>Nombre</label>
                <input 
                className='border-[1px] border-gray-400 rounded-md shadow-md shadow-gray-400' 
                type="text" 
                name='nombre'
                value={producto.nombre}
                onChange={handleInputChange}/>
              </div>
              <div className='flex flex-col gap-2'>
                <label>Rubro</label>
                <select 
                className='border-[1px] border-gray-400 rounded-md shadow-md shadow-gray-400'
                name='rubro'
                value={producto.rubro}
                onChange={handleInputChange}>
                  <option>Hamburguesa</option>
                  <option>Pizza</option>
                  <option>Papas fritas</option>
                  <option>Bebidas</option>
                </select>
              </div>
              <div className='flex flex-col gap-2'>
                <label>Stock minimo</label>
                <input 
                className='border-[1px] border-gray-400 rounded-md shadow-md shadow-gray-400' 
                type="number" 
                name='stockMinimo'
                value={producto.stockMinimo}
                onChange={handleInputChange}/>
              </div>
              <div className='flex flex-col gap-2'>
                <label>Stock actual</label>
                <input 
                className='border-[1px] border-gray-400 rounded-md shadow-md shadow-gray-400' 
                type="number" 
                name='stockActual'
                value={producto.stockActual}
                onChange={handleInputChange}
                />
              </div>
              <div className='flex flex-col gap-2'>
                <label>Precio de costo</label>
                <input 
                className='border-[1px] border-gray-400 rounded-md shadow-md shadow-gray-400' 
                type="number" 
                name='precioDeCosto'
                value={producto.precioDeCosto}
                onChange={handleInputChange}
                />
              </div>
               <div className='flex flex-col gap-2'>
                <label>Tiempo estimado en cocina</label>
                <input 
                className='border-[1px] border-gray-400 rounded-md shadow-md shadow-gray-400' 
                type="number" 
                name='tiempoEnCocina'
                value={producto.tiempoEnCocina}
                onChange={handleInputChange}
                />
              </div>
              <div className='flex flex-col gap-2'>
                <label>Unidad de medida</label>
                <input 
                className='border-[1px] border-gray-400 rounded-md shadow-md shadow-gray-400' 
                type="text" 
                name='unidadDeMedida'
                value={producto.unidadDeMedida}
                onChange={handleInputChange}
                />
              </div>
          </form>
          
        </div>
        <div className='w-full flex flex-row justify-between items-end px-4 py-4'>
          <button 
          className='bg-green-300 rounded-lg shadow-md shadow-gray-400 px-2 py-1 hover:shadow-white font-semibold'
          onClick={() => postProduct()}
          >
            Guardar
          </button>
          {
            guardando ? (
              <p className='font-semibold text-yellow-400'>Guardando...</p>
            ) : (
              <p className='font-semibold text-green-400'>{texto}</p>
            )
          }
        </div>
      </div>
    </div>
    </>
  )
}
