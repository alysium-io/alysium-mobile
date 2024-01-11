import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import defaultApiConfig from './defaultApiConfig'
import {
    UserDetailsResponse,
    CreateHostBody,
    CreateHostResponse,
    CreateArtistResponse,
    CreateArtistBody
} from '@types'


const userApiSlice = createApi({
    baseQuery: fetchBaseQuery(defaultApiConfig),
    reducerPath: 'userApi',
    tagTypes: ['User'],
    endpoints: (builder) => ({
        getUserDetails: builder.query<UserDetailsResponse, void>({
            query: () => ({
                url: '/users/me',
                method: 'GET',
                params: {
                    populate: '*'
                }
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

export default userApiSlice