import { createImageFormDataFromAsset } from '@src/etc/Images';
import { Asset } from 'react-native-image-picker';
import { rtkBaseUrl, serviceApi } from '../base';
import {
	CreateGalleryBodyDto,
	CreateGalleryResponseDto
} from './dto/gallery-create.dto';
import {
	FindGalleryItemParamsDto,
	FindGalleryItemQueryDto,
	FindGalleryItemResponseDto
} from './dto/gallery-find-one.dto';
import {
	FindGalleryParamsDto,
	FindGalleryResponseDto
} from './dto/gallery-find.dto';

const artistGalleryUrl = rtkBaseUrl('gallery/artist');
const artistEventGalleryUrl = rtkBaseUrl('gallery/artist-event');

export default serviceApi.injectEndpoints({
	endpoints: (builder) => ({
		// Artist Event Gallery
		createArtistEventGalleryItem: builder.mutation<
			CreateGalleryResponseDto,
			{ body: CreateGalleryBodyDto; file: Asset }
		>({
			query: ({ body, file }) => ({
				url: artistEventGalleryUrl('/'),
				method: 'POST',
				body: createImageFormDataFromAsset(file, body)
			}),
			invalidatesTags: (result, error, { body }) => [
				{ type: 'ArtistEventGallery', id: body.refId }
			]
		}),
		findArtistEventGallery: builder.query<
			FindGalleryResponseDto,
			{ params: FindGalleryParamsDto }
		>({
			query: ({ params }) => ({
				url: artistEventGalleryUrl(`/${params.refId}`),
				method: 'GET'
			}),
			providesTags: (result, error, { params }) => [
				{ type: 'ArtistEventGallery', id: params.refId }
			]
		}),
		findArtistEventGalleryItem: builder.query<
			FindGalleryItemResponseDto,
			{ params: FindGalleryItemParamsDto; query: FindGalleryItemQueryDto }
		>({
			query: ({ params, query }) => ({
				url: artistEventGalleryUrl(`/${params.refId}/item`),
				method: 'GET',
				params: query
			})
		}),

		// Artist Gallery
		createArtistGalleryItem: builder.mutation<
			CreateGalleryResponseDto,
			{ body: CreateGalleryBodyDto; file: Asset }
		>({
			query: ({ body, file }) => ({
				url: artistGalleryUrl('/'),
				method: 'POST',
				body: createImageFormDataFromAsset(file, body)
			}),
			invalidatesTags: (result, error, { body }) => [
				{
					type: 'ArtistGallery',
					id: body.refId
				}
			]
		}),
		findArtistGallery: builder.query<
			FindGalleryResponseDto,
			{ params: FindGalleryParamsDto }
		>({
			query: ({ params }) => ({
				url: artistGalleryUrl(`/${params.refId}`),
				method: 'GET'
			}),
			providesTags: (result, error, { params }) => [
				{
					type: 'ArtistGallery',
					id: params.refId
				}
			]
		}),
		findArtistGalleryItem: builder.query<
			FindGalleryItemResponseDto,
			{ params: FindGalleryItemParamsDto; query: FindGalleryItemQueryDto }
		>({
			query: ({ params, query }) => ({
				url: artistGalleryUrl(`/${params.refId}/item`),
				method: 'GET',
				params: query
			})
		})
	})
});
