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
				url: `/${params.host_uid}`,
				method: 'GET'
			}),
			providesTags: (result, error, { params }) => [
				{ type: 'Host', id: params.host_uid }
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
							...results.map(({ host_uid }) => ({
								type: 'Host' as const,
								id: host_uid
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
			query: ({ body, params }) => ({
				url: `/${params.host_uid}`,
				method: 'PUT',
				body
			}),
			invalidatesTags: (result) =>
				result ? [{ type: 'Host', id: result.host_uid }] : []
		}),
		delete: builder.mutation<
			DeleteHostResponseDto,
			{ params: DeleteHostParamsDto }
		>({
			query: ({ params }) => ({
				url: `/${params.host_uid}`,
				method: 'DELETE'
			}),
			invalidatesTags: (result, error, { params }) => [
				{ type: 'Host', id: params.host_uid }
			]
		})
	})
});

export default apiSlice;
