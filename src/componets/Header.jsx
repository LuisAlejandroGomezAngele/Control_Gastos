import React from 'react'
import NuevoPresupuesto from './NuevoPresupuesto'
import ControlPresupuesto from './ControlPresupuesto'

export default function Header({ presupuesto, setPresupuesto, isValidPresupuesto, setIsValidPresupuesto }) {
  return (
    <div>
      <header>
        <h1>Planificador de Gastos</h1>
        {isValidPresupuesto ? (
          <ControlPresupuesto
            presupuesto={presupuesto}
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
