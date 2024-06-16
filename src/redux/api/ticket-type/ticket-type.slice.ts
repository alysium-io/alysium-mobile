import { createApi } from '@reduxjs/toolkit/query/react';
import { ticketCollectionApiSlice } from '../ticket-collection';
import baseQueryConfig from '../utils/baseQueryConfig';
import {
	CreateTicketTypeBodyDto,
	CreateTicketTypeResponseDto
} from './dto/ticket-type-create.dto';
import {
	DeleteTicketTypeParamsDto,
	DeleteTicketTypeQueryDto,
	DeleteTicketTypeResponseDto
} from './dto/ticket-type-delete.dto';
import {
	FindOneTicketTypeParamsDto,
	FindOneTicketTypeQueryDto,
	FindOneTicketTypeResponseDto
} from './dto/ticket-type-find-one.dto';
import {
	UpdateTicketTypeBodyDto,
	UpdateTicketTypeParamsDto,
	UpdateTicketTypeQueryDto,
	UpdateTicketTypeResponseDto
} from './dto/ticket-type-update.dto';

const apiSlice = createApi({
	baseQuery: baseQueryConfig({ basePath: '/ticket-type' }),
	reducerPath: 'ticketTypeApi',
	tagTypes: ['TicketType'],
	endpoints: (builder) => ({
		findOne: builder.query<
			FindOneTicketTypeResponseDto,
			{
				params: FindOneTicketTypeParamsDto;
				query: FindOneTicketTypeQueryDto;
			}
		>({
			query: ({ params, query }) => ({
				url: `/${params.ticket_type_uid}`,
				method: 'GET',
				params: query
			})
		}),
		create: builder.mutation<
			CreateTicketTypeResponseDto,
			{ body: CreateTicketTypeBodyDto }
		>({
			query: ({ body }) => ({
				url: '',
				method: 'POST',
				body
			}),
			onQueryStarted: async ({ body }, { dispatch, queryFulfilled }) => {
				await queryFulfilled;
				dispatch(
					ticketCollectionApiSlice.util.invalidateTags([
						{
							type: 'TicketCollection',
							id: body.ticket_collection_uid
						}
					])
				);
			}
		}),
		update: builder.mutation<
			UpdateTicketTypeResponseDto,
			{
				params: UpdateTicketTypeParamsDto;
				query: UpdateTicketTypeQueryDto;
				body: UpdateTicketTypeBodyDto;
			}
		>({
			query: ({ params, query, body }) => ({
				url: `/${params.ticket_type_uid}`,
				method: 'PUT',
				params: query,
				body
			})
		}),
		delete: builder.mutation<
			DeleteTicketTypeResponseDto,
			{
				params: DeleteTicketTypeParamsDto;
				query: DeleteTicketTypeQueryDto;
			}
		>({
			query: ({ params, query }) => ({
				url: `/${params.ticket_type_uid}`,
				method: 'DELETE',
				params: query
			}),
			onQueryStarted: async ({ query }, { dispatch, queryFulfilled }) => {
				await queryFulfilled;
				dispatch(
					ticketCollectionApiSlice.util.invalidateTags([
						{
							type: 'TicketCollection',
							id: query.ticket_collection_uid
						}
					])
				);
			}
		})
	})
});

export default apiSlice;
