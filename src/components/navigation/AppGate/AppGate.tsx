import React from 'react'
import { usePersona } from '@hooks'
import Application from './apps'
import { PersonaGate } from './gates'


const AppGate = () => {
    const { persona } = usePersona()
    const App = Application[persona.activePersonaType]
    return (
        <PersonaGate>
            <App />
        </PersonaGate>
    )
}

export default AppGate