import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
    HostState,
    Host,
    Event,
    ApiIdentifier,
    Venue
} from '@types'


const initialState : HostState = {
    host: null,
    events: null,
    venues: null
}

const hostSlice = createSlice({
    name: 'host',
    initialState,
    reducers: {
        resetAll: (state) => {
            state.host = initialState.host
            state.events = initialState.events
            state.venues = initialState.venues
        },
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
        },
        setAllVenues: (state, action: PayloadAction<Venue[]>) => {
            state.venues = action.payload
        },
        addVenue: (state, action: PayloadAction<Venue>) => {
            if (state.venues === null) {
                state.venues = []
                state.venues.push(action.payload)
            } else {
                state.venues.push(action.payload)
            }
        }
    }
})

export const hostReducer = hostSlice.reducer
export const hostActions = hostSlice.actions