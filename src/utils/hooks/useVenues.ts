import { hostApiSlice } from 'src/redux/api'
import usePersona from './usePersona'
import { Persona } from '@types'


const {
    useCreateVenueMutation
} = hostApiSlice

interface IUseVenues {
    createVenue: (name: string) => Promise<void>
}

const useVenues = () : IUseVenues => {

    const { persona } = usePersona()
    const [ createVenueMutation ] = useCreateVenueMutation()

    const createVenue = async (name: string) => {
        if (persona.activePersonaType === Persona.host && persona.activePersonaId !== null) {
            await createVenueMutation({
                hostId: persona.activePersonaId,
                name
            })
        }
    }
    
    return {
        createVenue
    }
}

export default useVenues