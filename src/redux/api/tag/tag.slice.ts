import { createApi } from '@reduxjs/toolkit/query/react';
import _ from 'lodash';
import baseQueryConfig from '../utils/baseQueryConfig';
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

const apiSlice = createApi({
	baseQuery: baseQueryConfig({ basePath: '/tag' }),
	reducerPath: 'tagApi',
	tagTypes: ['Tag'],
	endpoints: (builder) => ({
		findTagArtists: builder.query<
			FindTagArtistsResponseDto[],
			{ params: FindTagArtistsParamsDto; query: FindTagArtistsQueryDto }
		>({
			query: ({ params, query }) => ({
				url: `/${params.tag_uid}/artists`,
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
				url: `/${params.tag_uid}/correlated`,
				method: 'GET'
			})
		}),
		findOne: builder.query<
			FindOneTagResponseDto,
			{ params: FindOneTagParamsDto }
		>({
			query: ({ params }) => ({
				url: `/${params.tag_uid}`,
				method: 'GET'
			}),
			providesTags: (result, error, { params }) => [
				{ type: 'Tag', id: params.tag_uid }
			]
		}),
		create: builder.mutation<CreateTagResponseDto, { body: CreateTagBodyDto }>({
			query: ({ body }) => ({
				url: '/',
				method: 'POST',
				body
			})
		}),
		discover: builder.query<DiscoverTagsResponseDto, undefined>({
			query: () => ({
				url: '/discover',
				method: 'GET'
			})
		})
	})
});

export default apiSlice;
