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
    DeleteEventBody,
    GetMyVenuesResponse,
    GetMyVenuesBody,
    CreateVenueResponse,
    CreateVenueBody,
    GetVenueBody,
    GetVenueResponse,
    EditVenueBody,
    EditVenueResponse,
    DeleteVenueResponse,
    DeleteVenueBody
} from '@types'


const hostApiSlice = createApi({
    baseQuery: fetchBaseQuery(defaultApiConfig),
    reducerPath: 'hostApi',
    tagTypes: [
        'HostDetails',
        'Event',
        'EventDetails',
        'Venue'
    ],
    endpoints: (builder) => ({
        getHostDetails: builder.query<HostDetailsResponse, HostDetailsRequestParams>({
            query: ({ hostId }) => ({
                url: `/hosts/${hostId}`,
                method: 'GET',
                params: {
                    populate: '*'
                }
            }),
            providesTags: (_result, _error, { hostId }) => [{ type: 'HostDetails', id: hostId }]
        }),
        getEventDetails: builder.query<EventDetailsResponse, EventDetailsBody>({
            query: ({ eventId }) => ({
                url: `/events/${eventId}`,
                method: 'GET',
                params: {
                    populate: '*'
                }
            }),
            providesTags: (_result, _error, { eventId }) => [{ type: 'EventDetails', id: eventId }]
        }),
        getEvents: builder.query<EventsResponse, EventsBody>({
            query: () => ({
                url: '/events',
                method: 'GET',
                params: {
                    populate: '*'
                }
            }),
            providesTags: (result, _error) =>
                result
                    ? [...result.data.map(({ id }) => ({ type: 'Event' as const, id })), 'Event']
                    : ['Event']
        }),
        createEvent: builder.query<CreateEventResponse, CreateEventBody>({
            query: ({ hostId, attributes }) => ({
                url: '/events',
                method: 'POST',
                body: {
                    data: {
                        host: hostId,
                        ...attributes
                    }
                }
            }),
            onQueryStarted: async ({ attributes }, { queryFulfilled, dispatch }) => {
                try {
                    const { data } = await queryFulfilled
                    dispatch(
                        hostApiSlice.util.updateQueryData('getEvents', undefined, draft => {
                            draft.data.push(data.data) // Add the new event to the list
                        })
                    )
                } catch {
                    // Handle error if the mutation fails
                    // Since we're not doing an optimistic update, no need to undo anything here
                }
            }
        }),
        editEvent: builder.mutation<EditEventResponse, EditEventBody>({
            query: ({ hostId, eventId, attributes }) => ({
                url: `/events/${eventId}`,
                method: 'PUT',
                body: {
                    data: {
                        host: hostId,
                        ...attributes
                    }
                }
            }),
            invalidatesTags: (_result, _error, { eventId }) => [
                { type: 'EventDetails', id: eventId },
                { type: 'Event', id: eventId }
            ]
        }),
        deleteEvent: builder.mutation<DeleteEventResponse, DeleteEventBody>({
            query: ({ eventId }) => ({
                url: `/events/${eventId}`,
                method: 'DELETE'
            }),
            onQueryStarted: async ({ eventId }, { dispatch, queryFulfilled }) => {
                // Optimistically remove the event from relevant queries
                dispatch(hostApiSlice.util.updateQueryData('getEvents', undefined, (draft) => {
                    const index = draft.data.findIndex(event => event.id === eventId)
                    if (index !== -1) {
                        draft.data.splice(index, 1)
                    }
                }))

                try {
                    await queryFulfilled
                } catch {
                    // If the deletion fails, you can refetch the affected queries to get the current state
                    dispatch(hostApiSlice.util.invalidateTags([
                        { type: 'EventDetails', id: eventId },
                        'Event'
                    ]))
                }
            }
        }),
        getVenues: builder.query<GetMyVenuesResponse, GetMyVenuesBody>({
            query: ({ hostId }) => ({
                url: `/venues/?filter[host][$eq]=${hostId}`,
                method: 'GET'
            }),
            providesTags: (result) =>
                result
                    ? [...result.data.map(({ id }) => ({ type: 'Venue' as const, id })), 'Venue']
                    : ['Venue']
        }),
        getVenueDetails: builder.query<GetVenueResponse, GetVenueBody>({
            query: ({ venueId }) => ({
                url: `/venues/${venueId}`,
                method: 'GET'
            }),
            providesTags: (_result, _error, { venueId }) => [{ type: 'Venue', id: venueId }]
        }),
        createVenue: builder.mutation<CreateVenueResponse, CreateVenueBody>({
            query: ({ hostId, name }) => ({
                url: '/venues',
                method: 'POST',
                body: {
                    data: {
                        host: hostId,
                        name
                    }
                }
            }),
            invalidatesTags: (_result, _error, { hostId }) => [
                { type: 'Venue', id: hostId },
                'Venue'
            ]
        }),
        editVenue: builder.mutation<EditVenueResponse, EditVenueBody>({
            query: ({ venueId, hostId, attributes }) => ({
                url: `/venues/${venueId}`,
                method: 'PUT',
                body: {
                    data: {
                        hostId,
                        ...attributes
                    }
                }
            }),
            invalidatesTags: (_result, _error, { venueId }) => [
                { type: 'Venue', id: venueId }
            ]
        }),
        deleteVenue: builder.mutation<DeleteVenueResponse, DeleteVenueBody>({
            query: ({ venueId }) => ({
                url: `/venues/${venueId}`,
                method: 'DELETE'
            }),
            invalidatesTags: (_result, _error, { venueId }) => [
                { type: 'Venue', id: venueId },
                'Venue'
            ]
        })
    })
})

export default hostApiSlice