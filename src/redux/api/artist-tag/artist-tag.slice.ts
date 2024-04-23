import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryConfig from '../utils/baseQueryConfig';
import {
	CreateArtistTagBodyDto,
	CreateArtistTagResponseDto
} from './dto/artist-tag-create.dto';
import {
	DeleteArtistTagBodyDto,
	DeleteArtistTagResponseDto
} from './dto/artist-tag-delete.dto';

const apiSlice = createApi({
	baseQuery: baseQueryConfig({ basePath: '/artist-tag' }),
	reducerPath: 'artistTagApi',
	tagTypes: ['ArtistTag'],
	endpoints: (builder) => ({
		create: builder.mutation<
			CreateArtistTagResponseDto,
			{ body: CreateArtistTagBodyDto }
		>({
			query: ({ body }) => ({
				url: '/',
				method: 'POST',
				body
			}),
			invalidatesTags: [{ type: 'ArtistTag', id: 'LIST' }]
		}),
		delete: builder.mutation<
			DeleteArtistTagResponseDto,
			{ body: DeleteArtistTagBodyDto }
		>({
			query: ({ body }) => ({
				url: '/',
				method: 'DELETE',
				body
			}),
			invalidatesTags: (result, error, { body }) => [
				{ type: 'ArtistTag', id: body.artist_id }
			]
		})
	})
});

export default apiSlice;
