import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PersonaState, Persona } from '@types'


const initialState : PersonaState = {
    activePersonaType: Persona.user,
    activePersonaId: null,
    isLoading: true
}

const personaSlice = createSlice({
    name: 'persona',
    initialState,
    reducers: {
        setPersona: (state, action: PayloadAction<{ personaId: number, personaType: Persona }>) => {
            state.activePersonaType = action.payload.personaType
            state.activePersonaId = action.payload.personaId
        },
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload
        }
    }
})

export const personaReducer = personaSlice.reducer
export const personaActions = personaSlice.actions