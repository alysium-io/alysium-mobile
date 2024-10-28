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

const url = rtkBaseUrl('gallery');

export default serviceApi.injectEndpoints({
	endpoints: (builder) => ({
		createGalleryItem: builder.mutation<
			CreateGalleryResponseDto,
			{ body: CreateGalleryBodyDto; file: Asset }
		>({
			query: ({ body, file }) => ({
				url: url('/'),
				method: 'POST',
				body: createImageFormDataFromAsset(file, body)
			}),
			invalidatesTags: (result, error, { body }) => [
				{ type: 'Gallery', id: [body.refId, body.refType].join('/') }
			]
		}),
		findGallery: builder.query<
			FindGalleryResponseDto,
			{ params: FindGalleryParamsDto }
		>({
			query: ({ params }) => ({
				url: url(`/${params.refType}/${params.refId}`),
				method: 'GET'
			}),
			providesTags: (result, error, { params }) => [
				{ type: 'Gallery', id: [params.refId, params.refType].join('/') }
			]
		}),
		findGalleryItem: builder.query<
			FindGalleryItemResponseDto,
			{ params: FindGalleryItemParamsDto; query: FindGalleryItemQueryDto }
		>({
			query: ({ params, query }) => ({
				url: url(`/${params.refType}/${params.refId}/item`),
				method: 'GET',
				params: query
			})
		})
	})
});
