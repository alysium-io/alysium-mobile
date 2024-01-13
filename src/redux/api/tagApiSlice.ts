import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import defaultApiConfig from './defaultApiConfig'
import {
    TagArtistsRequestParams,
    TagArtistsResponse,
    TagRequestParams,
    TagResponse
} from '@types'


const tagApiSlice = createApi({
    baseQuery: fetchBaseQuery(defaultApiConfig),
    reducerPath: 'tagApi',
    tagTypes: ['Tag'],
    endpoints: (builder) => ({
        getTagDetails: builder.query<TagResponse, TagRequestParams>({
            query: ({ tagId }) => ({
                url: `/genres/${tagId}`,
                method: 'GET'
            })
        }),
        getTagArtists: builder.query<TagArtistsResponse, TagArtistsRequestParams>({
            query: ({ tagId }) => ({
                url: `/genres/relatedArtists/${tagId}`,
                method: 'GET'
            })
        })
    })
})

export default tagApiSlice