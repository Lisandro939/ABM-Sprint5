

export default function Subheader() {

    const button = "text-2xl font-semibold w-full "

  return (
    <div className='w-screen h-20 flex flex-row justify-between border-b-8 border-black'>
        <button className={button}>
          Usuarios
        </button>
        <button className={button + "relative"}>
          Stock
          <img className='absolute bottom-[-1px] left-1/2 transform -translate-x-1/2' src='/triangulo.png' width={20}/>
        </button>
        <button className={button}>
          Rubros
        </button>
        <button className={button}>
          Estadísticas
        </button>
        <button className={button}>
          Facturación
        </button>
    </div>
  )
}
