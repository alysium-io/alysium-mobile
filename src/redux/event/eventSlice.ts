import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
    EventState,
    Event
} from '@types'


const initialState : EventState = {
    events: null,
    isLoading: true,
    error: null
}

const eventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {
        setAllEvents: (state, action: PayloadAction<Event[]>) => {
            state.events = action.payload
            state.isLoading = false
        },
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload
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
        }
    }
})

export const eventReducer = eventSlice.reducer
export const eventActions = eventSlice.actions