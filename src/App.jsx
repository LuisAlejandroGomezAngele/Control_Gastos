import { useState } from 'react'
import Header from './componets/Header'
import IconoNuevoGasto from './img/nuevo-gasto.svg'
import Modal from './componets/Modal'
import { generarID } from './helpers'
import ListadoGastos from './componets/ListadoGastos'

function App() {
  const [presupuesto, setPresupuesto] = useState(0)
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)
  const [modal, setModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)
  const [gastos, setGastos] = useState([])

  const handleNuevoGasto = () => {
    setModal(true)

    setTimeout(() => {
      setAnimarModal(true)
    }, 500);
  }
  const guardarGasto = gasto => {
    gasto.id = generarID()
    gasto.fecha = Date.now()

    setGastos([...gastos, gasto])

    setAnimarModal(false)

    setTimeout(() => {
      setModal(false)

    }, 500);

  }
  return (
    <>
      <Header
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
      />
      {isValidPresupuesto ? (
        <>
          <main>
            <ListadoGastos 
            gastos={gastos}
            />
          </main>
          <div className='nuevo-gasto'>
            <img
              src={IconoNuevoGasto}
              alt='Icono nuevo gasto'
              onClick={handleNuevoGasto}
            />

          </div>
        </>
      ) : null}
      {modal && <Modal
        setModal={setModal}
        animarModal={animarModal}
        setAnimarModal={setAnimarModal}
        guardarGasto={guardarGasto}
      />}

    </>
  )
}

export default App
