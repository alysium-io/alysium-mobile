import _ from 'lodash';
import { rtkBaseUrl, serviceApi } from '../base';
import {
	FindTagArtistsParamsDto,
	FindTagArtistsQueryDto,
	FindTagArtistsResponseDto
} from './dto/tag-artists.dto';
import {
	FindTagCorrelatedParamsDto,
	FindTagCorrelatedResponseDto
} from './dto/tag-correlated.dto';
import { CreateTagBodyDto, CreateTagResponseDto } from './dto/tag-create.dto';
import { DiscoverTagsResponseDto } from './dto/tag-discover.dto';
import {
	FindOneTagParamsDto,
	FindOneTagResponseDto
} from './dto/tag-find-one.dto';
import { TopTagsQueryDto, TopTagsResponseDto } from './dto/tag-top.dto';

const url = rtkBaseUrl('tag');

const apiSlice = serviceApi.injectEndpoints({
	endpoints: (builder) => ({
		findTagArtists: builder.query<
			FindTagArtistsResponseDto[],
			{ params: FindTagArtistsParamsDto; query: FindTagArtistsQueryDto }
		>({
			query: ({ params, query }) => ({
				url: url(`/${params.tag_uid}/artists`),
				method: 'GET',
				params: query
			}),
			serializeQueryArgs: ({ endpointName, queryArgs: { params } }) => ({
				endpointName,
				tag_uid: params.tag_uid
			}),
			merge: (currentCache, newItems) => {
				return _.unionBy(
					currentCache,
					newItems,
					(item) => item.artist.artist_uid
				);
			},
			forceRefetch({ currentArg, previousArg }) {
				return !_.isEqual(currentArg, previousArg);
			}
		}),
		findTagCorrelated: builder.query<
			FindTagCorrelatedResponseDto,
			{ params: FindTagCorrelatedParamsDto }
		>({
			query: ({ params }) => ({
				url: url(`/${params.tag_uid}/correlated`),
				method: 'GET'
			})
		}),
		findOneTag: builder.query<
			FindOneTagResponseDto,
			{ params: FindOneTagParamsDto }
		>({
			query: ({ params }) => ({
				url: url(`/${params.tag_uid}`),
				method: 'GET'
			}),
			providesTags: (result, error, { params }) => [
				{ type: 'Tag', id: params.tag_uid }
			]
		}),
		createTag: builder.mutation<
			CreateTagResponseDto,
			{ body: CreateTagBodyDto }
		>({
			query: ({ body }) => ({
				url: url('/'),
				method: 'POST',
				body
			})
		}),
		discoverTags: builder.query<DiscoverTagsResponseDto, undefined>({
			query: () => ({
				url: url('/discover'),
				method: 'GET'
			})
		}),
		topTags: builder.query<TopTagsResponseDto, { query: TopTagsQueryDto }>({
			query: ({ query }) => ({
				url: url('/top'),
				method: 'GET',
				params: query
			}),
			serializeQueryArgs: ({ endpointName }) => endpointName,
			merge: (currentCache, newItems) => {
				return _.unionBy(currentCache, newItems, (item) => item.tag_uid);
			},
			forceRefetch({ currentArg, previousArg }) {
				return !_.isEqual(currentArg, previousArg);
			}
		})
	})
});

export default apiSlice;
