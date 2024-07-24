import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryConfig from '../utils/baseQueryConfig';
import {
	CreateUserArtistsFollowingBodyDto,
	CreateUserArtistsFollowingResponseDto
} from './dto/user-artists-following-create.dto';
import {
	DeleteUserArtistsFollowingParamsDto,
	DeleteUserArtistsFollowingResponseDto
} from './dto/user-artists-following-delete.dto';
import {
	FindAllUserArtistsFollowingQueryDto,
	FindAllUserArtistsFollowingResponseDto
} from './dto/user-artists-following-find-all.dto';

const apiSlice = createApi({
	baseQuery: baseQueryConfig({ basePath: '/user-artists-following' }),
	reducerPath: 'userArtistsFollowingApi',
	tagTypes: ['UserArtistsFollowing'],
	endpoints: (builder) => ({
		findAll: builder.query<
			FindAllUserArtistsFollowingResponseDto[],
			{
				query: FindAllUserArtistsFollowingQueryDto;
			}
		>({
			query: ({ query }) => ({
				url: '/',
				method: 'GET',
				params: query
			})
		}),
		create: builder.mutation<
			CreateUserArtistsFollowingResponseDto,
			{ body: CreateUserArtistsFollowingBodyDto }
		>({
			query: (body) => ({
				url: '/',
				method: 'POST',
				body
			})
		}),
		delete: builder.mutation<
			DeleteUserArtistsFollowingResponseDto,
			{ params: DeleteUserArtistsFollowingParamsDto }
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
