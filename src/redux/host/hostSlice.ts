import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
    HostState,
    Host,
    Event,
    ApiIdentifier
} from '@types'


const initialState : HostState = {
    host: null,
    events: null,
}

const hostSlice = createSlice({
    name: 'host',
    initialState,
    reducers: {
        setHost: (state, action: PayloadAction<Host>) => {
            state.host = action.payload
        },
        resetHost: (state) => {
            state.host = initialState.host
        },
        setAllEvents: (state, action: PayloadAction<Event[]>) => {
            state.events = action.payload
        },
        addEvent: (state, action: PayloadAction<Event>) => {
            if (state.events === null) {
                state.events = []
                state.events.push(action.payload)
            } else {
                state.events.push(action.payload)
            }
        },
        editEvent: (state, action: PayloadAction<Event>) => {
            if (state.events !== null) {
                const eventIndex = state.events.findIndex(event => event.id === action.payload.id)
                state.events[eventIndex] = action.payload
            }
        },
        resetEvent: (state) => {
            state.events = initialState.events
        },
        deleteEvent: (state, action: PayloadAction<ApiIdentifier>) => {
            if (state.events !== null) {
                const eventIndex = state.events.findIndex(event => event.id === action.payload)
                state.events.splice(eventIndex, 1)
            }
        }
    }
})

export const hostReducer = hostSlice.reducer
export const hostActions = hostSlice.actions