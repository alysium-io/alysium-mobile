import { createSlice } from '@reduxjs/toolkit'
import { SearchState } from 'src/types'


const initialState : SearchState = {
    error: null,
    recentSearches: [],
    searchResults: []
}

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        clearRecentSearch: (state, action) => {
            state.recentSearches = []
        },
        setSearchResults: (state, action) => {
            state.searchResults = action.payload
        },
        addRecentSearch: (state, action) => {
            state.recentSearches.push(action.payload)
        }
    },
    extraReducers: (builder) => {
        
    }
})

export const searchReducer = searchSlice.reducer

export const {
    clearRecentSearch,
    setSearchResults,
    addRecentSearch
} = searchSlice.actions