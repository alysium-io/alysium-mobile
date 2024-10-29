import { rtkBaseUrl, serviceApi } from '../base';
import {
	CreateArtistBodyDto,
	CreateArtistResponseDto
} from './dto/artist-create.dto';
import {
	DeleteArtistParamsDto,
	DeleteArtistResponseDto
} from './dto/artist-delete.dto';
import { PrivateFindAllArtistsResponseDto } from './dto/artist-find-all.dto';
import {
	PrivateFindOneArtistParamsDto,
	PrivateFindOneArtistResponseDto,
	PublicFindOneArtistParamsDto,
	PublicFindOneArtistResponseDto
} from './dto/artist-find-one.dto';
import {
	PublicFindRelatedArtistsParamsDto,
	PublicFindRelatedArtistsResponseDto
} from './dto/artist-find-related-artists.dto';
import {
	UpdateArtistBodyDto,
	UpdateArtistParamsDto,
	UpdateArtistResponseDto
} from './dto/artist-update.dto';

const url = rtkBaseUrl('artist');

export default serviceApi.injectEndpoints({
	endpoints: (builder) => ({
		publicFindOneArtist: builder.query<
			PublicFindOneArtistResponseDto,
			{ params: PublicFindOneArtistParamsDto }
		>({
			query: ({ params }) => ({
				url: url(`/public/${params.artist_uid}`),
				method: 'GET'
			}),
			providesTags: (result, error, { params }) => [
				{ type: 'PublicArtist', id: params.artist_uid }
			]
		}),
		publicFindRelatedArtists: builder.query<
			PublicFindRelatedArtistsResponseDto,
			{ params: PublicFindRelatedArtistsParamsDto }
		>({
			query: ({ params }) => ({
				url: url(`/public/${params.artist_uid}/related`),
				method: 'GET'
			})
		}),
		privateFindOneArtist: builder.query<
			PrivateFindOneArtistResponseDto,
			{ params: PrivateFindOneArtistParamsDto }
		>({
			query: ({ params }) => ({
				url: url(`/${params.artist_uid}`),
				method: 'GET'
			}),
			providesTags: (result, error, { params }) => [
				{ type: 'Artist', id: params.artist_uid },
				{ type: 'PrivateArtist', id: 'CURRENT' }
			]
		}),
		privateFindAllArtists: builder.query<
			PrivateFindAllArtistsResponseDto,
			void
		>({
			query: () => ({
				url: url('/'),
				method: 'GET'
			}),
			providesTags: (results) =>
				results
					? [
							...results.map(({ artist_uid }) => ({
								type: 'Artist' as const,
								id: artist_uid
							})),
							{ type: 'Artist', id: 'LIST' }
					  ]
					: [{ type: 'Artist', id: 'LIST' }]
		}),
		createArtist: builder.mutation<
			CreateArtistResponseDto,
			{ body: CreateArtistBodyDto }
		>({
			query: ({ body }) => ({
				url: url('/'),
				method: 'POST',
				body
			}),
			invalidatesTags: [{ type: 'Artist', id: 'LIST' }]
		}),
		updateArtist: builder.mutation<
			UpdateArtistResponseDto,
			{
				body: UpdateArtistBodyDto;
				params: UpdateArtistParamsDto;
			}
		>({
			query: ({ body, params }) => ({
				url: url(`/${params.artist_uid}`),
				method: 'PUT',
				body
			}),
			invalidatesTags: (result) =>
				result ? [{ type: 'Artist', id: result.artist_uid }] : []
		}),
		deleteArtist: builder.mutation<
			DeleteArtistResponseDto,
			{ params: DeleteArtistParamsDto }
		>({
			query: ({ params }) => ({
				url: url(`/${params.artist_uid}`),
				method: 'DELETE'
			}),
			invalidatesTags: (result, error, { params }) => [
				{ type: 'Artist', id: 'LIST' },
				{ type: 'Artist', id: params.artist_uid }
			]
		})
	})
});
