import { useState, useEffect } from 'react'
import Header from './componets/Header'
import IconoNuevoGasto from './img/nuevo-gasto.svg'
import Modal from './componets/Modal'
import { generarID } from './helpers'
import ListadoGastos from './componets/ListadoGastos'
import Filtros from './componets/Filtros'

function App() {
  const [gastos, setGastos] = useState([
    ...(JSON.parse(localStorage.getItem("gastos")) ?? [])
  ]);
  const [presupuesto, setPresupuesto] = useState(Number(localStorage.getItem('presupuesto')) ?? 0)
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)
  const [modal, setModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)
  const [gastoEditar, setGastoEditar] = useState({})
  const [filtro, setFiltro] = useState('')
  const [gastosFiltrados, setGastosFiltrados] = useState([])


  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      setModal(true)

      setTimeout(() => {
        setAnimarModal(true)
      }, 500);
    }

  }, [gastoEditar])

  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0)
  }, [presupuesto])

  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
  }, [gastos])

  useEffect(() => {
    const Filtrados = gastos.filter(gasto => gasto.categoria === filtro)
    setGastosFiltrados(Filtrados)
  }, [filtro])

  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0

    if (presupuestoLS > 0) {
      setIsValidPresupuesto(true)
    }
  }, [])




  const handleNuevoGasto = () => {
    setGastoEditar({})
    setModal(true)

    setTimeout(() => {
      setAnimarModal(true)
    }, 500);
  }
  const guardarGasto = gasto => {

    if (gasto.id) {
      //Actualizar
      const gastosActualizados = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState)
      setGastos(gastosActualizados)
      setGastoEditar({})
    } else {
      //Agregar nuevo gasto
      gasto.id = generarID()
      gasto.fecha = Date.now()
      setGastos([...gastos, gasto])
    }



    setAnimarModal(false)

    setTimeout(() => {
      setModal(false)

    }, 500);

  }
  const eliminarGasto = id => {
    const gastosActualizados = gastos.filter(gastos => gastos.id !== id)
    setGastos(gastosActualizados)
  }
  return (
    <div className={modal ? 'fijar' : ''}>
      <Header
        gastos={gastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
        setGastos={setGastos}
      />
      {isValidPresupuesto ? (
        <>
          <main>
            <Filtros
              filtro={filtro}
              setFiltro={setFiltro}
            />
            <ListadoGastos
              gastos={gastos}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
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
        gastoEditar={gastoEditar}
        setGastoEditar={setGastoEditar}
      />}

    </div>
  )
}

export default App
