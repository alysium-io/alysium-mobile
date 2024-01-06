import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '@redux'
import {
    AuthResponse,
    AuthRequestBody,
    UserResponse, 
    SearchResponse,
    SearchRequestBody,
    ArtistResponse,
    ArtistRequestParams,
    HostResponse,
    HostRequestParams,
    TagArtistsRequestParams,
    TagArtistsResponse,
    TagRequestParams,
    TagResponse,
    CreateAccountResponse,
    CreateAccountBody,
    CreateHostBody,
    CreateHostResponse,
    CreateArtistResponse,
    CreateArtistBody
} from '@types'


export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api-int.celium.live/celium/api',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
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
        loginUser: builder.query<AuthResponse, AuthRequestBody>({
            query: ({ identifier, password }) => ({
                url: '/auth/local',
                method: 'POST',
                body: {
                    identifier,
                    password
                }
            })
        }),
        getMe: builder.query<UserResponse, void>({
            query: () => ({
                url: '/users/me',
                method: 'GET',
                params: {
                    populate: '*'
                }
            })
        }),
        createAccount: builder.query<CreateAccountResponse, CreateAccountBody>({
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
            query: ({ artistId }) => ({
                url: `/artists/${artistId}`,
                method: 'GET',
                params: {
                    populate: '*'
                }
            })
        }),
        host: builder.query<HostResponse, HostRequestParams>({
            query: ({ hostId }) => ({
                url: `/hosts/${hostId}`,
                method: 'GET',
                params: {
                    populate: '*'
                }
            })
        }),
        tag: builder.query<TagResponse, TagRequestParams>({
            query: ({ tagId }) => ({
                url: `/genres/${tagId}`,
                method: 'GET'
            })
        }),
        tagArtists: builder.query<TagArtistsResponse, TagArtistsRequestParams>({
            query: ({ tagId }) => ({
                url: `/genres/relatedArtists/${tagId}`,
                method: 'GET'
            })
        }),
        createHost: builder.query<CreateHostResponse, CreateHostBody>({
            query: ({ name }) => ({
                url: '/hosts',
                method: 'POST',
                body: {
                    data: {
                        name
                    }
                }
            })
        }),
        createArtist: builder.query<CreateArtistResponse, CreateArtistBody>({
            query: ({ name }) => ({
                url: '/artists',
                method: 'POST',
                body: {
                    data: {
                        name
                    }
                }
            })
        })
    })
})

export const {
    useLazyLoginUserQuery,
    useLazyGetMeQuery,
    useSearchQuery,
    useArtistQuery,
    useLazyArtistQuery,
    useLazyHostQuery,
    useLazyTagQuery,
    useLazyTagArtistsQuery,
    useLazyCreateAccountQuery,
    useLazyCreateHostQuery,
    useLazyCreateArtistQuery
} = api

export default api.reducer