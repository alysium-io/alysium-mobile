import _ from 'lodash';
import { rtkBaseUrl, serviceApi } from '../base';
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

const url = rtkBaseUrl('user-artists-following');

const apiSlice = serviceApi.injectEndpoints({
	endpoints: (builder) => ({
		findAllUserArtistsFollowing: builder.query<
			FindAllUserArtistsFollowingResponseDto[],
			{
				query: FindAllUserArtistsFollowingQueryDto;
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
					(item) => item.artist.artist_uid
				);
			},
			forceRefetch({ currentArg, previousArg }) {
				return !_.isEqual(currentArg, previousArg);
			},
			providesTags: (result) =>
				result ? [{ type: 'UserArtistsFollowing', id: 'LIST' }] : []
		}),
		createUserArtistsFollowing: builder.mutation<
			CreateUserArtistsFollowingResponseDto,
			{ body: CreateUserArtistsFollowingBodyDto }
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
							'findAllUserArtistsFollowing',
							{ query: { page: 1, limit: 10 } },
							(draft) => {
								draft.unshift(result.data);
							}
						)
					);

					dispatch(
						serviceApi.util.invalidateTags([
							{ type: 'User', id: 'USER' },
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
		deleteUserArtistsFollowing: builder.mutation<
			DeleteUserArtistsFollowingResponseDto,
			{ params: DeleteUserArtistsFollowingParamsDto }
		>({
			query: ({ params }) => ({
				url: url(`/${params.artist_uid}`),
				method: 'DELETE'
			}),
			invalidatesTags: [{ type: 'UserArtistsFollowing', id: 'LIST' }],
			onQueryStarted: async ({ params }, { dispatch, queryFulfilled }) => {
				let patchResult;
				try {
					patchResult = dispatch(
						apiSlice.util.updateQueryData(
							'findAllUserArtistsFollowing',
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
						serviceApi.util.invalidateTags([
							{ type: 'User', id: 'USER' },
							{ type: 'PublicArtist', id: params.artist_uid },
							{ type: 'Artist', id: params.artist_uid }
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
