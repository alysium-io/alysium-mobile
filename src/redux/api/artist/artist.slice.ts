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
	FindAllArtistsQueryDto,
	FindAllArtistsResponseDto
} from './dto/artist-find-all.dto';
import {
	FindOneArtistParamsDto,
	FindOneArtistResponseDto
} from './dto/artist-find-one.dto';
import {
	UpdateArtistBodyDto,
	UpdateArtistParamsDto,
	UpdateArtistResponseDto
} from './dto/artist-update.dto';

const apiSlice = createApi({
	baseQuery: baseQueryConfig({ basePath: '/artist' }),
	reducerPath: 'artistApi',
	tagTypes: ['Artist'],
	endpoints: (builder) => ({
		findOne: builder.query<
			FindOneArtistResponseDto,
			{ params: FindOneArtistParamsDto }
		>({
			query: ({ params }) => ({
				url: `/${params.artist_id}`,
				method: 'GET'
			}),
			providesTags: (result, error, { params }) => [
				{ type: 'Artist', id: params.artist_id }
			]
		}),
		findAll: builder.query<
			FindAllArtistsResponseDto[],
			{ query: FindAllArtistsQueryDto }
		>({
			query: ({ query }) => ({
				url: '/',
				method: 'GET',
				params: { ...query }
			}),
			providesTags: (results) =>
				results
					? [
							...results.map(({ artist_id }) => ({
								type: 'Artist' as const,
								id: artist_id
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
				result ? [{ type: 'Artist', id: result.artist_id }] : []
		}),
		delete: builder.mutation<
			DeleteArtistResponseDto,
			{ params: DeleteArtistParamsDto }
		>({
			query: ({ params }) => ({
				url: `/${params.artist_id}`,
				method: 'DELETE'
			}),
			invalidatesTags: (result, error, { params }) => [
				{ type: 'Artist', id: params.artist_id }
			]
		})
	})
});

export default apiSlice;
