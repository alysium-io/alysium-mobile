import { createApi } from '@reduxjs/toolkit/query/react';
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
			})
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
