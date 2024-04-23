import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryConfig from '../utils/baseQueryConfig';
import {
	CreateHostEventBodyDto,
	CreateHostEventResponseDto
} from './dto/host-event-create.dto';
import {
	DeleteHostEventBodyDto,
	DeleteHostEventResponseDto
} from './dto/host-event-delete.dto';

const apiSlice = createApi({
	baseQuery: baseQueryConfig({ basePath: '/host-event' }),
	reducerPath: 'hostEventApi',
	tagTypes: ['HostEvent'],
	endpoints: (builder) => ({
		create: builder.mutation<
			CreateHostEventResponseDto,
			{ body: CreateHostEventBodyDto }
		>({
			query: ({ body }) => ({
				url: '/',
				method: 'POST',
				body
			}),
			invalidatesTags: (result, error, { body }) => [
				{ type: 'HostEvent', id: body.event_id }
			]
		}),
		delete: builder.mutation<
			DeleteHostEventResponseDto,
			{ body: DeleteHostEventBodyDto }
		>({
			query: ({ body }) => ({
				url: '/',
				method: 'DELETE',
				body
			}),
			invalidatesTags: (result, error, { body }) => [
				{ type: 'HostEvent', id: body.event_id }
			]
		})
	})
});

export default apiSlice;
