import { Asset } from 'react-native-image-picker';
import { rtkBaseUrl, serviceApi } from '../base';
import { userApiSlice } from '../user';
import { CreateUserProfileImageResponseDto } from './dto/create-user-profile-image.dto';

const url = rtkBaseUrl('profile-image');

const apiSlice = serviceApi.injectEndpoints({
	endpoints: (builder) => ({
		createProfileImage: builder.mutation<
			CreateUserProfileImageResponseDto,
			{ file: Asset }
		>({
			query: ({ file }) => {
				const form = new FormData();
				form.append('file', {
					uri: file.uri,
					type: file.type,
					name: file.fileName
				});
				return {
					url: url('/user'),
					method: 'POST',
					body: form,
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
		})
	})
});

export default apiSlice;
