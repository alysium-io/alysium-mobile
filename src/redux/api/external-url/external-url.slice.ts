import { rtkBaseUrl, serviceApi } from '../base';
import {
	CreateExternalUrlBodyDto,
	CreateExternalUrlParamsDto,
	CreateExternalUrlResponseDto
} from './dto/external-url-create.dto';
import {
	DeleteExternalUrlParamsDto,
	DeleteExternalUrlResponseDto
} from './dto/external-url-delete.dto';
import {
	UpdateExternalUrlBodyDto,
	UpdateExternalUrlParamsDto,
	UpdateExternalUrlResponseDto
} from './dto/external-url-update.dto';

const url = rtkBaseUrl('');

export default serviceApi.injectEndpoints({
	endpoints: (builder) => ({
		createExternalUrl: builder.mutation<
			CreateExternalUrlResponseDto,
			{ params: CreateExternalUrlParamsDto; body: CreateExternalUrlBodyDto }
		>({
			query: ({ params, body }) => ({
				url: url(`artist/${params.artist_uid}/external-url`),
				method: 'POST',
				body
			}),
			invalidatesTags: (result, error, { params }) =>
				result
					? [
							{ type: 'PrivateArtist', id: 'CURRENT' },
							{ type: 'PublicArtist', id: params.artist_uid }
					  ]
					: []
		}),
		deleteExternalUrl: builder.mutation<
			DeleteExternalUrlResponseDto,
			{ params: DeleteExternalUrlParamsDto }
		>({
			query: ({ params }) => ({
				url: url(
					`artist/${params.artist_uid}/external-url/${params.external_url_uid}`
				),
				method: 'DELETE'
			}),
			invalidatesTags: (result, error, { params }) =>
				result
					? [
							{ type: 'PrivateArtist', id: 'CURRENT' },
							{ type: 'PublicArtist', id: params.external_url_uid }
					  ]
					: []
		}),
		updateExternalUrl: builder.mutation<
			UpdateExternalUrlResponseDto,
			{ body: UpdateExternalUrlBodyDto; params: UpdateExternalUrlParamsDto }
		>({
			query: ({ body, params }) => ({
				url: url(
					`artist/${params.artist_uid}/external-url/${params.external_url_uid}`
				),
				method: 'PUT',
				body
			}),
			invalidatesTags: (result, error, { params }) =>
				result
					? [
							{ type: 'PrivateArtist', id: 'CURRENT' },
							{ type: 'PublicArtist', id: params.artist_uid }
					  ]
					: []
		})
	})
});
