import { ApiIdentifier, Persona, PersonaState, ThemeMode } from '@types'
import { useDispatch, useSelector } from '@redux'
import { personaActions } from 'src/redux/persona'
import { useArtist, useHost, useUser } from '@hooks'
import useTheme from './useTheme'


const applicationPersonaThemeMap = {
    [Persona.user]: ThemeMode.dark,
    [Persona.host]: ThemeMode.light,
    [Persona.artist]: ThemeMode.light
}

interface IUsePersona {
    persona: PersonaState
    loadPersona: () => Promise<void>
    setIsLoading: (isLoading: boolean) => void
    setPersona: (personaId: ApiIdentifier, personaType: Persona) => void
}

const usePersona = () : IUsePersona => {

    const auth = useSelector(state => state.auth)
    const persona = useSelector(state => state.persona)
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const { getUserDetails } = useUser()
    const { getHostDetails } = useHost()
    const { getArtistDetails } = useArtist()
    const { setMode } = useTheme()

    const loadPersona = async () => {
        setIsLoading(true)

        // This means that the user is not logged in
        // If we've made it this far without having this, something has gone horribly wrong
        if (!auth.user?.id) {
            throw new Error('Error initializing persona: no auth user id found')
        }

        // This happens the very first time someone opens the application
        // In this case, default to the auth user account as the persona
        if (persona.activePersonaId === null) {
            setPersona(auth.user.id, Persona.user)
            await getUserDetails() // since we're in a user account, we only need to load the user details
        }

        // Otherwise, we've already opened the application before
        else {

            // First thing we need to check is if we've loaded the user details yet or not
            // This is regardless of anything else, since we always need the user details
            if (user.user === null) {
                await getUserDetails()
            }

            // Now that the user has for sure been loaded, we can just check if we're in an artist
            // or host account, and load the details for that account.

            // If we're in a host account, we need to load the host details
            if (persona.activePersonaType === Persona.host) {
                await getHostDetails(persona.activePersonaId)
            }

            // If we're in an artist account, we need to load the artist details
            else if (persona.activePersonaType === Persona.artist) {
                await getArtistDetails(persona.activePersonaId)
            }

        }

        setIsLoading(false)
    }

    const setPersona = (personaId: number, personaType: Persona) => {
        if (persona.activePersonaId !== personaId || persona.activePersonaType !== personaType) {
            dispatch(personaActions.setPersona({ personaId, personaType }))
            setMode(applicationPersonaThemeMap[personaType])
        }
    }

    const setIsLoading = (isLoading: boolean) => {
        dispatch(personaActions.setIsLoading(isLoading))
    }
    
    return {
        persona,
        loadPersona,
        setIsLoading,
        setPersona
    }
}

export default usePersona