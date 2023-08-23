import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
    Stage,
    UserState,
    AuthResponse
} from 'src/types'


const initialState : UserState = {
    stage: Stage.precheck,
    error: null,
    user: null,
    token: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<AuthResponse>) => {
            state.stage = Stage.loggedIn
            state.user = action.payload.user
            state.token = action.payload.jwt
            state.error = null
        },
        logout: (state) => {
            state.stage = Stage.loggedOut
            state.error = null
            state.user = null
            state.token = null
        },
        invalidCredentialsError: (state) => {
            console.log('in here')
            state.stage = Stage.loggedOut
            state.error = 'Invalid Credentials'
            state.user = null
            state.token = null
        }
    },
    extraReducers: (builder) => {
        
    }
})

export const userReducer = userSlice.reducer

export const {
    setUser,
    logout,
    invalidCredentialsError
} = userSlice.actions