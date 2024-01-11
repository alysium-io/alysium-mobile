import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import defaultApiConfig from './defaultApiConfig'
import {
    LoginWithIdentifierAndPasswordRequestBody,
    CreateAccountWithIdentifierAndPasswordResponse,
    CreateAccountWithIdentifierAndPasswordRequestBody,
    LoginUserWithIdentifierAndPasswordResponse,
    AuthUserResponse
} from '@types'


const authApiSlice = createApi({
    baseQuery: fetchBaseQuery(defaultApiConfig),
    reducerPath: 'authApi',
    tagTypes: ['Auth'],
    endpoints: (builder) => ({
        loginWithIdentifierAndPassword: builder.query<LoginUserWithIdentifierAndPasswordResponse, LoginWithIdentifierAndPasswordRequestBody>({
            query: ({ identifier, password }) => ({
                url: '/auth/local',
                method: 'POST',
                body: {
                    identifier,
                    password
                }
            })
        }),
        createAccountWithIdentifierAndPassword: builder.query<CreateAccountWithIdentifierAndPasswordResponse, CreateAccountWithIdentifierAndPasswordRequestBody>({
            query: ({ username, email, password }) => ({
                url: '/auth/local/register',
                method: 'POST',
                body: {
                    username,
                    email,
                    password
                }
            })
        }),
        getAuthUser: builder.query<AuthUserResponse, void>({
            query: () => ({
                url: '/users/me',
                method: 'GET'
            })
        })
    })
})

export default authApiSlice