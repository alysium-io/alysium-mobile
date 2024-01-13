import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import defaultApiConfig from './defaultApiConfig'
import {
    ArtistDetailsResponse,
    ArtistDetailsRequestParams
} from '@types'


const artistApiSlice = createApi({
    baseQuery: fetchBaseQuery(defaultApiConfig),
    reducerPath: 'artistApi',
    tagTypes: ['Artist'],
    endpoints: (builder) => ({
        getArtistDetails: builder.query<ArtistDetailsResponse, ArtistDetailsRequestParams>({
            query: ({ artistId }) => ({
                url: `/artists/${artistId}`,
                method: 'GET',
                params: {
                    populate: '*'
                }
            })
        })
    })
})

export default artistApiSlice