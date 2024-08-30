import { createApi } from '@reduxjs/toolkit/query/react';
import _ from 'lodash';
import baseQueryConfig from '../utils/baseQueryConfig';
import {
	SearchArtistsBodyDto,
	SearchArtistsQueryDto,
	SearchArtistsResponseDto
} from './dto/search-artists.dto';
import {
	SearchTagsBodyDto,
	SearchTagsQueryDto,
	SearchTagsResponseDto
} from './dto/search-tags.dto';

const apiSlice = createApi({
	baseQuery: baseQueryConfig({ basePath: '/search' }),
	reducerPath: 'searchApi',
	tagTypes: ['Search'],
	endpoints: (builder) => ({
		searchArtists: builder.query<
			SearchArtistsResponseDto,
			{ body: SearchArtistsBodyDto; query: SearchArtistsQueryDto }
		>({
			query: ({ body, query }) => ({
				url: '/artists',
				method: 'POST',
				params: query,
				body
			}),
			serializeQueryArgs: ({ endpointName, queryArgs: { body } }) => ({
				endpointName,
				tag_uid: body?.q
			}),
			merge: (currentCache, newItems) => {
				return {
					...newItems,
					hits: _.unionBy(currentCache.hits, newItems.hits, (item) => item.uid)
				};
			},
			forceRefetch({ currentArg, previousArg }) {
				return !_.isEqual(currentArg, previousArg);
			}
		}),
		searchTags: builder.query<
			SearchTagsResponseDto,
			{ body: SearchTagsBodyDto; query: SearchTagsQueryDto }
		>({
			query: ({ body, query }) => ({
				url: '/tags',
				method: 'POST',
				params: query,
				body
			}),
			serializeQueryArgs: ({ endpointName, queryArgs: { body } }) => ({
				endpointName,
				tag_uid: body?.q,
				sort: body?.sort,
				correlated_tag_uids: body?.correlated_tag_uids
			}),
			merge: (currentCache, newItems) => {
				return {
					...newItems,
					hits: _.unionBy(currentCache.hits, newItems.hits, (item) => item.uid)
				};
			},
			forceRefetch({ currentArg, previousArg }) {
				return !_.isEqual(currentArg, previousArg);
			}
		})
	})
});

export default apiSlice;
