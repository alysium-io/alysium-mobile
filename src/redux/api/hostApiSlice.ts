import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import defaultApiConfig from './defaultApiConfig'
import {
    HostDetailsResponse,
    HostDetailsRequestParams,
    CreateEventResponse,
    CreateEventBody,
    EditEventResponse,
    EditEventBody,
    EventsResponse,
    EventsBody
} from '@types'


const hostApiSlice = createApi({
    baseQuery: fetchBaseQuery(defaultApiConfig),
    reducerPath: 'hostApi',
    tagTypes: ['Host'],
    endpoints: (builder) => ({
        getHostDetails: builder.query<HostDetailsResponse, HostDetailsRequestParams>({
            query: ({ hostId }) => ({
                url: `/hosts/${hostId}`,
                method: 'GET',
                params: {
                    populate: '*'
                }
            })
        }),
        getHostEvents: builder.query<EventsResponse, EventsBody>({
            query: () => ({
                url: '/events',
                method: 'GET',
                params: {
                    populate: '*'
                }
            })
        }),
        createHostEvent: builder.query<CreateEventResponse, CreateEventBody>({
            query: ({ attributes }) => ({
                url: '/events',
                method: 'POST',
                body: attributes
            })
        }),
        editHostEvent: builder.query<EditEventResponse, EditEventBody>({
            query: ({ id, attributes }) => ({
                url: `/events/${id}`,
                method: 'PUT',
                body: attributes
            })
        })
    })
})

export default hostApiSlice