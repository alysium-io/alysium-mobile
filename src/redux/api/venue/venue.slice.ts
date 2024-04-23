import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryConfig from '../utils/baseQueryConfig';
import {
	CreateVenueBodyDto,
	CreateVenueResponseDto
} from './dto/venue-create.dto';
import {
	DeleteVenueParamsDto,
	DeleteVenueResponseDto
} from './dto/venue-delete.dto';
import {
	FindAllVenuesQueryDto,
	FindAllVenuesResponseDto
} from './dto/venue-find-all.dto';
import {
	FindOneVenueParamsDto,
	FindOneVenueResponseDto
} from './dto/venue-find-one.dto';
import {
	UpdateVenueBodyDto,
	UpdateVenueParamsDto,
	UpdateVenueResponseDto
} from './dto/venue-update.dto';

const apiSlice = createApi({
	baseQuery: baseQueryConfig({ basePath: '/venue' }),
	reducerPath: 'venueApi',
	tagTypes: ['Venue'],
	endpoints: (builder) => ({
		findOne: builder.query<
			FindOneVenueResponseDto,
			{ params: FindOneVenueParamsDto }
		>({
			query: ({ params }) => ({
				url: `/${params.venue_id}`,
				method: 'GET'
			}),
			providesTags: (result, error, { params }) => [
				{ type: 'Venue', id: params.venue_id }
			]
		}),
		findAll: builder.query<
			FindAllVenuesResponseDto[],
			{ query: FindAllVenuesQueryDto }
		>({
			query: ({ query }) => ({
				url: '/',
				method: 'GET',
				params: { ...query }
			}),
			providesTags: (results) =>
				results
					? [
							...results.map(({ venue_id }) => ({
								type: 'Venue' as const,
								id: venue_id
							})),
							{ type: 'Venue', id: 'LIST' }
						]
					: [{ type: 'Venue', id: 'LIST' }]
		}),
		create: builder.mutation<
			CreateVenueResponseDto,
			{ body: CreateVenueBodyDto }
		>({
			query: ({ body }) => ({
				url: '/',
				method: 'POST',
				body
			}),
			invalidatesTags: [{ type: 'Venue', id: 'LIST' }]
		}),
		update: builder.mutation<
			UpdateVenueResponseDto,
			{
				body: UpdateVenueBodyDto;
				params: UpdateVenueParamsDto;
			}
		>({
			query: (body) => ({
				url: '/',
				method: 'PUT',
				body
			}),
			invalidatesTags: (result) =>
				result ? [{ type: 'Venue', id: result.venue_id }] : []
		}),
		delete: builder.mutation<
			DeleteVenueResponseDto,
			{ params: DeleteVenueParamsDto }
		>({
			query: ({ params }) => ({
				url: `/${params.venue_id}`,
				method: 'DELETE'
			}),
			invalidatesTags: (result, error, { params }) => [
				{ type: 'Venue', id: params.venue_id }
			]
		})
	})
});

export default apiSlice;
