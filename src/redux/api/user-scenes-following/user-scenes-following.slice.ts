import _ from 'lodash';
import { rtkBaseUrl, serviceApi } from '../base';
import {
	CreateUserScenesFollowingBodyDto,
	CreateUserScenesFollowingResponseDto
} from './dto/user-scenes-following-create.dto';
import {
	DeleteUserScenesFollowingParamsDto,
	DeleteUserScenesFollowingResponseDto
} from './dto/user-scenes-following-delete.dto';
import {
	FindAllUserScenesFollowingQueryDto,
	FindAllUserScenesFollowingResponseDto
} from './dto/user-scenes-following-find-all.dto';

const url = rtkBaseUrl('user-scenes-following');

const apiSlice = serviceApi.injectEndpoints({
	endpoints: (builder) => ({
		findAllUserScenesFollowing: builder.query<
			FindAllUserScenesFollowingResponseDto[],
			{
				query: FindAllUserScenesFollowingQueryDto;
			}
		>({
			query: ({ query }) => ({
				url: url('/'),
				method: 'GET',
				params: query
			}),
			serializeQueryArgs: ({ endpointName }) => endpointName,
			merge: (currentCache, newItems) => {
				return _.unionBy(
					currentCache,
					newItems,
					(item) => item.scene.scene_uid
				);
			},
			forceRefetch({ currentArg, previousArg }) {
				return !_.isEqual(currentArg, previousArg);
			},
			providesTags: (result) =>
				result ? [{ type: 'UserScenesFollowing', id: 'LIST' }] : []
		}),
		createUserScenesFollowing: builder.mutation<
			CreateUserScenesFollowingResponseDto,
			{ body: CreateUserScenesFollowingBodyDto }
		>({
			query: ({ body }) => ({
				url: url('/'),
				method: 'POST',
				body
			}),
			invalidatesTags: (results, error, { body }) => [
				{ type: 'UserScenesFollowing', id: 'LIST' },
				{ type: 'Scene', id: body.scene_uid }
			],
			onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
				let patchResult;
				const result = await queryFulfilled;
				try {
					patchResult = dispatch(
						apiSlice.util.updateQueryData(
							'findAllUserScenesFollowing',
							{ query: { page: 1, limit: 10 } },
							(draft) => {
								draft.unshift(result.data);
							}
						)
					);

					dispatch(
						serviceApi.util.invalidateTags([{ type: 'User', id: 'USER' }])
					);
				} catch (error) {
					if (patchResult) {
						patchResult.undo();
					}
					console.error('Error fulfilling query:', error);
				}
			}
		}),
		deleteUserScenesFollowing: builder.mutation<
			DeleteUserScenesFollowingResponseDto,
			{ params: DeleteUserScenesFollowingParamsDto }
		>({
			query: ({ params }) => ({
				url: url(`/${params.scene_uid}`),
				method: 'DELETE'
			}),
			invalidatesTags: (results, error, { params }) => [
				{ type: 'UserScenesFollowing', id: 'LIST' },
				{ type: 'Scene', id: params.scene_uid }
			],
			onQueryStarted: async ({ params }, { dispatch, queryFulfilled }) => {
				let patchResult;
				try {
					patchResult = dispatch(
						apiSlice.util.updateQueryData(
							'findAllUserScenesFollowing',
							{ query: { page: 1, limit: 10 } },
							(draft) => {
								_.remove(
									draft,
									(userScenesFollowing) =>
										userScenesFollowing.scene.scene_uid === params.scene_uid
								);
							}
						)
					);
					await queryFulfilled;
					dispatch(
						serviceApi.util.invalidateTags([{ type: 'User', id: 'USER' }])
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
