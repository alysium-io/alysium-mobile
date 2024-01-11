import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
    ArtistState,
    Artist
} from '@types'


const initialState : ArtistState = {
    error: null,
    isLoading: false,
    artist: null
}

const artistSlice = createSlice({
    name: 'artist',
    initialState,
    reducers: {
        setArtist: (state, action: PayloadAction<Artist>) => {
            state.artist = action.payload
        },
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload
        }
    }
})

export const artistReducer = artistSlice.reducer
export const artistActions = artistSlice.actions