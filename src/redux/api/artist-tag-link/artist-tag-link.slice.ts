import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryConfig from '../utils/baseQueryConfig';
import {
	CreateArtistTagLinkBodyDto,
	CreateArtistTagLinkResponseDto
} from './dto/artist-tag-link-create.dto';
import {
	DeleteArtistTagLinkBodyDto,
	DeleteArtistTagLinkResponseDto
} from './dto/artist-tag-link-delete.dto';

const apiSlice = createApi({
	baseQuery: baseQueryConfig({ basePath: '/artist-tag-link' }),
	reducerPath: 'artistTagLinkApi',
	tagTypes: ['ArtistTagLink'],
	endpoints: (builder) => ({
		create: builder.mutation<
			CreateArtistTagLinkResponseDto,
			{ body: CreateArtistTagLinkBodyDto }
		>({
			query: ({ body }) => ({
				url: '/',
				method: 'POST',
				body
			}),
			invalidatesTags: [{ type: 'ArtistTagLink', id: 'LIST' }]
		}),
		delete: builder.mutation<
			DeleteArtistTagLinkResponseDto,
			{ body: DeleteArtistTagLinkBodyDto }
		>({
			query: ({ body }) => ({
				url: '/',
				method: 'DELETE',
				body
			}),
			invalidatesTags: (result, error, { body }) => [
				{ type: 'ArtistTagLink', id: body.artist_id }
			]
		})
	})
});

export default apiSlice;
