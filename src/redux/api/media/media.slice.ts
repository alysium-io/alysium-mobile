import { createApi } from '@reduxjs/toolkit/query/react';
import { Asset } from 'react-native-image-picker';
import { artistApiSlice } from '../artist';
import { eventApiSlice } from '../event';
import { hostApiSlice } from '../host';
import { userApiSlice } from '../user';
import baseQueryConfig from '../utils/baseQueryConfig';
import { venueApiSlice } from '../venue';
import {
	CreateMediaBodyDto,
	CreateMediaResponseDto
} from './dto/media-create.dto';
import { MediaRefType } from './media.entity';

const apiSlice = createApi({
	baseQuery: baseQueryConfig({ basePath: '/media' }),
	reducerPath: 'mediaApi',
	tagTypes: ['Media'],
	endpoints: (builder) => ({
		create: builder.mutation<
			CreateMediaResponseDto,
			{
				body: CreateMediaBodyDto;
				file: Asset;
			}
		>({
			query: ({ body, file }) => {
				const form = new FormData();
				form.append('ref', body.ref);
				form.append('refId', body.refId.toString());
				form.append('field', body.field);
				form.append('file', {
					uri: file.uri,
					type: file.type,
					name: file.fileName
				});
				return {
					url: '/upload',
					method: 'POST',
					body: form,
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				};
			},
			onQueryStarted: async ({ body }, { queryFulfilled, dispatch }) => {
				try {
					const result = await queryFulfilled;
					if (body.ref === MediaRefType.user) {
						dispatch(
							userApiSlice.util.updateQueryData('me', undefined, (draft) => {
								draft.profile_image = result.data;
							})
						);
					} else if (body.ref === MediaRefType.host) {
						dispatch(
							hostApiSlice.util.updateQueryData(
								'findOne',
								{ params: { host_id: body.refId } },
								(draft) => {
									draft.profile_image = result.data;
								}
							)
						);
						dispatch(
							hostApiSlice.util.invalidateTags([{ type: 'Host', id: 'LIST' }])
						);
					} else if (body.ref === MediaRefType.artist) {
						dispatch(
							artistApiSlice.util.updateQueryData(
								'findOne',
								{ params: { artist_id: body.refId } },
								(draft) => {
									draft.profile_image = result.data;
								}
							)
						);
						dispatch(
							artistApiSlice.util.invalidateTags([
								{ type: 'Artist', id: 'LIST' }
							])
						);
					} else if (body.ref === MediaRefType.event) {
						dispatch(
							eventApiSlice.util.updateQueryData(
								'findOne',
								{ params: { event_id: body.refId } },
								(draft) => {
									draft.profile_image = result.data;
								}
							)
						);
						dispatch(
							eventApiSlice.util.invalidateTags([{ type: 'Event', id: 'LIST' }])
						);
					} else if (body.ref === MediaRefType.venue) {
						dispatch(
							venueApiSlice.util.updateQueryData(
								'findOne',
								{ params: { venue_id: body.refId } },
								(draft) => {
									draft.profile_image = result.data;
								}
							)
						);
						dispatch(
							venueApiSlice.util.invalidateTags([{ type: 'Venue', id: 'LIST' }])
						);
					}
				} catch (error) {
					console.error(
						'Error in mediaApiSlice.create.onQueryStarted: ',
						error
					);
				}
			}
		})
	})
});

export default apiSlice;
