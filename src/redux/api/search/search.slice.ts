import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryConfig from '../utils/baseQueryConfig';
import {
	SearchArtistsBodyDto,
	SearchArtistsResponseDto
} from './dto/search-artists.dto';

const apiSlice = createApi({
	baseQuery: baseQueryConfig({ basePath: '/search' }),
	reducerPath: 'searchApi',
	tagTypes: ['Search'],
	endpoints: (builder) => ({
		searchArtists: builder.query<
			{ hits: SearchArtistsResponseDto[] },
			{ body: SearchArtistsBodyDto }
		>({
			query: ({ body }) => ({
				url: '/artists',
				method: 'POST',
				body
			})
		})
	})
});

export default apiSlice;
