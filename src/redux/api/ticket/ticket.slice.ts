import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryConfig from '../utils/baseQueryConfig';
import {
	CreateTicketBodyDto,
	CreateTicketResponseDto
} from './dto/ticket-create.dto';
import {
	DeleteTicketParamsDto,
	DeleteTicketQueryDto,
	DeleteTicketResponseDto
} from './dto/ticket-delete.dto';
import {
	FindAllTicketsQueryDto,
	FindAllTicketsResponseDto
} from './dto/ticket-find-all.dto';
import {
	FindOneTicketParamsDto,
	FindOneTicketQueryDto,
	FindOneTicketResponseDto
} from './dto/ticket-find-one.dto';
import {
	UpdateTicketBodyDto,
	UpdateTicketParamsDto,
	UpdateTicketQueryDto,
	UpdateTicketResponseDto
} from './dto/ticket-update.dto';

const apiSlice = createApi({
	baseQuery: baseQueryConfig({ basePath: '/ticket' }),
	reducerPath: 'ticketApi',
	tagTypes: ['Ticket'],
	endpoints: (builder) => ({
		findOne: builder.query<
			FindOneTicketResponseDto,
			{
				params: FindOneTicketParamsDto;
				query: FindOneTicketQueryDto;
			}
		>({
			query: ({ params, query }) => ({
				url: `/${params.ticket_uid}`,
				method: 'GET',
				params: query
			})
		}),
		findAll: builder.query<
			FindAllTicketsResponseDto,
			{ query: FindAllTicketsQueryDto }
		>({
			query: ({ query }) => ({
				url: '',
				method: 'GET',
				params: query
			})
		}),
		create: builder.mutation<
			CreateTicketResponseDto,
			{ body: CreateTicketBodyDto }
		>({
			query: ({ body }) => ({
				url: '',
				method: 'POST',
				body
			})
		}),
		update: builder.mutation<
			UpdateTicketResponseDto,
			{
				params: UpdateTicketParamsDto;
				query: UpdateTicketQueryDto;
				body: UpdateTicketBodyDto;
			}
		>({
			query: ({ params, query, body }) => ({
				url: `/${params.ticket_uid}`,
				method: 'PUT',
				params: query,
				body
			})
		}),
		delete: builder.mutation<
			DeleteTicketResponseDto,
			{
				params: DeleteTicketParamsDto;
				query: DeleteTicketQueryDto;
			}
		>({
			query: ({ params, query }) => ({
				url: `/${params.ticket_uid}`,
				method: 'DELETE',
				params: query
			})
		})
	})
});

export default apiSlice;
