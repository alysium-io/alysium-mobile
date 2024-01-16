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
    EventsBody,
    EventDetailsResponse,
    EventDetailsBody,
    DeleteEventResponse,
    DeleteEventBody
} from '@types'


const hostApiSlice = createApi({
    baseQuery: fetchBaseQuery(defaultApiConfig),
    reducerPath: 'hostApi',
    tagTypes: ['Host', 'Event'],
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
        getEvents: builder.query<EventsResponse, EventsBody>({
            query: () => ({
                url: '/events',
                method: 'GET',
                params: {
                    populate: '*'
                }
            })
        }),
        getEventDetails: builder.query<EventDetailsResponse, EventDetailsBody>({
            query: ({ eventId }) => ({
                url: `/events/${eventId}`,
                method: 'GET',
                params: {
                    populate: '*'
                }
            }),
            providesTags: (_result, _error, { eventId }) => [{ type: 'Event', id: eventId }]
        }),
        createEvent: builder.query<CreateEventResponse, CreateEventBody>({
            query: ({ attributes }) => ({
                url: '/events',
                method: 'POST',
                body: {
                    data: attributes
                }
            })
        }),
        editEvent: builder.mutation<EditEventResponse, EditEventBody>({
            query: ({ eventId, attributes }) => ({
                url: `/events/${eventId}`,
                method: 'PUT',
                body: {
                    data: attributes
                }
            }),
            invalidatesTags: (_result, _error, { eventId }) => [{ type: 'Event', id: eventId }]
        }),
        deleteEvent: builder.mutation<DeleteEventResponse, DeleteEventBody>({
            query: ({ eventId }) => ({
                url: `/events/${eventId}`,
                method: 'DELETE'
            })
        })
    })
})

export default hostApiSlice