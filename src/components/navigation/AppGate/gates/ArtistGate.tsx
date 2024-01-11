import React, { useEffect } from 'react'
import { useArtist, usePersona } from '@hooks'


interface ArtistGateProps {
    children?: React.ReactNode
}

const ArtistGate : React.FC<ArtistGateProps> = ({
    children
}) => {

    const { artist, getArtistDetails } = useArtist()
    const { persona } = usePersona()

    useEffect(() => {
        if (persona.activePersonaId) {
            getArtistDetails(persona.activePersonaId)
        }
    }, [persona.activePersonaId])

    if (artist.isLoading) {
        return <></>
    }

    return children
}

export default ArtistGate