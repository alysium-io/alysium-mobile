import _ from 'lodash';
import { rtkBaseUrl, serviceApi } from '../base';
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

const url = rtkBaseUrl('user-tags-following');

const apiSlice = serviceApi.injectEndpoints({
	endpoints: (builder) => ({
		findAllUserTagsFollowing: builder.query<
			FindAllUserTagsFollowingResponseDto[],
			{
				query: FindAllUserTagsFollowingQueryDto;
			}
		>({
			query: ({ query }) => ({
				url: url('/'),
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
		createUserTagsFollowing: builder.mutation<
			CreateUserTagsFollowingResponseDto,
			{ body: CreateUserTagsFollowingBodyDto }
		>({
			query: ({ body }) => ({
				url: url('/'),
				method: 'POST',
				body
			}),
			onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
				let patchResult;
				const result = await queryFulfilled;
				try {
					patchResult = dispatch(
						apiSlice.util.updateQueryData(
							'findAllUserTagsFollowing',
							{ query: { page: 1, limit: 10 } },
							(draft) => {
								draft.unshift(result.data);
							}
						)
					);

					dispatch(
						serviceApi.util.invalidateTags([
							{ type: 'User', id: 'USER' },
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
		deleteUserTagsFollowing: builder.mutation<
			DeleteUserTagsFollowingResponseDto,
			{ params: DeleteUserTagsFollowingParamsDto }
		>({
			query: ({ params }) => ({
				url: url(`/${params.tag_uid}`),
				method: 'DELETE'
			}),
			invalidatesTags: [{ type: 'UserTagsFollowing', id: 'LIST' }],
			onQueryStarted: async ({ params }, { dispatch, queryFulfilled }) => {
				let patchResult;
				try {
					patchResult = dispatch(
						apiSlice.util.updateQueryData(
							'findAllUserTagsFollowing',
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
						serviceApi.util.invalidateTags([
							{ type: 'User', id: 'USER' },
							{ type: 'Tag', id: params.tag_uid }
						])
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
