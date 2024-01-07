import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
    Stage,
    UserState,
    UserResponse
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
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload
        },
        setUser: (state, action: PayloadAction<UserResponse>) => {
            state.user = action.payload
            state.error = null
        },
        logout: (state) => {
            state.stage = Stage.loggedOut
            state.error = null
            state.user = null
            state.token = null
        },
        invalidCredentialsError: (state) => {
            state.stage = Stage.loggedOut
            state.error = 'Invalid Credentials'
            state.user = null
            state.token = null
        },
        setStage: (state, action: PayloadAction<Stage>) => {
            state.stage = action.payload
        }
    },
    extraReducers: (builder) => {
        
    }
})

export const userReducer = userSlice.reducer

export const {
    setToken,
    setUser,
    logout,
    invalidCredentialsError,
    setStage
} = userSlice.actions