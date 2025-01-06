import _ from 'lodash';
import { rtkBaseUrl, serviceApi } from '../base';
import {
	ArchiveParamsDto,
	ArchiveQueryDto,
	ArchiveResponseDto
} from './dto/artist-event-archive.dto';
import {
	CreateArtistEventBodyDto,
	CreateArtistEventParamsDto,
	CreateArtistEventResponseDto
} from './dto/artist-event-create.dto';
import {
	DeleteArtistEventParamsDto,
	DeleteArtistEventResponseDto
} from './dto/artist-event-delete.dto';
import {
	FindAllArtistEventsParamsDto,
	FindAllArtistEventsQueryDto,
	FindAllArtistEventsResponseDto
} from './dto/artist-event-find-all.dto';
import {
	FindOneArtistEventParamsDto,
	FindOneArtistEventResponseDto
} from './dto/artist-event-find-one.dto';
import {
	PatchArtistEventLocationBodyDto,
	PatchArtistEventLocationParamsDto,
	PatchArtistEventLocationResponseDto
} from './dto/artist-event-patch-location.dto';
import {
	PatchArtistEventStatusBodyDto,
	PatchArtistEventStatusParamsDto,
	PatchArtistEventStatusResponseDto
} from './dto/artist-event-patch-status.dto';
import {
	PatchArtistEventTimeBodyDto,
	PatchArtistEventTimeParamsDto,
	PatchArtistEventTimeResponseDto
} from './dto/artist-event-patch-time.dto';
import {
	UpdateArtistEventBodyDto,
	UpdateArtistEventParamsDto,
	UpdateArtistEventResponseDto
} from './dto/artist-event-update.dto';
import {
	WorkbenchParamsDto,
	WorkbenchResponseDto
} from './dto/artist-event-workbench.dto';

const url = rtkBaseUrl('');

const artistEventApiSlice = serviceApi.injectEndpoints({
	endpoints: (builder) => ({
		privateFindOneArtistEvent: builder.query<
			FindOneArtistEventResponseDto,
			{ params: FindOneArtistEventParamsDto }
		>({
			query: ({ params }) => ({
				url: url(`/artist/${params.artist_uid}/event/${params.event_uid}`),
				method: 'GET'
			}),
			providesTags: (result, error, { params }) => [
				{ type: 'ArtistEvent', id: params.event_uid }
			]
		}),
		privateFindAllArtistEvents: builder.query<
			FindAllArtistEventsResponseDto,
			{
				params: FindAllArtistEventsParamsDto;
				query: FindAllArtistEventsQueryDto;
			}
		>({
			query: ({ params, query }) => ({
				url: url(`/artist/${params.artist_uid}/event`),
				method: 'GET',
				params: query
			}),
			serializeQueryArgs: ({ endpointName, queryArgs: { params } }) => ({
				endpointName,
				artist_uid: params.artist_uid
			}),
			merge: (currentCache, newItems) => {
				// Remove any items that exist in newItems from currentCache
				const filteredCache = currentCache.filter(
					(cacheItem) =>
						!newItems.find(
							(newItem) => newItem.event.event_uid === cacheItem.event.event_uid
						)
				);
				// Then concat the new items
				return [...filteredCache, ...newItems];
			},
			forceRefetch({ currentArg, previousArg }) {
				return !_.isEqual(currentArg, previousArg);
			},
			providesTags: () => [{ type: 'ArtistEvent', id: 'LIST' }]
		}),
		publicFindAllArtistEvents: builder.query<
			FindAllArtistEventsResponseDto,
			{
				params: FindAllArtistEventsParamsDto;
				query: FindAllArtistEventsQueryDto;
			}
		>({
			query: ({ params, query }) => ({
				url: url(`/artist/${params.artist_uid}/event/public`),
				method: 'GET',
				params: query
			}),
			serializeQueryArgs: ({ endpointName, queryArgs: { params } }) => ({
				endpointName,
				artist_uid: params.artist_uid
			}),
			merge: (currentCache, newItems) => {
				return _.unionBy(
					currentCache,
					newItems,
					(item) => item.event.event_uid
				);
			},
			forceRefetch({ currentArg, previousArg }) {
				return !_.isEqual(currentArg, previousArg);
			},
			providesTags: (results) =>
				results ? [{ type: 'PublicEvent', id: 'LIST' }] : []
		}),
		createArtistEvent: builder.mutation<
			CreateArtistEventResponseDto,
			{ params: CreateArtistEventParamsDto; body: CreateArtistEventBodyDto }
		>({
			query: ({ params, body }) => ({
				url: url(`/artist/${params.artist_uid}/event`),
				method: 'POST',
				body
			}),
			invalidatesTags: [
				{ type: 'ArtistEvent', id: 'LIST' },
				{ type: 'ArtistEvent', id: 'WORKBENCH' }
			]
		}),
		deleteArtistEvent: builder.mutation<
			DeleteArtistEventResponseDto,
			{ params: DeleteArtistEventParamsDto }
		>({
			query: ({ params }) => ({
				url: url(`/artist/${params.artist_uid}/event/${params.event_uid}`),
				method: 'DELETE'
			}),
			invalidatesTags: () => [
				{ type: 'ArtistEvent', id: 'LIST' },
				{ type: 'PublicEvent', id: 'LIST' },
				{ type: 'ArtistEvent', id: 'WORKBENCH' }
			],
			async onQueryStarted({ params }, { dispatch, queryFulfilled }) {
				const patches = dispatch(
					artistEventApiSlice.util.updateQueryData(
						'privateFindAllArtistEvents',
						{
							params: { artist_uid: params.artist_uid },
							query: { page: 1, limit: 10 }
						},
						(draft) => {
							const index = draft.findIndex(
								(event) => event.event.event_uid === params.event_uid
							);
							if (index !== -1) {
								draft.splice(index, 1);
							}
						}
					)
				);

				try {
					await queryFulfilled;
				} catch {
					patches.undo();
				}
			}
		}),
		updateArtistEvent: builder.mutation<
			UpdateArtistEventResponseDto,
			{
				params: UpdateArtistEventParamsDto;
				body: Partial<UpdateArtistEventBodyDto>;
			}
		>({
			query: ({ params, body }) => ({
				url: url(`/artist/${params.artist_uid}/event/${params.event_uid}`),
				method: 'PUT',
				body
			}),
			invalidatesTags: (result, error, { params }) => [
				{ type: 'ArtistEvent', id: params.event_uid },
				{ type: 'PublicEvent', id: params.event_uid },
				{ type: 'ArtistEvent', id: 'LIST' },
				{ type: 'PublicEvent', id: 'LIST' },
				{ type: 'ArtistEvent', id: 'WORKBENCH' }
			]
		}),
		patchArtistEventLocation: builder.mutation<
			PatchArtistEventLocationResponseDto,
			{
				params: PatchArtistEventLocationParamsDto;
				body: PatchArtistEventLocationBodyDto;
			}
		>({
			query: ({ params, body }) => ({
				url: url(
					`/artist/${params.artist_uid}/event/${params.event_uid}/location`
				),
				method: 'PATCH',
				body
			}),
			invalidatesTags: (result, error, { params }) => [
				{ type: 'ArtistEvent', id: params.event_uid },
				{ type: 'PublicEvent', id: params.event_uid },
				{ type: 'PublicEvent', id: 'LIST' },
				{ type: 'ArtistEvent', id: 'LIST' },
				{ type: 'ArtistEvent', id: 'WORKBENCH' }
			]
		}),
		patchArtistEventStatus: builder.mutation<
			PatchArtistEventStatusResponseDto,
			{
				params: PatchArtistEventStatusParamsDto;
				body: PatchArtistEventStatusBodyDto;
			}
		>({
			query: ({ params, body }) => ({
				url: url(
					`/artist/${params.artist_uid}/event/${params.event_uid}/status`
				),
				method: 'PATCH',
				body
			}),
			invalidatesTags: (result, error, { params }) => [
				{ type: 'ArtistEvent', id: params.event_uid },
				{ type: 'PublicEvent', id: params.event_uid },
				{ type: 'PublicEvent', id: 'LIST' },
				{ type: 'ArtistEvent', id: 'LIST' },
				{ type: 'ArtistEvent', id: 'WORKBENCH' }
			]
		}),
		patchArtistEventTime: builder.mutation<
			PatchArtistEventTimeResponseDto,
			{
				params: PatchArtistEventTimeParamsDto;
				body: PatchArtistEventTimeBodyDto;
			}
		>({
			query: ({ params, body }) => ({
				url: url(`/artist/${params.artist_uid}/event/${params.event_uid}/time`),
				method: 'PATCH',
				body
			}),
			invalidatesTags: (result, error, { params }) => [
				{ type: 'ArtistEvent', id: params.event_uid },
				{ type: 'PublicEvent', id: params.event_uid },
				{ type: 'PublicEvent', id: 'LIST' },
				{ type: 'ArtistEvent', id: 'LIST' },
				{ type: 'ArtistEvent', id: 'WORKBENCH' }
			]
		}),
		workbench: builder.query<
			WorkbenchResponseDto,
			{ params: WorkbenchParamsDto }
		>({
			query: ({ params }) => ({
				url: url(`/artist/${params.artist_uid}/event/workbench`),
				method: 'GET'
			}),
			providesTags: (result) =>
				result ? [{ type: 'ArtistEvent', id: 'WORKBENCH' }] : []
		}),
		archive: builder.query<
			ArchiveResponseDto,
			{ params: ArchiveParamsDto; query: ArchiveQueryDto }
		>({
			query: ({ params, query }) => ({
				url: url(`/artist/${params.artist_uid}/event/archive`),
				method: 'GET',
				params: query
			}),
			providesTags: (result) =>
				result ? [{ type: 'ArtistEvent', id: 'ARCHIVE' }] : []
		})
	})
});

export default artistEventApiSlice;
