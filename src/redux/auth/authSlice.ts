import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
    AuthStage,
    LoginResponse,
    AuthState
} from '@types'


const initialState : AuthState = {
    stage: AuthStage.loading,
    user: null,
    token: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<LoginResponse>) => {
            state.stage = AuthStage.loggedIn
            state.user = action.payload.user
            state.token = action.payload.jwt
        },
        logout: (state) => {
            state.stage = AuthStage.loggedOut
            state.user = null
            state.token = null
        },
        invalidCredentialsError: (state) => {
            state.stage = AuthStage.loggedOut
            state.user = null
            state.token = null
        },
        setAuthStage: (state, action: PayloadAction<AuthStage>) => {
            state.stage = action.payload
        }
    }
})

export const authReducer = authSlice.reducer
export const authActions = authSlice.actions