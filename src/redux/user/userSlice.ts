import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
    UserState,
    UserDetailsResponse
} from '@types'


const initialState : UserState = {
    user: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserDetailsResponse>) => {
            state.user = action.payload
        },
        resetUser: (state) => {
            state.user = initialState.user
        }
    }
})

export const userReducer = userSlice.reducer
export const userActions = userSlice.actions