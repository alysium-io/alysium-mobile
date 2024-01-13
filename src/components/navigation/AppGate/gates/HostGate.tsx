import React, { useEffect } from 'react'
import { useHost, usePersona } from '@hooks'


interface HostGateProps {
    children?: React.ReactNode
}

const HostGate : React.FC<HostGateProps> = ({
    children
}) => {

    const { host, getHostDetails } = useHost()
    const { persona } = usePersona()

    useEffect(() => {
        if (persona.activePersonaId) {
            getHostDetails(persona.activePersonaId)
        }
    }, [persona.activePersonaId])

    if (host.isLoading) {
        return <></>
    }

    return children
}

export default HostGate