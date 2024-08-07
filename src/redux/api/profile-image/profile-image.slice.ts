import { createApi } from '@reduxjs/toolkit/query/react';
import { Asset } from 'react-native-image-picker';
import { userApiSlice } from '../user';
import baseQueryConfig from '../utils/baseQueryConfig';
import { CreateUserProfileImageResponseDto } from './dto/create-user-profile-image.dto';

const apiSlice = createApi({
	baseQuery: baseQueryConfig({ basePath: '/profile-image' }),
	reducerPath: 'profileImageApi',
	tagTypes: ['ProfileImage'],
	endpoints: (builder) => ({
		create: builder.mutation<
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
					url: '/user',
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
