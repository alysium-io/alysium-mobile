import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryConfig from '../utils/baseQueryConfig';
import { CreateTagBodyDto, CreateTagResponseDto } from './dto/tag-create.dto';
import {
	FindOneTagParamsDto,
	FindOneTagResponseDto
} from './dto/tag-find-one.dto';

const apiSlice = createApi({
	baseQuery: baseQueryConfig({ basePath: '/tag' }),
	reducerPath: 'tagApi',
	tagTypes: ['Tag'],
	endpoints: (builder) => ({
		findOne: builder.query<
			FindOneTagResponseDto,
			{ params: FindOneTagParamsDto }
		>({
			query: ({ params }) => ({
				url: `/${params.tag_id}`,
				method: 'GET'
			}),
			providesTags: (result, error, { params }) => [
				{ type: 'Tag', id: params.tag_id }
			]
		}),
		create: builder.mutation<
			CreateTagResponseDto,
			{ body: CreateTagBodyDto }
		>({
			query: (body) => ({
				url: '/',
				method: 'POST',
				body
			})
		})
	})
});

export default apiSlice;
