import { createImageFormDataFromAsset } from '@src/etc/Images';
import { Asset } from 'react-native-image-picker';
import { artistApiSlice } from '../artist';
import { rtkBaseUrl, serviceApi } from '../base';
import { userApiSlice } from '../user';
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
			onQueryStarted: async ({ query }, { dispatch, queryFulfilled }) => {
				await queryFulfilled;
				dispatch(
					artistApiSlice.util.invalidateTags([
						{ type: 'Artist', id: query.artist_uid },
						{ type: 'PublicArtist', id: query.artist_uid }
					])
				);
			}
		})
	})
});

export default apiSlice;
