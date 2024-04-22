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
				url: `/${params.event_id}`,
				method: 'GET'
			}),
			providesTags: (result, error, { params }) => [
				{ type: 'Event', id: params.event_id }
			]
		}),
		findAll: builder.query<
			FindAllEventsResponseDto[],
			{ query: FindAllEventsQueryDto }
		>({
			query: ({ query }) => ({
				url: '/',
				method: 'GET',
				params: { ...query }
			}),
			providesTags: (results) =>
				results
					? [
							...results.map(({ event_id }) => ({
								type: 'Event' as const,
								id: event_id
							})),
							{ type: 'Event', id: 'LIST' }
					  ]
					: [{ type: 'Event', id: 'LIST' }]
		}),
		create: builder.mutation<
			CreateEventResponseDto,
			{ body: CreateEventBodyDto }
		>({
			query: (body) => ({
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
			query: (body) => ({
				url: '/',
				method: 'PUT',
				body
			}),
			invalidatesTags: (result) =>
				result ? [{ type: 'Event', id: result.event_id }] : []
		}),
		delete: builder.mutation<
			DeleteEventResponseDto,
			{ params: DeleteEventParamsDto }
		>({
			query: ({ params }) => ({
				url: `/${params.event_id}`,
				method: 'DELETE'
			}),
			invalidatesTags: (result, error, { params }) => [
				{ type: 'Event', id: params.event_id }
			]
		})
	})
});

export default apiSlice;
