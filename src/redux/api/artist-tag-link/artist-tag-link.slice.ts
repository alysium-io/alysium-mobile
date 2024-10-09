import { rtkBaseUrl, serviceApi } from '../base';
import {
	CreateArtistTagLinkBodyDto,
	CreateArtistTagLinkResponseDto
} from './dto/artist-tag-link-create.dto';
import {
	DeleteArtistTagLinkBodyDto,
	DeleteArtistTagLinkResponseDto
} from './dto/artist-tag-link-delete.dto';

const url = rtkBaseUrl('artist-tag-link');

export default serviceApi.injectEndpoints({
	endpoints: (builder) => ({
		createArtistTagLink: builder.mutation<
			CreateArtistTagLinkResponseDto,
			{ body: CreateArtistTagLinkBodyDto }
		>({
			query: ({ body }) => ({
				url: url('/'),
				method: 'POST',
				body
			}),
			invalidatesTags: [{ type: 'ArtistTagLink', id: 'LIST' }]
		}),
		deleteArtistTagLink: builder.mutation<
			DeleteArtistTagLinkResponseDto,
			{ body: DeleteArtistTagLinkBodyDto }
		>({
			query: ({ body }) => ({
				url: url('/'),
				method: 'DELETE',
				body
			}),
			invalidatesTags: (result, error, { body }) => [
				{ type: 'ArtistTagLink', id: body.artist_uid }
			]
		})
	})
});
