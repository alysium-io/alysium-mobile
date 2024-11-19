import { rtkBaseUrl, serviceApi } from '../base';
import {
	CreateExternalUrlBodyDto,
	CreateExternalUrlResponseDto
} from './dto/external-url-create.dto';
import {
	DeleteExternalUrlBodyDto,
	DeleteExternalUrlResponseDto
} from './dto/external-url-delete.dto';

const url = rtkBaseUrl('external-url');

export default serviceApi.injectEndpoints({
	endpoints: (builder) => ({
		createExternalUrl: builder.mutation<
			CreateExternalUrlResponseDto,
			{ body: CreateExternalUrlBodyDto }
		>({
			query: ({ body }) => ({
				url: url('/'),
				method: 'POST',
				body
			}),
			invalidatesTags: (result, error, { body }) =>
				result
					? [
							{ type: 'PrivateArtist', id: 'CURRENT' },
							{ type: 'PublicArtist', id: body.refId }
					  ]
					: []
		}),
		deleteExternalUrl: builder.mutation<
			DeleteExternalUrlResponseDto,
			{ body: DeleteExternalUrlBodyDto }
		>({
			query: ({ body }) => ({
				url: url('/'),
				method: 'DELETE',
				body
			}),
			invalidatesTags: [{ type: 'PrivateArtist', id: 'CURRENT' }]
		})
	})
});
