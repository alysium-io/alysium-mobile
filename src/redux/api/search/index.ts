import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryConfig from '../utils/baseQueryConfig';
import {
	SearchArtistsQueryDto,
	SearchArtistsResponseDto
} from './dto/search-artists.dto';

const apiSlice = createApi({
	baseQuery: baseQueryConfig({ basePath: '/search' }),
	reducerPath: 'searchApi',
	tagTypes: ['Search'],
	endpoints: (builder) => ({
		searchArtists: builder.query<
			SearchArtistsResponseDto[],
			{ query: SearchArtistsQueryDto }
		>({
			query: ({ query }) => ({
				url: '/artists',
				method: 'GET',
				params: { q: query.q }
			})
		})
	})
});

export default apiSlice;
