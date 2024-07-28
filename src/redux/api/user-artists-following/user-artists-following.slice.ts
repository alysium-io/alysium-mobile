import { createApi } from '@reduxjs/toolkit/query/react';
import _ from 'lodash';
import { artistApiSlice } from '../artist';
import { userApiSlice } from '../user';
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
			}),
			serializeQueryArgs: ({ endpointName }) => endpointName,
			merge: (currentCache, newItems) => {
				return _.unionBy(
					currentCache,
					newItems,
					(item) => item.artist.artist_uid
				);
			},
			forceRefetch({ currentArg, previousArg }) {
				return !_.isEqual(currentArg, previousArg);
			},
			providesTags: (result) =>
				result ? [{ type: 'UserArtistsFollowing', id: 'LIST' }] : []
		}),
		create: builder.mutation<
			CreateUserArtistsFollowingResponseDto,
			{ body: CreateUserArtistsFollowingBodyDto }
		>({
			query: ({ body }) => ({
				url: '/',
				method: 'POST',
				body
			}),
			onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
				let patchResult;
				const result = await queryFulfilled;
				try {
					patchResult = dispatch(
						apiSlice.util.updateQueryData(
							'findAll',
							{ query: { page: 1, limit: 10 } },
							(draft) => {
								draft.unshift(result.data);
							}
						)
					);

					dispatch(
						userApiSlice.util.invalidateTags([{ type: 'User', id: 'USER' }])
					);

					dispatch(
						artistApiSlice.util.invalidateTags([
							{ type: 'PublicArtist', id: result.data.artist.artist_uid },
							{ type: 'Artist', id: result.data.artist.artist_uid }
						])
					);
				} catch (error) {
					if (patchResult) {
						patchResult.undo();
					}
					console.error('Error fulfilling query:', error);
				}
			}
		}),
		delete: builder.mutation<
			DeleteUserArtistsFollowingResponseDto,
			{ params: DeleteUserArtistsFollowingParamsDto }
		>({
			query: ({ params }) => ({
				url: `/${params.artist_uid}`,
				method: 'DELETE'
			}),
			invalidatesTags: [{ type: 'UserArtistsFollowing', id: 'LIST' }],
			onQueryStarted: async ({ params }, { dispatch, queryFulfilled }) => {
				let patchResult;
				try {
					patchResult = dispatch(
						apiSlice.util.updateQueryData(
							'findAll',
							{ query: { page: 1, limit: 10 } },
							(draft) => {
								_.remove(
									draft,
									(userArtistsFollowing) =>
										userArtistsFollowing.artist.artist_uid === params.artist_uid
								);
							}
						)
					);

					await queryFulfilled;
					dispatch(
						userApiSlice.util.invalidateTags([{ type: 'User', id: 'USER' }])
					);
				} catch (error) {
					if (patchResult) {
						patchResult.undo();
					}
					console.error('Error fulfilling query:', error);
				}
			}
		})
	})
});

export default apiSlice;
