import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { GeneralState, Persona, SearchItem } from '@types'


const initialState : GeneralState = {
    token: null,
    recentSearches: [],
    personaId: null,
    personaType: null
}

const generalStateSlice = createSlice({
    name: 'generalState',
    initialState,
    reducers: {
        setPersona: (state, action: PayloadAction<{ personaId: number, personaType: Persona }>) => {
            state.personaType = action.payload.personaType
            state.personaId = action.payload.personaId
        },
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload
        },
        setRecentSearches: (state, action: PayloadAction<SearchItem[]>) => {
            state.recentSearches = action.payload
        },
        addRecentSearch: (state, action: PayloadAction<SearchItem>) => {
            // First remove it if it exists
            state.recentSearches = state.recentSearches.filter(item => item.id !== action.payload.id)

            // Add it to the beginning
            state.recentSearches.unshift(action.payload)

            // Limit the array to 10 items
            if (state.recentSearches.length > 50) {
                state.recentSearches.pop()
            }
        },
        clearRecentSearches: (state) => {
            state.recentSearches = []
        },
        clearToken: (state) => {
            state.token = null
        }
    }
})

export const generalStateReducer = generalStateSlice.reducer
export const generalStateActions = generalStateSlice.actions