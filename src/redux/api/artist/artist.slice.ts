import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryConfig from '../utils/baseQueryConfig';
import {
	CreateArtistBodyDto,
	CreateArtistResponseDto
} from './dto/artist-create.dto';
import {
	DeleteArtistParamsDto,
	DeleteArtistResponseDto
} from './dto/artist-delete.dto';
import {
	PrivateFindAllArtistsQueryDto,
	PrivateFindAllArtistsResponseDto
} from './dto/artist-find-all.dto';
import {
	PrivateFindOneArtistParamsDto,
	PrivateFindOneArtistResponseDto,
	PublicFindOneArtistParamsDto,
	PublicFindOneArtistResponseDto
} from './dto/artist-find-one.dto';
import {
	UpdateArtistBodyDto,
	UpdateArtistParamsDto,
	UpdateArtistResponseDto
} from './dto/artist-update.dto';

const apiSlice = createApi({
	baseQuery: baseQueryConfig({ basePath: '/artist' }),
	reducerPath: 'artistApi',
	tagTypes: ['Artist', 'PublicArtist'],
	endpoints: (builder) => ({
		publicFindOne: builder.query<
			PublicFindOneArtistResponseDto,
			{ params: PublicFindOneArtistParamsDto }
		>({
			query: ({ params }) => ({
				url: `/public/${params.artist_uid}`,
				method: 'GET'
			}),
			providesTags: (result, error, { params }) => [
				{ type: 'PublicArtist', id: params.artist_uid }
			]
		}),
		privateFindOne: builder.query<
			PrivateFindOneArtistResponseDto,
			{ params: PrivateFindOneArtistParamsDto }
		>({
			query: ({ params }) => ({
				url: `/${params.artist_uid}`,
				method: 'GET'
			}),
			providesTags: (result, error, { params }) => [
				{ type: 'Artist', id: params.artist_uid }
			]
		}),
		privateFindAll: builder.query<
			PrivateFindAllArtistsResponseDto[],
			{ query: PrivateFindAllArtistsQueryDto }
		>({
			query: ({ query }) => ({
				url: '/',
				method: 'GET',
				params: query
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
		create: builder.mutation<
			CreateArtistResponseDto,
			{ body: CreateArtistBodyDto }
		>({
			query: ({ body }) => ({
				url: '/',
				method: 'POST',
				body
			}),
			invalidatesTags: [{ type: 'Artist', id: 'LIST' }]
		}),
		update: builder.mutation<
			UpdateArtistResponseDto,
			{
				body: UpdateArtistBodyDto;
				params: UpdateArtistParamsDto;
			}
		>({
			query: (body) => ({
				url: '/',
				method: 'PUT',
				body
			}),
			invalidatesTags: (result) =>
				result ? [{ type: 'Artist', id: result.artist_uid }] : []
		}),
		delete: builder.mutation<
			DeleteArtistResponseDto,
			{ params: DeleteArtistParamsDto }
		>({
			query: ({ params }) => ({
				url: `/${params.artist_uid}`,
				method: 'DELETE'
			}),
			invalidatesTags: (result, error, { params }) => [
				{ type: 'Artist', id: params.artist_uid }
			]
		})
	})
});

export default apiSlice;
