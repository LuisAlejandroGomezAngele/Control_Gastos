import React from 'react'
import NuevoPresupuesto from './NuevoPresupuesto'
import ControlPresupuesto from './ControlPresupuesto'

export default function Header({ gastos, presupuesto, setPresupuesto, isValidPresupuesto, setIsValidPresupuesto, setGastos }) {
  return (
    <div>
      <header>
        <h1>Planificador de Gastos</h1>
        {isValidPresupuesto ? (
          <ControlPresupuesto
            gastos={gastos}
            setGastos={setGastos}
            presupuesto={presupuesto}
            setPresupuesto={setPresupuesto}
            setIsValidPresupuesto={setIsValidPresupuesto}
          />

        ) : (
          <NuevoPresupuesto
            presupuesto={presupuesto}
            setPresupuesto={setPresupuesto}
            setIsValidPresupuesto={setIsValidPresupuesto}
          />
        )}

      </header>
    </div>
  )
}
