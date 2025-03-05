import _ from 'lodash';
import { rtkBaseUrl, serviceApi } from '../base';
import {
	SearchArtistsBodyDto,
	SearchArtistsQueryDto,
	SearchArtistsResponseDto
} from './dto/search-artists.dto';
import {
	SearchScenesBodyDto,
	SearchScenesQueryDto,
	SearchScenesResponseDto
} from './dto/search-scenes.dto';
import {
	SearchUsersBodyDto,
	SearchUsersQueryDto,
	SearchUsersResponseDto
} from './dto/search-users.dto';

const url = rtkBaseUrl('search');

const apiSlice = serviceApi.injectEndpoints({
	endpoints: (builder) => ({
		searchArtists: builder.query<
			SearchArtistsResponseDto,
			{ body: SearchArtistsBodyDto; query: SearchArtistsQueryDto }
		>({
			query: ({ body, query }) => ({
				url: url('/artists'),
				method: 'POST',
				params: query,
				body
			}),
			serializeQueryArgs: ({ endpointName, queryArgs: { body } }) => ({
				endpointName,
				q: body?.q
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
		searchScenes: builder.query<
			SearchScenesResponseDto,
			{ body: SearchScenesBodyDto; query: SearchScenesQueryDto }
		>({
			query: ({ body, query }) => ({
				url: url('/scenes'),
				method: 'POST',
				params: query,
				body
			}),
			serializeQueryArgs: ({ endpointName, queryArgs: { body } }) => ({
				endpointName,
				q: body?.q
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
		searchUsers: builder.query<
			SearchUsersResponseDto,
			{ body: SearchUsersBodyDto; query: SearchUsersQueryDto }
		>({
			query: ({ body, query }) => ({
				url: url('/users'),
				method: 'POST',
				params: query,
				body
			}),
			serializeQueryArgs: ({ endpointName, queryArgs: { body } }) => ({
				endpointName,
				q: body?.q
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
