import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryConfig from '../utils/baseQueryConfig';
import {
	CreateHostBodyDto,
	CreateHostResponseDto
} from './dto/host-create.dto';
import {
	DeleteHostParamsDto,
	DeleteHostResponseDto
} from './dto/host-delete.dto';
import {
	FindAllHostsQueryDto,
	FindAllHostsResponseDto
} from './dto/host-find-all.dto';
import {
	FindOneHostParamsDto,
	FindOneHostResponseDto
} from './dto/host-find-one.dto';
import {
	UpdateHostBodyDto,
	UpdateHostParamsDto,
	UpdateHostResponseDto
} from './dto/host-update.dto';

const apiSlice = createApi({
	baseQuery: baseQueryConfig({ basePath: '/host' }),
	reducerPath: 'hostApi',
	tagTypes: ['Host'],
	endpoints: (builder) => ({
		findOne: builder.query<
			FindOneHostResponseDto,
			{ params: FindOneHostParamsDto }
		>({
			query: ({ params }) => ({
				url: `/${params.host_id}`,
				method: 'GET'
			}),
			providesTags: (result, error, { params }) => [
				{ type: 'Host', id: params.host_id }
			]
		}),
		findAll: builder.query<
			FindAllHostsResponseDto[],
			{ query: FindAllHostsQueryDto }
		>({
			query: ({ query }) => ({
				url: '/',
				method: 'GET',
				params: { ...query }
			}),
			providesTags: (results) =>
				results
					? [
							...results.map(({ host_id }) => ({
								type: 'Host' as const,
								id: host_id
							})),
							{ type: 'Host', id: 'LIST' }
						]
					: [{ type: 'Host', id: 'LIST' }]
		}),
		create: builder.mutation<
			CreateHostResponseDto,
			{ body: CreateHostBodyDto }
		>({
			query: ({ body }) => ({
				url: '/',
				method: 'POST',
				body
			}),
			invalidatesTags: [{ type: 'Host', id: 'LIST' }]
		}),
		update: builder.mutation<
			UpdateHostResponseDto,
			{
				body: UpdateHostBodyDto;
				params: UpdateHostParamsDto;
			}
		>({
			query: (body) => ({
				url: '/',
				method: 'PUT',
				body
			}),
			invalidatesTags: (result) =>
				result ? [{ type: 'Host', id: result.host_id }] : []
		}),
		delete: builder.mutation<
			DeleteHostResponseDto,
			{ params: DeleteHostParamsDto }
		>({
			query: ({ params }) => ({
				url: `/${params.host_id}`,
				method: 'DELETE'
			}),
			invalidatesTags: (result, error, { params }) => [
				{ type: 'Host', id: params.host_id }
			]
		})
	})
});

export default apiSlice;
