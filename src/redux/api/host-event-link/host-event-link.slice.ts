import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryConfig from '../utils/baseQueryConfig';
import {
	CreateHostEventLinkBodyDto,
	CreateHostEventLinkResponseDto
} from './dto/host-event-link-create.dto';
import {
	DeleteHostEventLinkBodyDto,
	DeleteHostEventLinkResponseDto
} from './dto/host-event-link-delete.dto';

const apiSlice = createApi({
	baseQuery: baseQueryConfig({ basePath: '/host-event-link' }),
	reducerPath: 'hostEventLinkApi',
	tagTypes: ['HostEventLink'],
	endpoints: (builder) => ({
		create: builder.mutation<
			CreateHostEventLinkResponseDto,
			{ body: CreateHostEventLinkBodyDto }
		>({
			query: ({ body }) => ({
				url: '/',
				method: 'POST',
				body
			}),
			invalidatesTags: (result, error, { body }) => [
				{ type: 'HostEventLink', id: body.event_uid }
			]
		}),
		delete: builder.mutation<
			DeleteHostEventLinkResponseDto,
			{ body: DeleteHostEventLinkBodyDto }
		>({
			query: ({ body }) => ({
				url: '/',
				method: 'DELETE',
				body
			}),
			invalidatesTags: (result, error, { body }) => [
				{ type: 'HostEventLink', id: body.event_uid }
			]
		})
	})
});

export default apiSlice;
