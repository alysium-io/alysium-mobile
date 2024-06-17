import { createApi } from '@reduxjs/toolkit/query/react';
import { eventApiSlice } from '../event';
import baseQueryConfig from '../utils/baseQueryConfig';
import {
	CreateTicketCollectionBodyDto,
	CreateTicketCollectionQueryDto,
	CreateTicketCollectionResponseDto
} from './dto/ticket-collection-create.dto';
import {
	DeleteTicketCollectionParamsDto,
	DeleteTicketCollectionResponseDto
} from './dto/ticket-collection-delete.dto';
import {
	FindOneTicketCollectionParamsDto,
	FindOneTicketCollectionResponseDto
} from './dto/ticket-collection-find-one.dto';

const apiSlice = createApi({
	baseQuery: baseQueryConfig({ basePath: '/ticket-collection' }),
	reducerPath: 'ticketCollectionApi',
	tagTypes: ['TicketCollection'],
	endpoints: (builder) => ({
		findOne: builder.query<
			FindOneTicketCollectionResponseDto,
			{ params: FindOneTicketCollectionParamsDto }
		>({
			query: ({ params }) => ({
				url: `/${params.ticket_collection_uid}`,
				method: 'GET'
			}),
			providesTags: (result, error, { params }) => [
				{ type: 'TicketCollection', id: params.ticket_collection_uid }
			]
		}),
		create: builder.mutation<
			CreateTicketCollectionResponseDto,
			{
				query: CreateTicketCollectionQueryDto;
				body: CreateTicketCollectionBodyDto;
			}
		>({
			query: ({ query, body }) => ({
				url: '',
				method: 'POST',
				params: query,
				body
			}),
			onQueryStarted: async ({ query }, { queryFulfilled, dispatch }) => {
				const result = await queryFulfilled;
				dispatch(
					eventApiSlice.util.updateQueryData(
						'findOne',
						{ params: { event_uid: query.event_uid } },
						(draft) => {
							draft.ticket_collection_uid = result.data.ticket_collection_uid;
						}
					)
				);
			}
		}),
		delete: builder.mutation<
			DeleteTicketCollectionResponseDto,
			{ params: DeleteTicketCollectionParamsDto }
		>({
			query: ({ params }) => ({
				url: `/${params.ticket_collection_uid}`,
				method: 'DELETE'
			})
		})
	})
});

export default apiSlice;
