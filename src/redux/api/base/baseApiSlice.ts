import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from 'src/redux'
import {
    AuthResponse,
    AuthRequestBody,
    MeResponse, 
    SearchResponse,
    SearchRequestBody,
    ArtistResponse,
    ArtistRequestParams
} from 'src/types'


export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api-int.celium.live/celium/api',
        prepareHeaders: (headers, { getState }) => {
            const state = getState() as RootState
            const token = state.user.token
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }
            return headers
        }
    }),
    tagTypes: ['User'],
    endpoints: (builder) => ({
        authUser: builder.query<AuthResponse, AuthRequestBody>({
            query: ({ identifier, password }) => ({
                url: '/auth/local',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: {
                    identifier,
                    password
                }
            })
        }),
        getMe: builder.query<MeResponse, void>({
            query: () => ({
                url: '/users/me',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
        }),
        search: builder.query<SearchResponse, SearchRequestBody>({
            query: ({ searchText }) => ({
                url: '/artists/search',
                method: 'POST',
                body: {
                    query: {
                        match: {
                            name: {
                                query: searchText
                            }
                        }
                    }
                },
                debounce: 400
            })
        }),
        artist: builder.query<ArtistResponse, ArtistRequestParams>({
            query: ({ artist_id }) => ({
                url: `/artists/${artist_id}`,
                method: 'GET'
            })
        })
    })
})

export const {
    useLazyAuthUserQuery,
    useLazyGetMeQuery,
    useSearchQuery,
    useArtistQuery
} = api

export default api.reducer