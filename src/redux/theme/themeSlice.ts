import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ThemeState, ThemeNames, ThemeMode } from 'src/types'


const initialState : ThemeState = {
    themeName: 'main',
    mode: ThemeMode.dark
}

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setTheme: (state, action: PayloadAction<ThemeNames>) => {
            state.themeName = action.payload
        },
        toggleMode: (state) => {
            state.mode = state.mode === ThemeMode.dark ? ThemeMode.light : ThemeMode.dark
        },
        setMode: (state, action: PayloadAction<ThemeMode>) => {
            state.mode = action.payload
        }
    }
})

export const themeReducer = themeSlice.reducer
export const themeActions = themeSlice.actions