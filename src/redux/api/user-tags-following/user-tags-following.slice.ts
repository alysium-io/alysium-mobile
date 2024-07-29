import { createApi } from '@reduxjs/toolkit/query/react';
import _ from 'lodash';
import { tagApiSlice } from '../tag';
import { userApiSlice } from '../user';
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
			}),
			serializeQueryArgs: ({ endpointName }) => endpointName,
			merge: (currentCache, newItems) => {
				return _.unionBy(currentCache, newItems, (item) => item.tag.tag_uid);
			},
			forceRefetch({ currentArg, previousArg }) {
				return !_.isEqual(currentArg, previousArg);
			},
			providesTags: (result) =>
				result ? [{ type: 'UserTagsFollowing', id: 'LIST' }] : []
		}),
		create: builder.mutation<
			CreateUserTagsFollowingResponseDto,
			{ body: CreateUserTagsFollowingBodyDto }
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
						tagApiSlice.util.invalidateTags([
							{ type: 'Tag', id: result.data.tag.tag_uid }
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
			DeleteUserTagsFollowingResponseDto,
			{ params: DeleteUserTagsFollowingParamsDto }
		>({
			query: ({ params }) => ({
				url: `/${params.tag_uid}`,
				method: 'DELETE'
			}),
			invalidatesTags: [{ type: 'UserTagsFollowing', id: 'LIST' }],
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
									(userTagsFollowing) =>
										userTagsFollowing.tag.tag_uid === params.tag_uid
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
