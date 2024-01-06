import { useUser } from '@hooks'
import { useState } from 'react'

interface IUseCreateArtist {
    newArtistName: string
    setNewArtistName: (newArtistName: string) => void
    submitNewArtist: () => void
}

const useCreateArtist = () : IUseCreateArtist => {

    const [newArtistName, setNewArtistName] = useState<string>('')

    const { createArtist } = useUser()

    const submitNewArtist = () => {
        createArtist(newArtistName)
    }
    
    return {
        newArtistName,
        setNewArtistName,
        submitNewArtist
    }
}

export default useCreateArtist