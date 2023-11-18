

export default function Form({setForm, guardando, texto, mode, producto, handleInputChange, postProduct, putProduct}: any) {
  return (
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
              <div className='flex flex-col gap-2'>
                <label>Estado</label>
                <select
                className='border-[1px] border-gray-400 rounded-md shadow-md shadow-gray-400'
                name='estado'
                value={producto.estado}
                onChange={handleInputChange}
                >
                  <option>Alta</option>
                  <option>Baja</option>
                </select>
              </div>
                
          </form>
          
        </div>
        <div className='w-full flex flex-row justify-between items-end px-4 py-4'>
          <button 
          className='bg-green-300 rounded-lg shadow-md shadow-gray-400 px-2 py-1 hover:shadow-white font-semibold'
          onClick={() => {
            if (mode === 'edit') {
              putProduct()
            } else {
              postProduct()
            }
            
          }}
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
  )
}
