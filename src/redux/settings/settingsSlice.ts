import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SettingsState, ThemeName } from 'src/types'


const initialState : SettingsState = {
    theme: 'dark'
}

const settingsSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setTheme: (state, action: PayloadAction<ThemeName>) => {
            state.theme = action.payload
        }
    },
    extraReducers: (builder) => {
        
    }
})

export const settingsReducer = settingsSlice.reducer

export const {
    setTheme
} = settingsSlice.actions