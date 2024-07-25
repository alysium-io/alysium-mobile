import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryConfig from '../utils/baseQueryConfig';
import {
	CreateUserTagsFollowingBodyDto,
	CreateUserTagsFollowingResponseDto
} from './dto/user-tags-following-create.dto';
import {
	DeleteUserTagsFollowingParamsDto,
	DeleteUserTagsFollowingResponseDto
} from './dto/user-tags-following-delete.dto';
import {
	FindAllUserTagsFollowingQueryDto,
	FindAllUserTagsFollowingResponseDto
} from './dto/user-tags-following-find-all.dto';

const apiSlice = createApi({
	baseQuery: baseQueryConfig({ basePath: '/user-tags-following' }),
	reducerPath: 'userTagsFollowingApi',
	tagTypes: ['UserTagsFollowing'],
	endpoints: (builder) => ({
		findAll: builder.query<
			FindAllUserTagsFollowingResponseDto[],
			{
				query: FindAllUserTagsFollowingQueryDto;
			}
		>({
			query: ({ query }) => ({
				url: '/',
				method: 'GET',
				params: query
			})
		}),
		create: builder.mutation<
			CreateUserTagsFollowingResponseDto,
			{ body: CreateUserTagsFollowingBodyDto }
		>({
			query: (body) => ({
				url: '/',
				method: 'POST',
				body
			})
		}),
		delete: builder.mutation<
			DeleteUserTagsFollowingResponseDto,
			{ params: DeleteUserTagsFollowingParamsDto }
		>({
			query: ({ params }) => ({
				url: '/',
				method: 'DELETE',
				params
			})
		})
	})
});

export default apiSlice;
