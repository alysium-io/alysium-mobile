import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
    ArtistState,
    Artist
} from '@types'


const initialState : ArtistState = {
    artist: null
}

const artistSlice = createSlice({
    name: 'artist',
    initialState,
    reducers: {
        setArtist: (state, action: PayloadAction<Artist>) => {
            state.artist = action.payload
        },
        resetArtist: (state) => {
            state.artist = initialState.artist
        }
    }
})

export const artistReducer = artistSlice.reducer
export const artistActions = artistSlice.actions