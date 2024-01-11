import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
    HostState,
    Host,
    Event
} from '@types'


const initialState : HostState = {
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
        setHostEvents: (state, action: PayloadAction<Event[]>) => {
            state.events = action.payload
        },
        addEvent: (state, action: PayloadAction<Event>) => {
            state.events.push(action.payload)
        },
        editEvent: (state, action: PayloadAction<Event>) => {
            const eventIndex = state.events.findIndex(event => event.id === action.payload.id)
            state.events[eventIndex] = action.payload
        },
        resetHost: (state) => {
            state.host = initialState.host
            state.events = initialState.events
        }
    }
})

export const hostReducer = hostSlice.reducer
export const hostActions = hostSlice.actions