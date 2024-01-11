import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import defaultApiConfig from './defaultApiConfig'
import {
    SearchResponse,
    SearchRequestBody
} from '@types'


const searchApiSlice = createApi({
    baseQuery: fetchBaseQuery(defaultApiConfig),
    reducerPath: 'searchApi',
    tagTypes: ['Search'],
    endpoints: (builder) => ({
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
        })
    })
})

export default searchApiSlice