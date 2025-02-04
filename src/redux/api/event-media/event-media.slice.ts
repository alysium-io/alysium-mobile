import { createImageFormDataFromAsset } from '@src/etc/Images';
import { Asset } from 'react-native-image-picker';
import { serviceApi } from '../base';
import {
	CreateEventMediaBodyDto,
	CreateEventMediaParamsDto,
	CreateEventMediaResponseDto
} from './dto/event-media-create.dto';
import {
	DeleteEventMediaParamsDto,
	DeleteEventMediaResponseDto
} from './dto/event-media-delete.dto';
import {
	UpdateEventMediaBodyDto,
	UpdateEventMediaParamsDto,
	UpdateEventMediaResponseDto
} from './dto/event-media-update.dto';

export default serviceApi.injectEndpoints({
	endpoints: (builder) => ({
		createEventMedia: builder.mutation<
			CreateEventMediaResponseDto,
			{
				params: CreateEventMediaParamsDto;
				body: CreateEventMediaBodyDto;
				file: Asset;
			}
		>({
			query: ({ params, body, file }) => ({
				url: `/artist/${params.artist_uid}/event/${params.event_uid}/event-media`,
				method: 'POST',
				body: createImageFormDataFromAsset(file, body)
			}),
			invalidatesTags: (result, error, { params }) => [
				{ type: 'ArtistEvent', id: params.artist_uid }
			]
		}),
		updateEventMedia: builder.mutation<
			UpdateEventMediaResponseDto,
			{
				params: UpdateEventMediaParamsDto;
				body: UpdateEventMediaBodyDto;
				file: Asset;
			}
		>({
			query: ({ params, body, file }) => ({
				url: `/artist/${params.artist_uid}/event/${params.event_uid}/event-media/${params.event_media_uid}`,
				method: 'PUT',
				body: createImageFormDataFromAsset(file, body)
			}),
			invalidatesTags: (result, error, { params }) => [
				{ type: 'ArtistEvent', id: params.artist_uid }
			]
		}),
		deleteEventMedia: builder.mutation<
			DeleteEventMediaResponseDto,
			{ params: DeleteEventMediaParamsDto }
		>({
			query: ({ params }) => ({
				url: `/artist/${params.artist_uid}/event/${params.event_uid}/event-media/${params.event_media_uid}`,
				method: 'DELETE'
			}),
			invalidatesTags: (result, error, { params }) => [
				{ type: 'ArtistEvent', id: params.artist_uid }
			]
		})
	})
});
