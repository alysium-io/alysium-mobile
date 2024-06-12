import { Formatting } from '@etc';
import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryConfig from '../utils/baseQueryConfig';
import {
	CreateEventBodyDto,
	CreateEventResponseDto
} from './dto/event-create.dto';
import {
	DeleteEventParamsDto,
	DeleteEventResponseDto
} from './dto/event-delete.dto';
import {
	FindAllEventsQueryDto,
	FindAllEventsResponseDto
} from './dto/event-find-all.dto';
import {
	FindOneEventParamsDto,
	FindOneEventResponseDto
} from './dto/event-find-one.dto';
import {
	UpdateEventVenueBodyDto,
	UpdateEventVenueParamsDto,
	UpdateEventVenueResponseDto
} from './dto/event-update-venue.dto';
import {
	UpdateEventBodyDto,
	UpdateEventParamsDto,
	UpdateEventResponseDto
} from './dto/event-update.dto';

const apiSlice = createApi({
	baseQuery: baseQueryConfig({ basePath: '/event' }),
	reducerPath: 'eventApi',
	tagTypes: ['Event'],
	endpoints: (builder) => ({
		findOne: builder.query<
			FindOneEventResponseDto,
			{ params: FindOneEventParamsDto }
		>({
			query: ({ params }) => ({
				url: `/${params.event_uid}`,
				method: 'GET'
			}),
			providesTags: (result, error, { params }) => [
				{ type: 'Event', id: params.event_uid }
			]
		}),
		findAll: builder.query<
			FindAllEventsResponseDto[],
			{ query: FindAllEventsQueryDto }
		>({
			query: ({ query }) => ({
				url: '/',
				method: 'GET',
				params: query
			}),
			providesTags: (results) =>
				results
					? [
							...results.map(({ event_uid }) => ({
								type: 'Event' as const,
								id: event_uid
							})),
							{ type: 'Event', id: 'LIST' }
						]
					: [{ type: 'Event', id: 'LIST' }]
		}),
		create: builder.mutation<
			CreateEventResponseDto,
			{ body: CreateEventBodyDto }
		>({
			query: ({ body }) => ({
				url: '/',
				method: 'POST',
				body
			}),
			invalidatesTags: [{ type: 'Event', id: 'LIST' }]
		}),
		update: builder.mutation<
			UpdateEventResponseDto,
			{
				body: UpdateEventBodyDto;
				params: UpdateEventParamsDto;
			}
		>({
			query: ({ body, params }) => {
				body.start_time = Formatting.toUtcIsoFormat(body.start_time);
				body.end_time = Formatting.toUtcIsoFormat(body.end_time);
				body.doors_open_time = Formatting.toUtcIsoFormat(body.doors_open_time);
				return {
					url: `/${params.event_uid}`,
					method: 'PUT',
					body
				};
			},
			invalidatesTags: (result) =>
				result ? [{ type: 'Event', id: result.event_uid }] : []
		}),
		delete: builder.mutation<
			DeleteEventResponseDto,
			{ params: DeleteEventParamsDto }
		>({
			query: ({ params }) => ({
				url: `/${params.event_uid}`,
				method: 'DELETE'
			}),
			onQueryStarted: async ({ params }, { queryFulfilled, dispatch }) => {
				let patchResult;
				try {
					patchResult = dispatch(
						apiSlice.util.updateQueryData(
							'findAll',
							{ query: { page: 1, limit: 10, host_uid: 1 } },
							(draft) => {
								const index = draft.findIndex(
									(event) => event.event_uid === params.event_uid
								);
								if (index !== -1) {
									draft.splice(index, 1);
								}
							}
						)
					);

					await queryFulfilled;
				} catch (error) {
					if (patchResult) {
						patchResult.undo();
					}
					console.error('Error fulfilling query:', error);
				}
			},
			invalidatesTags: (result, error, { params }) => [
				{ type: 'Event', id: 'LIST' }
			]
		}),
		updateVenue: builder.mutation<
			UpdateEventVenueResponseDto,
			{
				body: UpdateEventVenueBodyDto;
				params: UpdateEventVenueParamsDto;
			}
		>({
			query: ({ body, params }) => ({
				url: `/${params.event_uid}/venue`,
				method: 'PUT',
				body
			})
		})
	})
});

export default apiSlice;
