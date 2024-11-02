import { createImageFormDataFromAsset } from '@src/etc/Images';
import { Asset } from 'react-native-image-picker';
import { rtkBaseUrl, serviceApi } from '../base';
import { userApiSlice } from '../user';
import {
	CreateArtistEventProfileImageQueryDto,
	CreateArtistEventProfileImageResponseDto
} from './dto/create-artist-event-profile-image.dto';
import {
	CreateArtistProfileImageQueryDto,
	CreateArtistProfileImageResponseDto
} from './dto/create-artist-profile-image.dto';
import { CreateUserProfileImageResponseDto } from './dto/create-user-profile-image.dto';

const url = rtkBaseUrl('profile-image');

const apiSlice = serviceApi.injectEndpoints({
	endpoints: (builder) => ({
		createUserProfileImage: builder.mutation<
			CreateUserProfileImageResponseDto,
			{ file: Asset }
		>({
			query: ({ file }) => {
				return {
					url: url('/user'),
					method: 'POST',
					body: createImageFormDataFromAsset(file),
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				};
			},
			onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
				await queryFulfilled;
				dispatch(
					userApiSlice.util.invalidateTags([{ type: 'User', id: 'USER' }])
				);
			}
		}),
		createArtistProfileImage: builder.mutation<
			CreateArtistProfileImageResponseDto,
			{ file: Asset; query: CreateArtistProfileImageQueryDto }
		>({
			query: ({ file, query }) => {
				return {
					url: url('/artist'),
					method: 'POST',
					body: createImageFormDataFromAsset(file),
					headers: {
						'Content-Type': 'multipart/form-data'
					},
					params: query
				};
			},
			invalidatesTags: (result, error, { query }) => [
				{ type: 'Artist', id: query.artist_uid },
				{ type: 'PublicArtist', id: query.artist_uid }
			]
		}),
		createArtistEventProfileImage: builder.mutation<
			CreateArtistEventProfileImageResponseDto,
			{ file: Asset; query: CreateArtistEventProfileImageQueryDto }
		>({
			query: ({ file, query }) => {
				return {
					url: url('/artist-event'),
					method: 'POST',
					body: createImageFormDataFromAsset(file),
					headers: {
						'Content-Type': 'multipart/form-data'
					},
					params: query
				};
			},
			invalidatesTags: (result, error, { query }) => [
				{ type: 'ArtistEvent', id: query.event_uid },
				{ type: 'ArtistEvent', id: 'LIST' }
			]
		})
	})
});

export default apiSlice;
