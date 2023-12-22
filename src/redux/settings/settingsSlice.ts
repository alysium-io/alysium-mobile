import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SettingsState, AppType } from 'src/types'


const initialState : SettingsState = {
    app: AppType.test
}

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setApp: (state, action: PayloadAction<AppType>) => {
            state.app = action.payload
        }
    },
    extraReducers: (builder) => {
        
    }
})

export const settingsReducer = settingsSlice.reducer

export const {
    setApp
} = settingsSlice.actions