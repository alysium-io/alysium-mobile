import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
    HostState,
    Host,
    Event
} from '@types'


const initialState : HostState = {
    error: null,
    isLoading: false,
    host: null,
    events: []
}

const hostSlice = createSlice({
    name: 'host',
    initialState,
    reducers: {
        setHost: (state, action: PayloadAction<Host>) => {
            state.host = action.payload
        },
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload
        },
        setHostEvents: (state, action: PayloadAction<Event[]>) => {
            state.events = action.payload
        },
        addEvent: (state, action: PayloadAction<Event>) => {
            state.events.push(action.payload)
        },
        editEvent: (state, action: PayloadAction<Event>) => {
            const eventIndex = state.events.findIndex(event => event.id === action.payload.id)
            state.events[eventIndex] = action.payload
        }
    }
})

export const hostReducer = hostSlice.reducer
export const hostActions = hostSlice.actions